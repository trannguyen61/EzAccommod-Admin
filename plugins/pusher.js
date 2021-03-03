import Vue from 'vue'
 
Vue.use(require('vue-pusher'), {
    api_key: '7d2ff12889bbde94065e',
    options: {
        cluster: 'ap3',
        encrypted: true,
    }
})

