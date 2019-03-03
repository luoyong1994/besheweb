import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import showRegion from '../components/view/showRegion';
import index from "../components/view/index";
export default new Router({
  routes: [
    {
      path:"/",
      name:"index",
      component:index,
      props:true
    },
    {
      path:"/showRegion/:userId",
      name:"showRegion",
      component:showRegion,
      props:true
    }
  ]
})
