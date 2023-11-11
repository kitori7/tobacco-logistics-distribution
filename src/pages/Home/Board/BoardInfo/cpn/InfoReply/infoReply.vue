<template>
  <div class="infoReply">
    <el-dialog
      v-model="isReply"
      width="70%"
      center
      top="4%"
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
          <el-form-item
            :label="
              props.replyType == String(1) ? '营销部反馈 :' : '物流部反馈 :'
            "
            prop="replyContent"
          >
            <el-input
              v-model="replyForm.replyContent"
              maxlength="100"
              placeholder="点击输入自定义内容......"
              show-word-limit
              :autosize="{ minRows: 5, maxRows: 10 }"
              type="textarea"
          /></el-form-item>
          <el-form-item label="上传照片 :">
            <el-upload
              accept="image/*"
              multiple
              :show-file-list="true"
              list-type="picture-card"
              :on-change="handleChange"
              :auto-upload="false"
              :http-request="httpRequest"
            >
              <el-icon><Plus /></el-icon>
              <!-- <template #file="{ file }">
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
              </template> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="状态修改为 :" prop="feedbackStatus">
            <el-radio-group v-model="replyForm.feedbackStatus">
              <template v-for="item in stateBtn" :key="item.index">
                <el-radio :label="item.index">{{ item.stateText }}</el-radio>
              </template>
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
  import { useBoardStore } from "@/store/board";
  const boardStore = useBoardStore();
  const stateBtn = [
    { index: "0", stateText: "未处理" },
    { index: "1", stateText: "处理中" },
    { index: "2", stateText: "已处理" },
    { index: "3", stateText: "无需处理" },
  ];
  // 表单信息
  interface ReplyForm {
    replyContent: string;
    feedbackStatus: string;
  }
  const replyForm = reactive<ReplyForm>({
    replyContent: "",
    feedbackStatus: "",
  });
  const isReply = ref<boolean>(true);
  interface IProps {
    replyType: "1" | "2";
  }
  const props = defineProps<IProps>();
  const feedbackId = ref<number>(13);
  function handleReply(id: number) {
    isReply.value = true;
    feedbackId.value = id;
  }
  defineExpose({
    handleReply,
  });

  //  文本框
  import type { FormInstance, FormRules } from "element-plus";
  const replyFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<ReplyForm>>({
    replyContent: [
      { required: true, message: "请输入自定义内容", trigger: "blur" },
    ],
    feedbackStatus: [
      {
        required: true,
        message: "请选择反馈信息处理状态",
        trigger: "change",
      },
    ],
  });
  // 上传图片
  const fileList = ref([]);

  const handleChange = (file: any) => {
    console.log(file);
    fileList.value = file;
  };
  function httpRequest(option) {
    //将图片存到数组中
    console.log(option);

    fileList.value.push(option);
  }

  import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
  // import type { UploadFile } from "element-plus";
  // const dialogImageUrl = ref("");
  // const dialogVisible = ref(false);
  // const disabled = ref(false);
  // const handleRemove = (file: UploadFile) => {
  //   console.log(file);
  // };
  // const handlePictureCardPreview = (file: UploadFile) => {
  //   dialogImageUrl.value = file.url!;
  //   dialogVisible.value = true;
  // };
  // const handleDownload = (file: UploadFile) => {
  //   console.log(file);
  // };
  // 提交
  const submitForm = async (formEl?: FormInstance) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log(fileList.value);
        let dataForm = new FormData();
        dataForm.append("feedbackId", feedbackId.value);
        dataForm.append("replyContent", replyForm.replyContent);
        dataForm.append("replyType", props.replyType);
        dataForm.append("feedbackStatus", replyForm.feedbackStatus);

        dataForm.append("fileList", fileList.value.raw);
        // fileList.value.forEach((it, index) => {
        //   dataForm.append("fileList", it.file);
        // });
        boardStore.postInfoAddAction(dataForm);
      } else {
        console.log("error", fields);
      }
    });
  };
  const Replyclose = (formEl?: FormInstance) => {
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
