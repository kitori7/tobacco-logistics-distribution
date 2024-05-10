<template>
  <div class="routeEChart">
    <div class="AnalysisRouteBottom">
      <div class="BottomLeft">
        <BorderBox9
          :color="['#73e5ff', '#73e5ff']"
          backgroundColor="#001731"
          style="opacity: 0.97"
        >
          <div class="title">运行里程/km</div>
          <div id="main"></div>
        </BorderBox9>
      </div>
      <div class="BottomMiddle">
        <BorderBox9
          :color="['#73e5ff', '#73e5ff']"
          backgroundColor="#001731"
          style="opacity: 0.97"
        >
          <div class="title">载货量/条</div>
          <div id="main2"></div>
        </BorderBox9>
      </div>
      <div class="BottomRight">
        <BorderBox9
          :color="['#73e5ff', '#73e5ff']"
          backgroundColor="#001731"
          style="opacity: 0.97"
        >
          <div class="title">工作时长/h</div>
          <div id="main3"></div>
        </BorderBox9>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // const isChartDisplayed = ref<boolean>(true);
  // const changeIconFunction = () => {
  //   isChartDisplayed.value = !isChartDisplayed.value;
  // };
  // //eachart初始
  // const setEchartsOptions = () => {
  //   let myChart = echarts.init(document.getElementById("main"));
  //   myChart.setOption(option);
  // };
  // const setEchartsOptions2 = () => {
  //   let myChart = echarts.init(document.getElementById("main2"));
  //   myChart.setOption(option2);
  // };
  // const setEchartsOptions3 = () => {
  //   let myChart = echarts.init(document.getElementById("main3"));
  //   myChart.setOption(option);
  // };
  // function SplitLines() {
  //   clusterStore.getSplitLinesAction().then(() => {
  //     console.log(clusterStore.SplitLines);
  //     clusterStore.SplitLines?.forEach((item: polylineData[]) => {
  //       let path: AMap.LngLat[] = [];
  //       item.forEach((item: polylineData) => {
  //         path.push(new AMap.LngLat(item.longitude, item.latitude));
  //       });
  //       let polyline = new AMap.Polyline({
  //         path: path,
  //         strokeWeight: 5,
  //         showDir: true,
  //         strokeColor: "#001731", //线条颜色
  //         lineJoin: "round", //折线拐点连接处样式
  //       });
  //       map.add(polyline);
  //     });
  //   });
  // }
  // let option = {
  //   textStyle: {
  //     color: "#ffffff",
  //   },
  //   xAxis: {
  //     type: "category",
  //     data: ["1", "2", "4"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   grid: {
  //     x: 70,
  //     x2: 40,
  //     y: 70,
  //     y2: 40,
  //   },
  //   series: [
  //     {
  //       data: [10, 20, 30],
  //       type: "bar",
  //       barWidth: "20%",
  //       label: {
  //         show: true, //开启显示
  //         position: "top",
  //         textStyle: {
  //           //数值样式
  //           color: "#ffffff", //字体颜色
  //           fontSize: 15, //字体大小
  //         },
  //       },
  //     },
  //   ],
  // };
  // let option2 = {
  //   textStyle: {
  //     color: "#ffffff",
  //   },
  //   xAxis: {
  //     type: "category",
  //     data: ["1", "2", "4"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   grid: {
  //     x: 70,
  //     x2: 40,
  //     y: 70,
  //     y2: 40,
  //   },
  //   series: [
  //     {
  //       data: [10, 20, 30],
  //       type: "bar",
  //       barWidth: "20%",
  //       label: {
  //         show: true, //开启显示
  //         position: "top",
  //         textStyle: {
  //           //数值样式
  //           color: "#ffffff", //字体颜色
  //           fontSize: 15, //字体大小
  //         },
  //       },
  //     },
  //   ],
  // };
</script>
<style lang="scss" scoped>
  .routeEChart {
      .AnalysisRouteBottom {
        display: flex;
        position: relative;
        top: -39%;
        color: #73e5ff;

        .title {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 80%);
        }

        .BottomLeft {
          flex: 1;
          height: 25vh;

          #main {
            width: 100%;
            height: 100%;
          }
        }

        .BottomMiddle {
          flex: 1;
          height: 25vh;

          #main2 {
            width: 100%;
            height: 100%;
          }
        }

        .BottomRight {
          flex: 1;
          height: 25vh;

          #main3 {
            height: 100%;
            width: 100%;
          }
        }
      }
  }
</style>
