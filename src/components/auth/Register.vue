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
                   v-model.trim="name"
                   ref="name"
                   @keydown="setMessageErrorName('')"
                   placeholder="Hari Nguyen">
            <span class="h__form_error text-danger">{{ error.name }}</span>
          </div>
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
      <div class="text-center h__form_footer">
        <router-link to="/login">dang nhap</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import FormHeader from '@/components/ui/form/FormHeader.vue';
  import { EmailValidation } from '@/helper/validation/EmailValidation';
  import Message from '@/common/message';
  import { PasswordValidation } from '@/helper/validation/PasswordValidation';
  import { register } from '@/controller/auth';

  export default {
    components: {
      FormHeader: FormHeader
    },
    data(){
      return {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        error: {
          email: '',
          password: '',
          rePassword: '',
          name: ''
        },
      }
    },
    methods: {
      async submitRegister(){
        this.reSetMessageError();
        if(!this.validateName()) return false;
        if(!this.validateEmail()) return false;
        if(!this.validatePassword()) return false;
        if(!this.validateRePassword()) return false;
        const result = await register(this.name, this.email, this.password);
        if(result?.success){
          this.$router.push({ name: 'Dashboard' });
        }else{
          this.setMessageErrorEmail('email duplicate');
        }
      },
      validateName(){
        if(this.name) return true;
        this.$refs.name.focus();
        this.setMessageErrorName(Message.STRING.INVALID);
        return false;
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
      setMessageErrorName(message){
        this.error.name = message;
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
        this.setMessageErrorName('');
        this.setMessageErrorEmail('');
        this.setMessageErrorPassword('');
        this.setMessageErrorRePassword('');
      }
    },
  }
</script>