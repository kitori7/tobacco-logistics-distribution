<template>
  <div class="InfoAdd">
    <el-dialog
      v-model="isOpen"
      width="90%"
      @closed="resetForm(ruleFormRef, ruleFormRef2)"
    >
      <div class="dialog-content">
        <div class="form-content">
          <el-form
            :inline="true"
            :model="addForm"
            label-width="130"
            :rules="rules"
            ref="ruleFormRef"
          >
            <el-form-item label="客户名称" prop="customerCode">
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
            <el-form-item label="配送域" prop="areaName">
              <el-select v-model="addForm.areaName" placeholder="请选择配送域">
                <el-option
                  v-for="item in boardStore.cond?.areaList"
                  :key="item.areaId"
                  :value="item.areaName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="路径名称" prop="routeName">
              <el-select
                v-model="addForm.routeName"
                placeholder="请选择路径名称"
                @change="
                  (e) => {
                    selectChange(e, false);
                  }
                "
              >
                <el-option
                  v-for="item in boardStore.cond?.routeList"
                  :key="item.routeId"
                  :value="item.routeName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单日期" prop="orderDate">
              <el-date-picker
                v-model="addForm.orderDate"
                type="datetime"
                placeholder="选择日期时间"
                value-format="YYYY-MM-DD hh:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="送货员" prop="deliveryName">
              <el-select
                v-model="addForm.deliveryName"
                placeholder="请选择送货员名称"
                @change="
                  (e) => {
                    selectChange(e, true);
                  }
                "
              >
                <el-option
                  v-for="item in boardStore.cond?.deliveryUserList"
                  :key="item.workNumber"
                  :value="item.userName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户专员" prop="customerManagerName">
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
          </el-form>
        </div>
        <el-form :rules="rules" :model="addForm" ref="ruleFormRef2">
          <el-form-item
            class="item"
            label="编辑异常信息"
            prop="feedbackInformation"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 20 }"
              v-model="addForm.feedbackInformation"
            ></el-input>
          </el-form-item>
          <el-form-item class="item" label="上传签收照片">
            <el-upload
              accept="image/*"
              multiple
              list-type="picture-card"
              :auto-upload="false"
              v-model:file-list="addForm.fileList"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-button
            class="btn"
            size="large"
            @click="submitForm(ruleFormRef, ruleFormRef2)"
            >提交</el-button
          >

          <el-button
            class="btn"
            size="large"
            @click="resetForm(ruleFormRef, ruleFormRef2)"
            >清空</el-button
          >
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { useBoardStore } from "@/store/board";
  import { IAddData } from "@/types/board";
  import { Plus } from "@element-plus/icons-vue";
  import type { FormInstance, FormRules } from "element-plus";
  const boardStore = useBoardStore();
  // 打开
  const isOpen = ref<boolean>(false);
  function handleOpen(feedbackType: "1" | "2") {
    isOpen.value = true;
    addForm.value.feedbackType = feedbackType;
  }
  defineExpose({
    handleOpen,
  });
  const emit = defineEmits(["addSuccess"])
  const ruleFormRef = ref<FormInstance>();
  const ruleFormRef2 = ref<FormInstance>();
  //校验
  const rules = reactive<FormRules<IAddData>>({
    customerCode: [
      { required: true, message: "请选择客户名称", trigger: "blur" },
    ],
    areaName: [{ required: true, message: "请选择大区名称", trigger: "blur" }],
    routeName: [{ required: true, message: "请选择路线名称", trigger: "blur" }],
    orderDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
    deliveryName: [
      { required: true, message: "请选择送货员", trigger: "blur" },
    ],
    customerManagerName: [
      { required: true, message: "请选择客户专员", trigger: "blur" },
    ],
    feedbackInformation: [
      { required: true, message: "请填写异常信息", trigger: "blur" },
    ],
  });

  // 添加
  const addForm = ref<IAddData>({
    areaName: "",
    customerCode: "",
    deliveryName: "",
    deliveryWorkNumber: "",
    feedbackInformation: "",
    feedbackType: "1",
    orderDate: "",
    routeId: 0,
    routeName: "",
    customerManagerName: "",
    fileList: [],
  });
  // 选项修改
  function selectChange(value: string, isDeli: boolean) {
    console.log(value, isDeli);
    if (isDeli) {
      const current = boardStore.cond?.deliveryUserList.find((item) => {
        return item.userName === value;
      });
      addForm.value.deliveryWorkNumber = current?.workNumber as string;
    } else {
      const current = boardStore.cond?.routeList.find((item) => {
        return item.routeName === value;
      });
      addForm.value.routeId = Number(current?.routeId);
    }
  }
  // 提交
  const submitForm = async (
    formEl: FormInstance | undefined,
    formEl2: FormInstance | undefined
  ) => {
    if (!(formEl && formEl2)) return;
    formEl
      .validate(() => {})
      .then((res) => {
        formEl2.validate((valid, fields) => {
          if (valid) {
            if (res) {
              // 处理图片

              // 发请求
              const formData = new FormData();
              formData.append("areaName", addForm.value.areaName);
              formData.append("customerCode", addForm.value.customerCode);
              formData.append("deliveryName", addForm.value.deliveryName);
              formData.append(
                "deliveryWorkNumber",
                addForm.value.deliveryWorkNumber
              );
              formData.append(
                "feedbackInformation",
                addForm.value.feedbackInformation
              );
              formData.append("feedbackType", addForm.value.feedbackType);
              formData.append(
                "routeId",
                addForm.value.routeId as unknown as string
              );
              formData.append("routeName", addForm.value.routeName);
              formData.append(
                "customerManagerName",
                addForm.value.customerManagerName as unknown as string
              );
              formData.append(
                "orderDate",
                addForm.value.orderDate as unknown as string
              );
              addForm.value.fileList?.forEach((item) => {
                formData.append("fileList", item.raw);
              });
              boardStore
                .addFeedbackAction(formData as unknown as IAddData)
                .then(() => {
                  isOpen.value = false;
                  emit("addSuccess")
                });
            }
          } else {
            console.log("error submit!", fields);
          }
        });
      });
  };

  const resetForm = (
    formEl: FormInstance | undefined,
    formEl2: FormInstance | undefined
  ) => {
    if (!(formEl && formEl2)) return;
    formEl.resetFields();
    formEl2.resetFields();
    addForm.value.fileList = [];
    console.log(addForm.value);
  };
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
