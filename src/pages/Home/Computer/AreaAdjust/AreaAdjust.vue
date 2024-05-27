<template>
    <div class="AreaAdjust">
        <div class="back"><el-icon size="25" class="backBtn" @click="backBtn">
                <ArrowLeftBold />
            </el-icon>&nbsp;聚集区微调&nbsp;<el-icon size="25">
                <LocationInformation />
            </el-icon></div>
        <div id="container" v-loading="isMaoFinished" element-loading-text="地图数据加载中..."
            element-loading-background="rgba(0,23,49,0.8)"></div>

        <BorderBox12 backgroundColor='#001731' v-loading="isFinished" element-loading-text="加载中..."
            element-loading-background="rgba(0,23,49,0.8)">
            <el-empty class="empty" v-if="isShow" description="暂无数据" />
            <el-scrollbar height="75vh">
                <div class="adjustCollapse">
                    <div class="title">错误点详细：</div>
                    <el-collapse v-model="activeNames" v-for="(item, index) in  clusterStore.errorResult" :key="index">
                        <el-badge :value="item.number" class="item"></el-badge>
                        <el-collapse-item :title="item.accumulationName" :name="index">
                            <div class="itemContent" @click="openAdjustDialog(item.accumulationName, item1)"
                                v-for="(item1, index1) in  item.data" :key="index1">
                                {{ item1.name }}
                                <ul>
                                    <li v-for="(item2, index2) in  item1.son" :key="index2">
                                        {{ item2.name }}
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-scrollbar>
        </BorderBox12>
        <el-dialog style="transform: translate(36.5vw, 0);" v-model="isOpenAdjustDialog" width="25%" :modal="false"
            :before-close="closeAdjustDialog" :append-to-body="true">
            <div class="adjustDialogContent">
                <el-collapse v-model="activeNames1">
                    <el-collapse-item :title="infoData_fatherName" name="1" style="margin-right: 25px;">
                        <div class="itemContent" style="padding: 5px 10px;">
                            {{ infoData?.name }}
                            <ul>
                                <li style=" list-style: disc;margin-left: 30px;padding: 5px;"
                                    v-for="(item3, index3) in  infoData?.son" :key="index3">
                                    {{ item3.name }}
                                </li>
                            </ul>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div class="adjustDialogChange">
                    <div style="font-size: 2.2vh; font-weight: bold; margin-bottom: 1vh;">商铺所属聚集区调整：</div>
                    <div style="margin-bottom: 2vh;">请选择错误点内商铺并调整到正确聚集区以内</div>
                    <el-select v-model="leftSelect" value-key="name" style="width: 9vw;margin-left: 0.5vw;"
                        @change="leftSelectFunction(leftSelect)">
                        <el-option v-for="item in leftSelectList" :key="item.name" :label="item.name" :value="item" />
                    </el-select>
                    <el-icon style=" margin:0 1vw;">
                        <Right />
                    </el-icon>
                    <el-select v-model="rightSelect" value-key="accumulationName" style="width:9vw;">
                        <el-option v-for="item in clusterStore.AccumlationInfo" :key="item.accumulationName"
                            :label="item.accumulationName" :value="item" />
                    </el-select>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAdjustDialog">取消</el-button>
                    <el-button @click="adjustConfirmChange">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { BorderBox12 } from "@dataview/datav-vue3";
import { ArrowLeftBold, LocationInformation, Right } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useClusterStore } from "@/store/cluster";
import { IAccumlationInfo, IAccumulationIdInfo, IErrorPoints_data, IShopData } from "@/types/cluster";
import { mapIcon } from "@/utils/mapBluePoint";
window._AMapSecurityConfig = {
  securityJsCode: "1b6291b2fceee1cd3b7798bfdd4c39e4",
};
const router = useRouter();
function backBtn() {
    router.replace('/home/computer/area')
}
//聚集区Store
const clusterStore = useClusterStore();
//定义是否加载完成的变量
const isFinished = ref<boolean>(true)
//定义变量是否展示
const isShow = ref<boolean>(false)
clusterStore.getErrorPointsAction()
    .then(() => {
        isFinished.value = false;
        if (clusterStore.ErrorPoints == 0) {
            isShow.value = true;
        }
    });
//定义折叠面板的变量
const activeNames = ref(['1'])
const activeNames1 = ref(['1'])
//选择器定义变量
const leftSelect = ref<IShopData>({
    longitude: 0,
    latitude: 0,
    name: '',
})
const rightSelect = ref<IAccumlationInfo>({
    accumulationName: '',
})
const leftSelectList = ref<IShopData[]>([])
const rightSelectList = ref<string[]>([])
//弹窗里面的数据定义
const infoData = ref<IErrorPoints_data>()
const infoData_fatherName = ref<string>()
//定义是否打开弹窗的变量
const isOpenAdjustDialog = ref(false)
//打开弹窗
const openAdjustDialog = (fatherName: string, info: IErrorPoints_data) => {
    isOpenAdjustDialog.value = true
    infoData.value = info
    infoData_fatherName.value = fatherName
    //选择器部分处理
    //左边
    leftSelectList.value.push({
        name: infoData.value.name,
        longitude: infoData.value.longitude,
        latitude: infoData.value.latitude,
    })
    infoData.value.son!.forEach((item) => {
        leftSelectList.value.push({
            name: item.name,
            longitude: item.longitude,
            latitude: item.latitude,
        })
    })
}
//定义变量需要修改的商铺的经纬度
const optionItemData = ref<IShopData>({
    longitude: 0,
    latitude: 0,
})
//左边选择器的change事件
const leftSelectFunction = (optionItem: IShopData) => {
    optionItemData.value =
    {
        latitude: optionItem.latitude,
        longitude: optionItem.longitude,
    }
    clusterStore.getClosestPointsAction(optionItemData.value)
}
//关闭窗口
const closeAdjustDialog = () => {
    isOpenAdjustDialog.value = false
    //选择器数据清空
    leftSelect.value = {
        longitude: 0,
        latitude: 0,
        name: '',
    }
    rightSelect.value = {
        accumulationName: '',
    }
    leftSelectList.value = []
    rightSelectList.value = []

}
//确定聚集区微调
const adjustConfirmChange = () => {
    const AccumulationIdInfo = ref<IAccumulationIdInfo>({
        longitude: 0,
        latitude: 0,
        accumulationId: '',
    })
    AccumulationIdInfo.value = {
        accumulationId: rightSelect.value.accumulationId!,
        latitude: optionItemData.value.latitude,
        longitude: optionItemData.value.longitude,
    }
    console.log(AccumulationIdInfo.value);
    clusterStore.postUpdateStoreAccumulationIdAction(AccumulationIdInfo.value)
        .then(() => {
            setTimeout(() => {
                if (clusterStore.UpdateStoreAccumulationIdCode == 200) {
                    location.reload()
                }
            }, 1500);
        })
}

//@ts-ignore
import AMapLoader from "@amap/amap-jsapi-loader";

const isMaoFinished = ref<boolean>(true)
let map: any = null;

    AMapLoader.load({
        key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.DistrictSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap:any) => {
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
        // 绑定点击事件
          clusterStore.getMapResultPointsAction().then(() => {
              // 地图标点
              isMaoFinished.value =false
              clusterStore.MapResultPoints!.forEach((item) => {
                  if (item.state == "center") {
                      // 将 Icon 实例添加到 marker 上:
                      const marker = new AMap.Marker({
                          position: new AMap.LngLat(item.lnglat[0], item.lnglat[1]), //点标记的位置
                          offset: new AMap.Pixel(-7, -17), //偏移量
                          icon: new AMap.Icon({
                              size: new AMap.Size(25, 25), //图标尺寸
                              image: mapIcon.orange, //Icon 的图像
                              // imageOffset: new AMap.Pixel(-9, -3), //图像相对展示区域的偏移量，适于雪碧图等
                              imageSize: new AMap.Size(25, 25), //根据所设置的大小拉伸或压缩图片
                          }), //添加 Icon 实例
                          title: "中心点",
                          zooms: [9, 16], //点标记显示的层级范围，超过范围不显示
                      });
                      map!.add(marker);
                  }
                  else if (item.state == "error") {
                      // 将 Icon 实例添加到 marker 上:
                      const marker = new AMap.Marker({
                          position: new AMap.LngLat(item.lnglat[0], item.lnglat[1]), //点标记的位置
                          offset: new AMap.Pixel(-7, -17), //偏移量
                          icon: new AMap.Icon({
                              size: new AMap.Size(20, 20), //图标尺寸
                              image: mapIcon.red, //Icon 的图像
                              // imageOffset: new AMap.Pixel(-9, -3), //图像相对展示区域的偏移量，适于雪碧图等
                              imageSize: new AMap.Size(20, 20), //根据所设置的大小拉伸或压缩图片
                          }), //添加 Icon 实例
                          title: "错误点",
                          zooms: [6, 16], //点标记显示的层级范围，超过范围不显示
                      });
                      map!.add(marker);
                  }
              })
     
            })
            const oldPolylineList: AMap.Polyline[] = []
    clusterStore.getSplitLinesAction().then(() => {
          //折线数据展示
          clusterStore.SplitLines!.forEach((item) => {
              //配置折线路径
              let path: AMap.LngLat[] = [];
              item.forEach((item) => {
                  path.push(new AMap.LngLat(item.longitude, item.latitude))
              })
              //创建 Polyline 实例
              let polyline = new AMap.Polyline({
                  path: path,
                  strokeWeight: 5,
                  showDir: true,
                  strokeColor: "#001731", //线条颜色
                  lineJoin: "round", //折线拐点连接处样式
              });
              oldPolylineList.push(polyline)
          })
          map.add(oldPolylineList)
      })
    })
      }).catch((e:Error) => {
          console.log(e);
      });

onBeforeUnmount(() => {
    //销毁地图，并清空地图容器
    map!.destroy();
    //地图对象赋值为null
    map = null
    //清除地图容器的 DOM 元素
    document.getElementById("container")!.remove(); //"container" 为指定 DOM 元素的id
})


</script>
<style lang="scss" scoped>
.AreaAdjust {
    width: 100%;
    margin-left: -2vw;
    .back {
        font-size: 20px;
        display: flex;
        align-items: center;
        font-weight: bolder;
        color: #73e1ff;
        user-select: none;
        letter-spacing: 2px;

        .backBtn {
            cursor: pointer;
        }
    }

    #container {
        padding: 0px;
        margin: 0px;
        width: 70vw;
        height: 79vh;
        margin: 0.5vh 0;
    }

    .dv-border-box-12 {
        position: absolute;
        top: 14vh;
        right: 1vw;
        width: 25vw;
        height: 80vh;


        .empty {
            width: 100%;
            height: 100%;
            float: left;
        }

        .adjustCollapse {
            height: 20vh;
            padding-left: 1vw;
            padding-top: 3vh;
            width: 85%;
         .title{
            font-size: 2.2vh;
            font-weight: bold;
            margin-bottom: 1vh;
         }
            ::v-deep(.el-collapse-item__header::before) {
                content: "";
                display: inline-block;
                width: 15px;
                height: 15px;
                background-color: #e0c340;
                border-radius: 50%;
                margin-right: 10px;
            }

            ::v-deep(.el-collapse-item__header::after) {
                margin-left: 10px;
                margin-right: -15px;
                width: 33px;
                height: 33px;
                background-color: #e0c340;
                transform: rotate(45deg);
                content: "";
                display: inline-block;
            }


            .item {
                position: absolute;
                z-index: 10;
                margin-top: 20px;
                margin-left: 20.6vw;
            }

            li {
                list-style: disc;
                margin-left: 30px;
                padding: 5px;
            }

            .itemContent {
                padding: 5px 10px;
            }

            .itemContent:before {
                content: "";
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: #e0c340;
                border-radius: 50%;
                margin-bottom: 4px;
                margin-right: 0.5vw;
            }
        }
    }

    .adjustDialogContent {
        margin-top: 20px;
        :global(.el-collapse-item__header::before) {
            content: "";
            display: inline-block;
            width: 15px;
            height: 15px;
            background-color: #e0c340;
            border-radius: 50%;
            margin-right: 10px;
        }

        :global(.el-collapse-item__header::after) {
            margin-left: 10px;
            margin-right: -15px;
            width: 33px;
            height: 33px;
            background-color: #e0c340;
            transform: rotate(45deg);
            content: "";
            display: inline-block;
        }

        :global(.itemContent:before) {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #e0c340;
            border-radius: 50%;
            margin-bottom: 4px;
            margin-right: 0.5vw;
        }

        :global(.adjustDialogChange) {
            margin-top: 25px;
        }
    }
}
</style>