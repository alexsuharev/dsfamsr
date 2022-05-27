import colors from 'vuetify/es5/util/colors'

export default {
  // server: {
    // host: '0', // default: localhost
  // },
  router: {
    middleware: ['auth']
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - dsfamsr',
    title: 'dsfamsr',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/chartjs.js', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', {fix: true}],
    // https://go.nuxtjs.dev/stylelint
    ['@nuxtjs/stylelint-module', {fix: true}],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@nuxtjs/firebase',
    '@nuxtjs/toast',
  ],

  // firebase: {
  //   config: {
  //     apiKey: "AIzaSyAs5OL_iiOSkV7k7TaQX4j7_ufOpjarx4w",
  //     authDomain: "dsfamsr.firebaseapp.com",
  //     projectId: "dsfamsr",
  //     storageBucket: "dsfamsr.appspot.com",
  //     messagingSenderId: "126385654107",
  //     appId: "1:126385654107:web:24d1946abb60bc1416b27e",
  //     measurementId: "G-CGMH0MZB2J"
  //   },
  //   services: {
  //     auth: {
  //       persistence: 'local', // default
  //       initialize: {
  //         onAuthStateChangedAction: 'onAuthStateChangedAction',
  //         subscribeManually: false
  //       },
  //       ssr: false
  //     }
  //   }
  // },
  moment: {
    locales: ['ru']
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'http://dsfamsr.ru/api/login', method: 'post' },
          logout: { url: 'http://dsfamsr.ru/api/logout', method: 'post' },
          user: { url: 'http://dsfamsr.ru/api/get-user', method: 'get' }
        }
      }
    }
  },
  toast: {
    position: 'bottom-right',
    duration: 3000,
    keepOnHover: true,
    action : {
      text : 'Close',
      onClick : (e, toastObject) => {
          toastObject.goAway(0);
      }
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://dsfamsr.ru/api',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true
  },
}
