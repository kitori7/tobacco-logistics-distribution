<template>
    <div class="groupAddDialog">
        <el-dialog
            v-model="groupAddOpen"
            width="70%"
            @close="closeGroupAdd(ruleFormRef)"
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
                    :rules="rules"
                    ref="ruleFormRef"
                    :model="addUserData"
                    >
                            <el-form-item label="姓名" prop="user_name" >
                                <el-input
                                v-model="addUserData.user_name"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input
                                v-model="addUserData.phone"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input
                                v-model="addUserData.email"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="部门" prop="department">
                                <el-select
                                v-model="addUserData.department"
                                >
                                    <el-option
                                    v-for="item in GroupList"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="入职" prop="sign_time">
                                <el-date-picker
                                v-model="addUserData.sign_time"
                                value-format="YYYY-MM-DD hh:mm:ss"
                                type="datetime"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="工号"  prop="work_number">
                                <el-input
                                v-model="addUserData.work_number"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="角色："  prop="role_id" style="margin-left: 20px;">
                                <el-radio-group v-model="addUserData.role_id" >
                                    <el-radio label=1 size="large">班组长</el-radio>
                                    <el-radio label=2 size="large">送货员</el-radio>
                                    <el-radio label=3 size="large">市场经理</el-radio>
                                    <el-radio label=4 size="large">客户专员</el-radio>
                                    <el-radio label=5 size="large">领导</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        <div class="groupAddMessage">
                            <span >默认密码：ycwl123456</span>
                        </div>
                    </el-form>
                </div>
                <div class="groupAddSetting">
                    <el-button class="groupAddCancel" @click="closeGroupAdd(ruleFormRef)" >取消</el-button>
                    <el-button class="groupAddConfirm" @click="groupAddConfirm(ruleFormRef,addUserData)">确认</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { useGroupStore } from "@/store/group";
import { addUserRuleForm } from "@/types/group";
import type { FormInstance, FormRules } from "element-plus";
const groupStore = useGroupStore();

const groupAddOpen =ref(false)
const closeGroupAdd = (formEl : FormInstance | undefined) =>{
    groupAddOpen.value =false;
    if (!formEl ) return;
    formEl.resetFields();
}
defineExpose({
    groupAddOpen
})

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<addUserRuleForm>>({
    user_name:[{required: true,trigger: 'blur',}],
    phone:[{required: true,trigger: 'blur',}],
    email:[{required: true,trigger: 'blur',}],
    department:[{required: true,trigger: 'blur',}],
    sign_time:[{required: true,trigger: 'blur',}],
    work_number:[{required: true,trigger: 'blur',}],
    role_id:[{required: true,trigger: 'blur',}],
})
const addUserData = reactive<addUserRuleForm>({
    user_name: '',
    phone: '',
    email: '',
    department: '',
    role_id: 0,
    work_number: '',
    sign_time:'',
    avatarPath:'',
});

//部门信息（固定）
const GroupList = ['班组一','班组二','班组三','班组四','班组五','班组六','营销部']


const groupAddConfirm =  async ( formEl: FormInstance | undefined, data:addUserRuleForm) => {
    if (!formEl ) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            formEl.resetFields();
            console.log(formEl);
            groupStore
            .postAddUserAction(data)
        } else {
            console.log('error submit!', fields)
        }
    })
}

    

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
        .groupAddMessage{
            margin-left: 40px;
            color: rgb(204, 255, 255);
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
