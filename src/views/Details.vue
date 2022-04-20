<template>
  <Header />
  <div class="zapis">
    <h1>{{ posts.name }}</h1>
    <br />
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
    <br />
    <input
      type="text"
      name="post"
      placeholder="Sporočilo..."
      v-model="postName"
    />
    <button class="button-send" v-on:click="addPost()">Pošlji</button>
  </div>
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
    );
    this.posts = result.data;
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
  border-radius: 5px;
}

.right {
  float: right;
}

.zapis {
  width: 600px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
}

.zapis input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
  border-radius: 30px;
}

.zapis button{
    width: 80px;
    height: 40px;
  margin-top: -38px;
  margin-left: 20px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
}
</style>
