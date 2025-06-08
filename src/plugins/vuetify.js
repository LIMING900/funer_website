import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#1B2B4B',
        secondary: '#2E4374',
        accent: '#D4AF37',
        info: '#4A90E2',
        success: '#2ECC71',
        warning: '#F1C40F',
        error: '#E74C3C',
        background: '#F5F7FA'
      }
    }
  }
}) 