<template>
  <div id="login_page">
    <div class="loginWindow">
      <div class="loginWindowLogo">
        <img alt="OCBC logo" id="ott_logo" src="../assets/orangeLogo.png">
      </div>
      <hr>
      <div class="welcomeText">
        <p>
          <span>OTT Messaging Platform</span>
        </p>
      </div>
      <Login/>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "LoginView",
  components: {
    Login
  }
}
</script>

<style scoped>
#login_page {
  background: url("../assets/U307388_medium.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
}
.loginWindow {
  position: absolute;
  min-width: 400px;
  max-width: 400px;
  padding: 10px;
  top: 50%;
  left: 60%;
  -webkit-transform: translate(-0%, -50%);
  -moz-transform: translate(-10%, -50%);
  -ms-transform: translate(-10%, -50%);
  -o-transform: translate(-10%, -50%);
  transform: translate(-10%, -50%);
  background-color: rgba(255,255,255,0.9);
}
.loginWindowLogo {
  width: 50%;
  margin: auto;
}
#ott_logo {
  width: 30%;
}
.welcomeText{
  margin: auto;
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
</style>