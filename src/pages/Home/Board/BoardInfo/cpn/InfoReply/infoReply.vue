<template>
  <div class="infoReply">
    <el-dialog
      v-model="isReply"
      width="70%"
      center
      top="6%"
      @close="Replyclose(replyFormRef)"
    >
      <div class="el-dialog-div">
        <el-form
          ref="replyFormRef"
          :model="replyForm"
          :rules="rules"
          label-width="160px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="营销部回复 :" prop="name">
            <el-input
              v-model="replyForm.name"
              maxlength="100"
              placeholder="点击输入自定义内容......"
              show-word-limit
              :autosize="{ minRows: 5, maxRows: 10 }"
              type="textarea"
          /></el-form-item>
          <el-form-item label="上传照片 :" prop="">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <el-icon><Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <el-icon><Download /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="状态修改为 :" prop="count">
            <el-radio-group v-model="radio">
              <el-radio :label="3">处理中</el-radio>
              <el-radio :label="6">已处理</el-radio>
              <el-radio :label="9">无需处理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button
            type="primary"
            class="btn"
            @click="submitForm(replyFormRef)"
            >回复</el-button
          >
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  interface ReplyForm {
    name: string;
  }
  const replyForm = reactive<ReplyForm>({
    name: "",
  });
  const isReply = ref<boolean>(false);
  function handleReply(id: number) {
    isReply.value = true;
    console.log(id);
    console.log(isReply);
  }
  defineExpose({
    handleReply: handleReply,
  });
  //  文本框
  import type { FormInstance, FormRules } from "element-plus";
  const replyFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<ReplyForm>>({
    name: [{ required: true, message: "请输入自定义内容", trigger: "blur" }],
  });
  // 上传图片
  import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
  import type { UploadFile } from "element-plus";
  const dialogImageUrl = ref("");
  const dialogVisible = ref(false);
  const disabled = ref(false);
  const handleRemove = (file: UploadFile) => {
    console.log(file);
  };
  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    dialogVisible.value = true;
  };
  const handleDownload = (file: UploadFile) => {
    console.log(file);
  };
  // 单选框
  const radio = ref(3);
  // 提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log("submit!");
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  const Replyclose = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
</script>
<style lang="scss" scoped>
  .infoReply {
    .el-dialog-div {
      height: 69vh;
      .el-form-item {
        margin-right: 50px;
        margin-bottom: 40px;
        .el-radio-group {
          .el-radio {
            margin-right: 50px;
          }
        }
      }
      .btn {
        width: 100px;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
</style>
