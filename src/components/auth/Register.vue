<template>
  <div class="h_container_fullscreen">
    <div class="h__form_container">
      <FormHeader title="Register"></FormHeader>
      <form @submit.prevent="submitRegister">
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
          <div class="h__form_group" :class="error.rePassword ? 'h__form_invalid' : ''">
            <label for="email">rePassword:</label>
            <input type="password"
                   class="form-control h__form_control"
                   v-model.trim="rePassword"
                   ref="rePassword"
                   @keydown="setMessageErrorRePassword('')">
            <span class="h__form_error text-danger">{{ error.rePassword }}</span>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary h__btn_flat">Register</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  import FormHeader from "@/components/ui/form/FormHeader";
  import {EmailValidation} from "@/helper/validation/EmailValidation";
  import Message from "@/common/message";
  import {PasswordValidation} from "@/helper/validation/PasswordValidation";

  export default {
    components: {
      FormHeader: FormHeader
    },
    data(){
      return {
        email: '',
        password: '',
        rePassword: '',
        error: {
          email: '',
          password: '',
          rePassword: ''
        },
      }
    },
    methods: {
      submitRegister(){
        this.reSetMessageError();
        if(!this.validateEmail()) return false;
        if(!this.validatePassword()) return false;
        if(!this.validateRePassword()) return false;
        alert("submit register success"); // handle register api

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
      validateRePassword(){
        if(this.password === this.rePassword) return true;
        this.$refs.rePassword.focus();
        this.setMessageErrorRePassword(Message.RE_PASSWORD.INVALID);
        return false;
      },
      setMessageErrorEmail(message){
        this.error.email = message;
      },
      setMessageErrorPassword(message){
        this.error.password = message;
      },
      setMessageErrorRePassword(message){
        this.error.rePassword = message;
      },
      reSetMessageError(){
        this.setMessageErrorEmail('');
        this.setMessageErrorPassword('');
        this.setMessageErrorRePassword('');
      }
    },
  }
</script>