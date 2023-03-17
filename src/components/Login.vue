<template>
  <div class="login">
    <input class="txtInput" type="text" v-model="user_name" @keyup="verifyFunc" placeholder="Username">
    <p></p>
    <input class="txtInput" type="password" v-model.lazy="password" placeholder="Password">
    <p class="alert" v-if="incorrect">Username or password is incorrect, please re-enter</p>
    <div class="OTPbutton">
      <button @click="loginFunc" :class="{verifyBtnDis: this.isDisabled, verifyBtnEnb: !this.isDisabled}" :disabled="isDisabled">Login</button>
    </div>
  </div>
</template>

<script>
import {requestPost} from "../network/request";
export default {
  name: "Login",
  data() {
    return {
      user_name: '',
      password: '',
      isDisabled: true,
      incorrect: false,
    }
  },
  methods: {
    loginFunc() {
      console.log("aaa");
      let formData = new FormData()
      formData.append('name', this.user_name)
      formData.append('password', this.password)
      requestPost('/user/login', formData,  {
        headers: {
          "Content-Type": "application/json",
        }
      },res => {
        console.log(res);
        localStorage.setItem("webToken", res.data.data.token)
        this.$router.push('/')
      }, err => {
        console.log(err);
        this.incorrect = true;
      })
    },
    verifyFunc() {
      const name = /^[.a-zA-Z0-9_-]+$/
      this.isDisabled = !name.test(this.user_name);
    },
  }
}
</script>

<style scoped>
input.txtInput{
  width: 90%;
  margin: auto;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  font-size: 18px;
}
.alert {
  color: red;
}
.login {
  width: 80%;
  margin: auto;
  padding: 5px;
  min-width: 250px;
  text-align: center;
}
.OTPbutton {
  padding: 5px;
  height: 8px;
}
.OTPbutton button{
  width: 50%;
  float: right;
}
.verifyBtnDis {
  font-size: 18px;
  disabled: true;
}
.verifyBtnEnb {
  font-size: 18px;
  background-color: #C21318;
  color: white;
  border: 1px #C21318 solid;
  border-radius: 2px;
}
.verifyBtnEnb:hover {
  font-size: 18px;
  background-color: red;
  color: white;
  border: 1px #C21318 solid;
  border-radius: 2px;
}
#resend {
  color: blue;
  border-bottom: blue solid 1px;
  cursor: pointer;
}
</style>