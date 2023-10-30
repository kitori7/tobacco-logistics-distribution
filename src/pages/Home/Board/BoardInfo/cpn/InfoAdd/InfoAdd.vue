<template>
  <div class="InfoAdd">
    <el-dialog v-model="isOpen" width="90%">
      <div class="dialog-content">
        <div class="form-content">
          <el-form :inline="true" label-width="100">
            <el-form-item label="客户名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="客户编码">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="配送域">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="送货路径">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="订单日期">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="送货部">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="送货员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="客户专员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="margin-left: 100px">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-form-item class="item" label="编辑异常信息">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 20 }"
          ></el-input>
        </el-form-item>
        <el-form-item class="item" label="上传签收照片">
          <el-upload list-type="picture-card">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-button class="btn" size="large">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { Plus } from "@element-plus/icons-vue";
  const isOpen = ref<boolean>(false);
  function handleOpen() {
    isOpen.value = true;
  }

  defineExpose({
    handleOpen: handleOpen,
  });
</script>
<style lang="scss" scoped>
  .InfoAdd {
    .dialog-content {
      margin: 40px;
      .form-content {
        padding: 30px;
        border: 1px solid $processed;
      }
      .item {
        margin-top: 50px;
      }
      .btn{
        position: relative;
        left: 50%;
      }
    }

    .el-form-item__label {
      font-size: 15px !important;
    }
  }
</style>
