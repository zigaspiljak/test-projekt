<template>
  <Header />
  <form class="add">
    <h1>Dodaj projekt</h1>
    <input type="text" name="name" placeholder="Enter Name" v-model="projects.name"/>
    <button type="button" v-on:click="addProject">Dodaj nov projekt</button>
  </form>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "Add",
  data() {
    return {
      name: "",
      projects: {
        name: "",
        posts: []
      },
    };
  },
  methods: {

    async addProject() {
      const result = await axios.post("http://localhost:3000/projects", {
        name: this.projects.name,
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
        posts: []
      });
      if (result.status == 201) {
        alert("Projekt ustvarjen!");
        this.$router.push({ name: "home" });
      } else {
        alert("Projekt ni ustvarjen!");
      }
    },
  },

  components: {
    Header,
  },
  async mounted() {
     this.date = this.getDate();
    this.timestamp = this.getTimestamp();
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "login" });
    }
  },
  
};
</script>

<style>
.add {
  width: 500px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
}
</style>
