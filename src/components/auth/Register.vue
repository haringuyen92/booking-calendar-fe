<template>
  <div class="h_container_fullscreen">
    <div class="h__form_container">
      <FormHeader title="Register"></FormHeader>
      <form @submit.prevent="submitRegister">
        <div class="h__form_login">
          <div class="h__form_group" :class="error.name ? 'h__form_invalid' : ''">
            <label for="email">name:</label>
            <input type="text"
                   class="form-control h__form_control"
                   v-model.trim="formData.name"
                   ref="name"
                   @keydown="setMessageErrorName('')"
                   placeholder="Hari Nguyen">
            <span class="h__form_error text-danger">{{ error.name }}</span>
          </div>
          <div class="h__form_group" :class="error.email ? 'h__form_invalid' : ''">
            <label for="email">email:</label>
            <input type="text"
                   class="form-control h__form_control"
                   v-model.trim="formData.email"
                   ref="email"
                   @keydown="setMessageErrorEmail('')"
                   placeholder="example@gmail.com">
            <span class="h__form_error text-danger">{{ error.email }}</span>
          </div>
          <div class="h__form_group" :class="error.password ? 'h__form_invalid' : ''">
            <label for="email">password:</label>
            <input type="password"
                   class="form-control h__form_control"
                   v-model.trim="formData.password"
                   ref="password"
                   @keydown="setMessageErrorPassword('')">
            <span class="h__form_error text-danger">{{ error.password }}</span>
          </div>
          <div class="h__form_group" :class="error.rePassword ? 'h__form_invalid' : ''">
            <label for="email">rePassword:</label>
            <input type="password"
                   class="form-control h__form_control"
                   v-model.trim="formData.rePassword"
                   ref="rePassword"
                   @keydown="setMessageErrorRePassword('')">
            <span class="h__form_error text-danger">{{ error.rePassword }}</span>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary h__btn_flat">Register</button>
        </div>
      </form>
      <div class="text-center h__form_footer">
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import FormHeader from '@/components/ui/form/FormHeader.vue';
  import { EmailValidation } from '@/helper/validation/EmailValidation';
  import { PasswordValidation } from '@/helper/validation/PasswordValidation';
  import Auth from '@/services/authService';
  import Message from "@/common/message";

  const router = useRouter();

  const error = reactive({
    email: '',
    password: '',
    rePassword: '',
    name: ''
  });
  const formData = reactive({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const name = ref(null);
  const email = ref(null);
  const password = ref(null);
  const rePassword = ref(null);

  const setMessageErrorName = message => {
    error.name = message;
  }
  const setMessageErrorEmail = message => {
    error.email = message;
  }
  const setMessageErrorPassword = message => {
    error.password = message;
  }

  const setMessageErrorRePassword = message => {
    error.rePassword = message;
  }
  const setMessageErrorResponse = message => {
    error.response = message;
  }
  const reSetMessageError = () =>{
    setMessageErrorName('');
    setMessageErrorEmail('');
    setMessageErrorPassword('');
    setMessageErrorResponse('');
  }

  const validateName = () => {
    if(formData.name) return true;
    name.value.focus();
    setMessageErrorName(`name ${Message.STRING.INVALID}`);
    return false;
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

  const validateRePassword = () => {
    if(formData.password === formData.rePassword) return true;
    rePassword.value.focus();
    setMessageErrorRePassword(Message.RE_PASSWORD.INVALID);
    return false;
  }
  const submitRegister = async () => {
    reSetMessageError();
    if(!validateName()) return false;
    if(!validateEmail()) return false;
    if(!validatePassword()) return false;
    if(!validateRePassword()) return false;
    const result = await Auth.register(formData.name, formData.email, formData.password);
    if(result?.success){
      await router.push({name: 'Dashboard'});
    }else{
      setMessageErrorEmail('email duplicate');
    }
  }
</script>