<template>
    <div class="Group">
        <div class="groupControl">
            <div class="groupSearch">
                <el-form :inline="true" style="height: 100%;margin-top: 0.5vh;" label-width="100">
                <el-form-item label="姓名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-select></el-select>
                </el-form-item>
                </el-form>
            </div>
            <el-button class="groupSearchButton" :icon="Search" ></el-button>
            <el-button class="groupSet" :icon="Tools">设置权限</el-button>
            <el-button class="groupAdd" :icon="Plus" @click="groupAddOpen = true">添加用户</el-button>
        </div>
        <div class="useInfo">
            <div
            class="useInfoItem"
            v-for="(item) in info"
            >
                <div class="usePhoto">
                    <el-button class="groupInfoItemButton" :icon="EditPen" ></el-button>
                </div>
                <div>{{ item.name }}</div>
                <div>{{ item.position }}</div>
                <div>工号：{{ item.jobNumber }}</div>
            </div>
        </div>
        <div class="groupDialog">
            <el-dialog
            v-model="groupAddOpen"
            width="70%"
            >
            
            
            <div class="groupAddInfo">
                <div class="groupAddOne">
                    <div class="groupAvatarBorder"></div>
                <el-button  class="groupAvatarUploadButton" >上传头像</el-button>
                </div>

                <div  class="groupAddTwo">
                    <el-form :inline="true" style="height: 100%;" label-width="100">
                        <div>
                            <el-form-item label="姓名">
                                <el-input></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="部门">
                                <el-select></el-select>
                            </el-form-item>
                            <el-form-item label="入职时间">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                        <div class="groupAddMessage">
                            <span>工号：1232131321</span>
                            <span style="margin-left: 6vw;">默认密码：2231213aa</span>
                        </div>
                        <div class="groupAddRadio">
                            <span>角色：</span>
                            <el-radio-group v-model="radio1" class="groupAddRadioGroup">
                                <el-radio label="1" size="large">班组长</el-radio>
                                <el-radio label="2" size="large">送货员</el-radio>
                                <el-radio label="3" size="large">市场经理</el-radio>
                                <el-radio label="4" size="large">客户专员</el-radio>
                            </el-radio-group>
                        </div>
                    </el-form>
                </div>
                <div class="groupAddSetting">
                    <el-button class="groupAddCancel" >取消</el-button>
                    <el-button class="groupAddConfirm">确认</el-button>
                </div>
            </div>
                
            </el-dialog>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {  Plus, Search, Tools,EditPen } from '@element-plus/icons-vue'
import { ref } from 'vue'

const groupAddOpen = ref(false)
const radio1 = ref('1')
interface useInfo  {
    name:string,
    position:string,
    jobNumber:number,
}
const info: useInfo[] = [
    {
        name:'张三',
        position:'职位一',
        jobNumber:12399,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    },
    {
        name:'张四',
        position:'职位二',
        jobNumber:45699,
    }
]


</script>
<style lang="scss" scoped>
    .Group{
        margin: 1vh auto;
        width: 90vw;
        .groupControl{
            display: flex;
            justify-content: space-between;
            height: 5vh;
            .groupSearch{
                flex: 11;
                border: 2px solid  #73e1ff;
            }
            .groupSearchButton{
                height: 100%;
                width: 2vw;
                border-radius: 0%;
            }
            .groupSet{
                margin: 0 2vw 0 4vw;
                flex: 1;
                height: 5vh;
                text-align: center;
                border: 2px solid  #73e1ff;
            }
            .groupAdd{
                margin: 0 2vw;
                flex: 1;
                height: 5vh;
                text-align: center;
                border: 2px solid  #73e1ff;
            }
        }
        .useInfo::-webkit-scrollbar {
                display: none;
        }
        .useInfo{
            height: 80vh;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
            overflow-x: hidden;
            overflow-y: auto;
            
            .useInfoItem{
                margin: 5vh 3vw 0 0;
                width: 10vw;
                text-align: center;
                line-height: 2.5vh;
                .usePhoto{
                    width: 10vw;
                    height: 25vh;
                    border: 2px solid   #73e1ff;
                    position: relative;
                    .groupInfoItemButton{
                        position: absolute;
                        bottom: -2px;
                        right: -2px;
                        border-radius: 0%;
                    }
                }
            }
        }
        .groupDialog{
            .groupAddInfo{
                position: relative;
                width: 55vw;
                margin:5vh auto;
                color: #73e1ff;
                font-size: 20px;
                    .groupAddOne{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    
                .groupAvatarBorder{
                    width: 9vw;
                    height: 22vh;
                    border: 1px solid  #73e1ff;
                }
                .groupAvatarUploadButton{
                    position: absolute;
                    right: 15vw;
                    margin: 0 1vw;
                    margin-top: 17vh;
                    width: 5vw;
                    height: 5vh;
                }
                }
                .groupAddTwo{
                    margin: 50px 0;
                }
                .groupAddMessage,.groupAddRadio{
                    margin: 15px 0;
                    color: $processed;
                    padding-left: 50px;
                }
                .groupAddRadio{
                    .groupAddRadioGroup{
                        margin-left: 2vw;
                    }
                }
                .groupAddSetting{
                    display: flex;
                    justify-content: center;
                    .groupAddCancel,.groupAddConfirm{
                        width: 5vw;
                        margin: 0 5vw ;

                    }

                }
            }

        }
    }

</style>