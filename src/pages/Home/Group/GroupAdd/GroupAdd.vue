<template>
  <div class="groupAddDialog">
    <el-dialog v-model="groupAddOpen" width="70%" @close="closeGroupAdd">
      <div class="groupAddInfo">
        <div class="groupAddOne">
          <div class="groupAvatarBorder"><img src="" alt="" /></div>
          <el-upload
            accept="image/*"
            multiple
            action="fakeaction"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
            ref="uploadrefss"
          >
            <el-button
              type="primary"
              class="groupAvatarUploadButton"
              @click="uploadImg"
              >上传头像</el-button
            >
          </el-upload>
        </div>
        <div class="groupAddTwo">
          <el-form
            :inline="true"
            style="height: 100%"
            label-width="100"
            :rules="rules"
            ref="userFormRef"
            :model="addUserData"
          >
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="addUserData.user_name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="addUserData.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserData.email"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-select v-model="addUserData.department">
                <el-option
                  v-for="item in linshiList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职" prop="signTime">
              <el-date-picker
                v-model="addUserData.sign_time"
                value-format="YYYY-MM-DD hh:mm:ss"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
              <el-input v-model="addUserData.work_number"></el-input>
            </el-form-item>
            <div class="groupAddMessage">
              <span>工号: 1232131321</span>
              <span style="margin-left: 7vw">默认密码: 2231213aa</span>
            </div>
            <div class="groupAddRadio">
              <span>角色：</span>
              <el-radio-group v-model="addRadio" class="groupAddRadioGroup">
                <el-radio label="1" size="large">班组长</el-radio>
                <el-radio label="2" size="large">送货员</el-radio>
                <el-radio label="3" size="large">市场经理</el-radio>
                <el-radio label="4" size="large">客户专员</el-radio>
                <el-radio label="5" size="large">领导</el-radio>
              </el-radio-group>
            </div>
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
  import { addUserForm } from "@/types/group";
  import type { FormInstance, FormRules } from "element-plus";
  const groupStore = useGroupStore();

  const addRadio = ref(1);
  const groupAddOpen = ref(false);

  defineExpose({
    groupAddOpen,
  });
  const userFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<addUserForm>>({
    user_name: [{ required: true, trigger: "blur" }],
    phone: [{ required: true, trigger: "blur" }],
    email: [{ required: true, trigger: "blur" }],
    department: [{ required: true, trigger: "blur" }],
    sign_time: [{ required: true, trigger: "blur" }],
    work_number: [{ required: true, trigger: "blur" }],
  });
  const addUserData = ref<addUserForm>({
    user_name: "",
    password: "",
    phone: "",
    email: "",
    department: "",
    role_id: addRadio.value,
    work_number: "1232131321",
    sign_time: "",
    avatarPath: "",
  });
  const closeGroupAdd = (formEl: FormInstance | undefined) => {
    groupAddOpen.value = false;
    if (!formEl) return;
    formEl.resetFields(); 
  };
  //临时
  const linshiList = ["a部门", "b部门", "c部门"];
  const groupAddConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log(addUserData.value);
        
        groupStore.postAddUserAction(addUserData.value).then((res) => {
          console.log(res);
        });
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  //   上传图片
  import type { UploadFile } from "element-plus";
  const fileList = ref<UploadFile>();
  const uploadrefss = ref();
  const handleChange = (file: UploadFile) => {
    fileList.value = file;
    console.log(file);
  };
  function uploadImg() {
    let dataForm = new FormData();
    dataForm.append("fileList", fileList.value?.raw as any);
    groupStore.userAvatarAction(dataForm).then((res) => {
      console.log(res);
    });
  }

 
</script>
<style lang="scss" scoped>
  .groupAddInfo {
    position: relative;
    width: 55vw;
    margin: 5vh auto;
    color: #73e1ff;
    font-size: 20px;
    .groupAddOne {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      .groupAvatarBorder {
        width: 170px;
        height: 200px;
        border: 1px solid #73e1ff;
      }
      .groupAvatarUploadButton {
        // box-sizing: border-box;
        // position: absolute;
        // right: 300px;
        // margin-top: 160px;
        margin-left: 10px;
        width: 90px;
        height: 42px;
      }
    }
    .groupAddTwo {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 50px 0;
      .groupAddMessage,
      .groupAddRadio {
        margin: 15px 0;
        color: $processed;
        padding-left: 50px;
      }
      .groupAddRadio {
        .groupAddRadioGroup {
          margin-left: 2vw;
        }
      }
    }

    .groupAddSetting {
      display: flex;
      justify-content: center;
      .groupAddCancel,
      .groupAddConfirm {
        width: 85px;
        margin: 0 5vw;
      }
    }
  }
</style>
