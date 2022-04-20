<template>
  <div class="login-register">
    <h1>Prijava</h1>
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login">Prijava</button>
  </div>
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs';
export default {
  name: "login",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    async login()
    {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      )
        if(result.status==200 && result.data.length>0)
        {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]))
          this.$router.push({name:'home'})
        }
        else{
          alert("Napačen email ali geslo!");
        }
      console.warn(result)
    }
  },
      async mounted() {
    let user = localStorage.getItem("user-info")
    if (user) {
      this.$router.push({ name: "home" })
    }
    }
}
</script>
