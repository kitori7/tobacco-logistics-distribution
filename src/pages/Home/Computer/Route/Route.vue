<template>
  <div class="route">
    <div class="map">
      <el-button class="icon" @click="openEChart">
        <el-icon>
          <Edit />
        </el-icon>
      </el-button>
      <div id="container"></div>
      <RouteEChart :data="eChartData" v-model="isOpenEChart"></RouteEChart>
      <el-button
        class="adjustPoint"
        @click="adjustPoint"
        :loading="adjustLoad"
        >{{ adjustText }}</el-button
      >
    </div>
    <div class="content">
      <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor="#001731">
        <div class="leftInformation">
          <el-select v-model="area">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="routeCollapse">
            <el-collapse v-model="activeNames">
              <el-badge :value="1" class="item"></el-badge>
              <el-collapse-item title="聚集区信息改变" name="1">
                <ul>
                  <li>D区内聚集区发生改变</li>
                </ul>
              </el-collapse-item>
              <el-badge :value="1" class="item"></el-badge>
              <el-collapse-item title="系统参数" name="2">
                <ul>
                  <li>单车载货量更改为700条</li>
                  <li>D区可工作车辆数更改为25辆</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="btns">
            <el-input-number
              v-if="area !== '韶关市'"
              class="num"
              v-model="num"
              :min="1"
              :max="1000"
              style="color: black"
            />
            <el-button
              class="btn"
              @click="CalculateBtnFunction()"
              :loading="loadCalculate"
              >重新计算</el-button
            >
          </div>
        </div>
      </BorderBox9>
      <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor="#001731">
        <div class="rightInformation">
          <div class="rtitle">{{ route }}</div>
          <div class="detailedRoute">
            <el-scrollbar height="68vh">
              <el-collapse
                v-model="activeNames2"
                v-loading="isResultPointsFinished"
                element-loading-text="加载中..."
                element-loading-background="rgba(0,23,49,0.8)"
              >
                <el-collapse-item
                  :title="item.areaName"
                  :name="item.areaId"
                  v-for="item in clusterStore.routeDetails"
                  :key="item.areaId"
                >
                  <ul>
                    <li
                      class="routeNameLi"
                      v-for="item1 in item.routeList"
                      :key="item1.routeId"
                      @click="item1.isOpen = !item1.isOpen"
                    >
                      <div class="routeName">
                        {{ item1.routeName }}
                      </div>
                      <ul>
                        <li
                          class="accumulationNameLi"
                          tabindex="1"
                          v-for="item2 in item1.accumulationList"
                          :key="item2.accumulationId"
                          v-show="item1.isOpen"
                          @click.stop="accumulationNameClick(item2)"
                        >
                          {{ item2.accumulationName }}
                          <!-- <div v-if=""></div> -->
                        </li>
                      </ul>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </div>
          <el-button
            class="saveRoute"
            @click="addRouteBtn"
            :loading="saveLoading"
            >保存路径</el-button
          >
          <el-dialog
            style="transform: translate(16vw, 43vh); height: 30vh"
            v-model="isOpenRouteDialog"
            width="20%"
            :modal="false"
            :before-close="closeRouteDialog"
            :append-to-body="true"
            :title="titleAccumulationName"
          >
            <!-- :draggable=true 拖动 -->
            <el-scrollbar height="20vh">
              <ul style="margin-left: 20px">
                <li
                  style="padding: 5px; list-style: square"
                  v-for="item3 in clusterStore.storeResult"
                  :key="item3.storeId"
                >
                  {{ item3.storeAddress }}
                </li>
              </ul>
            </el-scrollbar>
          </el-dialog>
        </div>
      </BorderBox9>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // import router from "@/router";
  import { Edit } from "@element-plus/icons-vue";
  import { BorderBox9 } from "@dataview/datav-vue3";
  //@ts-ignore
  import AMapLoader from "@amap/amap-jsapi-loader";
  import { useClusterStore } from "@/store/cluster";
  import { IAccumulationList } from "@/types/cluster";
  import RouteEChart from "./cpn/routeEChart.vue";
  window._AMapSecurityConfig = {
    securityJsCode: "1b6291b2fceee1cd3b7798bfdd4c39e4",
  };
  //聚集区Store
  const clusterStore = useClusterStore();
  let map: any = null;
  AMapLoader.load({
    key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.DistrictSearch", "AMap.MarkerCluster"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等 // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap: any) => {
    const district = new AMap.DistrictSearch({
      subdistrict: 1,
      extensions: "all",
      level: "province",
    });
    district.search("韶关市", function (_: any, result: any) {
      const bounds = result.districtList[0].boundaries;
      const mask = [];
      for (let i = 0; i < bounds.length; i++) {
        mask.push([bounds[i]]);
      }
      map = new AMap.Map("container", {
        // 设置地图容器id
        mask: mask, // 为Map实例制定掩模的路径,各图层将值显示路径范围内图像,3D模式下有效
        zoom: 9, // 设置当前显示级别
        expandZoomRange: true, // 开启显示范围设置
        zooms: [9, 18], //最小显示级别为7，最大显示级别为20
        center: [113.767587, 24.718014], // 设置地图中心点位置
        viewMode: "3D", // 特别注意,设置为3D则其他地区不显示
        zoomEnable: true, // 是否可以缩放地图
        resizeEnable: true,
      });
      // 添加描边
      for (let i = 0; i < bounds.length; i++) {
        const polyline = new AMap.Polyline({
          path: bounds[i], // polyline 路径，支持 lineString 和 MultiLineString
          strokeColor: "#3078AC", // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
          strokeWeight: 2, // 轮廓线宽度,默认为:2
          // map:map // 这种方式相当于: polyline.setMap(map);
        });
        polyline.setMap(map);
      }
      //限制移动范围
      const limitBound = map.getBounds();
      map.setLimitBounds(limitBound);
      //绑定点击事件
    });
  });
  const activeNames = ref(["0"]);
  const activeNames2 = ref(["0"]);

  const area = ref("韶关市");
  const areas = [
    {
      value: "韶关市",
      label: "韶关市",
    },
    {
      value: "仁化",
      label: "仁化县中转站",
    },
    {
      value: "新丰",
      label: "新丰县中转站",
    },
    {
      value: "坪石",
      label: "坪石县中转站",
    },
    {
      value: "翁源",
      label: "翁源县中转站",
    },
    {
      value: "马市",
      label: "马市烟叶工作站",
    },
    {
      value: "物流配送中心",
      label: "物流配送中心",
    },
  ];
  const route = ref("路线详情");

  //楚鸿的key： 309bde1e73b984c7d8a87ab19255963c
  //我的key：   cdeaa7cd146a1a9612827190fb0e0962
  const pathCalculateInfo = ref({
    apiKey: "cdeaa7cd146a1a9612827190fb0e0962",
    areaName: area.value,
    assignNumber: 10,
  });
  const choiceCalculateType = ref(0);
  const num = ref(10);
  //路径重新计算

  // 打卡 eChart
  const isOpenEChart = ref(false);
  function openEChart() {
    isOpenEChart.value = !isOpenEChart.value;
  }

  const eChartData = ref<{
    dis: number[];
    wei: number[];
    time: number[];
  }>({ dis: [], wei: [], time: [] });
  onMounted(() => {
    setTimeout(() => {
      // 加载保存的地图数据
      if (!clusterStore.convex) {
        const loading = ElLoading.service({
          lock: true,
          text: "加载地图数据中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
        clusterStore.getConvexAction().then(() => {
          countPathResult();
          loading.close();
        });
      }
      countPathResult();
      getSplitLines();
    }, 1000);
  });
  const markers: Array<AMap.Text> = [];
  const points = ref<boolean>(false);
  const accumulationId = ref<string>();
  const routeId = ref<string>();
  const routeName = ref<string>();
  const oldRouteName = ref<string>();

  function countPathResult() {
    const colorArr = [
      "#e4c974",
      "#814146",
      "#798f4a",
      "#8b90a3",
      "#728593",
      "#383a4b",
    ];
    // 绘制点
    clusterStore.getConvexPointAction().then(() => {
      clusterStore.convexPoint.forEach((point: any) => {
        const position = new AMap.Marker({
          position: new AMap.LngLat(point.longitude, point.latitude),
          title: point.routeName,
          content: `<div style="font-size: 8px;color: #bcbcbc;">◉</div>`,
          //@ts-ignore
          anchor: "center",
        });
        map.add(position);
        points.value = true;
        //@ts-ignore
        position.on("click", function () {
          if (adjustLoad.value) {
            accumulationId.value = point.accumulationId;
            oldRouteName.value = point.routeName;
          }
        });
      });
    });
    clusterStore.convex?.forEach((item: any) => {
      // 凸包渲染
      const polygonPath = item.convex.map((item: any) => {
        return [item.longitude, item.latitude];
      });
      const activePolyOption = {
        path: polygonPath,
        strokeOpacity: 1,
        strokeColor: "#fff",
        fillOpacity: 0,
        strokeWeight: 5,
      };
      const unActivePolyOption = {
        path: polygonPath,
        strokeColor: "#fff",
        strokeWeight: 5,
        fillOpacity: 0,
        strokeStyle: "solid",
      };

      const polygon = new AMap.Polygon(unActivePolyOption);
      let isActive = false;
      let marker: any = null;
      polygon.on("click", (event: any) => {
        let index = eChartData.value.dis.indexOf(Number(item.distance));
        if (!isActive) {
          polygon.setOptions(activePolyOption);
          eChartData.value.dis.push(Number(item.distance));
          eChartData.value.wei.push(Number(item.cargoWeight));
          eChartData.value.time.push(Number(item.workTime));
          index = eChartData.value.dis.indexOf(Number(item.distance));
          routeId.value = item.routeId;
          routeName.value = item.routeName;
          marker = new AMap.Text({
            position: new AMap.LngLat(
              event.lnglat.getLng(),
              event.lnglat.getLat()
            ),
            text: index.toString(),
          });
          marker.dis = item.distance;
          markers.push(marker);
          map.add(marker);
        } else {
          polygon.setOptions(unActivePolyOption);
          if (index !== -1) {
            eChartData.value.dis.splice(index, 1);
            eChartData.value.wei.splice(index, 1);
            routeId.value = undefined;
            eChartData.value.time.splice(index, 1);
          }
          if (markers.indexOf(marker) !== -1) {
            markers.splice(markers.indexOf(marker), 1);
            map.remove(marker);
            renderMarkers();
          }
        }
        isActive = !isActive;
      });
      map.add(polygon);
      // 重新渲染 marker
      function renderMarkers() {
        markers.forEach((marker) => {
          const newIndex = eChartData.value.dis.indexOf(Number(marker.dis));
          if (marker.getText() !== newIndex.toString()) {
            marker.setText(newIndex.toString());
          }
        });
      }
      // //路线绘制
    });
  }
  const loadCalculate = ref<boolean>(false);
  const CalculateBtnFunction = () => {
    loadCalculate.value = true;
    if (area.value == "韶关市") {
      clusterStore
        .calculateAllAction({ apiKey: pathCalculateInfo.value.apiKey })
        .then(() => {
          choiceCalculateType.value = 1;
          loadCalculate.value = false;
        });
    } else {
      pathCalculateInfo.value.assignNumber = num.value;
      pathCalculateInfo.value.areaName = area.value;
      clusterStore.pathCalculateOneAction(pathCalculateInfo.value).then(() => {
        loadCalculate.value = false;
        choiceCalculateType.value = 2;
      });
    }
  };
  const isResultPointsFinished = ref<boolean>(true);
  //获取路线详情-大区路线聚集区信息
  clusterStore.getRouteDetailsAction().then(() => {
    isResultPointsFinished.value = false;
  });
  //定义弹框标题accumulationName的变量
  const titleAccumulationName = ref<string>("");
  //获取路线详情-聚集区下商户信息
  const accumulationNameClick = (accumulation: IAccumulationList) => {
    titleAccumulationName.value = accumulation.accumulationName;
    clusterStore.getStoreDetailsAction(accumulation.accumulationId);
    isOpenRouteDialog.value = true;
  };
  //定义是否打开弹窗的变量
  const isOpenRouteDialog = ref(false);
  //关闭窗口
  const closeRouteDialog = () => {
    isOpenRouteDialog.value = false;
  };
  const saveLoading = ref<boolean>(false);
  const addRouteBtn = () => {
    saveLoading.value = true;
    if (adjustSave.value) {
      clusterStore.convex.forEach((item: any) => {
        delete item.createTime;
        delete item.updateTime;
        delete item.versionId;
        delete item.delete;
        delete item.routeId;
        delete item.workTime;
      });
      let saveRouteData = clusterStore.convex!.map((i: any) => {
        i.areaId = Number(i.areaId);
        i.transitDepotId = Number(i.transitDepotId);
        return i;
      });
      // 重新计算情况数据
      eChartData.value = {
        dis: [],
        wei: [],
        time: [],
      };
      markers.splice(0, markers.length);
      ElMessage.closeAll("warning");
      clusterStore.postAddRouteAction(saveRouteData).then(() => {
        saveLoading.value = false;
        if (clusterStore.saveState) {
          const loading = ElLoading.service({
            lock: true,
            text: "更新地图数据中...",
            background: "rgba(0, 0, 0, 0.7)",
          });
          clusterStore.getConvexAction().then(() => {
            countPathResult();
            loading.close();
          });
        }
      });
    }
    if (choiceCalculateType.value == 0 && !adjustSave.value) {
      saveLoading.value = false;
      ElMessage.warning("请先进行重新计算");
    }
    if (choiceCalculateType.value == 1) {
      clusterStore.newPathResultAll?.forEach((item) => {
        delete item.createTime;
        delete item.updateTime;
        delete item.versionId;
        delete item.delete;
        delete item.routeId;
        delete item.workTime;
      });
      let saveRouteData = clusterStore.newPathResultAll!.map((i) => {
        i.areaId = Number(i.areaId);
        i.transitDepotId = Number(i.transitDepotId);
        return i;
      });
      console.log(saveRouteData);
      clusterStore.postAddRouteAction(saveRouteData).then(() => {
        saveLoading.value = false;
        if (clusterStore.saveState) {
          const loading = ElLoading.service({
            lock: true,
            text: "更新地图数据中...",
            background: "rgba(0, 0, 0, 0.7)",
          });
          clusterStore.getConvexAction().then(() => {
            countPathResult();
            loading.close();
          });
        }
      });
    }

    if (choiceCalculateType.value == 2) {
      clusterStore.newPathResult?.forEach((item) => {
        delete item.createTime;
        delete item.updateTime;
        delete item.versionId;
        delete item.delete;
        delete item.routeId;
        delete item.workTime;
      });
      let saveRouteData = clusterStore.newPathResult!.map((i) => {
        i.areaId = Number(i.areaId);
        i.transitDepotId = Number(i.transitDepotId);
        return i;
      });
      console.log(saveRouteData);
      clusterStore.postAddRouteAction(saveRouteData).then(() => {
        saveLoading.value = false;
        if (clusterStore.saveState) {
          const loading = ElLoading.service({
            lock: true,
            text: "更新地图数据中...",
            background: "rgba(0, 0, 0, 0.7)",
          });
          clusterStore.getConvexAction().then(() => {
            countPathResult();
            loading.close();
          });
        }
      });
    }
  };
  function getSplitLines() {
    const oldPolylineList: AMap.Polyline[] = [];
    clusterStore.getSplitLinesAction().then(() => {
      //折线数据展示
      clusterStore.SplitLines!.forEach((item) => {
        //配置折线路径
        let path: AMap.LngLat[] = [];
        item.forEach((item) => {
          path.push(new AMap.LngLat(item.longitude, item.latitude));
        });
        //创建 Polyline 实例
        let polyline = new AMap.Polyline({
          path: path,
          strokeWeight: 5,
          showDir: true,
          strokeColor: "#001731", //线条颜色
          lineJoin: "round", //折线拐点连接处样式
        });
        oldPolylineList.push(polyline);
      });
      map.add(oldPolylineList);
    });
  }

  //  调整打卡点
  const adjustConfirm = ref<boolean>(false);
  const adjustLoad = ref<boolean>(false);
  const adjustText = ref<string>("打卡点调整");
  const adjustSave = ref<boolean>(false);
  function adjustPoint() {
    if (!points.value) {
      ElMessage.warning("请等待打卡点数据加载完毕");
    } else if (!adjustConfirm.value) {
      adjustLoad.value = true;
      ElMessage({
        message: "已进入调整打卡点模式，请选择要调整的打卡点",
        type: "warning",
        duration: 0,
      });
      watch(accumulationId, (newValue) => {
        ElMessage.closeAll("warning");
        ElMessage({
          message: `已选择最新的打卡点，打卡点的Id为${newValue},然后请选择打卡点的新路径`,
          duration: 0,
          type: "warning",
        });

        watch(routeId, (newValue) => {
          if (newValue) {
            ElMessage.closeAll("warning");
            ElMessage({
              message: `已选择最新的路径，路径的名称为${routeName.value},请再点击调整按钮确认`,
              duration: 0,
              type: "warning",
            });

            adjustLoad.value = false;
            adjustText.value = "点击确认调整";
            adjustConfirm.value = true;
          }
        });
      });
    } else if (adjustConfirm.value) {
      if (routeId.value && accumulationId.value) {
        clusterStore
          .adjustPointAction({
            routeId: routeId.value,
            accumulationId: accumulationId.value,
          })
          .then(() => {
            adjustConfirm.value = false;
            ElMessage.closeAll("warning");
            const loading = ElLoading.service({
              lock: true,
              text: "加载地图数据中...",
              background: "rgba(0, 0, 0, 0.7)",
            });
            clusterStore
              .calculateSingleRouteAction({
                apiKey: pathCalculateInfo.value.apiKey,
                routeName1: oldRouteName.value,
                routeName2: routeName.value,
              })
              .then(() => {
                for (let item of clusterStore.SingleRoute) {
                  let index = clusterStore.convex.findIndex(
                    (obj: any) => obj.routeName === item.routeName
                  );
                  if (index !== -1) {
                    clusterStore.convex[index] = item;
                  }
                }
                const Overlays = map.getAllOverlays("polygon");
                map.remove(Overlays);
                countPathResult();
                loading.close();
                ElMessage({
                  message:
                    "调整结果如图，如需保存请点击保存路径按钮，否则刷新页面恢复调整前状态",
                  duration: 0,
                  type: "warning",
                });
                adjustSave.value = true;
              });
          });
      } else {
        ElMessage({ message: `请选择打卡点的新路径`, type: "warning" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .route {
    width: 100%;
    display: flex;
    justify-content: center;
    .adjustPoint {
      position: relative;
      left: 50%;
      transform: translate(-60%, 50%);
      transform: translate(-60%, 50%);
    }
    .map {
      :deep(.amap-marker-label) {
        background-color: #3490f5;
        border: 0px;
        border-radius: 30%;
        position: relative;
        position: relative;
      }
      #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        margin: 0.5vh 0;
      }

      .icon {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 10;
        width: 20px;
        height: 25px;
        box-shadow: 1px 1px 1px 1px rgb(0, 0, 0, 0.4);
        border-radius: 10%;
        background-color: #72e4ff;
      }
    }

    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .dv-border-box-9 {
        height: 80vh;
        width: 20vw;
        box-shadow: 10px 10px 5px 5px rgb(0, 0, 0, 0.4);

        :deep(.el-input__wrapper) {
          font-size: 18px;
          width: 9vw;
          background-color: #001731;
          border: none;
          box-shadow: none;
        }

        :deep(.el-input__inner) {
          font-weight: bolder;
          text-align: center;
        }

        :global(.el-select-dropdown__item) {
          display: grid !important;
          place-items: center !important;
          font-size: 18px;
          font-weight: bolder;
        }
        :global(.el-popper .el-popper__arrow::before) {
          border-top: 1px solid #73e1ff;
          background-color: #73e1ff !important;
        }
        .el-select {
          --el-select-input-focus-border-color: transparent;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -30%);
        }

        :deep(.el-icon) {
          font-size: 20px;
        }

        .el-input {
          border: none;
        }
        .rtitle {
          width: 140px;
          height: 50px;
          font-size: 20px;
          letter-spacing: 2px;
          line-height: 40px;
          background-color: #001731;
          text-align: center;
          color: rgb(204, 255, 255);
          font-weight: bolder;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -30%);
        }
        .num {
          width: 120px;
          height: 40px;
        }

        .el-input__inner {
          color: #ff0000;
        }

        .btns {
          position: absolute;
          bottom: 3%;
          display: flex;
          width: 100%;
          justify-content: center;
          .btn {
            width: 120px;
            height: 40px;
          }
        }

        .leftInformation {
          .routeCollapse {
            padding-left: 1vw;
            padding-top: 4vh;
            width: 85%;

            ::v-deep(.el-collapse-item__header::before) {
              content: "";
              display: inline-block;
              width: 15px;
              height: 15px;
              background-color: #fcd539;
              border-radius: 50%;
              margin-right: 10px;
            }

            ::v-deep(.el-collapse-item__header::after) {
              margin-left: 10px;
              margin-right: -15px;
              width: 33px;
              height: 33px;
              background: #fcd539;
              transform: rotate(45deg);
              content: "";
              display: inline-block;
            }

            .item {
              position: absolute;
              z-index: 10;
              margin-top: 20px;
              margin-left: 16.4vw;
            }

            li {
              list-style: disc;
              padding: 5px 10px;
            }

            li:before {
              content: "";
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #fcd539;
              border-radius: 50%;
              margin-bottom: 4px;
            }
          }
        }

        .rightInformation {
          margin-left: 0.5vw;

          .detailedRoute {
            padding-left: 1vw;
            padding-top: 4vh;
            width: 85%;

            .el-collapse {
              --el-collapse-header-bg-color: rgb(2, 119, 168);
              --el-collapse-header-text-color: #e1f7ff;
              --el-collapse-header-font-size: 18px;
              --el-collapse-content-bg-color: #001731;
              --el-collapse-content-font-size: 18px;
              --el-collapse-content-text-color: #e1f7ff;
              --el-collapse-border-color: #001731;
              :deep(.el-loading-spinner) {
                margin-top: 28vh;
              }
            }

            .el-collapse-item {
              padding-left: 30px;
              position: relative;

              ::v-deep(.el-collapse-item__content) {
                padding: 0;
              }

              .routeNameLi {
                // padding-left: 5px;

                .routeName:before {
                  content: "";
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  background-color: rgb(0, 179, 255);
                  border-radius: 50%;
                  margin-bottom: 4px;
                  margin-right: 10px;
                }

                .routeName:hover {
                  background-color: #0277a8;
                }

                .accumulationNameLi {
                  padding-left: 25px;
                }

                .accumulationNameLi:hover {
                  background-color: #0277a8;
                }

                .accumulationNameLi:before {
                  content: "";
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  background-color: rgb(255, 238, 0);
                  border-radius: 50%;
                  margin-bottom: 4px;
                  margin-right: 10px;
                }
              }
            }

            .el-collapse-item:before {
              position: absolute;
              left: 5px;
              top: 0;
              border-right: 25px solid rgb(2, 119, 168);
              border-top: 24px solid transparent;
              border-bottom: 24px solid transparent;
              content: "";
              width: 0;
              height: 0;
            }
          }

          .saveRoute {
            width: 120px;
            height: 40px;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            bottom: 3%;
          }
        }
      }
    }
  }
</style>
