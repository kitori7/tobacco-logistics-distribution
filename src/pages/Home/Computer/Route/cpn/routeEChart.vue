<template>
  <div class="routeEChart" v-show="isOpenEChart">
    <div class="AnalysisRouteBottom">
      <el-carousel :autoplay="false" height="220px">
        <el-select
          v-model="type"
          placeholder="请选择"
          class="changeType"
          @change="changeType"
        >
          <el-option label="路径比较" value="路径比较" />
          <el-option label="班组比较" value="班组比较" />
        </el-select>
        <el-carousel-item>
          <div class="content">
            <div class="title">运行里程/km</div>
            <div class="canvas" ref="distanceRef"></div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="content">
            <div class="title">载货量/条</div>
            <div class="canvas" ref="weightRef"></div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="content">
            <div class="title">工作时长/h</div>
            <div class="canvas" ref="timeRef"></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // import { ElCarousel, ElCarouselItem } from "element-plus";
  import * as echart from "echarts";
  type EChartsOption = echarts.EChartsOption;
  import { useClusterStore } from "@/store/cluster";
  const clusterStore = useClusterStore();
  type IProps = {
    data: {
      [key: string]: Array<number>;
      dis: Array<number>;
      wei: Array<number>;
      time: Array<number>;
    };
  };
  const props = defineProps<IProps>();

  // 显示隐藏
  const isOpenEChart = defineModel<boolean>({ required: true, default: false });

  const distanceRef = ref<HTMLElement>();
  const weightRef = ref<HTMLElement>();
  const timeRef = ref<HTMLElement>();
  const disArea = ref<number[]>();
  const weiArea = ref<number[]>();
  const timeArea = ref<number[]>();

  onMounted(() => {
    setEchart();
    clusterStore.compareAreaAction("1,2,3,4,5,6").then(() => {
      disArea.value = clusterStore.compareAreaData.map(
        (i: any) => i.averageDistance
      );
      weiArea.value = clusterStore.compareAreaData.map(
        (i: any) => i.averCargoWeight
      );
      timeArea.value = clusterStore.compareAreaData.map(
        (i: any) => i.averageWorkTime
      );
    });
  });
  function setEchart() {
    var distanceEC = echart.init(distanceRef?.value);
    var weightEC = echart.init(weightRef?.value);
    var timeEC = echart.init(timeRef?.value);
    if (type.value == "路径比较") {
      watch(
        props.data,
        () => {
          index.value = props.data.dis.map(
            (_value: number, index: number) => index
          );
          if (type.value == "路径比较") {
            distanceEC.setOption(newOption("dis"));
            weightEC.setOption(newOption("wei"));
            timeEC.setOption(newOption("time"));
          }
        },
        { immediate: true }
      );
    } else if (type.value == "班组比较") {
      watch(
        disArea,
        () => {
          distanceEC.setOption(newAreaOption(disArea.value));
          weightEC.setOption(newAreaOption(weiArea.value));
          timeEC.setOption(newAreaOption(timeArea.value));
        },
        { immediate: true }
      );
    }
  }
  const index = ref<number[]>();
  function newOption(type: keyof IProps["data"]): EChartsOption {
    return {
      xAxis: {
        data: index.value,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: props.data[type],
          type: "bar",
          emphasis: {
            label: { show: true, color: "#000" },
          },
          itemStyle: {
            color: "#73e5ff",
          },
        },
      ],
    };
  }
  function newAreaOption(type?: number[]): EChartsOption {
    return {
      xAxis: {
        data: ["班组一", "班组二", "班组三", "班组四", "班组五"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: type,
          type: "bar",
          emphasis: {
            label: { show: true, color: "#000" },
          },
          itemStyle: {
            color: function (params) {
              var colorarrays = [
                "#e4c974",
                "#814146",
                "#798f4a",
                "#8b90a3",
                "#728593",
                "#383a4b",
              ];
              return colorarrays[params.dataIndex];
            },
          },
        },
      ],
    };
  }
  const type = ref<string>("路径比较");
  function changeType() {
    setEchart();
  }
</script>
<style lang="scss" scoped>
  .routeEChart {
    position: absolute;
    width: 100%;
    bottom: 0;
    .AnalysisRouteBottom {
      .changeType {
        position: absolute;
        font-size: 1.6vh;
        height: 1vh;
        width: 5.5vw;
        right: 2%;
        top: 5%;
        z-index: 10;
      }
      position: relative;
      color: #73e5ff;
      width: 100%;
      height: 220px;
      .content {
        flex: 1;
        position: relative;
        height: 220px;
        background-color: #001731;
        margin: 0px;
        border: #73e5ff 1px solid;
        border-radius: 2px;
        padding: 5px;
        .title {
          text-align: center;
        }
        .canvas {
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 740px;
          height: 280px;
        }
      }
    }
  }
</style>
