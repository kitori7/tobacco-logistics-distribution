<template>
  <div class="InfoAdd">
    <el-dialog v-model="isOpen" width="90%">
      <div class="dialog-content">
        <div class="form-content">
          <el-form :inline="true" :model="addForm" label-width="100">
            <el-form-item label="客户名称">
              <el-select
                v-model="addForm.customerCode"
                placeholder="请选择客户名称"
              >
                <el-option
                  v-for="item in boardStore.cond?.storeList"
                  :key="item.customerCode"
                  :label="item.contactName"
                  :value="item.customerCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配送域">
              <el-select v-model="addForm.areaName" placeholder="请选择配送域">
                <el-option
                  v-for="item in boardStore.cond?.areaList"
                  :key="item.areaId"
                  :value="item.areaName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="路径名称">
              <el-select
                v-model="addForm.routeName"
                placeholder="请选择路径名称"
              >
                <el-option
                  v-for="item in boardStore.cond?.routeList"
                  :key="item.routeId"
                  :value="item.routeName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单日期">
              <el-date-picker
                v-model="addForm.orderDate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="送货员">
              <el-select
                v-model="addForm.deliveryName"
                placeholder="请选择送货员名称"
                @change="selectChange"
              >
                <el-option
                  v-for="item in boardStore.cond?.deliveryUserList"
                  :key="item.workNumber"
                  :value="item.userName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户专员">
              <el-select
                v-model="addForm.customerManagerName"
                placeholder="请选择客户专员名称"
              >
                <el-option
                  v-for="item in boardStore.cond?.customerManagerList"
                  :key="item.workNumber"
                  :value="item.userName"
                ></el-option>
              </el-select>
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
            v-model="addForm.feedbackInformation"
          ></el-input>
        </el-form-item>
        <el-form-item class="item" label="上传签收照片">
          <el-upload
            :on-success="onSuccess"
            v-model="addForm.fileList"
            list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-button class="btn" size="large" @click="handelSubmit"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { useBoardStore } from "@/store/board";
  import { IAddData } from "@/types/board";
  import { Plus } from "@element-plus/icons-vue";
  import { useRoute } from "vue-router";
  const boardStore = useBoardStore();
  const route = useRoute();
  // 打开
  const isOpen = ref<boolean>(false);
  function handleOpen() {
    isOpen.value = true;
  }
  defineExpose({
    handleOpen,
  });

  // 添加
  const addForm = ref<IAddData>({
    areaName: "",
    customerCode: "",
    deliveryName: "",
    deliveryWorkNumber: "",
    feedbackInformation: "",
    feedbackType: route.query.feedbackType as "1" | "2",
    orderDate: "",
    routeId: 0,
    routeName: "",
    customerManagerName: "",
    fileList: [],
  });
  // 选项修改
  function selectChange(value: string) {
    const current = boardStore.cond?.deliveryUserList.find((item) => {
      return item.userName === value;
    });
    addForm.value.deliveryWorkNumber = current?.workNumber as string;
  }
  // 提交
  function handelSubmit() {
    console.log({ ...addForm.value });
  }

  // 文件上传
  function onSuccess(response: any, uploadFile: any, uploadFiles: any) {
    console.log(response, uploadFile, uploadFiles);
  }
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
      .btn {
        position: relative;
        left: 50%;
      }
    }

    .el-form-item__label {
      font-size: 15px !important;
    }
  }
</style>
