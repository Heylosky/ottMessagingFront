<template>
  <header>
    <span class="PageName">Quickly send SMS</span>
  </header>
  <body class="QuickSendSMS">
  <div class="announcement">
  </div>
  <div class="editor">
    <div class="box">
      <div class="left-bar">
        <input class="infoItem" type="text" placeholder="Recipient" v-model.lazy="recipient">
      </div>
      <div class="right-bar">
        <input class="infoItem" type="text" placeholder="Originator" v-model.lazy="originator">
      </div>
    </div>
    <textarea class="msg-editor" rows="10" cols="30" placeholder="Please type your message here..." v-model.lazy="payload"></textarea>
  </div>
  </body>
  <footer class="BtnList">
    <button class="confirmBtn" @click="sendSMS">Send SMS</button>
  </footer>
</template>

<script>
import {requestPost} from "../network/request.js";

export default {
  name: "QuickSend",
  data() {
    return {
      recipient: '',
      originator: '',
      payload: '',
    }
  },
  methods: {
    sendSMS() {
      let formData = new FormData()
      formData.append('recipient', this.recipient)
      formData.append('originator', this.originator)
      formData.append('payload', this.payload)
      requestPost('/v1/send', formData,  {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "testtoken",
        }
      },res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
.PageName {
  margin-left: 70px;
  font-size: 25px;
  font-weight: bold;
  font-family: Roboto;
}
.editor {
  text-align: center;
}
.box {
  height: 40px;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 10px;
}
.left-bar {
  display: flex;
  height: 40px;
  width: 50%;
  padding-right: 10px;
  justify-content:flex-end;
}
.right-bar {
  display: flex;
  height: 40px;
  width: 50%;
  padding-left: 10px;
  justify-content:flex-start;
}
.box input {
  height: 80%;
  width: 89%;
  font-size: 18px;
  font-family: monospace;
  border-radius: 5px;
  border: solid 2px darkgray;
}
.msg-editor {
  font-size: 18px;
  width: 90%;
  height: 40%;
  border-radius: 5px;
  border: solid 2px darkgray;
}
.infoItem {
  width: 45%;
}
.BtnList {
  width: 95%;
  text-align: right;
}
.confirmBtn{
  background-color: orangered;
  color: white;
}
</style>