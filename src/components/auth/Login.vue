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
                   v-model.trim="email"
                   ref="email"
                   @keydown="setMessageErrorEmail('')"
                   placeholder="example@gmail.com">
            <span class="h__form_error text-danger">{{ error.email }}</span>
          </div>
          <div class="h__form_group" :class="error.password ? 'h__form_invalid' : ''">
            <label for="email">password:</label>
            <input type="password"
                   class="form-control h__form_control"
                   v-model.trim="password"
                   ref="password"
                   @keydown="setMessageErrorPassword('')">
            <span class="h__form_error text-danger">{{ error.password }}</span>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary h__btn_flat">Login</button>
        </div>
      </form>
      <div class="text-center h__form_footer">
        <router-link to="/register">dang ky tai khoan</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import FormHeader from '@/components/ui/form/FormHeader';
  import Message from '@/common/message';
  import { EmailValidation } from "@/helper/validation/EmailValidation";
  import { PasswordValidation } from "@/helper/validation/PasswordValidation";
  export default {
    components: {
      FormHeader: FormHeader
    },
    data() {
      return {
        error: {
          email: '',
          password: '',
        },
        email: '',
        password: ''
      }
    },
    methods: {
      submitLogin(){
        this.reSetMessageError();
        if(!this.validateEmail()) return false;
        if(!this.validatePassword()) return false;
        alert("submit login success"); // handle login api
        this.$router.push({ name: 'dashboard' })
      },
      validateEmail(){
        if(EmailValidation.invalid(this.email)) return true;
        this.$refs.email.focus();
        this.setMessageErrorEmail(Message.EMAIL.INVALID);
        return false;
      },
      validatePassword(){
        if(PasswordValidation.invalidLength(this.password)) return true;
        this.$refs.password.focus();
        this.setMessageErrorPassword(Message.PASSWORD.INVALID_LENGTH);
        return false;
      },
      setMessageErrorEmail(message){
        this.error.email = message;
      },
      setMessageErrorPassword(message){
        this.error.password = message;
      },
      reSetMessageError(){
        this.setMessageErrorEmail('');
        this.setMessageErrorPassword('');
      }
    },
    created() {

    }

  }
</script>

<style scoped>
  @import "@/assets/styles/form.css";
</style>