<template>
  <div class="container-signup">
    <section class="vh-100 bg-image" style="background-color: #706e6e">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body p-5 blocsignup">
                  <div><logoHome /></div>
                  <h2 class="signup-subtitle text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form id="form-signup">
                    <div class="form-outline mb-4">
                      <label class="form-label signup-title" for="firstName"
                        >First Name</label
                      >
                      <input
                        v-model="input.firstName"
                        type="text"
                        id="firstName"
                        name="firstName"
                        class="form-control form-control-lg"
                        placeholder="first name"
                        required
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label signup-title" for="lastName"
                        >Last Name</label
                      >
                      <input
                        v-model="input.lastName"
                        type="text"
                        id="lastName"
                        name="lastName"
                        class="form-control form-control-lg"
                        placeholder="last name"
                        required
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label signup-title" for="email"
                        >Email</label
                      >
                      <input
                        v-model="input.email"
                        type="email"
                        id="email"
                        name="email"
                        class="form-control form-control-lg"
                        placeholder="email address"
                        required
                        pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label signup-title" for="password"
                        >Password</label
                      >
                      <input
                        v-model="input.password"
                        type="password"
                        id="password"
                        name="password"
                        class="password form-control form-control-lg"
                        placeholder="password"
                        required
                        pattern=" ^(?=.{5,}$)(?=(?:.*?[A-Z]){1})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$"
                      />
                      <p>
                        *Minimum 5 charcters, 1 uppercase, 1 lowercase, 2
                        diggits
                      </p>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        @click.prevent="dataSignup"
                        type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Already have an account?
                      <router-link to="/login" class="signup-title"
                        >Log in</router-link
                      >
                    </p>
                  </form>
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
import logoHome from "@/components/logoHome.vue";

export default {
  name: "signupUser",
  components: {
    logoHome,
  },

  data() {
    return {
      input: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: "",
      },
    };
  },

  methods: {
    dataSignup() {
      let inputDatas = {
        firstName: this.input.firstName,
        lastName: this.input.lastName,
        email: this.input.email,
        password: this.input.password,
      };
      console.log(inputDatas);

      let urlSignup = "http://localhost:3000/api/user/signup";
      let option = {
        method: "POST",
        body: JSON.stringify(inputDatas),
        headers: {
          "content-type": "application/json",
        },
      };
      console.log(option);
      fetch(urlSignup, option)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("token", res.token);
          console.log(localStorage);
          this.$router.push("/");
        })

        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.container-signup {
  width: 100%;
  height: 100%;
}

.signup-subtitle {
  color: #0d0764;
}

.btn-block {
  background-color: #0d0764 !important;
}
.signup-title {
  color: #fd2d01 !important ;
  text-decoration: none !important;
  font-weight: 600;
}
</style>
