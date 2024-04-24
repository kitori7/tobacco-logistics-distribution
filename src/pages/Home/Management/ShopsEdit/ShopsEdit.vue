<template>
    <div class="ShopsEdit">
      <el-dialog
        title="修改信息"
        v-model="ShopsEditIsOpen"
        width="80%"
        @close="closeShopsEdit(ShopsEditFormRef)"
      >
      <div>
        <div class="ShopsEditInfo">
            <el-form
            class="form"
            ref="userFormRef"
          >
          <div class="leftInfo"><div class="info">客户编码：440282104882</div>
          <el-form-item label="地址">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
          <el-form-item label="商铺经度">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属大区">
              <el-select >
              </el-select>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="订货电话">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <div class="info">订货周期：每周</div>
            <el-form-item label="客户专员id">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <div class="info">创建时间：2008.04.02</div></div>
            <div class="centerInfo">
                <el-form-item label="客户名称">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <div class="info">所属行政区：南雄市</div>
            <el-form-item label="商铺维度">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <div class="info">所属聚集区：</div>
            <el-form-item label="客户状态">
              <el-select >
              </el-select>
            </el-form-item>
            <el-form-item label="收货电话">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="返销周期">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户专员名称">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <div class="info">更新时间：2024.04.02</div>
            </div>
            <div class="rightInfo">
                <el-form-item label="商圈类型">
              <el-select >
              </el-select>
            </el-form-item>
            <div class="info">路线id：2024.04.02</div>
           
            <el-form-item label="客户档位">
              <el-select >
              </el-select>
            </el-form-item>
            <el-form-item label="备用收货电话">
              <el-input
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
        </div>
        </el-form>
        </div>
        <div class="ShopsEditBtn">
            <el-button @click="closeShopsEdit(userFormRef)">取消</el-button>
              <el-button>确认</el-button>
        </div>
      </div>
      </el-dialog>
    </div>
  </template>
  <script lang="ts" setup>
   import type { FormInstance} from "element-plus";
   const ShopsEditFormRef = ref<FormInstance>();
    const  ShopsEditIsOpen = ref<boolean>(false);
    const userFormRef = ref<FormInstance>();
    const closeShopsEdit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    ShopsEditIsOpen.value = false;
    // photo.value = "";
    formEl.resetFields();
  };
  defineExpose({
    ShopsEditIsOpen
  });
</script>
  <style lang="scss" scoped>
  .ShopsEdit {
    margin: 25px auto;
    width: 48vw;
    color: #73e1ff;
    font-size: 20px;
    
    .form{
        display: flex;
        .info{
            height: 45px;
            font-size: 20px;
            color: rgb(204, 255, 255);
        }
        .leftInfo{
        width: 30%;
        margin-left: 30px;
    }
     .centerInfo{
        width: 30%;
        margin-left: 50px;
     }
     .rightInfo{
        width: 30%;
        margin-left: 50px;
     }
    }
    .ShopsEditBtn{
        display: flex;
      justify-content: center;
      .el-button{
        width: 85px;
        margin: 30px 5vw;
      }
    }
  }
</style>
