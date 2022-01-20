import { observable, makeAutoObservable, action, makeObservable } from 'mobx';
import axios from 'axios';
import api from './api';
import jwtDecode from 'jwt-decode';

class AuthStore{
 user = null
 constructor(){
    makeAutoObservable(this,{ })
}

setUser =(token)=>{
    api.defaults.headers.common.Authorization=`Bearer${token}`
    this.user=jwtDecode(token)
    localStorage.setItem("myToken",token)
}

signUpMethod = async(user) =>{
try {
    const response=await api.post(("/signup"), user)
    localStorage.setItem("myToken", response.data.token)
    api.defaults.headers.common.Authorization=`Bearer ${response.data.token}`
    this.user = jwtDecode(response.data.token)
    console.log(user)
} catch (error)
{
    console.log(error)
}
}

signInMethod = async(user) =>{
    try {
        const response=await api.post(("/signin"), user)
        api.defaults.headers.common.Authorization=`Bearer ${response.data.token}`
        localStorage.setItem("myToken", response.data.token)
        this.user = jwtDecode(response.data.token)
        console.log(user)
    } catch (error)
    {
        console.log(error)
    }
    }

    logout =()=>{
        this.user=null
        delete api.defaults.headers.common.Authorization;
        localStorage.removeItem("myToken");
    }

    checkForToken=()=>{
        const token = localStorage.getItem("myToken")
        if (token) {
            const currentTime = Date.now()
            let user = jwtDecode(token)
            if (user.exp>currentTime){
                this.setUser(token)
            } else {
                alert("You are now logged out automatically. Please sign in again!")
                this.logout()
            }
        }
    }

}
const authStore = new AuthStore()
authStore.checkForToken()
export default authStore