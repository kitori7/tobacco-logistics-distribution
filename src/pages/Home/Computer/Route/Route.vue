<template>
    <div class="route">
        <div class="map">
            <div id="container"></div>
            <div class="btns">
                <el-button class="analysisRoute" @click="analysisRouteBtn">路径分析</el-button>
                <el-button class="saveRoute" @click="addRouteBtn">保存路径</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="leftInformation">
                    <el-select v-model="area">
                        <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <div class="routeCollapse">
                        <el-collapse v-model="activeNames">
                            <el-badge :value="1" class="item"></el-badge>
                            <el-collapse-item title="聚集区信息改变" name="1">
                                <ul>
                                    <li>
                                        D区内聚集区发生改变
                                    </li>
                                </ul>
                            </el-collapse-item>
                            <el-badge :value="1" class="item"></el-badge>
                            <el-collapse-item title="系统参数" name="2">
                                <ul>
                                    <li>
                                        单车载货量更改为700跳
                                    </li>
                                    <li>
                                        D区可工作车辆数更改为25辆
                                    </li>
                                </ul>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <el-input-number class="num" v-model="num" :min="1" :max="1000" style="color: black;" />
                    <el-button class="btn" @click="CalculateBtnFunction()">重新计算</el-button>
                </div>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="rightInformation">
                    <el-select v-model="route"></el-select>
                    <div class="detailedRoute">
                        <el-scrollbar height="75vh">
                            <el-collapse v-model="activeNames2">
                                <el-collapse-item :title="item.areaName" :name="item.areaId"
                                    v-for="(item ) in clusterStore.routeDetails">
                                    <ul>
                                        <li class="routeNameLi" v-for="(item1) in item.routeList"
                                            @click="item1.isOpen = !item1.isOpen">
                                            <div class="routeName">
                                                {{ item1.routeName }}
                                            </div>
                                            <ul>
                                                <li class="accumulationNameLi" tabindex="1"
                                                    v-for="(item2) in item1.accumulationList" v-show="item1.isOpen"
                                                    @click.stop="accumulationNameClick(item2)">
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
                    <el-dialog style="transform: translate(16vw, 43vh); height: 30vh;" v-model="isOpenRouteDialog"
                        width="20%" :modal="false" :before-close="closeRouteDialog" :append-to-body="true"
                        :title="titleAccumulationName">
                        <!-- :draggable=true 拖动 -->
                        <el-scrollbar height="20vh">
                            <ul style="margin-left: 20px;">
                                <li style="padding: 5px; list-style: square ;"
                                    v-for="(item3) in clusterStore.storeResult ">
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
import router from "@/router";
import { BorderBox9 } from "@dataview/datav-vue3";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useClusterStore } from "@/store/cluster";
import { IAccumulationList } from "@/types/cluster";
window._AMapSecurityConfig = {
    securityJsCode: "1b6291b2fceee1cd3b7798bfdd4c39e4",
};
//路径分析入口
const analysisRouteBtn = () => {
    if (choiceCalculateType.value !== 0) {
        router.push('/home/AnalysisRoute')
    } else {
        ElMessage.warning("请先进行重新计算");
    }
}
//聚集区Store
const clusterStore = useClusterStore();
let map: any = null;
AMapLoader.load({
    key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.DistrictSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})
    .then((AMap) => {
        const district = new AMap.DistrictSearch({ subdistrict: 1, extensions: 'all', level: 'province' });
        district.search('韶关市', function (status: any, result: any) {
            // 查询成功时，result即为对应的行政区信息
            console.log(status);
            console.log(result);

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
            //限制移动范围
            const limitBound = map.getBounds();
            map.setLimitBounds(limitBound);
            //绑定点击事件
            map.on('click', function (e: any) {
                console.log(e);
                console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
            });
        })
    })
    .catch((e) => {
        console.log(e);
    });
const activeNames = ref(['0'])
const activeNames2 = ref(['0'])


const area = ref('韶关市')
const areas = [
    {
        value: '韶关市',
        label: '韶关市',
    },
    {
        value: '仁化',
        label: '仁化县中转站',
    },
    {
        value: '新丰',
        label: '新丰县中转站',
    },
    {
        value: '坪石',
        label: '坪石县中转站',
    },
    {
        value: '翁源',
        label: '翁源县中转站',
    },
    {
        value: '马市',
        label: '马市烟叶工作站',
    },
    {
        value: '物流配送中心',
        label: '物流配送中心',
    }
]
const route = ref('路线详情')


//获取地图数据
const oldPolylineList: AMap.Polyline[] = []
clusterStore.getMapDataAction()
    .then(() => {
        //折线数据展示
        clusterStore.oldPathResult!.forEach((item) => {
            //配置折线路径
            let path: AMap.LngLat[] = [];
            item.polyline?.forEach((item) => {
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
        // map.add(oldPolylineList)
    })



//楚鸿的key： 309bde1e73b984c7d8a87ab19255963c
//我的key：   cdeaa7cd146a1a9612827190fb0e0962
const pathCalculateInfo = ref({
    apiKey: "cdeaa7cd146a1a9612827190fb0e0962",
    areaName: "",
    assignNumber: "10",

})
const choiceCalculateType = ref(0)
const num = ref(10)
//路径重新计算
const newPolylineList: AMap.Polyline[] = []
const CalculateBtnFunction = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '计算中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    if (area.value == "韶关市") {
        clusterStore.calculateAllAction({ apiKey: pathCalculateInfo.value.apiKey })
            .then(() => {
                //折线数据展示
                clusterStore.newPathResultAll?.forEach((item) => {
                    //配置折线路径
                    let path: AMap.LngLat[] = [];
                    item.polyline?.forEach((item) => {
                        path.push(new AMap.LngLat(item.longitude, item.latitude))
                    })
                    //创建 Polyline 实例
                    let polyline = new AMap.Polyline({
                        path: path,
                        strokeWeight: 5,
                        showDir: true,
                        strokeColor: "red", //线条颜色
                        lineJoin: "round", //折线拐点连接处样式
                    });
                    newPolylineList.push(polyline)
                })
                map.remove(oldPolylineList);
                map.add(newPolylineList)
                loading.close()
                window.sessionStorage.setItem('newPath', JSON.stringify(clusterStore.newPathResultAll));
                choiceCalculateType.value = 1
            })
    } else {
        pathCalculateInfo.value.assignNumber = String(num.value)
        pathCalculateInfo.value.areaName = area.value
        clusterStore.pathCalculateOneAction(pathCalculateInfo.value)
            .then(() => {
                //折线数据展示
                clusterStore.newPathResult?.forEach((item) => {
                    //配置折线路径
                    let path: AMap.LngLat[] = [];
                    item.polyline?.forEach((item) => {
                        path.push(new AMap.LngLat(item.longitude, item.latitude))
                    })
                    //创建 Polyline 实例
                    let polyline = new AMap.Polyline({
                        path: path,
                        strokeWeight: 5,
                        showDir: true,
                        strokeColor: "red", //线条颜色
                        lineJoin: "round", //折线拐点连接处样式
                    });
                    newPolylineList.push(polyline)
                })
                map.remove(oldPolylineList);
                map.add(newPolylineList)
                loading.close()
                window.sessionStorage.setItem('newPath', JSON.stringify(clusterStore.newPathResult));
                choiceCalculateType.value = 2
            })
    }
}

//1123

//获取路线详情-大区路线聚集区信息
clusterStore.getRouteDetailsAction()
//定义弹框标题accumulationName的变量
const titleAccumulationName = ref<string>('')
//获取路线详情-聚集区下商户信息
const accumulationNameClick = (accumulation: IAccumulationList) => {
    titleAccumulationName.value = accumulation.accumulationName
    clusterStore.getStoreDetailsAction(accumulation.accumulationId)
    isOpenRouteDialog.value = true
}
//定义是否打开弹窗的变量
const isOpenRouteDialog = ref(false)
//关闭窗口
const closeRouteDialog = () => {
    isOpenRouteDialog.value = false
}
const addRouteBtn = () => {
    console.log("保存路径");
    if (choiceCalculateType.value == 0) {
        ElMessage.warning("请先进行重新计算");
    }
    if (choiceCalculateType.value == 1) {
        clusterStore.newPathResultAll?.forEach((item) => {
            delete item.createTime
            delete item.updateTime
            delete item.versionId
            delete item.delete
            delete item.routeId
            delete item.workTime
        })
        console.log(clusterStore.newPathResultAll);
        clusterStore.postAddRouteAction(clusterStore.newPathResultAll!)
    }
    if (choiceCalculateType.value == 2) {
        clusterStore.newPathResult?.forEach((item) => {
            delete item.createTime
            delete item.updateTime
            delete item.versionId
            delete item.delete
            delete item.routeId
            delete item.workTime

        })
        console.log(clusterStore.newPathResult);
        clusterStore.postAddRouteAction(clusterStore.newPathResult!)
    }
}



</script>

<style lang="scss" scoped>
.route {
    width: 100%;
    display: flex;
    justify-content: center;

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
                        background-color: fuchsia;
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
            }
        }
    }
}
</style>