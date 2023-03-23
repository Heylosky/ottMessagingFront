<template>
  <div>
    <span class="PageName">Quickly send SMS</span>
  </div>
  <div class="QuickSendSMS" v-show="toBeSent">
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
    <div class="BtnList">
      <button class="confirmBtn" @click="sendSMS">Send SMS</button>
    </div>
  </div>
  <div class="sendSuccess" v-if="!toBeSent">
    <div id="SuccessNotify">
      Message sent successful.
    </div>
    <button style="background-color: #999a9c; color: white">Go Back</button> or
    <button class="confirmBtn">View status in report</button>
  </div>
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
      toBeSent: true
    }
  },
  methods: {
    sendSMS() {
      let formData = new FormData()
      formData.append('recipients', this.recipient)
      formData.append('originator', this.originator)
      formData.append('payload', this.payload)
      requestPost('/sms/v1/send', formData,  {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "testtoken",
        }
      },res => {
        console.log(res);
        if(res.status === 200) {
          this.toBeSent = false
        } else {
          this.toBeSent = true
        }
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
  background-color: rgb(255,102,0);
  color: white;
}
button:hover {
  background-color: orangered;
}
.sendSuccess{
  text-align: center;
}
#SuccessNotify{
  font-size: 20px;
  padding-bottom: 5px;
}
</style>