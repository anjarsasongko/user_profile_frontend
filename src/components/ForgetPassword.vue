<template>
<div class="login">
    <div class="card">
        <div class="card-head">
            <h2>Welcome, please login in first.</h2>
        </div>
        <div class="card-body">
            <p>Send Password reset to my email.</p>
            <input type="text" placeholder="Email" v-model="email"><br>
            <button class="btn btn-primary" @click="forgetProccess" :disabled="resetStatus">Send</button>
            <p>Back to <router-link :to="{ path: '/login'}" replace>login page</router-link>.</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      resetStatus: false
    }
  },
  methods: {
    forgetProccess() {
      this.resetStatus = true
      this.$store.dispatch('reset', this.email).then(()=>{
        this.resetStatus = false
      })
    }
  }
};
</script>
