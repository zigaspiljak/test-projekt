<template>
  <Header />
  <h1>{{ posts.name }}</h1>
  <table class="projekt-zapis" v-if="posts">
    <thead>
      <tr>
        <th>Sporočilo</th>
        <th>Čas zapisa</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(post, index) in posts.posts" :key="index">
          <td>{{ post.post }}</td>
          <td>{{ post.timestamp }}</td>
        </tr>
    </tbody>
  </table>
  <input type="text" name="post" placeholder="Besedilo..." v-model="postName" />
  <button v-on:click="addPost()">Pošlji</button>
</template>
<script>
import Header from "./Header.vue";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "details",
  data() {
    return {
      //     posts: {
      //     post: "",
      //     timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      //    },
      //     id: this.$route.params.Pid,
      //     projects: {},
      //     users: { name: ""}4
      posts: {},
      postName: "",
    };
  },
  components: {
    Header,
  },

  created: async function () {
    const result = await axios.get(
     "http://localhost:3000/projects/" + this.$route.params.Pid
    )
    this.posts = result.data
    },

  methods: {
    async addPost() {
      if (!this.postName.length) {
        return;
      }
      await axios
        .patch("http://localhost:3000/projects/" + this.$route.params.Pid, {
          posts: [
            {
              post: this.postName,
              timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
              id: uuidv4(),
            },
            ...this.posts.posts,
          ],
        })
        .then((response) => {
          if (response.status == 200) {
            this.posts.posts = response.data.posts.posts;
            alert("Sporočilo zapisano!");
            this.$router.push({ name: "home" });
          } else {
            alert("Sporočilo ni zapisano!");
          }
        });
    },
    async projectID() {
      let result = await axios.get(
        "http://localhost:3000/projects/" + this.$route.params.Pid
      );
    },
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "login" });
    }
  },
  //   computed: {
  //     filterByTerm() {
  //       return this.projects.filter((project) => project.id === this.$route.params.Pid )
  //   }
  //   },
};
</script>

<style>
.projekt-zapis {
  width: 70%;
  border: 1px solid;
  border-radius: 5px;
}

.right{
    float: right;
}



</style>
