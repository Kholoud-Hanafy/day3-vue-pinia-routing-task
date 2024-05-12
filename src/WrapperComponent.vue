<template>
  <NavbarCombonent/>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script>
import NavbarCombonent from './components/NavbarCombonent.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
export default {
  components :{
    NavbarCombonent
  }
}
</script>

<style>

</style>