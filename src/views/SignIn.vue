<template>
  <div>
    <b-row>
      <b-col>
        <div
          class="alert alert-success"
          role="alert"
          v-show="successfulRegistration"
          style="
            margin: 10px 60px 0 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <b-icon-check-lg style="margin-right: 5px" />
          Tebrikler. Kayıt oldunuz!
        </div>
      </b-col>
    </b-row>
    <div class="d-flex vh-100 vw-100">
      <b-row align-h="center" class="vh-100 vw-100" style="z-index: auto">
        <b-col
          cols="12"
          md="6"
          style="font-family: Georgia"
          class="text-center"
        >
          <AuthMessage />
        </b-col>
        <b-col cols="12" md="6">
          <div
            class="d-flex flex-column justify-content-center align-items-center h-100 w-100"
          >
            <b-card class="p-2 m-2 text-center w-75">
              <b-form-input
                v-model="form.username"
                type="text"
                placeholder="Kullanıcı adı"
                class="form-control-lg focus-input"
                required
                @keyup.enter="logIn"
              />

              <b-form-input
                v-model="form.password"
                type="password"
                placeholder="Şifre"
                class="form-control-lg focus-input my-3"
                required
                @keyup.enter="logIn"
              />

              <b-card-text v-show="userError" style="color: red !important">
                Kullanıcı mevcut değil.
              </b-card-text>

              <b-button
                style="width: 100%"
                variant="light"
                class="btn-lg mb-3 text-dark"
                @click="logIn"
              >
                Giriş Yap
              </b-button>
              <hr />

              <b-link>
                <router-link
                  class="card-link hover-link"
                  style="
                    text-decoration: none;
                    font-size: 23px;
                    color: rgb(72, 209, 204);
                    float: right;
                  "
                  to="/signup"
                >
                  Yeni Hesap Oluştur
                </router-link>
              </b-link>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import AuthMessage from "@/components/AuthMessage.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AuthMessage,
  },

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      userError: false,
      successfulRegistration: false,
    };
  },

  created() {
    if (this.$route.query.success == 1) {
      return (this.successfulRegistration = true);
    }
    return (this.successfulRegistration = false);
  },

  methods: {
    ...mapActions(["signIn"]),

    logIn() {
      const username = this.form.username;
      const password = this.form.password;

      this.signIn({ username, password })
        .then(() => {
          this.userError = false;
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.userError = true;
          console.error("error", error);
        });
    },
  },
};
</script>

<style>
.focus-input:focus {
  border-color: rgba(32, 31, 31, 0.425) !important;
  box-shadow: 0 0 0 0.25rem rgba(10, 0, 0, 0.045) !important;
}
.hover-link:hover {
  color: rgb(55 149 146) !important;
}
</style>