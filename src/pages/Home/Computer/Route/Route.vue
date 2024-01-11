<template>
    <div class="route">
        <div class="map">
            <el-empty description="description" />
            <div class="btns">
                <el-button class="saveRoute">保存路径</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <el-select v-model="area">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="routeCollapse">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-badge :value="1" class="item"></el-badge>
                        <el-collapse-item title="聚集区信息改变" name="1">
                            <ul>
                                <li>
                                    D区内聚集区发生改变
                                </li>
                            </ul>
                        </el-collapse-item>
                        <el-badge :value="1" class="item"></el-badge>
                        <el-collapse-item title="系统参数" name="2">
                            <ul>
                                <li>
                                    单车载货量更改为700跳
                                </li>
                                <li>
                                    D区可工作车辆数更改为25辆
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-button class="btn">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <el-select v-model="route">
                    <el-option v-for="item in routes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="detailedRoute">
                    <el-collapse v-model="activeNames2" @change="handleChange">
                        <el-collapse-item title="A区" name="1">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="B区" name="2">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="C区" name="3">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="D区" name="4">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { BorderBox9 } from "@dataview/datav-vue3";
import { CollapseModelValue } from "element-plus/lib/components/collapse/src/collapse.js";
const activeNames = ref(['1'])
const activeNames2 = ref(['1'])
const handleChange = (val: CollapseModelValue) => {
    console.log(val)
}
interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const data: Tree[] = [
    {
        label: 'A路线',
        children: [
            {
                label: 'Level two 1-1',
                children: [
                    {
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'B路线',
        children: [
            {
                label: 'A聚集区',
            },
        ],
    },
    {
        label: 'C路线',
        children: [
            {
                label: 'B聚集区',
            },
        ],
    },
    {
        label: 'D路线',
        children: [
            {
                label: 'C聚集区',
                children: [
                    {
                        label: 'A商户',
                    },
                    {
                        label: 'B商户',
                    },
                    {
                        label: 'C商户',
                    },
                ],
            },
            {
                label: 'D聚集区',
                children: [
                    {
                        label: 'A商户',
                    },
                    {
                        label: 'B商户',
                    },
                    {
                        label: 'C商户',
                    },
                ],
            },
            {
                label: 'E聚集区',
                children: [
                    {
                        label: 'A商户',
                    },
                    {
                        label: 'B商户',
                    },
                    {
                        label: 'C商户',
                    },
                ],
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label',
}
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
            box-shadow: 10px 10px 5px 5px rgb(0, 0, 0, 0.4);

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

            .routeCollapse {
                padding-left: 1vw;
                padding-top: 4vh;
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
                }
            }
            .detailedRoute {
                padding-left: 1vw;
                padding-top: 4vh;
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

        }
    }
}
</style>