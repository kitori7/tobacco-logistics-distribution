<template>
    <div class="Computer">
        <div class="btn-content">
            <el-badge class="item">
                <el-button :class="{ vertical: true, active: currentRoute === 'area' }"
                    @click="routerChange('area')">聚集区计算</el-button>
            </el-badge>
            <el-badge class="item">
                <el-button :class="{ vertical: true, active: currentRoute === 'route' }"
                    @click="routerChange('route')">路径计算</el-button>
            </el-badge>
            <el-badge class="item">
                <el-button :class="{ vertical: true, active: currentRoute === 'SaleRoute' }"
                    @click="routerChange('SaleRoute')">售后路径计算</el-button>
            </el-badge>
            <el-badge class="item">
                <el-button :class="{ vertical: true, active: currentRoute === 'delivery' }"
                    @click="routerChange('delivery')">送货安排</el-button>
            </el-badge>
            <el-badge class="item">
                <el-button :class="{ vertical: true, active: currentRoute === 'HistoryRoute' }"
                    @click="routerChange('HistoryRoute')">历史路径</el-button>
            </el-badge>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const currentRoute = ref(route.name);
function routerChange(route: any) {
    router.push(`/home/computer/${route}`);
    currentRoute.value = route
}
</script>
<style lang="scss" scoped>
.Computer {
    margin-top: 2vh;
    display: flex;

    .btn-content {
        width: 20px;
        display: flex;
        flex-direction: column;

        .el-button {
            --el-button-bg-color: #041c3f;
            border: 1px solid #73e1ff;
            --el-button-text-color: #73e1ff;
            height: 16vh !important;
            width: 2.2vw;
            font-size: 1.2vw !important;
            border-radius: 0;
        }

        .el-button:hover {
            color: #041c3f;
            background: #73e1ff;
            border: 1px solid #005a53 !important;
        }

        .el-button.active {
            color: #041c3f;
            border-color: #73e1ff;
            background-color: #73e1ff;
            outline: none;
        }
    }

    .content {
        margin-left: 2vw;
        flex: 1;
    }
}</style>
  