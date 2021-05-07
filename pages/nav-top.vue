<template>
  <div>
    <b-nav>
      <b-nav-item active :to="{ name: 'Profile' }">profile</b-nav-item>
      <b-nav-item :to="{ path: '/' }">Home</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "nav-top"
};
</script>

<style></style>
