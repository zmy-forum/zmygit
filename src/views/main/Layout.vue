<template>
  <div>
      <FooterNav/>
      <router-view></router-view>
  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue"
export default {
  components:{FooterNav},
}
</script>

<style>

</style>