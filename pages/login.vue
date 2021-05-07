<template>
  <div class="container">
    <div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Enter password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-radio-group
            v-model="form.role"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        role: "Customer"
      },
      options: [
        { text: "Customer", value: "Customer" },
        { text: "Transport", value: "Transport" },
        { text: "Collector", value: "Collector" }
      ]
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password,
            role: this.form.role
          }
        });
        if (response.status === 200) {
          this.$router.replace({ name: "Profile" });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
