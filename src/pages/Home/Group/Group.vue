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
            <el-button class="groupSet" :icon="Tools" @click="openGroupSetting">设置权限</el-button>
            <el-button class="groupAdd" :icon="Plus" @click="openGroupAdd">添加用户</el-button>
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
            <GroupSetting :groupSetting="groupSettingOpenf" ref="groupSettingOpenf"></GroupSetting>
            <GroupAdd :groupAdd="groupAddf" ref="groupAddf"></GroupAdd>
        </div>
    </div>
</template>
<script lang="ts" setup>
import GroupSetting from './GroupSetting/GroupSetting.vue'
import GroupAdd from './GroupAdd/GroupAdd.vue'
import {  Plus, Search, Tools,EditPen } from '@element-plus/icons-vue'

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
const groupSettingOpenf = ref()
const groupAddf =  ref()

const openGroupAdd = () => {
    groupAddf.value.groupAddOpen =true
}
const openGroupSetting = () => {
    groupSettingOpenf.value.groupSettingOpen =true
}
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
                flex: 12;
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
    }

</style>