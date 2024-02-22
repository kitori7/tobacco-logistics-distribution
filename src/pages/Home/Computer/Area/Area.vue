<template>
    <div class="area">
        <div class="map">
            <div id="container" v-loading="isMaoFinished" element-loading-text="地图数据加载中..."
                        element-loading-background="rgba(0,23,49,0.8)"></div>
            <div class="btns">
                <el-button class="adjust" @click="routerChange">聚集区微调</el-button>
                <el-button class="save" @click="save">保存结果</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="areaCollapse">
                    <el-collapse v-model="activeNames" v-for="(item, index) in  clusterStore.InformationList">
                        <el-badge :value="item.number" class="item"></el-badge>
                        <el-collapse-item :title="item.name" :name="index">
                            <ul>
                                <li v-for="(item1) in item.data">
                                    {{ item1 }}
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-button class="btn" @click="CalculateBtnFunction">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="region">
                    <el-collapse v-loading="isResultPointsFinished" element-loading-text="加载中..."
                        element-loading-background="rgba(0,23,49,0.8)" v-model="activeNames2" accordion>
                        <el-scrollbar height="75vh">
                            <el-collapse-item v-for="(item, index) in clusterStore.clusterAndShopList"
                                :title=item.accumulation :name=index>
                                <div class="regionCollapseItemContext" v-for="(item1) in item.son">{{ item1.shopName }}
                                </div>
                            </el-collapse-item>
                        </el-scrollbar>
                    </el-collapse>
                </div>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useClusterStore } from "@/store/cluster";
import { ElLoading } from 'element-plus'
import { useRouter } from "vue-router";
import { BorderBox9 } from "@dataview/datav-vue3";
import AMapLoader from "@amap/amap-jsapi-loader";
import { IMapResultPoints } from "@/types/cluster";
window._AMapSecurityConfig = {
    securityJsCode: "64c03ae77b4521e9dbb72475e120e70c",
};
const router = useRouter();
// 跳转
function routerChange() {
    router.replace('/home/AreaAdjust')
}
//聚集区Store
const clusterStore = useClusterStore();

//获取修改数据信息列表
clusterStore.getInformationListAction()

//获取聚集区错误点（只有数量、检查）
clusterStore.getCheckErrorPointsAction()

// 保存结果
function save() {
    if (clusterStore.ErrorPoints == undefined) {
        ElMessage.warning('数据处理中请稍后再试。');
    } else {
        const loading1 = ElLoading.service({
            lock: true,
            text: '保存中...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        if (clusterStore.ErrorPoints === 0) {
            clusterStore.deleteClearInformationListAction()
                .then(() => {
                    clusterStore.getInformationListAction()
                })
            loading1.close()
            ElMessage.success('保存成功')
        } else {
            ElMessageBox({
                title: '注意!',
                message: '还有未保存的聚集区错误点，是否忽略并继续保存?',
                showCancelButton: true,
            }).then((action) => {
                if (action == 'confirm') {
                    clusterStore.deleteClearInformationListAction()
                        .then(() => {
                            clusterStore.getInformationListAction()
                        })
                    loading1.close()
                    ElMessage.success('保存成功')
                }
            })
        };
    }
}
//第一个折叠面板的参数
const activeNames = ref(['0'])
//第二个折叠面板的参数
const activeNames2 = ref(['0'])
//定义是否加载完成的变量
const isResultPointsFinished = ref<boolean>(true)
//获取聚集区和商铺信息的方法
clusterStore.getAllResultPointsAction()
    .then(() => { isResultPointsFinished.value = false });

//计算接口
const CalculateBtnFunction = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '计算中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    clusterStore.postCalculateAllAction()
        .then(() => {
            loading.close()
        })
}
//地图部分
//定义是否加载的变量
const isMaoFinished = ref<boolean>(true)
let map: any = null;
onMounted(() => {
    AMapLoader.load({
        key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                zoom: 10, //地图级别
                center: [113.59738,24.810918], //地图中心点
                mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
                viewMode: "2D", //设置地图模式
            });
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
                isMaoFinished.value =false
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
})

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
.area {
    width: 100%;
    display: flex;
    justify-content: center;

    #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        margin: 0.5vh 0;
    }

    :global(.el-message-box__message) {
        font-size: 20px;
        padding: 0 10px;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .dv-border-box-9 {
            height: 80vh;
            width: 20vw;
            box-shadow: 10px 10px 5px 5px rgb(0, 0, 0, 0.4);

            .areaCollapse {
                margin-left: 1vw;
                margin-top: 3vh;
                width: 85%;

                .el-collapse {
                    .el-collapse-item {
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
                    }
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
                    margin-right: 10px;
                }
            }

            .region {
                margin-left: 1.4vw;
                margin-top: 3vh;
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

                    .regionCollapseItemContext {
                        margin: 10px 0;
                    }

                    .regionCollapseItemContext:before {
                        content: "";
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: rgb(0, 179, 255);
                        border-radius: 50%;
                        margin-bottom: 4px;
                        margin-right: 10px;
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

            .btn {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: 8%;
            }
        }
    }
}
</style>