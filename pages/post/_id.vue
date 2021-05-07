<template lang="html">
  <div class="container">
    <div v-for="(feed, index) in feeds" :key="index">
      <b-card
        :title="`${feed.content}`"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2 p-6 d-flex"
      >
        <b-card-text v-if="feed.media">
          <div v-for="(img, index) in feed.media" :key="index">
            <img :src="`${img.fileUrl}`" alt="" width="300" height="300" />
          </div>
        </b-card-text>
      </b-card>
    </div>
    <b-button href="#" variant="primary" :to="{ path: '/' }">Go home</b-button>
  </div>
</template>

<script>
export default {
  name: "post-id",
  middleware: "auth",
  data() {
    return {
      feeds: {}
    };
  },
  methods: {
    async getData() {
      const response = await this.$axios.$get(
        `http://localhost:5000/api/feed/${this.$route.params.id}`
      );
      this.feeds = response.data;
    }
  },
  async mounted() {
    this.getData();
  }
};
</script>

<style lang="css" scoped></style>
