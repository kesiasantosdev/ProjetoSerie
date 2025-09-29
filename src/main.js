import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faRightFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons'

library.add(faUser, faRightFromBracket, faHeart, faUserRegular, faMagnifyingGlass)

const app = createApp(App)
const pinia = (createPinia())

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
