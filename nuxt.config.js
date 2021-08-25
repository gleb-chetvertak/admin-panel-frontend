export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'glebity-admin-panel',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    server: {
        port: 3001 // default: 3000
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'node_modules/modern-normalize/modern-normalize.css',
        '~assets/styles/main.scss'
    ],

    styleResources: {
        scss: [
            '~assets/styles/_variables.scss',
            '~assets/styles/_mixins.scss'
        ]
    },

    googleFonts: {
        families: {
            Roboto: true,
            'Roboto+Condensed': true,
        }
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        // https://vuelidate.js.org/#getting-started
        '~/plugins/vuelidate.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/nuxt-community/svg-module
        '@nuxtjs/svg',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://www.npmjs.com/package/@nuxtjs/style-resources
        '@nuxtjs/style-resources',
        // https://google-fonts.nuxtjs.org/setup
        '@nuxtjs/google-fonts',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:3000/api/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
        lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
