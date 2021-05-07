<template>
  <div>
    <b-card
      :title="`${$nuxt.$auth.user.name}`"
      :img-src="`${$nuxt.$auth.user.personalCodeImages}`"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{ $nuxt.$auth.user.address }}
      </b-card-text>

      <b-button variant="primary" @click="logout">Logout</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Profile",
  middleware: "auth",
  methods: {
    logout() {
      this.$nuxt.$auth.logout();
      this.$router.replace({ name: "login" });
    }
  }
};
</script>

<style></style>
