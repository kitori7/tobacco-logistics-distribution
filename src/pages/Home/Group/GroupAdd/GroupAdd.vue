<template>
    <div class="groupAddDialog">
        <el-dialog
            v-model="groupAddOpen"
            width="70%"
            @close="closeGroupAdd"
            >
            <div class="groupAddInfo">
                <div class="groupAddOne">
                    <div class="groupAvatarBorder"></div>
                <el-button  class="groupAvatarUploadButton" >上传头像</el-button>
                </div>
                <div  class="groupAddTwo">
                    <el-form 
                    :inline="true" 
                    style="height: 100%;" 
                    label-width="100"
                    >
                            <el-form-item 
                            label="姓名"
                            v-model="addUserData.userName"
                            >
                                <el-input></el-input>
                            </el-form-item>
                            <el-form-item 
                            label="电话"
                            v-model="addUserData.phone"
                            >
                                <el-input></el-input>
                            </el-form-item>
                            <el-form-item 
                            label="邮箱"
                            v-model="addUserData.email"
                            >
                                <el-input></el-input>
                            </el-form-item>
                        
                            <el-form-item 
                            label="部门"
                            v-model="addUserData.department"
                            >
                                <el-select></el-select>
                            </el-form-item>
                            <el-form-item 
                            label="入职时间"
                            v-model="addUserData.signTime"
                            >
                                <el-input></el-input>
                            </el-form-item>

                        <div class="groupAddMessage">
                            <span>工号：1232131321</span>
                            <span style="margin-left: 7vw;">默认密码：2231213aa</span>
                        </div>
                        <div class="groupAddRadio">
                            <span>角色：</span>
                            <el-radio-group v-model="addRadio" class="groupAddRadioGroup">
                                <el-radio label="1" size="large">班组长</el-radio>
                                <el-radio label="2" size="large">送货员</el-radio>
                                <el-radio label="3" size="large">市场经理</el-radio>
                                <el-radio label="4" size="large">客户专员</el-radio>
                                <el-radio label="5" size="large">领导</el-radio>
                            </el-radio-group>
                        </div>
                    </el-form>
                </div>
                <div class="groupAddSetting">
                    <el-button class="groupAddCancel" @close="closeGroupAdd" >取消</el-button>
                    <el-button class="groupAddConfirm" @close="confirm">确认</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { useGroupStore } from "@/store/group";
import { addUserForm } from "@/types/group";
const groupStore = useGroupStore();

const addRadio = ref('1')
const groupAddOpen =ref(false)
const closeGroupAdd = () =>{
    groupAddOpen.value = false
}
function confirm() {
    ElMessageBox.confirm('确定关闭吗?').then(() => {
    console.log('你点击了确定按钮')
    groupAddOpen.value = false
    }).catch(() => { })
}
defineExpose({
    groupAddOpen
})
const addUserData = ref<addUserForm>({
    userName: '',
    password: '',
    phone: '',
    email: '',
    department: '',
    roleId: 1,
    workNumber: '',
    signTime:'',
    avatarPath:'',
});
</script>
<style lang="scss" scoped>
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
            width: 170px;
            height: 200px;
            border: 1px solid  #73e1ff;
        }
        .groupAvatarUploadButton{
            box-sizing: border-box;
            position: absolute;
            right: 300px;
            margin-top: 160px;
            width: 90px;
            height: 42px;
        }
    }
    .groupAddTwo{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 50px 0;
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
    }
    
    .groupAddSetting{
        display: flex;
        justify-content: center;
        .groupAddCancel,.groupAddConfirm{
            width: 85px;
            margin: 0 5vw ;
        }
    }
}
</style>
