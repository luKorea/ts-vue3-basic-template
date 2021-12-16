<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "@/views/login/config/account-config";
import { ElForm } from "element-plus";

export default defineComponent({
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const account = reactive({
      name: "",
      password: "",
    });
    const loginAction = () => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          console.log("执行登录");
        } else {
          return false;
        }
      });
    };
    return {
      account,
      rules: rules,
      loginAction,
      formRef,
    };
  },
});
</script>

<style scoped></style>
