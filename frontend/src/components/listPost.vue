<template>
  <div class="container-fluid gedf-wrapper">
    <div
      class="bloclist"
      v-bind:key="post.id"
      v-for="(post, index) in posts.posts"
    >
      <!-- {{ posts }} -->
      <div class="post-card">
        <div class="card gedf-card">
          <div
            class="card-header container-info"
            v-for="user in users.users.filter((user) => {
              return user.id == post.UserId;
            })"
            v-bind:key="user.id"
          >
            <!-- photo profil user-->
            <div class="mr-2">
              <img
                v-if="user.imageUrl == null"
                src="../assets/photo-avatar-profil.png"
                alt="photo de profil provisoire"
                id="avatar-profil"
                class="rounded-circle"
                style="width: 50px"
              />
              <img
                v-else
                :src="user.imageUrl"
                alt="photo de profil "
                id="avatar-profil"
                class="rounded-circle"
                style="width: 50px"
              />
            </div>
            <!--info user-->
            <div class="ml-2 info-post">
              <div class="h5 m-0">{{ user.firstName }} {{ user.lastName }}</div>
            </div>
          </div>

          <!--contenu du post-->
          <div class="card-body">
            <p v-if="post.content !== 'null'" class="card-text">
              {{ post.content }}
            </p>
            <div v-if="post.imageUrl != null">
              <img class="imagePost" v-bind:src="post.imageUrl" alt="image" />
            </div>

            <!-- bouton effacer si l'utilisateur a écrit le post ou est admin-->
            <div class="btn-deletePost">
              <button
                v-if="post.UserId == user.id || isAdmin === true"
                type="button"
                class="btn btn-danger"
                title="supprimer"
                aria-label="bouton supprimer"
                @click="deletePost(index)"
              >
                Delete Post
              </button>

              <button
                class="btn btn-danger"
                @click="showCreateComment = !showCreateComment"
              >
                Add comment
              </button>

              <button
                class="btn btn-danger"
                id="readButton"
                @click="readPost(index)"
                v-on:click="message = 'Post has been read'"
              >
                Mark as read
              </button>

              <div v-if="post.Comments != 0">
                <button
                  class="btn btn-danger"
                  @click="showComments = !showComments"
                >
                  See all comments
                </button>
              </div>
            </div>
          </div>

          <div v-if="showCreateComment">
            <addComment :idPostParent="post.id"></addComment>
          </div>

          <div v-if="post.Comments == 0">
            <p>No comments yet</p>
          </div>

          <div v-if="showComments">
            <div
              class="card-comment"
              v-for="comment in post.Comments.filter((comment) => {
                return comment.PostId == post.id;
              })"
              :key="comment.id"
            >
              <div
                class="card-body height3"
                v-for="user in users.users.filter((user) => {
                  return user.id == comment.UserId;
                })"
                v-bind:key="user.id"
              >
                <ul class="chat-list">
                  <div class="chat-img">
                    <div class="comment-info">
                      <img
                        v-if="user.imageUrl == null"
                        src="../assets/photo-avatar-profil.png"
                        alt="photo de profil provisoire"
                        id="avatar-profil"
                        class="rounded-circle"
                        style="width: 50px"
                      />

                      <img
                        v-else
                        :src="user.imageUrl"
                        alt="photo de profil "
                        id="avatar-profil"
                        class="rounded-circle"
                        style="width: 50px"
                      />
                    </div>
                  </div>

                  <div class="chat-body">
                    <div class="chat-message">
                      <h5>{{ user.firstName }} {{ user.lastName }}</h5>
                      <p v-if="comment.content !== null" class="card-text">
                        {{ comment.content }}
                      </p>
                    </div>
                    <div class="btn-deleteComment">
                      <button
                        v-if="comment.UserId == userId || isAdmin === true"
                        type="button"
                        class="btn btn-danger"
                        title="supprimer"
                        aria-label="bouton supprimer"
                        @click="deleteComment(comment.id)"
                      >
                        Delete comment
                      </button>
                    </div>
                  </div>
                </ul>
              </div>

              <!-- <div 
            class="comment-info"  
            v-for="user in users"                   
            v-bind:key="user.id">

              <span class="comment-avatar float-left">
                <img
                  v-if = "user.imageUrl == null"
                  src="../assets/photo-avatar-profil.png"
                  alt="photo de profil provisoire" id="avatar-profil"
                  class="rounded-circle"
                  style="width: 50px;"
                  /> 
                    
                  <img  
                  v-else            
                  :src="user.imageUrl"
                  alt="photo de profil " id="avatar-profil"
                   class="rounded-circle"
                  style="width: 50px;"
                  /> 
              </span>

                <div class="card-author">                
                  {{ user.firstName }} {{user.lastName }}
                </div>
            </div>     
  
          <div class="card-body">
            <p v-if ="comment.content!== null" class="card-text">{{ comment.content }}</p> -->

              <!-- </div>  -->
            </div>
          </div>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
const moment = require("moment");
moment.locale("fr");
import addComment from "@/components/addComment";

export default {
  name: "listPost",
  components: {
    addComment,
  },

  data() {
    return {
      showCreateComment: false,
      showComments: false,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        userId: "",
        firstName: " ",
        lastName: "",
        imageUrl: "",
      },
      post: [],
      posts: [],
      moment: moment,
      date: "",
      isAdmin: "",
    };
  },

  async created() {
    const url = `http://localhost:3000/api/user/accounts`;
    console.log(this.users);
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await fetch(url, options).then((res) => {
      res.json().then((data) => {
        console.log(data);
        console.table(data);
        this.users = data;
        // const currentUser = this.users.users.filter((user)=>{
        // return user.id == this.post.userID})
        // console.log(currentUser)
      });
    });
  },

  async mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    console.log(localStorage);

    let url = "http://localhost:3000/api/post";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    this.posts = await fetch(url, options).then((res) => {
      res.json().then((data) => {
        console.log(data);
        this.posts = data;
        console.log(this.posts);
        const currentPosts = this.posts.posts.reverse().slice;
        console.log(currentPosts);
      });
    });

    let urlComment = "http://localhost:3000/api/comment";
    let optionsComment = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    this.comments = await fetch(urlComment, optionsComment).then((res) => {
      res.json().then((data) => {
        console.log(data);
        this.comments = data;
      });
    });
  },

  methods: {
    async getPosts() {
      console.log("test");
      let url = "http://localhost:3000/api/post";
      let options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      return await fetch(url, options).then(function (res) {
        res.json().then(function (data) {
          this.posts = data;
          console.log(this.posts);

          this.posts.createdAt = data.posts.createdAt;
          console.log(this.posts.createdAt);
          this.posts.createdAt = this.posts.createdAt
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/");
          console.log(this.posts);
          return data;
        });
      });
    },

    readPost(index) {
      console.log(index);
      let confirmReadPost = confirm("Post will be marked read");

      let inputContent = {
        read: true,
        userId: localStorage.getItem("userId"),
        postId: this.posts.posts[index].id,
      };

      if (confirmReadPost == true) {
        this.text = "you read this post";
        let url = `http://localhost:3000/api/post/${this.posts.posts[index].id}/read`;

        let options = {
          method: "POST",

          body: JSON.stringify(inputContent),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };

        fetch(url, options)
          .then(function (res) {
            console.log(res);
            alert("Post marked read");
            document.getElementById("readButton").value = "you read this post";
            //window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    },

    changeToRead(index) {
      console.log(index);
      let confirmReadPost = confirm("Post will be marked read");

      let inputContent = {
        read: true,
        userId: localStorage.getItem("userId"),
        postId: this.posts.posts[index].id,
      };

      if (confirmReadPost == true) {
        let url = `http://localhost:3000/api/post/${this.posts.posts[index].id}/allRead`;

        let options = {
          method: "GET",

          body: JSON.stringify(inputContent),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };
        if (this.postId == this.userId) {
          fetch(url, options)
            .then(function (res) {
              console.log(res);
              alert("Post marked read");
              //window.location.reload();
            })
            .catch((error) => console.log(error));
        }
      }
    },

    deletePost(index) {
      console.log(index);
      let confirmDeletePost = confirm("Post will be deleted. Are you sure?");
      if (confirmDeletePost == true) {
        let url = `http://localhost:3000/api/post/${this.posts.posts[index].id}`;
        let options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        fetch(url, options)
          .then(function (res) {
            console.log(res);
            alert("Post deleted succesfully!");
            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    },

    async getComments() {
      console.log("test");
      let url = "http://localhost:3000/api/comment";
      let options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      return await fetch(url, options).then(function (res) {
        res.json().then(function (data) {
          this.comments = data;
          return data;
        });
      });
    },

    deleteComment(commentid) {
      let url = `http://localhost:3000/api/comment/${commentid}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      fetch(url, options)
        .then(function (res) {
          console.log(res);
          alert("Post deleted succesfully");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="css">
body {
  background-color: #eeeeee;
}

.container-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #0d0764 !important;
  color: white;
}
.fa {
  margin-left: 5px;
}

.info-post {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.imagePost {
  /* width : 300px;
  height : 200px; */
  text-align: center;
  margin: 5px;
  width: 60vw;
  min-width: 220px;
  min-height: 220px;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border: 1px solid #1026b9;
  border-radius: 8px;
  box-shadow: 1px 1px 2px rgb(24, 24, 24);
}
.card-comment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* padding:5px; */
  /* border-top: solid 1px rgb(218, 210, 210); */
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.comment-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.bnt-send {
  margin-top: 2px !important;
}
.btn-deletePost {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
}

.comment-avatar img {
  margin-top: 1px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}

@media (min-width: 992px) {
  .gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}
.gedf-card {
  margin-bottom: 0.5rem;
  width: 70%;
}

.post-card {
  margin: auto;
  width: 90%;
  flex-direction: row;
  justify-content: center;
}

/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}

container-fluid gedf-wrapper {
  height: auto;
  width: 100%;
}

.bloclist {
  width: 100%;
  margin: auto;
  margin-top: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  padding: 0px;
}

.chat-list {
  padding: 0;
  font-size: 0.8rem;
}

.chat-list .chat-img {
  float: right;
  width: 48px;
}

.chat-list .chat-img img {
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  width: 100%;
}

.chat-list .chat-message {
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  background: #fcd9ba;
  display: inline-block;
  padding: 10px 20px;
  position: relative;
}

.chat-list .chat-message h5 {
  margin: 0 0 5px 0;
  font-weight: 600;
  line-height: 100%;
  font-size: 0.9rem;
}
</style>
