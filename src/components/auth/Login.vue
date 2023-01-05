<template>
  <div class="h_container_fullscreen">
    <div class="h__form_container">
      <FormHeader title="Login"></FormHeader>
      <form @submit.prevent="submitLogin">
        <div class="h__form_login">
          <div class="h__form_group">
            <label for="email">email:</label>
            <input type="text" class="form-control h__form_control" v-model="email">
            <span class="h__form_error text-danger">{{ error.email }}</span>
          </div>
          <div class="h__form_group">
            <label for="email">password:</label>
            <input type="password" class="form-control h__form_control" v-model="password">
            <span class="h__form_error text-danger">{{ error.password }}</span>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary h__btn_flat">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import FormHeader from '../ui/form/FormHeader'
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
        this.$loading.show();
      }
    },
    created() {

    }

  }
</script>

<style>
  @import "../../assets/styles/form.css";

</style>