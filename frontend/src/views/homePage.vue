<template>
  <div class="container" id="content">
    <div><logoHome /></div>
    <h1 class="homeTittle">Welcome to Groupomania! Enjoy!</h1>
    <div class="link">
      <router-link to="/signup" class="home-pagelink"
        >Create an account</router-link
      >
      |
      <router-link to="/login" class="home-pagelink">Login</router-link>
    </div>
  </div>
</template>

<script>
import logoHome from "@/components/logoHome.vue";
export default {
  name: "homePage",
  components: {
    logoHome,
  },
};
</script>

<style>
.link {
  font-weight: bold;
  text-align: center;
  color: #fd2d01;
  font-size: 35px;
  text-align: center;
  margin-top: 100px;
}
.home-pagelink {
  color: #fd2d01 !important;
  font-weight: 800;
  font-size: 22px;
}

.homeTittle {
  text-align: center;
  font-size: 45px;
  color: #0d0764;
  margin-top: 35px;
}
</style>
