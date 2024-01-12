<template>
    <div class="area">
        <div class="map">
            <div class="btns">
                <el-button class="adjust" @click="routerChange">聚集区微调</el-button>
                <el-button class="save" @click="save">保存结果</el-button>
            </div>
        </div>
        <div class="content">
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="areaCollapse">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-badge :value="1" class="item"></el-badge>
                        <el-collapse-item title="中转站信息改变" name="1">
                            <ul>
                                <li>
                                    A区中转站位置改为更改为24.123，113.123
                                </li>
                            </ul>
                        </el-collapse-item>
                        <el-badge :value="1" class="item"></el-badge>
                        <el-collapse-item title="商品信息改变" name="2">
                            <ul>
                                <li>
                                    100号商铺位置更改为24.456，113.456
                                </li>
                            </ul>
                        </el-collapse-item>
                        <el-badge :value="2" class="item"></el-badge>
                        <el-collapse-item title="系统参数改变" name="3">
                            <ul>
                                <li>
                                    密集度系数更改威威0.98
                                </li>
                            </ul>
                        </el-collapse-item>
                        <el-badge :value="2" class="item"></el-badge>
                        <el-collapse-item title="D聚集区" name="4">
                            <ul>
                                <li>
                                    新增一条A路
                                </li>
                                <li>
                                    新增一条B路
                                </li>
                            </ul>
                        </el-collapse-item>
                        <el-badge :value="1" class="item"></el-badge>
                        <el-collapse-item title="异常情况发生" name="5">
                            <ul>
                                <li>
                                    某路段已到常“路面结冰”时段
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-button class="btn">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="region">
                    <el-collapse v-model="activeNames2" @change="handleChange">
                        <el-collapse-item title="A聚集区" name="1">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="B聚集区" name="2">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="C聚集区" name="3">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                        <el-collapse-item title="D聚集区" name="4">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { BorderBox9 } from "@dataview/datav-vue3";
import { CollapseModelValue } from "element-plus/lib/components/collapse/src/collapse.js";
// 跳转
function routerChange() {
    router.replace('/home/AreaAdjust')
}
// 保存结果
function save() {
    ElMessageBox.confirm("还有未保存的聚集区错误点，是否忽略并继续保存?")
        .then(() => {
        })
}

const activeNames = ref(['1'])
const handleChange = (val: CollapseModelValue) => {
    console.log(val)
}
const activeNames2 = ref(['1'])

interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const data: Tree[] = [
    {
        label: '商户A',
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
        label: '商户B',
        children: [
            {
                label: '1',
            },
        ],
    },
    {
        label: '商户C',
        children: [
            {
                label: '1',
            },
        ],
    },
    {
        label: '商户D',
        children: [
            {
                label: '1',
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
<style lang="scss" scoped>
.area {
    width: 100%;

    :global(.el-message-box__message) {
        font-size: 20px;
        padding: 0 10px;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .dv-border-box-9 {
            height: 80vh;
            width: 20vw;
            box-shadow: 10px 10px 5px 5px rgb(0, 0, 0, 0.4);

            .areaCollapse {
                margin-left: 1vw;
                margin-top: 2vh;
                width: 85%;

                .el-collapse {
                    .el-collapse-item {
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
                    }
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

            .region {
                margin-left: 1vw;
                margin-top: 2vh;
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

            .btn {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: 5%;
            }
        }
    }
}
</style>