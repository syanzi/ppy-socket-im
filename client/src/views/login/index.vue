<style lang="scss">
@import "../../lib/css/mixin";

.chat-manager {
  font-size: 16px;
  color: #606266;
}
</style>

<template>
  <div class="chat-manager">
    <div style="background:#fff;margin:10px;padding:20px">
      <div>
        用户：
        <el-input v-model="userName" style="margin-top:20px;width:40%"></el-input>
      </div>
      <div>
        <span>房间号:</span>
        <el-input v-model="houseNum" style="margin-top:20px;width:40%"></el-input>
        <el-button type="primary" @click="connentSocket" :disabled="showConnBtn">加入</el-button>
      </div>
      <div
        v-chat-scroll
        class="chat-info"
        style="margin-top:20px;border:1px solid #f1f1f1;max-height:400px;min-height:400px;padding:10px;overflow-y: auto; border-radius:5px
      overflow-x: hidden;"
      >
        <div v-for="(item,index) in msgList" :key="index" style="padding-bottom:5px">
          <div v-if="!item.id" style="text-align:center;color:#888888">{{item.msg}}</div>
          <div v-else-if="userId == item.id" style="text-align:right">
            <span
              style="padding: 4px 4px;border: 1px solid #e7e7e7;border-radius:2px;display:inline-block"
            >{{item.msg}}</span>
            {{':'+ item.name}}
          </div>
          <div v-else style="text-align:left">
            {{item.name+':' }}
            <span
              style="padding: 4px 4px;border: 1px solid #e7e7e7;border-radius:2px;display:inline-block"
            >{{item.msg}}</span>
          </div>
        </div>
      </div>
      <div>
        <el-input v-model="inputValue" style="margin-top:20px;width:65%" placeholder="输入信息......"></el-input>
        <el-button
          type="primary"
          @click="sendMsg"
          style="margin-top:20px"
          :disabled="!showConnBtn"
        >发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "userManager",
  data() {
    return {
      socket: undefined,
      inputValue: undefined,
      messages: "",
      houseNum: 520,
      msgList: [],
      userName: "ppz",
      showConnBtn: false,
      userId: "",
      msgId: 0
    };
  },
  computed: {},
  methods: {
    //连接
    connentSocket() {
      this.socket = io("localhost:3000", {
        path: "/ppz",
        query: {
          room: this.houseNum,
          userId: `client_${Math.random()}`
        },

        transports: ["websocket"]
      });
      this.socket.on("connect", () => {
        console.log(this.socket.id, 14585); // 'G5p5...'
        this.userId = this.socket.id;
      });

      console.log("connect sucess");
      let self = this;
      //监听收信息的方法
      this.socket.on("message", res => {
        console.log(res);
        let data = res.data;
        self.msgList.push({
          name: data.payload.name,
          msg: data.payload.msg,
          id: res.meta.client,
          msgId: data.payload.msgId
        });
        this.msgId = data.payload.msgId;
        console.log(self.msgList);
        console.log(self.userId);
      });

      this.socket.on("receive", res => {
        console.log(res);
        let data = res.data;
        self.msgList.push({
          name: data.payload.name,
          msg: data.payload.msg,
          id: res.meta.client,
          msgId: data.payload.id
        });
        this.msgId = data.payload.msgId;
        console.log("收到回复");
      });
      //监听加入房间的消息
      this.socket.on("joined", (room, user) => {
        console.log("joined room:" + room);
        // self.messages = self.messages + " " + room + " " + id + " " + users;
        self.msgList.push({ msg: user + ":进入房间" });
      });
      //连接后发送进入房间的消息
      this.socket.emit("join", this.houseNum, this.userName);
      this.showConnBtn = true;
    },
    //发送信息
    sendMsg() {
      console.log("send msg:" + this.inputValue);
      if (!this.inputValue) {
        this.$message({
          message: "请输入信息",
          type: "warning"
        });
        return;
      }
      this.socket.emit("message", {
        room: this.houseNum,
        target: "message",
        payload: {
          msg: this.inputValue,
          name: this.userName,
          msgId: ++this.msgId,
          type: 1
        }
      });
      this.inputValue = "";
    }
  },
  created() {}
};
</script>
