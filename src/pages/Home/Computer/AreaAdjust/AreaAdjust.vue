<template>
    <div class="AreaAdjust">
        <div class="back"><el-icon size="25" class="backBtn" @click="backBtn">
                <ArrowLeftBold />
            </el-icon>&nbsp;聚集区微调&nbsp;<el-icon size="25">
                <LocationInformation />
            </el-icon></div>
        <BorderBox12 backgroundColor='#001731'>
            <div class="adjustCollapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-badge :value="1" class="item"></el-badge>
                    <el-collapse-item title="A聚集区" name="1">
                        <div class="itemContent" @click="openAdjustDialog">
                            武江区富家生活超市
                        </div>
                        <ul>
                            <li>
                                武江区123456
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-badge :value="1" class="item"></el-badge>
                    <el-collapse-item title="B聚集区" name="2">
                        <div class="itemContent">
                            武江区富家生活超市
                        </div>
                        <ul>
                            <li>
                                武江区123456
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-badge :value="2" class="item"></el-badge>
                    <el-collapse-item title="C聚集区" name="3">
                        <div class="itemContent">
                            武江区富家生活超市
                        </div>
                        <ul>
                            <li>
                                商铺0711-商铺0899
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-badge :value="2" class="item"></el-badge>
                    <el-collapse-item title="D聚集区" name="4">
                        <div class="itemContent">
                            武江区富家生活超市
                        </div>
                        <ul>
                            <li>
                                商铺0621-商铺0512
                            </li>
                            <li>
                                商铺0621-商铺0512
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-badge :value="1" class="item"></el-badge>
                    <el-collapse-item title="E聚集区" name="5">
                        <div class="itemContent">
                            武江区富家生活超市
                        </div>
                        <ul>
                            <li>
                                商铺0621-商铺0512
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </BorderBox12>
        <el-dialog style="transform: translate(34.5vw, 0);" v-model="isOpenAdjustDialog" width="25%" :modal="false"
            :append-to-body="true">
            <div class="adjustDialogContent">  
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="聚集区" name="10">
                        <ul>
                            <li>
                                武江区123456
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAdjustDialog">Cancel</el-button>
                    <el-button @click="closeAdjustDialog">Cancel</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
<script lang="ts" setup>
import { BorderBox12 } from "@dataview/datav-vue3";
import { ArrowLeftBold, LocationInformation } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { CollapseModelValue } from "element-plus/lib/components/collapse/src/collapse.js";
const router = useRouter();
function backBtn() {
    router.back()
}
const activeNames = ref(['1'])
const handleChange = (val: CollapseModelValue) => {
    console.log(val)
}
const openAdjustDialog = () => {
    isOpenAdjustDialog.value = true
}
const closeAdjustDialog = () => {
    isOpenAdjustDialog.value = false

}
const isOpenAdjustDialog = ref(false)
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

        .adjustCollapse {
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

    .adjustDialogContent{
        margin-top: 20px;
    }
}
</style>