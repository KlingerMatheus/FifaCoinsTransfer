import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faEdit, faTrash, faPlus, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck);
library.add(faEdit);
library.add(faTrash);
library.add(faPlus);
library.add(faTimes);
library.add(faExclamationTriangle);

createApp(App).component("fa-icon", FontAwesomeIcon).mount('#app')
