import axios from "../src/axios-auth";
import { createStore } from "vuex";


const store = createStore({
    state() {
        return {
            token: null,
            username: null
        }
    },
    getters: {
    },
    mutations: {
        authenticateUser(state, parameters) {
            state.token = parameters.token,
            state.username = parameters.username
        }

    },
    actions: {
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => { axios.post("http://localhost:8080/login", {
                    "username": parameters.username,
                    "password": parameters.password,
                })
                .then((result) => {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + result.data.token;
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('employee', result.data.employee);
                    // localStorage.setItem('expires_at', result.data.expires_at)
                    // localStorage.setItem('userID', result.data.userID)
                    // localStorage.setItem('roles', result.data.roles)
                    commit('authenticateUser', result.data);
                    //{
                        // JWTtoken:result.data.JWTtoken,
                        // employee:result.data.employee
                        // token_type: result.data.token_type,
                        // expires_at: result.data.expires_at,
                        // userId:result.data.userId,
                        // roles: result.data.roles
                    //});
                    resolve()
                    })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                    });
            })
        },
        autoLogin({commit}){
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if(token && username){
                axios.defaults.headers.common["Authorization"]="Bearer " + token;
                commit('authenticateUser', {
                    token: token,
                    username: username
                });
               
            }
        }

    }
});

export default store;