<template>
    <div class="login">
        <div class="card">
            <div class="card-head">
                <h2>Welcome, please login in first.</h2>
            </div>
            <div class="card-body">
                <input type="text" placeholder="Email" v-model="login.username"><br>
                <input type="password" placeholder="Password" v-model="login.password"><br>
                <button class="btn btn-primary" @click="loginProccess">Login</button>
                <p>Have you been here before? Create your account <router-link :to="{ path: '/sign-up'}" replace>here</router-link>.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from './../router'
import {getHeader, getOutlet, apiDomain, loginURL} from '../config'

export default {
  data: () => {
    return {
      login: {
        username: '',
        password: '',
        token: window.localStorage.getItem('authUser')
      }
    };
  },
  methods: {
    loginProccess() {
      const data = {
        username: this.login.username,
        email: this.login.username,
        password: this.login.password
      };
      this.$store.dispatch('login', data)
    }
  }
};
</script>
