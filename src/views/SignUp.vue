<template>
  <Header /> 
  <div class="login-register">
    <h1>Registracija</h1>
    <input type="text" v-model="name" placeholder="Enter Name" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <p><b>Tip uporabnika: </b>
    <select name="roles" v-model="role">
        <option value="user">Uporabnik</option>
        <option value="admin">Admin</option>
    </select>
    </p>
    <button v-on:click="register">Registracija</button>
  </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    name: 'sign-up',
    data(){
      return{
      name: '',
      email:'',
      password: '',
      role:'user'
      }
    },
    components:{
      Header
    },
    methods:{
      async register()
      {
        let result = await axios.post("http://localhost:3000/users",{
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });

        console.warn(result);
        if(result.status==201){
          alert("Uporabnik uspešno dodan!");
          this.$router.push({name:'home'})
        }
        else{
          alert("Neuspešna registracija!");
        }
      }
      }
}
</script>

<style>

</style>