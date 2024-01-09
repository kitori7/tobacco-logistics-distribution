<template>
    <div class="route">
        <div class="map">
            <div class="btns">
                <el-button class="saveRoute">保存路径</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <el-select v-model="area">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button class="btn">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <el-select v-model="route">
                    <el-option v-for="item in routes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { BorderBox9 } from "@dataview/datav-vue3";
const area = ref('韶关市')
const areas = [
    {
        value: '韶关市',
        label: '韶关市',
    },
    {
        value: 'A区',
        label: 'A区',
    },
    {
        value: 'B区',
        label: 'B区',
    },
    {
        value: 'C区',
        label: 'C区',
    },
    {
        value: 'D区',
        label: 'D区',
    },
]
const route = ref('路线详情')
const routes = [
    {
        value: '路线详情',
        label: '路线详情',
    },
    {
        value: '路线分析',
        label: '路线分析',
    },

]
</script>
<style lang="scss" scoped>
.route {
    width: 100%;
    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .dv-border-box-9 {
            height: 80vh;
            width: 20vw;

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
                color: rgb(86, 215, 255);
                font-size: 20px;
            }
            .el-input {
                border: none;
            }
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
  