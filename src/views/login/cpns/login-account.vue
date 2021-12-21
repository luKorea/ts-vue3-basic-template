<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "@/views/login/config/account-config";
import { ElForm } from "element-plus";
import localCache from "@/utils/cache";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const account = reactive({
      name: localCache.getCache("userInfo")?.name ?? "",
      password: localCache.getCache("userInfo")?.password ?? "",
    });

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          if (isKeepPassword) {
            localCache.setCache("userInfo", {
              name: account.name,
              password: account.password,
            });
          } else {
            localCache.deleteCache("userInfo");
          }
          store.dispatch("login/accountLoginAction", { ...account });
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
