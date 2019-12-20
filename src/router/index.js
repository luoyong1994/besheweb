import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)
import index from "../components/view/index";
import admin from "../components/view/admin";
import addUser from "../components/view/addUser";
import queryUser from "../components/view/queryUser.vue";
import addOrder from "../components/view/addOrder.vue";
import queryOrder from "../components/view/queryOrder.vue";
import queryAcceptOrder from "../components/view/queryAcceptOrder.vue"
import userLogin from "../components/view/userLogin"
import updateUser from "../components/view/updateUser";
import orderList from "../components/view/orderList.vue";
import orderDetail from "../components/view/orderDetail.vue";
import classify from "../components/view/addClassify.vue";
import queryClassify from "../components/view/queryClassify.vue";

const router =  new Router({
  routes: [
   {
      path: "/",
      name: "index",
      component: index,
      props: true,
      children:[
        {
          path: "/orderList",
          name: "orderList",
          component: orderList,
          props: true
        },
        {
          path:"/orderDetail",
          name:"orderDetail",
          component:orderDetail,
          props:true
        }
      ]
    },
    {
      path:"/userLogin",
      name:"userLogin",
      component:userLogin,
      props:true
    },
    {
      path:"/registsuccess",
      name:"registsuccess",
      redirect:"/"
    },
    {
      path: "/admin",
      name: "admin",
      component: admin,
      props: true,
      meta:{
        requireAuth:true
      },
      children: [
        {
          path: "/addUser",
          name: "addUser",
          component: addUser,
          props: true,
          meta:{
            requireAuth:true
          }
        },
        {
          path: "/queryUser",
          name: "queryUser",
          component: queryUser,
          props: true,
          meta:{
            requireAuth:true
          }
        }, 
        {
          path: "/addOrder",
          name: "addOrder",
          component: addOrder,
          props: true,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/queryOrder",
          name:"queryOrder",
          component:queryOrder,
          props:true,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/queryAcceptOrder",
          name:"queryAcceptOrder",
          component:queryAcceptOrder,
          props:true,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/updateUser",
          name:"updateUser",
          component:updateUser,
          props:true, 
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/classify",
          name:"classify",
          component:classify,
          props:true,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/queryClassify",
          name:"queryClassify",
          component:queryClassify,
          props: true,
          meta:{
            requireAuth:true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  if(to.meta.requireAuth==true){ 
    if(store.state.user.name!=undefined){
      next()
    }else{
      if(to.path=="/userLogin"){
        next();
      }else{
        next({
          path:"/userLogin",
          query:{
            redirect:to.fullPath
          }
        });
      }
    }
  }else{
    next();
  }
  
})
export default router;