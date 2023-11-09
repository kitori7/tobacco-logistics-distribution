<template>
  <div class="InfoItem">
    <el-dialog v-model="isOpen" width="70%" center top="6%">
      <div class="el-dialog-div">
        <div class="el-dialog-div-top">
          <div class="round notProcessed"></div>
          <p>烟盒被压坏(未处理)</p>
        </div>

        <div class="el-dialog-div-info">
          <div class="el-dialog-div-info-item">客户名称：某某某某某某</div>
          <div class="el-dialog-div-info-item">送货员：某某某</div>
          <div class="el-dialog-div-info-item">订单日期：20312321</div>
          <div class="el-dialog-div-info-item">客户编码：2312321</div>
          <div class="el-dialog-div-info-item">客户专员：某某某</div>
          <div class="el-dialog-div-info-item">送货路线：某某某某某某某某</div>
          <div class="el-dialog-div-info-item">
            客户地址：某某某某某某某某某某某某某某某某某某某某某某某
          </div>
        </div>
        <div class="el-dialog-div-img">
          <div class="el-dialog-div-img-item"></div>
          <div class="el-dialog-div-img-item"></div>
          <div class="el-dialog-div-img-item"></div>
        </div>

        <div class="el-dialog-div-recover">
          <span class="line"></span>
          <el-button @click="replyItemClick(id)">点击回复</el-button>
          <span class="line"></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import type { IBoardItem } from "@/types/board";

  const isOpen = ref<boolean>(false);
  const id = ref<number>(0);
  function handleOpen(item: IBoardItem) {
    isOpen.value = true;
    id.value = item.feedbackId;
    console.log(id.value);
  }

  defineExpose({
    handleOpen: handleOpen,
  });
  // 点击回复
  const emit = defineEmits(["replyClick"]);
  function replyItemClick(id: number) {
    emit("replyClick", id);
  }
</script>
<style lang="scss" scoped>
  .InfoItem {
    color: white;
  
    /* 此处的 div 可以依照情况替换成对应的元素名称 */
    div::-webkit-scrollbar {
      display: none;
    }

    .el-dialog-div {
      height: 69vh;
      overflow: auto;
      
      .el-dialog-div-top {
        display: flex;
        align-items: center;
        
        p {
          margin: 0 15px;
          font-size: 25px;
        }
      }
      .el-dialog-div-info {
        margin: 20px 40px;
        display: flex;
        flex-wrap: wrap;
        font-size: 18px;
        .el-dialog-div-info-item {
          box-sizing: border-box;
          padding: 10px;
          flex: 33.3%;
        }
      }
      .el-dialog-div-img {
        display: flex;
        .el-dialog-div-img-item {
          margin: 30px 55px;
          flex: 1;
          // width: 200px;
          height: 30vh;
          border: 2px solid #73e1ffce;
        }
      }
      .el-dialog-div-recover {
        height: 50px;
        line-height: 60px;
        text-align: center;
        .line {
          margin: 0 10px;
          display: inline-block;
          width: 150px;
          border-top: 2px solid #73e1ffce;
          vertical-align: 4%;
        }
      }
    }
  }
</style>
