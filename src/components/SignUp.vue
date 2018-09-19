<template>
    <div class="sign-up">
        <h2>Hay, let's create your account.</h2>
        <input type="text" placeholder="Username" v-model="login.username"><br>
        <input type="email" placeholder="Email" v-model="login.email"><br>
        <input type="password" placeholder="Password" v-model="login.password"><br>
        <button class="btn btn-danger" @click="signUp">Sign Up</button>
        <p>Back to <router-link :to="{ path: '/login'}" replace>login page</router-link>.</p>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { getHeader, getUser, userURL, loginURL } from "../config";

export default {
    data: () => {
        return {
            login : {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods : {
        signUp () {
            let l = this.login
            let data = {
                username: l.username,
                email: l.email,
                password: l.password
            }
            this.$store.dispatch('signUp', data);
        }
    }
}
</script>
