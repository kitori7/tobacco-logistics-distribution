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
      <el-button class="adjust">打卡点调整</el-button>
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
          <el-input-number
            class="num"
            v-model="num"
            :min="1"
            :max="1000"
            style="color: black"
          />
          <el-button class="btn" @click="CalculateBtnFunction()"
            >重新计算</el-button
          >
        </div>
      </BorderBox9>
      <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor="#001731">
        <div class="rightInformation">
          <div class="rtitle">{{ route }}</div>
          <div class="detailedRoute">
            <el-scrollbar height="68vh">
              <el-collapse v-model="activeNames2">
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
          <el-button class="saveRoute" @click="addRouteBtn">保存路径</el-button>
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
  import { log } from "console";
  window._AMapSecurityConfig = {
    securityJsCode: "1b6291b2fceee1cd3b7798bfdd4c39e4",
  };
  //聚集区Store
  const clusterStore = useClusterStore();
  let map: any = null;
  AMapLoader.load({
    key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.DistrictSearch", "AMap.MarkerCluster"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap: any) => {
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
        map.on("click", function (e: any) {
          console.log(e);
          console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
        });

        const myCoordinateList1 = ref<any[]>([]);

        const myCoordinateList = ref<any[]>([
          // {
          //   //longitude
          //   polyline: [
          //     { latitude: 25.30305881240751, longitude: 114.05512268976841 },
          //     { latitude: 25.30305881240751, longitude: 114.6279588101562 },
          //     { latitude: 24.99153464936327, longitude: 114.6279588101562 },
          //     { latitude: 24.99153464936327, longitude: 114.05512268976841 },
          //   ],
          //   centen: [114.09076333840919, 25.185733927294645],
          //   marker: {},
          // },
          // //[25., ,25.30305881240751, 114.6279588101562,24.99153464936327, 114.6279588101562,24.99153464936327, 114.05512268976841]
          // {
          //   polyline: [
          //     { latitude: 24.844526655385806, longitude: 113.98392877859017 },
          //     { latitude: 24.844526655385806, longitude: 114.6825439387864 },
          //     { latitude: 24.650962204906058, longitude: 114.6825439387864 },
          //     { latitude: 24.650962204906058, longitude: 113.98392877859017 },
          //   ],
          //   centen: [114.12518341658414, 24.72474172297631],
          //   marker: {},
          // },
          // //[24.844526655385806, 113.98392877859017,24.844526655385806, 114.6825439387864,24.400962204906058, 114.6825439387864,24.400962204906058, 113.98392877859017]
          // {
          //   polyline: [
          //     { latitude: 24.522647595124194, longitude: 113.98732903481549 },
          //     { latitude: 24.522647595124194, longitude: 114.4214653275176 },
          //     { latitude: 23.999840460114168, longitude: 114.4214653275176 },
          //     { latitude: 23.999840460114168, longitude: 113.98732903481549 },
          //   ],
          //   centen: [114.17956514727454, 24.207264598161338],
          //   marker: {},
          // },
          // [24.522647595124194, 113.98732903481549,24.522647595124194, 114.4214653275176,23.999840460114168, 114.4214653275176,23.999840460114168, 113.98732903481549]
        ]);

        function addPolygon(data: any, item: any, index: number) {
          let polygon = new AMap.Polygon({
            path: data,
            fillColor: "#ccebc5",
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: "#2b8cbe",
            strokeWeight: 1,
            strokeStyle: "dashed",
            strokeDasharray: [5, 5],
          });
          polygon.on("mouseover", () => {
            if (polygon.getOptions().fillColor !== "#001731") {
              polygon.setOptions({
                fillOpacity: 0.7,
                fillColor: "#7bccc4",
              });
            }
          });
          polygon.on("mouseout", () => {
            if (polygon.getOptions().fillColor !== "#001731") {
              polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: "#ccebc5",
              });
            }
          });
          const clickSetMaker = () => {
            let marker = new AMap.Marker({
              position: item.centen,
              anchor: "bottom-center",
              offset: new AMap.Pixel(0, 0),
            });
            item.marker = marker;
            map.add(marker);
            // 设置鼠标划过点标记显示的文字提示
            // marker.setTitle(index);
            // 设置label标签
            marker.setLabel({
              direction: "top",
              offset: new AMap.Pixel(0, 18), //设置文本标注偏移量
              content: index + 1, //设置文本标注内容
            });
          };

          polygon.on("click", () => {
            if (polygon.getOptions().fillColor == "#001731") {
              polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: "#ccebc5",
              });
              map.remove(item.marker);
              return;
            }
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: "#001731",
            });
            clickSetMaker();
          });
          map.add(polygon);
        }
        const colorList = ref(["#DC143C", "#FF0000", "#FF6347"]);
        function addPolygon1(data: any, item: any, index: number) {
          let polygon = new AMap.Polygon({
            path: data,
            fillColor: colorList.value[index],
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: "#2b8cbe",
            strokeWeight: 1,
            strokeStyle: "dashed",
            strokeDasharray: [5, 5],
          });

          const clickSetMaker = () => {
            let marker = new AMap.Marker({
              position: item.centen,
              anchor: "bottom-center",
              offset: new AMap.Pixel(0, 0),
            });
            item.marker = marker;
            map.add(marker);
            // 设置鼠标划过点标记显示的文字提示
            // marker.setTitle(index);
            // 设置label标签
            marker.setLabel({
              direction: "top",
              offset: new AMap.Pixel(0, 18), //设置文本标注偏移量
              content: index + 1, //设置文本标注内容
            });
          };
          polygon.on("mouseover", () => {
            if (polygon.getOptions().fillColor !== "#001731") {
              polygon.setOptions({
                fillOpacity: 0.7,
                fillColor: "#0277a8",
              });
            }
          });
          polygon.on("mouseout", () => {
            if (polygon.getOptions().fillColor !== "#001731") {
              polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: colorList.value[index],
              });
            }
          });
          polygon.on("click", () => {
            if (item.marker.type == null) {
              clickSetMaker();
              polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: "#001731",
              });
            } else {
              map.remove(item.marker);
              item.marker = {};
              polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: colorList.value[index],
              });
            }
          });
          map.add(polygon);
        }
        myCoordinateList.value.forEach((item, index) => {
          //配置多边形路径
          let path: AMap.LngLat[] = [];
          item.polyline.forEach((item: any) => {
            path.push(new AMap.LngLat(item.longitude, item.latitude));
          });
          addPolygon(path, item, index);
        });
        myCoordinateList1.value.forEach((item, index) => {
          //配置多边形路径
          let path: AMap.LngLat[] = [];
          item.polyline.forEach((item: any) => {
            path.push(new AMap.LngLat(item.longitude, item.latitude));
          });
          addPolygon1(path, item, index);
        });
      });
    })
    .catch((e: Error) => {
      console.log(e);
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
      countPathResult();
    }, 1000);
  });
  const markers: Array<AMap.Text> = [];
  function countPathResult() {
    const colorArr = [
      "#e4c974",
      "#814146",
      "#798f4a",
      "#8b90a3",
      "#728593",
      "#383a4b",
    ];
    clusterStore.newPathResultAll?.forEach((item) => {
      const routeName = item.routeName;
      // 绘制点
      // 凸包渲染
      const polygonPath = item.convex.map((item) => {
        const position = new AMap.Marker({
          position: new AMap.LngLat(item.longitude, item.latitude),
          title: routeName,
          content: `<div style="font-size: 8px;color: #bcbcbc;">◉</div>`,
          //@ts-ignore
          anchor: "center",
        });
        map.add(position);
        return [item.longitude, item.latitude];
      });
      const activePolyOption = {
        path: polygonPath,
        strokeOpacity: 1,
        fillOpacity: 1,
        fillColor: "#91e3fc",
        strokeColor: "#fff",
        strokeWeight: 5,
      };
      const unActivePolyOption = {
        path: polygonPath,
        fillColor: colorArr[item.transitDepotId - 1],
        strokeOpacity: 0.5,
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 5,
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
          marker = new AMap.Text({
            position: new AMap.LngLat(
              event.lnglat.getLng(),
              event.lnglat.getLat()
            ),
            text: index.toString(),
            style: { color: colorArr[item.transitDepotId - 1] },
          });
          marker.dis = item.distance;
          markers.push(marker);
          map.add(marker);
          console.log(markers);
        } else {
          polygon.setOptions(unActivePolyOption);
          if (index !== -1) {
            eChartData.value.dis.splice(index, 1);
            eChartData.value.wei.splice(index, 1);
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
      // const points = item.convex.map((item) => {
      //   return {
      //     lnglat: [item.longitude, item.latitude],
      //   };
      // });
      //@ts-ignore
      // const cluster = new AMap.MarkerCluster(map, points, {
      //   gridSize: 400,
      // });
      // map.add(cluster);
      // //路线绘制
      const polyLinePath = item.polyline.map((item) => {
        return new AMap.LngLat(item.longitude, item.latitude);
      });
      const polyline = new AMap.Polyline({
        path: polyLinePath,
        borderWeight: 1,
        strokeColor: colorArr[item.transitDepotId - 1],
        strokeOpacity: 0.6,
        strokeWeight: 1,
        strokeStyle: "dashed",
        strokeDasharray: [10, 5],
        lineJoin: "round",
        lineCap: "round",
      });
      map.add(polyline);
    });
    choiceCalculateType.value = 1;
  }
  const newPolylineList: AMap.Polyline[] = [];
  const CalculateBtnFunction = () => {
    const loading = ElLoading.service({
      lock: true,
      text: "计算中...",
      background: "rgba(0, 0, 0, 0.7)",
    });
    if (area.value == "韶关市") {
      clusterStore
        .calculateAllAction({ apiKey: pathCalculateInfo.value.apiKey })
        .then(() => {
          //折线数据展示
          countPathResult();
          loading.close();
        });
    } else {
      pathCalculateInfo.value.assignNumber = num.value;
      pathCalculateInfo.value.areaName = area.value;
      clusterStore.pathCalculateOneAction(pathCalculateInfo.value).then(() => {
        //折线数据展示
        clusterStore.newPathResult?.forEach((item) => {
          //配置折线路径
          let path: AMap.LngLat[] = [];
          item.convex?.forEach((item) => {
            path.push(new AMap.LngLat(item.longitude, item.latitude));
          });
          //创建 Polyline 实例
          let polyline = new AMap.Polyline({
            path: path,
            strokeWeight: 5,
            //showDir: true,
            strokeColor: "red", //线条颜色
            //折线拐点连接处样式
          });
          newPolylineList.push(polyline);
        });
        // map.remove(oldPolylineList);
        map.add(newPolylineList);
        loading.close();
        window.sessionStorage.setItem(
          "newPath",
          JSON.stringify(clusterStore.newPathResult)
        );
        choiceCalculateType.value = 2;
      });
    }
  };

  //获取路线详情-大区路线聚集区信息
  clusterStore.getRouteDetailsAction();
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
  const addRouteBtn = () => {
    if (choiceCalculateType.value == 0) {
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

      clusterStore.postAddRouteAction(saveRouteData);
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

      clusterStore.postAddRouteAction(saveRouteData);
    }
  };
</script>

<style lang="scss" scoped>
  .route {
    width: 100%;
    display: flex;
    justify-content: center;
    .adjust {
      position: relative;
      left: 50%;
      transform: translate(-60%, 50%);
    }
    .map {
      :deep(.amap-marker-label) {
        background-color: #3490f5;
        border: 0px;
        border-radius: 30%;
        position: relative;
      }
      #container {
        height: 75vh;
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
          font-size: 20px;
          width: 8vw;
          background-color: #001731;
          border: none;
          box-shadow: none;
        }

        :deep(.el-input__inner) {
          letter-spacing: 3px;
          font-weight: bolder;
          text-align: center;
        }

        :global(.el-select-dropdown__item) {
          display: grid !important;
          place-items: center !important;
          font-size: 20px;
          border: 1px solid #73e1ff;
          border-top: none;
          font-weight: bolder;
          letter-spacing: 3px;
        }

        :global(.el-select-dropdown__item:first-child) {
          border-top: 1px solid #73e1ff;
        }

        :global(.el-popper .el-popper__arrow::before) {
          border-top: 1px solid #73e1ff;
          background-color: #73e1ff !important;
        }

        :global(.el-popper) {
          border: none !important;
        }

        .el-select {
          --el-select-input-focus-border-color: transparent;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -30%);
        }

        :deep(.el-icon) {
          // color: rgb(255, 255, 255);
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
          position: absolute;
          left: 30%;
          transform: translate(-50%, 0);
          bottom: 3%;
        }

        .el-input__inner {
          color: #ff0000;
        }

        .btn {
          width: 120px;
          height: 40px;
          position: absolute;
          left: 70%;
          transform: translate(-50%, 0);
          bottom: 3%;
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
