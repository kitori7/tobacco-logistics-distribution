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
import { IAccumlationInfo, IAccumulationIdInfo, IErrorPoints_data, IMapResultPoints, IShopData } from "@/types/cluster";
const router = useRouter();
function backBtn() {
    router.back()
}
//聚集区Store
const clusterStore = useClusterStore();
//定义是否加载完成的变量
const isFinished = ref<boolean>(true)
//定义变量是否展示
const isShow = ref<boolean>(false)
//获取错误点
// clusterStore.getCheckErrorPointsAction()
//     .then(() => {
//         
//     })
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

//
import AMapLoader from "@amap/amap-jsapi-loader";

let map: any = null;
//定义是否加载的变量
const isMaoFinished = ref<boolean>(true)

AMapLoader.load({
    key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.DistrictSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})
    .then((AMap) => {
        const district = new AMap.DistrictSearch({ subdistrict: 0, extensions: 'all', level: 'province' });
        district.search('韶关市', function (status: any, result: any) {
            // 查询成功时，result即为对应的行政区信息
            // console.log(result.districtList[0].boundaries,222) // 这里是整个郑州市的边界经纬度
            console.log(status);

            const bounds = result.districtList[0].boundaries
            const mask = []
            for (let i = 0; i < bounds.length; i++) {
                mask.push([bounds[i]])
            }
            map = new AMap.Map("container", {  // 设置地图容器id
                mask: mask, // 为Map实例制定掩模的路径,各图层将值显示路径范围内图像,3D模式下有效
                zoom: 9, // 设置当前显示级别
                expandZoomRange: true, // 开启显示范围设置
                zooms: [9, 18], //最小显示级别为7，最大显示级别为20
                center: [113.767587, 24.718014], // 设置地图中心点位置
                viewMode: "3D",    // 特别注意,设置为3D则其他地区不显示
                zoomEnable: true, // 是否可以缩放地图
                resizeEnable: true,
            });
            // 添加描边
            for (let i = 0; i < bounds.length; i++) {
                const polyline = new AMap.Polyline({
                    path: bounds[i], // polyline 路径，支持 lineString 和 MultiLineString
                    strokeColor: '#3078AC', // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
                    strokeWeight: 2, // 轮廓线宽度,默认为:2
                    // map:map // 这种方式相当于: polyline.setMap(map);
                })
                polyline.setMap(map);
            }
            const limitBound = map.getBounds();
            map.setLimitBounds(limitBound);

        })
        clusterStore.getMapResultPointsAction().then(() => {
            // 地图标点
            const data = ref<IMapResultPoints[]>();
            data.value = clusterStore.MapResultPoints;
            const style = {
                url: "/src/assets/images/amap/mapBluePoint.png", //图标地址
                size: new AMap.Size(15, 15), //图标大小
                anchor: new AMap.Pixel(-10, -20), //图标显示位置偏移量，基准点为图标左上角
            }//设置样式对象
            //海量点
            var massMarks = new AMap.MassMarks(data.value, {
                zIndex: 5, //海量点图层叠加的顺序
                zooms: [10, 22], //在指定地图缩放级别范围内展示海量点图层
                style: style,
            });
            massMarks.setMap(map);
            isMaoFinished.value = false
            clusterStore.MapResultPoints!.forEach((item) => {
                if (item.state == "center") {
                    // 将 Icon 实例添加到 marker 上:
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(item.lnglat[0], item.lnglat[1]), //点标记的位置
                        offset: new AMap.Pixel(-7, -17), //偏移量
                        icon: new AMap.Icon({
                            size: new AMap.Size(25, 25), //图标尺寸
                            image: "/src/assets/images/amap/mapOrangePoint.png", //Icon 的图像
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
                            image: "/src/assets/images/amap/mapRedPoint.png", //Icon 的图像
                            // imageOffset: new AMap.Pixel(-9, -3), //图像相对展示区域的偏移量，适于雪碧图等
                            imageSize: new AMap.Size(20, 20), //根据所设置的大小拉伸或压缩图片
                        }), //添加 Icon 实例
                        title: "错误点",
                        zooms: [6, 16], //点标记显示的层级范围，超过范围不显示
                    });
                    map!.add(marker);
                }
            })
            clusterStore.MapResultSurface?.forEach((item) => {
                var circle = new AMap.Circle({
                    center: new AMap.LngLat(item.center[0], item.center[1]), //圆心
                    radius: item.radius, //半径
                    borderWeight: 1, //描边的宽度
                    strokeColor: "#FF33FF", //轮廓线颜色
                    strokeOpacity: 1, //轮廓线透明度
                    strokeWeight: 1, //轮廓线宽度
                    fillOpacity: 0.4, //圆形填充透明度
                    strokeStyle: "dashed", //轮廓线样式
                    strokeDasharray: [10, 10],
                    fillColor: "#1791fc", //圆形填充颜色
                    zIndex: 50, //圆形的叠加顺序
                });
                //圆形 Circle 对象添加到 Map
                map.add(circle);
                //根据覆盖物范围调整视野
                map.setFitView([circle])
            })

        })
    })
    .catch((e) => {
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
        top: 13vh;
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

            ::v-deep(.el-collapse-item__header::before) {
                content: "";
                display: inline-block;
                width: 15px;
                height: 15px;
                background-color: rgb(255, 51, 204);
                border-radius: 50%;
                margin-right: 10px;
            }

            ::v-deep(.el-collapse-item__header::after) {
                margin-left: 10px;
                margin-right: -15px;
                width: 33px;
                height: 33px;
                background: rgb(255, 51, 204);
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
                background-color: fuchsia;
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
            background-color: rgb(255, 51, 204);
            border-radius: 50%;
            margin-right: 10px;
        }

        :global(.el-collapse-item__header::after) {
            margin-left: 10px;
            margin-right: -15px;
            width: 33px;
            height: 33px;
            background: rgb(255, 51, 204);
            transform: rotate(45deg);
            content: "";
            display: inline-block;
        }

        :global(.itemContent:before) {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: fuchsia;
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