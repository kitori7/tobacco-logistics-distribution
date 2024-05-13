<template>
  <div class="routeEChart" v-show="isOpenEChart">
    <div class="AnalysisRouteBottom">
      <el-carousel :autoplay="false" height="220px">
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

  onMounted(() => {
    const distanceEC = echart.init(distanceRef?.value);
    const weightEC = echart.init(weightRef?.value);
    const timeEC = echart.init(timeRef?.value);
    watch(
      props.data,
      () => {
        distanceEC.setOption(newOption("dis"));
        weightEC.setOption(newOption("wei"));
        timeEC.setOption(newOption("time"));
      },
      { immediate: true }
    );
  });

  function newOption(type: keyof IProps["data"]): EChartsOption {
    return {
      xAxis: {
        type: "category",
      },
      yAxis: {
        type: "value",
      },
      color: "#73e5ff",
      series: [
        {
          data: props.data[type],
          type: "bar",
          emphasis: {
            label: { show: true, color: "#000" },
          },
        },
      ],
    };
  }
  // const option = computed(() => {});
</script>
<style lang="scss" scoped>
  .routeEChart {
    position: absolute;
    width: 100%;
    bottom: 0;
    .AnalysisRouteBottom {
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
