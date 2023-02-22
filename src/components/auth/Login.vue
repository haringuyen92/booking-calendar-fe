<template>
  <div class="h_container_fullscreen">
    <div class="h__form_container">
      <FormHeader title="Login"></FormHeader>
      <form @submit.prevent="submitLogin">
        <div class="h__form_login">
          <div class="h__form_group" :class="error.email ? 'h__form_invalid' : ''">
            <label for="email">email:</label>
            <input type="text"
                   class="form-control h__form_control"
                   v-model.trim="formData.email"
                   ref="email"
                   @keydown="reSetMessageError()"
                   placeholder="example@gmail.com">
            <span class="h__form_error text-danger">{{ error.email }}</span>
          </div>
          <div class="h__form_group" :class="error.password ? 'h__form_invalid' : ''">
            <label for="email">password:</label>
            <input type="password"
                   class="form-control h__form_control"
                   v-model.trim="formData.password"
                   ref="password"
                   @keydown="reSetMessageError()">
            <span class="h__form_error text-danger">{{ error.password }}</span>
            <span class="h__form_error text-danger">{{ error.response }}</span>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary h__btn_flat">Login</button>
        </div>
      </form>
      <div class="text-center h__form_footer">
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,reactive } from 'vue';
  import { useRouter } from "vue-router";
  import FormHeader from '@/components/ui/form/FormHeader.vue';
  import Message from '@/common/message';
  import { EmailValidation } from '@/helper/validation/EmailValidation';
  import { PasswordValidation } from '@/helper/validation/PasswordValidation';
  import { useAuthStore } from "@/stores/authStore";

  const storeAuth = useAuthStore();
  const router = useRouter();
  const error = reactive({
    email: '',
    password: '',
    response: ''
  });
  const formData = reactive({
    email: '',
    password: '',
  })
  const email = ref(null);
  const password = ref(null);

  const setMessageErrorEmail = message => {
    error.email = message;
  }
  const setMessageErrorPassword = message => {
    error.password = message;
  }
  const setMessageErrorResponse = message => {
    error.response = message;
  }
  const reSetMessageError = () =>{
    setMessageErrorEmail('');
    setMessageErrorPassword('');
    setMessageErrorResponse('');
  }
  const validateEmail = () => {
    if(EmailValidation.invalid(formData.email)) return true;
    email.value.focus();
    setMessageErrorEmail(Message.EMAIL.INVALID);
    return false;
  }
  const validatePassword = () => {
    if(PasswordValidation.invalidLength(formData.password)) return true;
    password.value.focus();
    setMessageErrorPassword(Message.PASSWORD.INVALID_LENGTH);
    return false;
  }

  const submitLogin = async () => {
    reSetMessageError();
    if(!validateEmail()) return false;
    if(!validatePassword()) return false;
    const result = await storeAuth.login(formData.email, formData.password);
    if(!result?.success){
      setMessageErrorResponse('Credentials Invalid!');
    }else{
      await router.push(storeAuth.returnUrl);
    }
  }
</script>

<style scoped>
  @import "@/assets/styles/form.css";
</style>