<template>
    <div class="area">
        <div class="map">
            <div class="btns">
               <el-button class="adjust" @click="routerChange">聚集区微调</el-button>
                <el-button class="save">保存结果</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <el-button class="btn">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter} from "vue-router";
const router = useRouter();
import { BorderBox9 } from "@dataview/datav-vue3";
function routerChange(){
    router.replace('/home/AreaAdjust')
}
</script>
<style lang="scss" scoped>
.area {
    width: 100%;
    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .dv-border-box-9 {
            height: 80vh;
            width: 20vw;
            .btn {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: 3%;
            }
        }
    }
}
</style>
  