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
                    <el-collapse v-model="activeNames" v-for="(item, index) in  clusterStore.InformationList">
                        <el-badge :value="item.number" class="item"></el-badge>
                        <el-collapse-item :title="item.name" :name="index">
                            <ul>
                                <li v-for="(item1) in item.data">
                                    {{ item1 }}
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-button class="btn" @click="CalculateBtnFunction">重新计算</el-button>
            </BorderBox9>
            <BorderBox9 :color="['#73e5ff', '#73e5ff']" backgroundColor='#001731'>
                <div class="region">
                    <el-collapse v-loading="isResultPointsFinished" element-loading-text="加载中..."
                        element-loading-background="rgba(0,23,49,0.8)" v-model="activeNames2" accordion>
                        <el-scrollbar height="75vh">
                            <el-collapse-item v-for="(item, index) in clusterStore.clusterAndShopList"
                                :title=item.accumulation :name=index>
                                <div class="regionCollapseItemContext" v-for="(item1) in item.son">{{ item1.shopName }}
                                </div>
                            </el-collapse-item>
                        </el-scrollbar>
                    </el-collapse>
                </div>
            </BorderBox9>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useClusterStore } from "@/store/cluster";
import { ElLoading } from 'element-plus'
import { useRouter } from "vue-router";
import { BorderBox9 } from "@dataview/datav-vue3";
const router = useRouter();
// 跳转
function routerChange() {
    router.replace('/home/AreaAdjust')
}
//聚集区Store
const clusterStore = useClusterStore();

//获取修改数据信息列表
clusterStore.getInformationListAction()

//获取聚集区错误点（只有数量、检查）
clusterStore.getCheckErrorPointsAction()

// 保存结果
function save() {
    if (clusterStore.ErrorPoints == undefined) {
        ElMessage.warning('数据处理中请稍后再试。');
    } else {
        const loading1 = ElLoading.service({
            lock: true,
            text: '保存中...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        if (clusterStore.ErrorPoints === 0) {
            clusterStore.deleteClearInformationListAction()
                .then(() => {
                    clusterStore.getInformationListAction()
                })
            loading1.close()
            ElMessage.success('保存成功')
        } else {
            ElMessageBox({
                title: '注意!',
                message: '还有未保存的聚集区错误点，是否忽略并继续保存?',
                showCancelButton: true,
            }).then((action) => {
                if (action == 'confirm') {
                    clusterStore.deleteClearInformationListAction()
                        .then(() => {
                            clusterStore.getInformationListAction()
                        })
                    loading1.close()
                    ElMessage.success('保存成功')
                }
            })
        };
    }
}
//第一个折叠面板的参数
const activeNames = ref(['0'])
//第二个折叠面板的参数
const activeNames2 = ref(['0'])
//定义是否加载完成的变量
const isResultPointsFinished = ref<boolean>(true)
//获取聚集区和商铺信息的方法
clusterStore.getAllResultPointsAction()
    .then(() => { isResultPointsFinished.value = false });

//计算接口
const CalculateBtnFunction = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '计算中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    clusterStore.postCalculateAllAction()
        .then(() => {
            loading.close()
        })
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
                margin-top: 3vh;
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
                    margin-right: 10px;
                }
            }

            .region {
                margin-left: 1.4vw;
                margin-top: 3vh;
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

                    .regionCollapseItemContext {
                        margin: 10px 0;
                    }

                    .regionCollapseItemContext:before {
                        content: "";
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: rgb(0, 179, 255);
                        border-radius: 50%;
                        margin-bottom: 4px;
                        margin-right: 10px;
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
                bottom: 8%;
            }
        }
    }
}
</style>