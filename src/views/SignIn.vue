<template>
  <div class="d-flex vh-100 vw-100">
    <b-row align-h="center" class="vh-100 vw-100">
      <b-col cols="12" md="6" style="font-family: Georgia" class="text-center">
        <AuthMessage />
      </b-col>
      <b-col cols="12" md="6">
        <div
          class="d-flex flex-column justify-content-center align-items-center h-100 w-100"
        >
          <b-card class="p-2 m-2 text-center w-75">
            <b-form>
              <b-form-input
                v-model="form.username"
                type="text"
                placeholder="Kullanıcı adı"
                class="mb-3 form-control-lg focus-input"
                required
              />

              <b-form-input
                v-model="form.password"
                type="password"
                placeholder="Şifre"
                class="mb-3 form-control-lg focus-input"
                required
              />

              <b-button
                style="width: 100%"
                variant="light"
                class="btn-lg mb-3 text-dark"
                @click="logIn"
              >
                Giriş Yap
              </b-button>
            </b-form>

            <b-link
              href="#"
              class="card-link hover-link"
              style="
                text-decoration: none;
                font-size: 23px;
                color: rgb(72, 209, 204);
              "
            >
              Şifreni mi unuttun?
            </b-link>

            <hr />

            <b-button
              style="width: 50%; margin: auto"
              variant="light"
              class="btn-lg text-dark d-block mb-3"
              @click="signUp"
            >
              Yeni Hesap Oluştur
            </b-button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import AuthMessage from "@/components/AuthMessage.vue";
import { mapActions, mapGetters } from "vuex";

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
    };
  },

  computed: {
    ...mapGetters(["users"]),
  },

  methods: {
    ...mapActions(["getUsers"]),

    signUp() {
      this.$router.push({ name: "SignUp" });
    },

    logIn() {
      console.log(this.form);
    },
  },

  created() {
    this.getUsers();
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