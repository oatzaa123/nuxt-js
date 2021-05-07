<template>
  <div>
    <Modal :value="showAdd" title="สร้างโพสต์">
      <div style="display:flex" class="p-3">
        <img
          style="border-radius: 50px"
          width="40"
          height="40"
          class="mr-6"
          :src="`${$nuxt.$auth.user.personalCodeImages}`"
        />
        <p class="ml-6">{{ $nuxt.$auth.user.name }}</p>
      </div>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-textarea
          id="textarea"
          v-model="textarea"
          :placeholder="`คุณคิดอะไรอยู่ ${$nuxt.$auth.user.name}`"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
        <b-button
          type="submit"
          :disabled="textarea === '' ? true : false"
          @click="$bvModal.hide('modal-1')"
          class="mt-3"
          block
          >โพสต์</b-button
        >
      </form>
    </Modal>
    <!-- <b-button @click="$nuxt.refresh()">test</b-button> -->
    <div class="container">
      <b-card
        class="mb-2 p-6"
        style="display:flex; text-align:center;justify-content:center"
      >
        <img
          style="border-radius: 50px"
          width="40"
          height="40"
          class="mr-6"
          :src="`${$nuxt.$auth.user.personalCodeImages}`"
        />
        <b-button
          style="width: 85%;border-radius: 50px;text-align: left;"
          v-b-modal.modal-1
          @click="showAdd = !showAdd"
          >คุณคิดอะไรอยู่ {{ $nuxt.$auth.user.name }}</b-button
        >
      </b-card>
      <div v-for="(feed, index) in feeds" :key="index">
        <b-card
          :title="`${feed.content}`"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 p-6"
        >
          <b-card-text v-if="feed.media">
            <div v-for="(img, index) in feed.media" :key="index">
              <img :src="`${img.fileUrl}`" alt="" width="300" height="300" />
            </div>
          </b-card-text>

          <template #footer>
            <em>
              <div style="display:flex">
                <div v-show="feed.likeList.length > 0">
                  <div v-for="(a, index) in feed.likeList" :key="index">
                    <b-button
                      :variant="
                        a.userId === $nuxt.$auth.user._id ? 'danger' : null
                      "
                      v-model="feed._id"
                      @click="onLike(feed._id, index)"
                      >ถูกใจ</b-button
                    >
                  </div>
                </div>

                <div v-show="feed.likeList.length === 0" class="ml-3 mr-3">
                  <b-button v-model="feed._id" @click="onLike(feed._id, index)"
                    >ถูกใจ</b-button
                  >
                </div>

                <p class="ml-3 mr-3">ถูกใจ {{ feed.likeList.length }} คน</p>
                <nuxt-link
                  class="ml-3 mr-3"
                  :to="{ name: 'post-id', params: { id: `${feed._id}` } }"
                >
                  ดูเพิ่มเติม
                </nuxt-link>
                <b-button
                  class="ml-3 mr-3"
                  v-model="feed._id"
                  @click="onShowComment(feed._id)"
                  >คอมเม้น</b-button
                >
              </div>
              <div v-show="feed.showComment">
                <div
                  v-for="(a, index) in feed.commentList"
                  :key="index"
                  :id="`${feed._id}`"
                >
                  <img
                    :src="`${a.userData.profileImage}`"
                    width="30"
                    height="30"
                    style="border-radius: 50px"
                  />
                  : {{ a.userData.name }} : {{ a.message }}
                </div>
                <b-form-input
                  class="mt-3"
                  :id="`${index}`"
                  v-model="text[index]"
                  @keypress.enter="sendComment(feed._id, index)"
                  placeholder="Enter your comment"
                ></b-form-input>
              </div>
            </em>
          </template>
        </b-card>
      </div>
      <b-button href="#" variant="primary" @click="onSubmit((page = page - 1))"
        >ย้อนกลับ</b-button
      >
      <b-button href="#" variant="primary" @click="onSubmit((page = page + 1))"
        >ไปต่อ</b-button
      >
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "home",
  middleware: "auth",
  components: {
    Modal
  },
  data() {
    return {
      text: [],
      // feeds: [],
      page: 1,
      showAdd: false,
      textarea: ""
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  },
  async asyncData({ $axios }) {
    const response = await $axios.$get("/api/feed", {
      params: {
        page: parseInt(1),
        limit: parseInt(10)
      }
    });
    return { feeds: response.data };
  },
  methods: {
    async onSubmit(page = 1, limit = 10) {
      try {
        const response = await this.$axios.$get("/api/feed", {
          params: {
            page: parseInt(page),
            limit: parseInt(limit)
          }
        });
        this.feeds = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendComment(id, index) {
      if (this.text[index] || this.text[index] !== undefined) {
        await this.$axios
          .$post(`/api/feed/${id}/comment`, {
            message: this.text[index]
          })
          .then(res => {
            if (res.status === "success") {
              this.$socket.emit("new_message", {
                index,
                result: res.data
              });
            }
          });
      }
      this.text = [];
    },
    async onLike(id, index) {
      await this.$axios
        .$put(`/api/feed/${id}/like`)
        .then(res => {
          if (res.status === "success") {
            this.$socket.emit("new_like", {
              result: res.data,
              index
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onListen() {
      this.$socket.on("receive_message", data => {
        const { index } = data;
        for (let i = 0; i < this.feeds.length; i++) {
          if (i === index) {
            this.feeds[index].commentList = data.response[0].commentList;
          }
        }
      });

      this.$socket.on("receive_like", data => {
        this.feeds.map(item => {
          if (item._id === data.response[0]._id) {
            item.likeList = data.response[0].likeList;
          }
        });
      });

      this.$socket.on("receive_post", data => {
        const { result } = data;
        this.feeds.unshift(result);
      });
    },
    onShowComment(id) {
      this.feeds.map(item => {
        if (id === item._id) {
          if (!item.showComment || item.sendComment === false) {
            item.showComment = true;
          } else {
            item.showComment = false;
          }
        }
      });
      this.$forceUpdate();
    },
    async handleSubmit() {
      await this.$axios
        .$post(`/api/feed`, {
          content: this.textarea
        })
        .then(res => {
          if (res.status === "success") {
            this.$socket.emit("new_post", {
              response: res.data
            });
          }
        })
        .catch(err => {
          throw err;
        });
      this.textarea = "";
      this.showAdd = false;
    }
  },
  mounted() {
    this.onListen();
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 500px;
  max-width: 500px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.setColor {
  color: red;
}
</style>
