<template>
    <div class="changePwdDialog">
        <el-dialog title="修改密码" width="70%" v-model="changePwdIsOpen" @close="closechangePwd(changePwdFormRef)">
            <div class="changePwdContent">
                <div class="changePwdForm">
                <el-form :inline="false" style="height: 100%" label-width="150" :rules="rules"
                    :model="changePwdData" ref="changePwdFormRef">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="changePwdData.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="输入新密码" prop="newPassword">
                        <el-input v-model="changePwdData.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确定新密码" prop="confirmPassword">
                        <el-input v-model="changePwdData.confirmPassword"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button 
            class="changePwdBtn"
            >确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { changePwdForm } from "@/types/personal";
import type { FormInstance, FormRules } from "element-plus";
const changePwdData = ref<changePwdForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
});
const rules = reactive<FormRules<changePwdForm>>({
    oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    confirmPassword: [{ required: true, message: "请确定新密码", trigger: "blur" }],
});
const changePwdFormRef = ref<FormInstance>();
const changePwdIsOpen = ref(false)
defineExpose({
    changePwdIsOpen,
});
const closechangePwd = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    changePwdIsOpen.value = false;
    formEl.resetFields();
};

</script>
<style lang="scss" scoped>
.changePwdDialog{
    .changePwdContent{
        margin: 80px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        .changePwdForm{
            .el-form-item{
                display: flex;
                margin-bottom: 50px;
                .el-input{
                    width: 400px !important;
                }
            }
        }
        .changePwdBtn{
            font-size: 20px;
            width: 100px;
            height: 45px;
            margin-top: 50px;
        }
    }
}
    
</style>