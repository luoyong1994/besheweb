import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import showRegion from '../components/view/showRegion';
import index from "../components/view/index";
import adminNavigator from "../components/view/adminNavigator";
import adminLogin from "../components/view/adminLogin";
import addUser from "../components/view/addUser";
import manageUserPage from "../components/view/manageUserPage";
import addRegion from "../components/view/addRegion";
import queryRegion from "../components/view/queryRegion";
import updateRegion from "../components/view/updateRegion";
import userRegister from "../components/view/userRegister";
import userLogin from "../components/view/userLogin"
import updateUser from "../components/view/updateUser";
export default new Router({
  routes: [{
      path: "/index",
      name: "index",
      component: index,
      props: true
    },
    {
      path: "/showRegion/:userId",
      name: "showRegion",
      component: showRegion,
      props: true
    },
    {
      path:"/",
      name:"userLogin",
      component:userLogin,
      props:true
    },
    {
      path:"/userRegister",
      name:"userRegister",
      component:userRegister,
      props:true
    },
    {
      path: "/adminLogin",
      name: "adminLogin",
      component: adminLogin,
      props: true
    },
    {
      path: "/adminNavigator",
      name: "adminNavigator",
      component: adminNavigator,
      props: true,
      children: [
        {
          path: "/addUser",
          name: "addUser",
          component: addUser,
          props: true
        },
        {
          path: "/manageUserPage",
          name: "manageUserPage",
          component: manageUserPage,
          props: true
        }, 
        {
          path: "/addRegion",
          name: "addRegion",
          component: addRegion,
          props: true
        },
        {
          path:"/queryRegion",
          name:"queryRegion",
          component:queryRegion,
          props:true
        },
        {
          path:"/updateRegion",
          name:"updateRegion",
          component:updateRegion,
          props:true
        },
        {
          path:"/updateUser",
          name:"updateUser",
          component:updateUser,
          props:true
        }
      ]
    }
  ]
})