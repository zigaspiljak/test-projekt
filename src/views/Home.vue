<template>
  <Header />
  <div class="list">
    <h1>Projekti</h1>
    <input v-model="search" type="text" placeholder="Išči projekt" />
    <div v-for="project in filterByTerm" :key="project.id">
      <a class="left"><b> {{ project.name }}</b></a>
      <a>{{ project.timestamp }}</a>
      <br/><br/>
      <button class="right" v-on:click="izberiProjekt(project.id)">Uredi</button>
      <button v-on:click="deleteProject(project.id)">Izbriši</button>
    </div>
  </div>
  <!-- <div>
    <p>Število projektov = {{count}}</p>
    <button v-on:click="counting()">Osveži statistiko</button>
  </div> -->

</template>


<script>
import Header from "./Header.vue";
import axios from "axios";
import moment from "moment";


export default {
  name: "Home",
  data() {
    return {
      name: "",
      projects: [],
      search: "",
      count:""
    };
  },
  components: {
    Header,
  },
  methods: {
    async deleteProject(id) {
      let result = await axios.delete("http://localhost:3000/projects/" + id);
      if (result.status == 200) {
        this.loadData();
      }
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "login" });
      }
      let result = await axios.get("http://localhost:3000/projects");
      console.warn(result);
      this.projects = result.data;
    },
     counting(){
      this.count = this.projects.length
      console.log(moment())
    },
    izberiProjekt(id) {
    this.$router.push({name:'details', params:{Pid:id}})
  },
  },
    beforeMount(){
    console.log("test")
 },
  computed: {
    filterByTerm() {
      return this.projects.filter((project) => {
        return project.name.toLowerCase().includes(this.search);
      })
  },
  orderedProjects() {
    return _.orderBy(this.projects, 'name')
  }

  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style>
td {
  width: 160px;
  height: 40px;
  text-align: center;
}

table {
  margin-left: auto;
  margin-right: auto;
}

.list {
  width: 600px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
}

.list input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
  border-radius: 30px;
}

.list button {
  float: right;
  margin-top: -38px;
  margin-left: 20px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
}

.border-bottom {
  border-bottom: 1px solid;
}

.left {
  float: left;
  padding-left: 50px;
}

.right {
  float: right;
  margin-right: 60px;
}

</style>
