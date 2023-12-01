<template>
  <div class="groupAddDialog">
    <el-dialog
      title="添加用户"
      v-model="groupAddOpen"
      width="80%"
      @close="closeGroupAdd(userFormRef)"
    >
      <div class="groupAddInfo">
        <!-- <div class="groupAddOne">
          <div class="groupAvatarBorder"><img :src="photo" alt="" /></div>
          <el-upload
            accept="image/*"
            multiple
            action="fakeaction"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
            ref="uploadref"
          >
            <el-button type="primary" class="groupAvatarUploadButton"
              >上传头像</el-button
            >
          </el-upload>
        </div> -->
        <div class="groupAddTwo">
          <el-form
            :inline="true"
            style="height: 100%"
            label-width="110"
            :rules="rules"
            ref="userFormRef"
            :model="addUserData"
          >
            <el-form-item label="工号" prop="work_number">
              <el-input
                v-model="addUserData.work_number"
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="user_name">
              <el-input
                v-model="addUserData.user_name"
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input
                v-model="addUserData.phone"
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="addUserData.email"
                placeholder="点击输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-select v-model="addUserData.department">
                <el-option
                  v-for="item in groupList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职时间" prop="sign_time">
              <el-date-picker
                v-model="addUserData.sign_time"
                value-format="YYYY-MM-DD hh:mm:ss"
                type="datetime"
                placeholder="点击输入"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="角色"
              prop="role_id"
              class="groupAddRadioGroup"
            >
              <el-select v-model="addUserData.role_id">
                <el-option
                  v-for="item in rolesList"
                  :key="item.role_id"
                  :label="item.role_name"
                  :value="item.role_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <div class="groupAddMessage">默认密码 : ycwl1234</div> -->
          </el-form>
        </div>
        <div class="groupAddSetting">
          <el-button class="groupAddCancel" @click="closeGroupAdd(userFormRef)"
            >取消</el-button
          >
          <el-button
            class="groupAddConfirm"
            @click="groupAddConfirm(userFormRef)"
            >确认</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { useGroupStore } from "@/store/group";
  import { addUserForm , IRole } from "@/types/group";
  import type { FormInstance, FormRules } from "element-plus";
  const groupStore = useGroupStore();
  const groupAddOpen = ref(false);
  defineExpose({
    groupAddOpen,
  });
  const userFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<addUserForm>>({
    user_name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
    department: [{ required: true, message: "请选择部门", trigger: "blur" }],
    sign_time: [{ required: true, message: "请选择入职时间", trigger: "blur" }],
    work_number: [{ required: true, message: "请输入工号", trigger: "blur" }],
    role_id: [{ required: true, trigger: "blur" }],
  });
  // const photo = ref<string>("");
  const addUserData = ref<addUserForm>({
    user_name: "",
    phone: "",
    email: "",
    department: "",
    role_id: 0,
    work_number: "",
    sign_time: "",
    avatarPath: "",
  });

  const closeGroupAdd = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    groupAddOpen.value = false;
    // photo.value = "";
    formEl.resetFields();
  };
  //固定班组信息
  const groupList = [
    "班组一",
    "班组二",
    "班组三",
    "班组四",
    "班组五",
    "班组六",
    "营销部",
  ];
  const rolesList = ref<Array<IRole>>()
  groupStore.getRoleAction().then(()=>{
    rolesList.value=groupStore.roles
  })
  const emit = defineEmits(["renewUser"]);
  const groupAddConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (addUserData.value.role_id != 0) {
          groupStore.postAddUserAction(addUserData.value).then((res) => {
            if (res.code == 200) {
              emit("renewUser");
              closeGroupAdd(userFormRef.value);
            }
          });
        } else {
          ElMessage.error("请选择角色");
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  //   上传图片
  // import type { UploadFile } from "element-plus";
  // const fileList = ref<UploadFile>();
  // const handleChange = (file: UploadFile) => {
  //   fileList.value = file;
  //   let dataForm = new FormData();
  //   dataForm.append("photo", fileList.value?.raw as any);
  //   groupStore.userAvatarAction(dataForm).then((res) => {
  //     addUserData.value.avatarPath = res.data;
  //     photo.value = "http://172.16.0.166:8080/file" + res.data;
  //   });
  // };
</script>
<style lang="scss" scoped>
  .groupAddInfo {
    margin: 10px auto;
    width: 48vw;
    color: #73e1ff;
    font-size: 20px;
    // .groupAddOne {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: center;
    //   align-items: flex-end;
    //   margin-left: 130px;
    //   .groupAvatarBorder {
    //     width: 170px;
    //     height: 230px;
    //     border: 1px solid #73e1ff;
    //     img {
    //       width: 100%;
    //       height: 100%;
    //       object-fit: cover;
    //     }
    //   }
    //   .groupAvatarUploadButton {
    //     margin-left: 10px;
    //     width: 90px;
    //     height: 42px;
    //   }
    // }
    .groupAddTwo {
      .el-form-item {
        width: 40%;
        margin: 35px;
      }

      // .groupAddMessage {
      //   color: $processed;
      //   padding-left: 55px;
      // }
      .groupAddRadioGroup {
        width: 80%;
        .el-form-item__label {
          margin: 20px 25px;
        }
        .el-radio--large {
          margin: 0 0 5px 5px;
          display: flex;
          flex-wrap: wrap;
          flex: 30%;
        }
      }
    }

    .groupAddSetting {
      display: flex;
      justify-content: center;
      .groupAddCancel,
      .groupAddConfirm {
        width: 85px;
        margin: 30px 5vw;
      }
    }
  }
</style>
