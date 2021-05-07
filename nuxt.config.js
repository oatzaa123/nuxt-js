export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  auth: {
    redirect: {
      login: "/login",
      home: "/login"
    },
    strategies: {
      local: {
        token: {
          property: "accessToken"
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "data.profile"
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "http://localhost:5000/api/auth/signIn",
            method: "post",
            propertyName: "accessToken"
          },
          logout: {
            url: "http://localhost:5000/api/auth/signOut",
            method: "post"
          },
          user: {
            url: "http://localhost:5000/api/users/getProfile",
            method: "get"
          }
        }
      }
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "demo",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  styleResources: {
    scss: ["~/assets/scss/main.scss"]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/socketio.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://localhost:5000"
    // proxy: true
  },

  proxy: {
    "/api": {
      target: "http://localhost:5000",
      pathRewrite: {
        "^/api": "/"
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
