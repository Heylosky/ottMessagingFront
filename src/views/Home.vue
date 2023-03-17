<template>
  <div class="head">
    <div style="font-size: 50px; color: white; padding-left: 30px; height: 100%">
      OTT message management platform
    </div>
  </div>
  <div class="box">
    <div class="left">
      <div class="menu">
        <div class="menu-list-hasChild menu-item" :class="{'list-active': openedList===1}" @click="openList(1)">
          <img class="menu-list-icon" v-if="openedList!==1" src="../assets/Picture3.png">
          <img class="menu-list-icon" v-if="openedList===1" src="../assets/Picture4.png">
          <span style="padding-left: 5px">User Management</span>
          <span class="icon">&gt;</span>
        </div>
        <div class="menu-list-hasChild menu-item" :class="{'list-active': openedList===2}" @click="openList(2)">
          <img class="menu-list-icon" v-if="openedList!==2" src="../assets/Picture2.png">
          <img class="menu-list-icon" v-if="openedList===2" src="../assets/Picture1.png">
          <span style="padding-left: 5px">Messages</span>
          <span class="icon">&gt;</span>
        </div>
        <div class="menu-first-items" v-if="openedList===2">
          <ul>
            <li>
              <div class="li-text" :class="{'li-active':isQuickSend}" @click="select">Quick Send</div>
            </li>
            <li>
              <div class="li-text">Bulk Messages</div>
            </li>
          </ul>
        </div>
        <div class="menu-list-hasChild menu-item" :class="{'list-active': openedList===3}" @click="openList(3)">
          <img class="menu-list-icon" v-if="openedList!==3" src="../assets/Picture5.png">
          <img class="menu-list-icon" v-if="openedList===3" src="../assets/Picture6.png">
          <span style="padding-left: 5px">Statistical Report</span>
          <span class="icon">&gt;</span>
        </div>
        <div class="menu-first-items" v-if="openedList===3">
          <ul>
            <li>
              <div class="li-text" :class="{'li-active':isMStatus}">Message Status</div>
            </li>
            <li>
              <div class="li-text">Bulk Messages</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <quick-send v-if="isQuickSend"></quick-send>
    </div>
  </div>
</template>

<script>
import QuickSend from "../components/QuickSend.vue";

export default {
  name: "Home",
  components: {QuickSend},
  data() {
    return {
      openedList: 0,
      isQuickSend: false,
      isMStatus: false
    }
  },
  methods: {
    openList(num) {
      this.openedList = num
    },
    select() {
      this.isQuickSend = !this.isQuickSend
    }
  }
}
</script>

<style scoped>
.head{
  height: 10%;
  min-height: 80px;
  width: 100%;
  background-color: black;
}
.box {
  height: 90%;
  display: flex;
  flex-direction: row;
}
.left {
  display: flex;
  height: 100%;
  min-width: 260px;
}
.right {
  height: 100%;
  width: 100%;
}
.menu{
  width: 100%;
  position: relative;
  float: left;
  background-color: black;
  color: white;
  font-size: 20px;
  transition: left 0.2s linear 0.1s;
}
.menu-list-icon {
  width: 40px;
}
/** 全部一级菜单 */
.menu-item {
  display: flex;
  width: 100%;
  height: 50px;
  font-weight: 800;
  align-items: center;
  justify-content: left;
}
.menu-item:hover {
  cursor: pointer;
  background-color: orangered;
}
.list-active {
  background-color: orangered;
  color: black;
}
/** 可打开的菜单 */
.menu-list-hasChild {
  position: relative;
  align-items: center;
}
.menu-list-hasChild > p {
  margin: 0;
}
.icon {
  position: absolute;
  right: 15px;
  top: 50%;
  font-size: 1rem;
  font-weight: 100;
  transition: transform 0.3s linear;
  transform: translate(0, -50%) rotate(90deg) scaleY(1.8);
  opacity: 0.5;
  z-index: 2;
}
/** 可打开的菜单被点击后icon的样式 */
.reverse-icon {
  transform: translate(0, -50%) rotate(270deg) scaleY(1.8);
}
/** 可打开的菜单的直属列表 */
.menu-first-items {
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  transition: height 0.3s ease-out 0.1s;
}
ul {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}
.li-text {
  font-size: 1.1rem;
  line-height: 35px;
  height: 35px;
  width: 100%;
  margin: 0 auto;
  padding-left: 10px;
}
.li-text:hover {
  background-color: orangered;
  color: white;
  cursor: pointer;
}
.li-active{
  color: orangered;
}
</style>