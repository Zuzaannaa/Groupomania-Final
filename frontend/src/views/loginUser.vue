<template>
  <div class="container-login" id="content">
    <section class="vh-100" style="background-color: #706e6e">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style="border-radius: 1rem">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    class="img-fluid"
                    style="border-radius: 1rem 0 0 1rem"
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form v-on:submit.prevent="loginAccount()">
                      <div class="logo-login"><logoHome /></div>
                      <!-- <div class="d-flex align-items-center mb-3 pb-1">                   
                    <span class="fw-bold mb-0"><navHome/></span>
                  </div> -->

                      <h5
                        class="fw-normal mb-3 pb-3 login-title"
                        style="letter-spacing: 1px"
                      >
                        Log in to your account
                      </h5>

                      <div class="form-outline mb-4">
                        <label class="form-label login-form" for="email"
                          >Email</label
                        >
                        <input
                          v-model="input.email"
                          type="email"
                          id="email"
                          class="form-control form-control-lg"
                          placeholder="email@exemple.com"
                          required
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label login-form" for="password"
                          >Password</label
                        >
                        <input
                          v-model="input.password"
                          type="password"
                          id="password"
                          name="password"
                          class="form-control form-control-lg"
                          placeholder="password"
                          required
                        />
                      </div>

                      <div class="pt-1 mb-4">
                        <button
                          @click.prevent="loginAccount()"
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <!-- <a class="small text-muted" href="#!">Forgot password?</a> -->
                      <p class="signup-input mb-5 pb-lg-2">
                        Don't have an account?<br />
                        <router-link to="/signup" class="signup-title"
                          >Register !</router-link
                        >
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div><footerApp /></div>
  </div>
</template>

<script>
import logoHome from "@/components/logoHome.vue";
import footerApp from "@/components/footerApp.vue";
// import { mapMutations } from 'vuex';
// import { mapGetters } from "vuex";

export default {
  name: "loginUser",
  components: {
    logoHome,
    footerApp,
  },

  // computed: {
  //     ...mapGetters(["isLoggedIn"])
  //   },

  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    // ...mapMutations(["setUser","setToken"]),
    loginAccount() {
      let loginDatas = {
        email: this.input.email,
        password: this.input.password,
      };
      console.log(loginDatas);
      let urlLogin = "http://localhost:3000/api/user/login";
      let option = {
        method: "POST",
        body: JSON.stringify(loginDatas),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      };
      fetch(urlLogin, option)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // if(res.ok){
          if (res.userId && res.token) {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            localStorage.setItem("isAdmin", res.isAdmin);
            console.log(localStorage);
            this.$router.push("/forum");
          } else {
            alert("Your email address or password is incorrect!");
          }
        })
        .catch((error) => console.log(error));
    },
  },
};

//       const response = await fetch (url, option)
// const { user, token } = await response.json();
//       this.setUser(user);
//       this.setToken(token);
//       this.$router.push("/forum");
</script>

<style lang="css">
.container-login {
  height: 100%;
}
.login-title {
  margin: 2rem;
  text-align: center;
  font-size: 2rem;
  color: #122441;
}
.login-form {
  color: #fd2d01;
  font-weight: 600;
}

.btn {
  background-color: #0d0764;
  text-align: center;
  margin-top: 40px;
}
.signup-title {
  color: #fd2d01 !important ;
  text-decoration: none !important;
  font-weight: 600;
}

.btn:hover {
  border-color: #fd2d01 !important;
  background-color: #fd2d01 !important;
}

.inscription {
  text-align: center;
}
</style>
