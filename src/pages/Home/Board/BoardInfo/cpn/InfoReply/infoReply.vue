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
            :label="props.replyType == '1' ? '物流部反馈 :' : '营销部反馈 :'"
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
              v-model:file-list="replyForm.UploadFile"
              accept="image/*"
              multiple
              action="fakeaction"
              :show-file-list="true"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="(handleChange as any)"
              ref="uploadrefss"
            >
              <el-icon><Plus /></el-icon>
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
  import { storeToRefs } from "pinia";
  import { useBoardStore } from "@/store/board";
  import type { UploadUserFile, UploadFile, UploadFiles } from "element-plus";

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
    UploadFile: UploadUserFile[];
  }
  const replyForm = reactive<ReplyForm>({
    replyContent: "",
    feedbackStatus: "",
    UploadFile: [],
  });
  const isReply = ref<boolean>(false);
  interface IProps {
    replyType?: "1" | "2";
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
  const fileList = ref<UploadFiles>([]);
  const uploadrefss = ref();
  const handleChange = (files: UploadFiles) => {
    fileList.value = files;
    console.log(fileList.value);
    console.log(props.replyType);
  };
  import { Plus } from "@element-plus/icons-vue";
  // 提交
  const emit = defineEmits(["getnewClick"]);
  const { addState } = storeToRefs(boardStore);
  const submitForm = async (formEl?: FormInstance) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        let dataForm = new FormData();
        dataForm.append("feedbackId", feedbackId.value as any);
        dataForm.append("replyContent", replyForm.replyContent);
        dataForm.append("replyType", props.replyType as string);
        dataForm.append("feedbackStatus", replyForm.feedbackStatus);
        fileList.value.forEach((it: UploadFile) => {
          dataForm.append("fileList", it.raw as any);
        });
        boardStore.postInfoAddAction(dataForm);
        if (addState.value == 200) {
          isReply.value = false;
          emit("getnewClick");
        }
      } else {
        console.log("error", fields);
      }
    });
  };

  const Replyclose = (formEl?: FormInstance) => {
    if (!formEl) return;
    uploadrefss.value.clearFiles();
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
