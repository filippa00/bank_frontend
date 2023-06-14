import { createRouter, createWebHistory } from "vue-router";
//main endpoints
import index from "../components/main/index.vue";
import login from "../components/main/login.vue";

//users endpoints 
import register from "../components/users/register.vue";
import noAccount from "../components/Employees/noAccount.vue";
import profile from "../components/Profile.vue/index.vue";

//account 
import createAccount from "../components/Employees/createAccount.vue";
import accountInfo from "../components/Employees/accountInfoModal.vue";

//transaction endpoints 
import transaction from "../components/transactions/index.vue";
import accountTransactions from "../components/transactions/accountTransactions.vue";

//Manage employees
import manage from "../components/Employees/index.vue";
//import axios from "../axios-auth";




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
      path: "/profile",
      name: "profile",
      component: profile
    },
    {
      path: "/user/noaccount",
      name: "noAccount",
      component: noAccount
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
    {
      path:"/transactions/:iban",
      name:"accountTransactions",
      component: accountTransactions,
      props:true,
    },
  
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