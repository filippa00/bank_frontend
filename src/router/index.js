import { createRouter, createWebHistory } from "vue-router";
//main endpoints
import index from "../components/main/index.vue";
import login from "../components/main/login.vue";

//users endpoints 
import register from "../components/users/register.vue";
import updateUser from "../components/users/updateUser.vue";
import totalBalance from "../components/users/totalBalance.vue";
import noAccount from "../components/Employees/noAccount.vue";
import getUsers from "../components/users/getUsers.vue";

//account endpoints 
import createAccount from "../components/Employees/createAccount.vue";
import accountInfo from "../components/Employees/accountInfoModal.vue"
//transaction endpoints 

//Manage employees
import manage from "../components/Employees/index.vue";
import transaction from "../components/transactions/"




const routes = [
  //main endpoints 
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    //users endpoints 
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/user/update",
      name: "updateUser",
      component: updateUser
    },
    {
      path: "/user/totalbalance",
      name: "totalBalance",
      component: totalBalance
    },
    {
      path: "/user/noaccount",
      name: "noAccount",
      component: noAccount
    },
    {
      path: "/users",
      name: "getUsers",
      component: getUsers
    },
    //manage endpoints 
    {
      path: "/manage",
      name: "manage",
      component: manage
    },
    //account endpoints 
    {
      path:"/account/:id",
      name:"account",
      props: true,
      component: createAccount,
   
    },
    {
      path:"/accountInfo",
      name:"accountInfo",
      component: accountInfo,
   
    },
    {
      path:"/transactions",
      name:"transactions",
      component: transaction,
   
    },

    //transaction endpoints 
  
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach((to)=>{
    if(to.name != 'index' && to.name != 'register' && to.name != 'login'){
      if(!localStorage.getItem('token')){
        return'/login';
      }else if(to.name == 'manage' && localStorage.getItem('employee') != 'true'){
        return'/login';
      }
    }                                                                                                                                                                                                                                  
  })
  
  export default router;