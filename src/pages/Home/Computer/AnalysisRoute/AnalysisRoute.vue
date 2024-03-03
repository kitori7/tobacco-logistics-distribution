<template>
    <div class="AnalysisRoute">
        <div class="back">
            <el-icon size="25" class="backBtn" @click="backBtn">
                <ArrowLeftBold />
            </el-icon>&nbsp;路径分析&nbsp;
        </div>
        <div class="AnalysisRouteTop">
            <div class="selete">
                请选择您要分析的路径：
                <el-select  v-model="selectValue" placeholder="请选择大区-车牌号" size="large" style="width: 230px; margin-top: 30px;">
                    <el-option-group  v-for="item in clusterStore.historicalPath" :key="item.areaId"
                        :label="item.areaName">
                        <el-option v-for="(item1) in item.licensePlateNumberList" :key="item1" :label="item1"
                            :value="item1" @click="selectValueFun(item.areaName + '-' + item1, item.areaId)">
                        </el-option>
                    </el-option-group>
                </el-select>
                <el-date-picker style="width: 230px; margin-top: 30px;" v-model="pickerDate" type="date"
                    placeholder="选择日期时间" value-format="YYYY.M.D">
                </el-date-picker>
                <el-button class="btn" @click="analysisBtn">进行分析</el-button>
                <el-button class="btn">导出分析图</el-button>
            </div>
            <div class="oldRoute">
                旧路线：
                <div class="oldRouteBorder">
                    <div id="container"></div>
                </div>
            </div>
            <div class="newRoute">
                新路线：
                <div class="newRouteBorder">
                    <div id="container2"></div>
                </div>
            </div>
        </div>
        <div class="AnalysisRouteBottom">
            <div class="BottomLeft">
                <BorderBox11 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731' title="运行里程/公里">
                    <div id="main"></div>
                </BorderBox11>
            </div>
            <div class="BottomMiddle">
                <BorderBox11 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731' title="工作时长/小时">
                    <div id="main2"></div>
                </BorderBox11>
            </div>
            <div class="BottomRight">
                <BorderBox11 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731' title="载货量/盒">
                    <div id="main3"></div>
                </BorderBox11>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { BorderBox11 } from "@dataview/datav-vue3";
import AMapLoader from "@amap/amap-jsapi-loader";
import echarts from "@/store/echart";
import { useClusterStore } from "@/store/cluster";
window._AMapSecurityConfig = {
    securityJsCode: "64c03ae77b4521e9dbb72475e120e70c",
};
const router = useRouter();
function backBtn() {
    router.back()
}

let map = null;
let map2 = null;
AMapLoader.load({
    key: "64c03ae77b4521e9dbb72475e120e70c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})
    .then((AMap) => {
        map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [114, 25], // 初始化地图中心点位置
        });
        map2 = new AMap.Map("container2", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [114, 26], // 初始化地图中心点位置
        });
        console.log(map);
        console.log(map2);

    })
    .catch((e) => {
        console.log(e);
    });

onMounted(() => {
    var myChart = echarts.init(document.getElementById('main'));
    var myChart2 = echarts.init(document.getElementById('main2'));
    var myChart3 = echarts.init(document.getElementById('main3'));
    const option = {
        textStyle: {
            color: '#ffffff'
        },
        xAxis: {
            type: 'category',
            data: ['旧线路', '新线路']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [
                    {
                        value: 100.4,
                        itemStyle: {
                            color: '#fcfe6d'
                        }
                    },
                    {
                        value: 180.1,
                        itemStyle: {
                            color: '#3baefe'
                        }
                    },
                ],
                type: 'bar',
                barWidth: '20%',
                label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',//字体颜色
                        fontSize: 15//字体大小
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    myChart2.setOption(option);
    myChart3.setOption(option);
})


//聚集区Store
const clusterStore = useClusterStore();

clusterStore.getAreaRouteDataAction().then(() => {
    console.log(clusterStore.historicalPath);
})
//大区-车牌号
const selectValue = ref('')
const saveAreaId = ref('')
const selectValueFun = (data: string, areaId: string) => {
    selectValue.value = data
    saveAreaId.value = areaId 
}
//日期
const pickerDate = ref('')
//分析
const analysisBtn = () => {
    var week = new Array("日", "一", "二", "三", "四", "五", "六");
    var weekNumber = new Date(pickerDate.value).getDay();
    let routeName = selectValue.value + '-星期' + week[weekNumber]+'-'+pickerDate.value
    clusterStore.getRouteDataAction({areaId:saveAreaId.value,routeName:routeName,})
}
</script>

<style lang="scss" scoped>
.AnalysisRoute {
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

    .AnalysisRouteTop {
        display: flex;
        margin: 13px 0;

        .selete {
            flex: 2;
            border: 1px solid #ff0000;
            height: 45vh;
            color: #73e1ff;
            font-size: 21px;

            .btn {
                margin-top: 20%;
            }
        }

        .oldRoute {
            flex: 5;
            border: 1px solid #ff0000;
            height: 45vh;
            color: #73e1ff;
            font-size: 25px;
            margin: 0 30px;

            .oldRouteBorder {
                margin: 11px 0;
                border: 1px solid #73e1ff;
                height: 85%;

                #container {
                    padding: 0px;
                    margin: 0px;
                    width: 99%;
                    height: 98%;
                    margin: 0.5vh;
                }

            }
        }

        .newRoute {
            flex: 5;
            border: 1px solid #ff0000;
            height: 45vh;
            color: #73e1ff;
            font-size: 25px;

            .newRouteBorder {
                margin: 11px 0;
                border: 1px solid #73e1ff;
                height: 85%;

                #container2 {
                    padding: 0px;
                    margin: 0px;
                    width: 99%;
                    height: 98%;
                    margin: 0.5vh;
                }
            }
        }
    }

    .AnalysisRouteBottom {
        display: flex;

        .BottomLeft {
            flex: 1;
            border: 1px solid #ff0000;
            height: 35vh;

            #main {
                padding-top: 10px;
                width: 100%;
                height: 100%;
            }
        }

        .BottomMiddle {
            flex: 1;
            border: 1px solid #ff0000;
            height: 35vh;
            margin: 0 30px;

            #main2 {
                padding-top: 10px;
                width: 100%;
                height: 100%;
            }
        }

        .BottomRight {
            flex: 1;
            border: 1px solid #ff0000;
            height: 35vh;

            #main3 {
                padding-top: 10px;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>