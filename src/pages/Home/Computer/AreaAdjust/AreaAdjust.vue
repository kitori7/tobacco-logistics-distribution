<template>
    <div class="AreaAdjust">
        <div class="back"><el-icon size="25" class="backBtn" @click="backBtn">
                <ArrowLeftBold />
            </el-icon>&nbsp;聚集区微调&nbsp;<el-icon size="25">
                <LocationInformation />
            </el-icon></div>
            <BorderBox12 backgroundColor='#001731'></BorderBox12>
    </div>
</template>
<script lang="ts" setup>
import { BorderBox12 } from "@dataview/datav-vue3";
import { ArrowLeftBold, LocationInformation } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
function backBtn() {
    router.back()
}
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

    .dv-border-box-12 {
        margin-left: auto;
        width: 25vw;
        height: 80vh;

    }
}
</style>