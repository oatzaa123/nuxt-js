import Vue from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("socket ready");
});

Vue.socket = socket;
Vue.prototype.$socket = socket;
