<template>
  <div class="container-profil">
    <div>
      <p class="title">Welcome {{ user.firstName }} {{ user.lastName }}</p>
    </div>

    <section class="vh-100" style="background-color: #f4f5f7">
      <!-- <div class="container py-5 h-100">  -->
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-8 mb-4 mb-lg-0">
          <div class="card mb-3" style="border-radius: 0.5rem">
            <div class="row g-0">
              <div
                class="col-md-4 gradient-custom text-center text-white"
                style="
                  border-top-left-radius: 0.5rem;
                  border-bottom-left-radius: 0.5rem;
                  background-color: #0d0764;
                "
              >
                <!--formulaire -->
                <form
                  id="form"
                  enctype="multipart/form-data"
                  @submit="updatePicture"
                  className="upload-pic"
                >
                  <img
                    v-if="user.imageUrl == null"
                    src="../assets/photo-avatar-profil.png"
                    alt="photo de profil provisoire"
                    id="avatar-profil"
                    class="img-fluid my-5"
                    style="width: 115px"
                  />

                  <img
                    v-else
                    :src="user.imageUrl"
                    alt="photo de profil "
                    id="avatar-profil"
                    class="img-fluid my-5"
                    style="width: 115px"
                  />

                  <div class="card-body mx-auto"></div>
                </form>
              </div>

              <div v-bind="user" class="col-md-8">
                <div class="card-body p-4">
                  <h6>Profile</h6>
                  <hr class="mt-0 mb-4" />

                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Name</h6>
                      <p class="info-profil">{{ user.firstName }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Last Name</h6>
                      <p class="info-profil">{{ user.lastName }}</p>
                    </div>
                  </div>

                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <p class="info-profil">{{ user.email }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Account Register</h6>
                      <p class="info-profil">{{ user.createdAt }}</p>
                    </div>
                  </div>
                  <div class="row pt-1">
                    <div class="col-6 mb-3" v-if="user.isAdmin == true">
                      <h6>Role</h6>
                      <p class="info-profil">Administrateur</p>
                    </div>
                  </div>

                  <div>
                    <!-- <div class ="btn" v-show ="user.isAdmin === true">  -->
                    <!-- si user = admin => affichage bouton supprime -->
                    <button
                      v-if="(userId = user.id || user.isAdmin == true)"
                      class="form-control btn btn-danger"
                      v-bind="user"
                      @click="deleteUser"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "profilUser",

  // props:{
  //   value : File
  // },

  data() {
    return {
      //  src: null,
      //  file:null,
      user: {
        id: localStorage.getItem("userId"),
        firstName: " ",
        lastName: "",
        email: "",
        imageUrl: "",
        creatAt: "",
      },
      file: "",
    };
  },

  async mounted() {
    const url = `http://localhost:3000/api/user/${this.user.id}`;
    console.log(this.user.id);
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await fetch(url, options).then((res) => {
      res.json().then((data) => {
        console.table(data);
        console.log(data);
        this.user = data.user;
        this.user.createdAt = this.user.createdAt.split("T")[0];
        let jour = this.user.createdAt.split("-")[2];
        let mois = this.user.createdAt.split("-")[1];
        let annee = this.user.createdAt.split("-")[0];
        this.user.createdAt = jour + " " + mois + " " + annee;
        console.log(this.user);

        // return data;
      });
    });
  },

  methods: {

    async getOneUser() {
      let url = `http://localhost:3000/api/user/${this.user.id}`;
      console.log(this.user.id);
      let options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      return await fetch(url, options).then(function (res) {
        res.json().then(function (data) {
          return data;
        });
      });
    },

    deleteUser() {
      let url = `http://localhost:3000/api/user/${this.user.id}`;
      console.log(this.user.id);
      let option = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      let confirmDeleteUser = confirm(
        "Do you really want to delete the account?"
      );
      if (confirmDeleteUser == true) {
        return fetch(url, option)
          .then(function (res) {
            res.json();
            console.log(res.json);

            alert("Account deleted!");
            localStorage.clear();
          })
          .then(this.$router.push("/login"));
      } else
        alert("Account will not be deleted")

          .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
.title {
  color: #fd2d01 !important;
  font-size: 26px;
  text-align: center;
}

.info-profil {
  color: #fd2d01 !important;
  font-size: 14px;
}
.container-profil {
  width: 100%;
  height: 100%;
}

#file {
  display: none;
}

#avatar-profil {
  height: 100%;
  border-radius: 50%;
}

.btn-confirm {
  margin-top: 0;
}
</style>
