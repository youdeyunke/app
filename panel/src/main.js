/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import { Vue as VueIntegration } from '@sentry/integrations';
import VueClipboard from 'vue-clipboard2'
import PublicStatus from '@/components/PublicStatus'
import DateTimePicker from "@/components/DateTimePicker";
import EnumerationSelector from '@/components/EnumerationSelector/Index'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import * as Sentry from '@sentry/browser';
import '@/styles/index.scss' // global css

// import * as Sentry from "@sentry/vue";

import App from './App'
import store from './store'
import router from './router'
import UdCard from '@/components/UdCard'
import filters from '@/utils/filters'
import ImagePicker from '@/components/ImagePicker'
import PostSelector from '@/components/PostSelector'
import '@/utils/auto-disabled'
import ace from 'ace-builds'

import '@/icons' // icon
import '@/permission' // permission control

// highlight.js代码高亮插件
// import Highlight from './utils/highlight'; 
// Vue.use(Highlight);


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VueClipboard)
Vue.use(ace)

Object.keys(filters).forEach((key, i) => {
    Vue.filter(key, filters[key])
})
// sentry 
//Sentry.init({
//  dsn: 'https://9d19ffb5695a4d44a34e47de94316c9c@o302177.ingest.sentry.io/1729034',
//  integrations: [new VueIntegration({Vue, attachProps: true})],
//});

/*  以下是系统中常用的组件，将它们注册为全局组件，方便使用 */
Vue.component(PublicStatus.name, PublicStatus)
Vue.component(UdCard.name, UdCard)
Vue.component(EnumerationSelector.name, EnumerationSelector)
Vue.component(DateTimePicker.name, DateTimePicker)
Vue.component(ImagePicker.name, ImagePicker)
Vue.component(PostSelector.name, PostSelector)

Vue.config.productionTip = false

// Sentry相关
// Sentry.init({
//     Vue,
//     dsn: "http://2c19ec035196c0a225b8a68da3871477@udsentry.natapp1.cc/4",
//     integrations: [
//       new Sentry.BrowserTracing({
//         // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//         tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//       }),
//       new Sentry.Replay({
//         maskAllText: false,
//         blockAllMedia: false,
//       }),
//     ],
//     // Performance Monitoring
//     tracesSampleRate: 1.0, //  Capture 100% of the transactions
//     // Session Replay
//     replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//     replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})



var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + 'b8efec8d5a0bee7cc25038c6514ce689';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();