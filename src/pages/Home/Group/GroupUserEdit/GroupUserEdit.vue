<template>
    <div class="groupUserEditDialog">
        <el-dialog 
        title="编辑信息" 
        v-model="groupUserEditIsOpen" 
        width="80%"  
        @close="closeUserEdit(userEditFormRef)">
            <div class="groupUserEdit">
                <div class="groupUserEditInfo">
                    <el-form 
                    :inline="true" 
                    style="height: 100%" 
                    label-width="110" 
                    :model="EditData"
                    :rules="rules"
                    ref="userEditFormRef"
                    >
                        <el-form-item label="工号">
                            :<span>123123123123</span>
                        </el-form-item>
                        <el-form-item label="姓名">
                            :<span>123123123123</span>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="EditData.phone" placeholder="点击输入"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="EditData.email" placeholder="点击输入"></el-input>
                        </el-form-item>
                        <el-form-item label="部门" prop="department">
                            <el-select v-model="EditData.department">
                                <el-option v-for="item in groupList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="入职时间" prop="sign_time">
                            <el-date-picker v-model="EditData.sign_time" value-format="YYYY-MM-DD hh:mm:ss"
                                type="datetime" placeholder="点击输入"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="角色" prop="role_id" class="groupUserEditRadioGroup">
                            <el-radio-group v-model="EditData.role_id">
                                <el-radio label="1" size="large">送货员</el-radio>
                                <el-radio label="2" size="large">班组长</el-radio>
                                <el-radio label="3" size="large">送货部负责人</el-radio>
                                <el-radio label="4" size="large">客户专员</el-radio>
                                <el-radio label="5" size="large">市场经理</el-radio>
                                <el-radio label="6" size="large">营销部负责人</el-radio>
                                <el-radio label="7" size="large">稽查员</el-radio>
                                <el-radio label="8" size="large">中队长</el-radio>
                                <el-radio label="9" size="large">专卖部负责人</el-radio>
                                <el-radio label="10" size="large">系统管理员</el-radio>
                                <el-radio label="11" size="large">领导</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="groupUserEditSetting">
                    <el-button class="groupUserEditCancel">取消</el-button>
                    <el-button class="groupUserEditConfirm">确认</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { UserEditForm } from "@/types/group";
import type { FormInstance, FormRules } from "element-plus";
const groupUserEditIsOpen = ref(false);
defineExpose({
    groupUserEditIsOpen,
});
const EditData = ref<UserEditForm>({
    phone: "",
    email: "",
    department: "",
    role_id: 0,
    sign_time: "",
});
//固定班组信息
const groupList = [
    "班组一",
    "班组二",
    "班组三",
    "班组四",
    "班组五",
    "班组六",
    "营销部",
];
const userEditFormRef = ref<FormInstance>();
const rules = reactive<FormRules<UserEditForm>>({
    phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
    department: [{ required: true, message: "请选择部门", trigger: "blur" }],
    sign_time: [{ required: true, message: "请选择入职时间", trigger: "blur" }],
    role_id: [{ required: true, trigger: "blur" }],
});
  
  const closeUserEdit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    groupUserEditIsOpen.value = false;
    formEl.resetFields();
  };
</script>
<style lang="scss" scoped>
.groupUserEdit {
    margin:25px auto;
    width: 48vw;
    color: #73e1ff;
    font-size: 20px;
    .groupUserEditInfo {
        span {
            padding-left: 20px;
            font-size: 20px;
        }
        .el-form-item {
            width: 40%;
            margin: 30px 35px;
        }

        .groupUserEditRadioGroup {
            width: 80%;

            .el-form-item__label {
                margin: 20px 25px;
            }

            .el-radio--large {
                margin: 0 0 5px 5px;
                display: flex;
                flex-wrap: wrap;
                flex: 30%;
            }
        }
    }

    .groupUserEditSetting {
        display: flex;
        justify-content: center;

        .groupUserEditCancel,
        .groupUserEditConfirm {
            width: 85px;
            margin: 0 5vw;
        }
    }
}
</style>