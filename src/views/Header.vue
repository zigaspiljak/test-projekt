<template>
  <div class="nav">
    <router-link to="/">Projekti</router-link>
    <router-link to="/add">Dodaj projekt</router-link>
    <router-link v-if="isAdmin" to="/sign-up">Dodaj uporabnika</router-link>
    <a class="logout" v-on:click="logout" href="#">Odjava</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false,
    };
  },

  created: async function () {
    const result = JSON.parse(localStorage.getItem("user-info"))
    this.isAdmin = result.role === "admin"
    console.log(result.role)
  },

  name: "Header",
  methods: {
    logout(to, from) {
      const answer = window.confirm("Se želiš odjaviti?");
      if (!answer) {
        return false;
      } else {
        localStorage.clear();
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style>
.nav {
  height: 40px;
  padding-top: 20px;
  background-color: #333;
  overflow: hidden;
}
.nav .logout {
  color: red;
}
.nav a {
  color: white;
  padding: 20px 14px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}

.nav a:hover {
  background-color: #ddd;
  color: #333;
}
</style>
