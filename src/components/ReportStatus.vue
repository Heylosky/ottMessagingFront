<template>
<div>
  <span class="PageName">Tracking your SMS status</span>
</div>
  <div class="statusReport">
    <div class="announcement">
    </div>
    <div>
      <table>
        <thead>
        <tr>
          <th>UpdatedAt</th>
          <th>MsgId</th>
          <th>Recipient</th>
          <th>Status</th>
          <th>StatusDatetime</th>
          <th>MessageLength</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="msg in msgList">
          <td>{{msg.UpdatedAt}}</td>
          <td>{{msg.MsgId}}</td>
          <td>{{msg.Recipient}}</td>
          <td>{{msg.Status}}</td>
          <td>{{msg.StatusDatetime}}</td>
          <td>{{msg.MessageLength}}</td>
        </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <!-- 上一页 -->
          <li @click="prePage()" :class="{'disabled':this.params.currentPage === 1}">
            <button style="cursor: pointer;">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li :class="{'active': this.params.currentPage === page}" v-for="(page,index) in pages" :key="index" @click="curPage(page)">
            <button style="cursor: pointer;">
              {{page}}
            </button>
          </li>
          <!-- 下一页 -->
          <li :class="{'disabled':this.params.currentPage === this.params.totalPage}" @click="nextPage()">
            <button style="cursor: pointer;">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import {requestGet2} from "../network/request.js";
export default {
  name: "ReportStatus",
  data() {
    return {
      msgList: [],
      params: {
        currentPage: 1,
        totalPage: 1,
        totalNumber: 0,
        pageLimit: 5,
        flag: false,
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.params.flag) return;
      this.params.flag = true;
      requestGet2({
        url: '/sms/v1/report/status/' + this.params.currentPage,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "testtoken", //next step: 这个token需要去根据现在登陆的用户的jwt token，去api上get这个用户自己的token。
        }
      }, res => {
        console.log(res);
        this.msgList = res.data.list;
        this.params.totalNumber = res.data.total;
        this.params.totalPage = Math.ceil(res.data.total / this.params.pageLimit);
      }, err => {
        console.log(err);
      })
      this.params.flag = false
    },
    curPage(page) {
      if(page === '...') return;
      if(this.params.flag) return;
      this.params.currentPage = page;
      this.getData()
    },
    prePage() {
      if(this.params.currentPage > 1) {
        if(this.params.flag) return;
        --this.params.currentPage;
        this.getData()
      }
    },
    nextPage() {
      if(this.params.flag) return;
      if(this.params.currentPage < this.params.totalPage) {
        ++this.params.currentPage;
        this.getData()
      }
    }
  },
  computed: {
    pages() {
      let totalPage = this.params.totalPage
      let currentPage = this.params.currentPage
      //总页数小于10页
      if(totalPage < 10) return totalPage
      //总页数大于10页
      if(currentPage <= 5) {  //选择前5页时
        return [1,2,3,4,5,6,'...',totalPage]
      } else if (currentPage >= totalPage - 5) {  //选择后5页时
        return [1,'...',totalPage-5,totalPage-4,totalPage-3,totalPage-2,totalPage-1,totalPage]
      } else {
        return [1,'...',currentPage-1,currentPage,currentPage+1,currentPage+2,currentPage+3,'...',totalPage]
      }
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

table {
  margin: auto;
  border: 1px black solid;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #FAFCFC;
}

th, td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
th {
  background-color: rgb(255,102,0);
  color: white;
  font-weight: 600;
}
nav {
  text-align: center;
  list-style: none;
}
ul {
  width: 50%;
  margin: 0 auto;
  padding: 0px;
}
nav li {
  display: inline-block;
  margin-right: 5px;
}
nav button {
  border-radius: 0px;
  border: 0px;
  background-color: rgb(255,102,0);
  color: white;
}
.disabled {
  display: none;
}
.active button{
  border: 2px black solid;
}
button:hover {
  background-color: orangered;
}
</style>