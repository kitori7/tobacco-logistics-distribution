<template>
    <div class="groupSettingDialog">
        <el-dialog
            v-model="groupSettingOpen"
            width="69%"
            @close="closeGroupSetting"
            >
                <div class="groupSettingTopText">设置角色权限点：</div>
                <div class="groupSettingcontent">
                    <div class="groupSettingLeft">
                        <el-button class="groupSettingLeftButton" >班组长权限</el-button>
                        <el-button class="groupSettingLeftButton" >送货员权限</el-button>
                        <el-button class="groupSettingLeftButton" >市场经理权限</el-button>
                        <el-button class="groupSettingLeftButton" >客户专员权限</el-button>
                        <el-button class="groupSettingLeftButton" >领导权限</el-button>
                    </div>
                    <div class="groupSettingRight">
                        <el-transfer class="groupSettingTransfer" 
                        v-model="value" 
                        :data="data" 
                        :titles="['权限点', '该角色权限点']"
                        />
                        <div class="groupSettingRightBtn">
                            <el-button class="groupSettingRighCancel" >取消</el-button>
                            <el-button class="groupSettingRighConfirm">确认</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface Option {
    key: number
    label: string
}
const generateData = () => {
const data: Option[] = []
for (let i = 1; i <= 15; i++) {
    data.push({
        key: i,
        label: `Option ${i}`,
    })
}
    return data
}
const data = ref<Option[]>(generateData())
const value = ref([])


const groupSettingOpen =ref(false)
const closeGroupSetting = () =>{
    groupSettingOpen.value = false
}
defineExpose({
    groupSettingOpen
})
</script>
<style lang="scss" scoped>
.groupSettingTopText{
    margin-left: 4.5vw;
    font-size: 25px;
}
.groupSettingcontent{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .groupSettingLeft{
    display: flex;
    flex-direction: column;
        .groupSettingLeftButton{
            margin: 10px;
            width: 8vw;
            height: 6vh;
            font-size: 20px;
        }
    }
    .groupSettingRight{
        margin: 10px;
        padding: 30px;
        border: 1px solid #73e1ff;
        .groupSettingTransfer{
            margin: 10px;
        }
        .groupSettingRightBtn{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            .groupSettingRighCancel,.groupSettingRighConfirm{
                font-size: 20px;
                width: 100px;
                height: 35px;
            }
        }
    }
    
}
</style>
