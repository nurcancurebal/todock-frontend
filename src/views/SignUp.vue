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
          <b-card class="p-2 w-75 m-2">
            <b-form>
              <b-form-input
                v-model="form.firstname"
                type="text"
                placeholder="Adın"
                class="form-control-lg focus-input"
                required
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('firstname')"
                style="color: red !important"
              >
                Adın boş geçilemez.
              </b-form-text>

              <b-form-input
                v-model="form.lastname"
                type="text"
                placeholder="Soy Adın"
                class="form-control-lg focus-input mt-3"
                required
              />

              <b-form-text
                v-show="checkFormError('lastname')"
                class="mx-3"
                style="color: red !important"
              >
                Soy adın boş geçilemez.
              </b-form-text>

              <b-form-input
                v-model="form.username"
                type="text"
                placeholder="Kullanıcı adı"
                class="form-control-lg focus-input mt-3"
                required
              />

              <b-form-text
                v-show="checkFormError('username')"
                class="mx-3"
                style="color: red !important"
              >
                Kullanıcı adı boş geçilemez, türkçe karakter kullanılamaz ve 6
                ile 18 karakter arasında olmak zorundadır.
              </b-form-text>

              <label
                for="datepicker"
                style="font-size: large; margin-left: 10px; display: block"
                class="mt-3"
              >
                Doğum Tarihi?
              </label>
              <b-form-datepicker
                id="datepicker"
                v-model="form.birthdate"
                size="lg"
                style="text-align: left"
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('birthdate')"
                style="color: red !important"
              >
                Doğum tarihi boş geçilemez.
              </b-form-text>

              <b-form-input
                v-model="form.password"
                type="password"
                placeholder="Şifre"
                class="form-control-lg focus-input mt-3"
                required
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('password')"
                style="color: red !important"
              >
                Şifre boş geçilemez, türkçe karakter kullanılamaz ve 6 ile 18
                karakter arasında olmak zorundadır.
              </b-form-text>

              <b-button
                style="width: 100%"
                variant="light"
                class="btn-lg my-3 text-dark"
                @click="patternVerification"
              >
                Kayıt Ol
              </b-button>

              <hr />

              <b-link
                href="/"
                class="card-link hover-link"
                style="
                  text-decoration: none;
                  font-size: 23px;
                  color: rgb(72, 209, 204);
                  float: right;
                "
              >
                Giriş Yap
              </b-link>
            </b-form>
          </b-card>
        </div>
      </b-col>
    </b-row>
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
        firstname: "",
        lastname: "",
        username: "",
        birthdate: "",
        password: "",
      },
      errors: new Set(),
      formError: null,
    };
  },
  methods: {
    ...mapActions(["signUp"]),

    patternVerification() {
      if (this.formError === false) {
        this.signUp(this.form).then(this.signUpAfter());
      }
    },

    signUpAfter() {
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.username = "";
      this.form.birthdate = "";
      this.form.password = "";

      this.$router.push({ name: "Home" });
    },

    checkForm() {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = this.form.username.match(pattern);
      const matchespassword = this.form.password.match(pattern);

      if (!this.form.firstname) {
        // hata varsa içerisine yazıyı gönderiyor
        this.errors.add("firstname");
      } else {
        this.errors.delete("firstname");
      }

      if (!this.form.lastname) {
        this.errors.add("lastname");
      } else {
        this.errors.delete("lastname");
      }

      if (
        !this.form.username ||
        matchesusername != null ||
        this.form.username.length < 6 ||
        this.form.username.length > 18
      ) {
        this.errors.add("username");
      } else {
        this.errors.delete("username");
      }

      if (!this.form.birthdate) {
        this.errors.add("birthdate");
      } else {
        this.errors.delete("birthdate");
      }

      if (
        !this.form.password ||
        matchespassword != null ||
        this.form.password.length < 6 ||
        this.form.password.length > 18
      ) {
        this.errors.add("password");
      } else {
        this.errors.delete("password");
      }

      if (this.errors.size === 0) {
        this.formError = false;
      } else {
        this.formError = true;
      }
    },

    checkFormError(slug) {
      return Array.from(this.errors).includes(slug);
    },
  },
  watch: {
    ["form.firstname"]: function () {
      this.checkForm();
    },
    ["form.lastname"]: function () {
      this.checkForm();
    },
    ["form.username"]: function () {
      this.checkForm();
    },
    ["form.password"]: function () {
      this.checkForm();
    },
    ["form.birthdate"]: function () {
      this.checkForm();
    },
  },
};
</script>