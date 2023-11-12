<template>
  <div class="InfoItem">
    <el-dialog v-model="isOpen" width="70%" top="4%" title="nihao">
      <template #header>
        <div class="my-header">
          <div class="el-dialog-div-top">
            <div class="round" :class="stateColor(Item?.feedbackStatus)"></div>
            <p>
              {{ Item?.feedbackInformation }}&nbsp;&nbsp;({{
                stateText(Item?.feedbackStatus)
              }})
            </p>
          </div>
        </div>
      </template>
      <div class="el-dialog-div">
        <el-scrollbar class="scroll">
          <div class="el-dialog-div-info">
            <template v-for="(value,,index) in itemInfo" :key="index"
              ><div class="el-dialog-div-info-item">
                {{ InfoArray[index] }}:&nbsp;&nbsp;{{ value }}
              </div></template
            >
          </div>
          <div class="el-dialog-div-img">
            <template v-for="item in feedbackImg" :key="item">
              <div class="el-dialog-div-img-item">
                <img :src="item" alt="" />
              </div>
            </template>
          </div>
          <div class="el-dialog-div-recover">
            <span class="line"></span>
            <el-button @click="replyItemClick(id)">点击回复</el-button>
            <span class="line"></span>
          </div>
          <template v-for="item in replyData" :key="item.replyId">
            <div class="reply-text">
              <span
                >{{
                  item.replyType == "1" ? "送货部回复" : "营销部回复"
                }}:&nbsp;&nbsp;{{ item.replyContent || "没有回复消息" }}</span
              >
              <div class="reply-date">{{ item.createTime }}</div>
            </div>
            <div class="reply-img">
              <template
                v-for="imglist in mapPath(item.replyFilePathList as string[])"
                :key="index"
              >
                <div class="reply-img-item">
                  <img :src="imglist" alt="" />
                </div>
              </template>
            </div>
          </template>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import type { IBoardItem, ItemInfo, InfoDetail } from "@/types/board";
  import { useBoardStore } from "@/store/board";
  const boardStore = useBoardStore();
  const emit = defineEmits(["replyClick"]);
  const isOpen = ref<boolean>(false);
  const id = ref<number>(0);
  const InfoArray: string[] = [
    "客户名称",
    "送货员",
    "订单日期",
    "客户编号",
    "客户专员",
    "送货路线",
    "客户地址",
  ];
  const itemInfo = ref<ItemInfo>({
    contactName: "",
    deliveryName: "",
    orderDate: "",
    customerCode: "",
    customerManagerName: "",
    routeName: "",
    storeAddress: "",
  });
  // 反馈消息类型
  const Item = ref<IBoardItem>();
  function stateColor(state?: string) {
    switch (state) {
      case "0":
        return "notProcessed";
      case "1":
        return "dispose";
      case "2":
        return "processed";
      case "3":
        return "notDispose";
    }
  }
  function stateText(state?: string) {
    switch (state) {
      case "0":
        return "未处理";
      case "1":
        return "处理中";
      case "2":
        return "已处理";
      case "3":
        return "无需处理";
    }
  }
  // 匹配图片路径
  function mapPath(array: string[]) {
    const newArray = array.map((i: string) => {
      return "http://172.16.0.166:8080" + i;
    });
    return newArray;
  }
  // 回复信息列表
  const replyData = ref<InfoDetail[]>([]);
  // 获取数据和图片
  const feedbackImg = ref<string[]>([]);
  function handleOpen(item: IBoardItem) {
    isOpen.value = true;
    id.value = item.feedbackId;
    Item.value = item;
    boardStore.getDetailData(id.value);
    watch(
      () => boardStore.detail,
      (n) => {
        replyData.value = n as InfoDetail[];
        let key: keyof ItemInfo;
    for (key in itemInfo.value) {
      itemInfo.value[key] = item[key];
    }
    feedbackImg.value = mapPath(item.feedbackFileList);
      }
    );
  }
  function getReplyData(id: number) {
    boardStore.getDetailData(id);
    watch(
      () => boardStore.detail,
      (n) => {
        replyData.value = n as InfoDetail[];
      }
    );
  }
  defineExpose({
    handleOpen,
    getReplyData,
  });
  // 点击回复
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
    .my-header {
      height: 10px;
    }
    .el-dialog-div-top {
      display: flex;
      align-items: center;
      p {
        margin: 0 15px;
        font-size: 25px;
      }
    }
    .el-dialog-div {
      height: 69vh;
      overflow: auto;
      .el-dialog-div-info {
        margin: 0px 40px 10px 40px;
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
        flex-wrap: wrap;
        .el-dialog-div-img-item {
          margin: 10px 30px;
          height: 30vh;
          border: 2px solid #73e1ffce;
          img {
            height: 100%;
            width: 100%;
          }
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
      .reply-text {
        font-size: larger;
        border-top: 1px solid #73e1ffce;
        margin-top: 20px;
        padding: 10px 30px;
        display: flex;
        justify-content: space-between;
        .reply-date {
          margin-right: 30px;
        }
      }
      .reply-img {
        display: flex;
        flex-wrap: wrap;
        .reply-img-item {
          margin: 10px 30px;
          height: 20vh;
          border: 1px solid #73e1ffce;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>
