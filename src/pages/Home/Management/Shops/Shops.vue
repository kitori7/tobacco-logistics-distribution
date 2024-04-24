<template>
  <div class="Shops">
    <div style="display: flex">
      <div class="top">
        <el-input
          class="input"
          v-model="value"
          style="width: 480px"
          placeholder="请点击搜索"
          @focus="isShow = true"
        />
        <el-button class="btn">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
        <div class="search" v-show="isShow">
          <div class="off" @click="isShow = false">x</div>
          <el-form class="form">
            <el-form-item label="客户编码" style="width: 47%">
              <el-input v-model="code"></el-input>
            </el-form-item>
            <el-form-item label="负责人" style="width: 47%; margin-left: 20px">
              <el-input v-model="head"></el-input>
            </el-form-item>
            <el-form-item label="商铺地址" style="width: 100%">
              <el-input v-model="address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                class="select"
                v-model="value"
                placeholder="全部区域"
                size="large"
              >
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                class="select"
                v-model="value"
                placeholder="全部路线"
                size="large"
              >
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                class="select"
                v-model="value"
                placeholder="全部行政区"
                size="large"
              >
              </el-select>
            </el-form-item>
            <div class="btn-content">
              <el-button>清空</el-button>
              <el-button>搜索</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="second">
        <el-button class="btn">
          <el-icon> <Plus /> </el-icon>添加商铺
        </el-button>
        <el-button class="btn" @click="AreaEdit = true">
          <el-icon> <Place /> </el-icon>调整归属地
        </el-button>
        <el-button class="btn">
          <el-icon> <Delete /> </el-icon>批量删除
        </el-button>
        <el-button class="btn" @click="openShopsEdit">
          <el-icon> <EditPen /> </el-icon>修改信息
        </el-button>
      </div>
    </div>

    <div class="main">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%; margin-left: 20px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户编码" width="150"/>
        <el-table-column label="客户名称" width="200" />
        <el-table-column label="负责人" width="100" />
        <el-table-column label="订货电话" width="120" />
        <el-table-column label="地址" width="380" />
        <el-table-column label="所属行政区" width="120" />
        <el-table-column label="所属配送线路" width="180" />
      </el-table>
    </div>
    <ShopsEdit ref="ShopsEditRef"></ShopsEdit>
    <el-dialog width="40%"  @close="AreaEdit = false" v-model="AreaEdit">
      <div style="margin-left: 30px;"> <div class="info">现选择商铺所属行政区为：南雄市</div>
      <el-form-item label="请选择调整后的行政区:">
              <el-select >
              </el-select>
            </el-form-item></div>
            <el-button class="confirmArea">确认</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import ShopsEdit from '../ShopsEdit/ShopsEdit.vue'
  import {
    Search,
    Plus,
    Place,
    Delete,
    EditPen,
  } from "@element-plus/icons-vue";
  const value = ref("");
  import { ElTable } from "element-plus";
  interface User {
    date: string;
    name: string;
    address: string;
  }
  const multipleTableRef = ref<InstanceType<typeof ElTable>>();
  const multipleSelection = ref<User[]>([]);
  const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val;
  };
  const tableData: User[] = [
  
  ];

  // 获取焦点弹窗
  const isShow = ref<boolean>(false);
  const code = ref<number>();
  const head = ref<string>();
  const address = ref<string>();

  // 修改商铺
  const ShopsEditRef = ref<InstanceType<typeof ShopsEdit>>();
    function openShopsEdit() {
    typeof ShopsEditRef.value?.ShopsEditIsOpen === "boolean"
      ? (ShopsEditRef.value.ShopsEditIsOpen = true)
      : false;
  }
  // 调整归属地
  const AreaEdit = ref<boolean>()
</script>
<style lang="scss" scoped>
  .Shops {
    .top {
      margin: 10px 10px;

      .select {
        margin: 0 10px;
      }

      .input {
        margin: 0 10px;
      }

      .btn {
        box-sizing: border-box;
        width: 2.3vw;
        height: 4.1vh;
      }
      .search {
        position: absolute;
        z-index: 9;
        background-color: #041c3f;
        width: 500px;
        margin-left: 10px;
        .off {
          width: 20px;
          height: 20px;
          background-color: #9addf6;
          position: absolute;
          right: 0;
          color: #041c3f;
          text-align: center;
          cursor: pointer;
        }
        .form {
          display: flex;
          flex-wrap: wrap;
          padding: 20px;
          align-items: center;
          border: 1px solid #9addf6;
        }

        .btn-content {
          margin: 0 auto;
        }

        .el-form-item {
          width: 33.3%;
        }
      }
    }

    .second {
      margin: 10px;

      .btn {
        margin: 0 10px;
        box-sizing: border-box;
        width: 6.5vw;
        height: 4.1vh;
      }
    }
    .main {
      :deep(.el-table__header th) {
        background-color: #9addf6;
      }
    }
  }
  .info{
    height: 45px;
    font-size: 20px;
    color: rgb(204, 255, 255);
    margin-bottom: 30px;
  }
  .confirmArea{
    margin-top: 100px;
    width: 100px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
</style>
