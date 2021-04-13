<template>
<div>
  Login Index
  <LoginComponent />
  <Register />
</div>
</template>

<script>
import Register from '@/views/Login/Register/Register.vue'
import LoginComponent from '@/views/Login/Login'


export default {
  name: 'outLogin',

  components: {
    Register,
    LoginComponent,
  }
}
</script>

<style>
</style>