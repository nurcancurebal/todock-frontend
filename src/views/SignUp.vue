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
            <b-form-group>
              <b-form-input
                v-model="info.firstname"
                type="text"
                placeholder="Adın"
                class="form-control-lg focus-input"
                required
                @keyup.enter="patternVerification"
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('firstname')"
                style="color: red !important"
              >
                Adın boş geçilemez.
              </b-form-text>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="info.lastname"
                type="text"
                placeholder="Soy Adın"
                class="form-control-lg focus-input mt-3"
                required
                @keyup.enter="patternVerification"
              />
              <b-form-text
                v-show="checkFormError('lastname')"
                class="mx-3"
                style="color: red !important"
              >
                Soy adın boş geçilemez.
              </b-form-text>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="info.username"
                type="text"
                placeholder="Kullanıcı adı"
                class="form-control-lg focus-input mt-3"
                required
                @keyup.enter="patternVerification"
              />
              <b-form-text
                v-show="checkFormError('username')"
                class="mx-3"
                style="color: red !important"
              >
                Kullanıcı adı boş geçilemez, türkçe karakter kullanılamaz ve 6
                ile 18 karakter arasında olmak zorundadır.
              </b-form-text>
            </b-form-group>

            <b-form-group>
              <label
                for="datepicker-dateformat2"
                style="font-size: large; margin-left: 10px; display: block"
                class="mt-3"
              >
                Doğum Tarihi?
              </label>
              <b-form-datepicker
                id="datepicker-dateformat2"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                v-model="info.birthdate"
                size="lg"
                style="text-align: left"
                @keyup.enter="patternVerification"
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('birthdate')"
                style="color: red !important"
              >
                Doğum tarihi boş geçilemez.
              </b-form-text>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="info.password"
                type="password"
                placeholder="Şifre"
                class="form-control-lg focus-input mt-3"
                required
                @keyup.enter="patternVerification"
              />
              <b-form-text
                class="mx-3"
                v-show="checkFormError('password')"
                style="color: red !important"
              >
                Şifre boş geçilemez, türkçe karakter kullanılamaz ve 6 ile 18
                karakter arasında olmak zorundadır.
              </b-form-text>
            </b-form-group>

            <b-button
              style="width: 100%"
              variant="light"
              class="btn-lg my-3 text-dark"
              @click="patternVerification"
            >
              Kayıt Ol
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
                to="/signin"
              >
                Giriş Yap
              </router-link>
            </b-link>
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
      info: {
        firstname: "",
        lastname: "",
        username: "",
        birthdate: "",
        password: "",
      },
      errors: new Set(),
      infoError: null,
    };
  },

  watch: {
    ["info.firstname"]: function () {
      this.checkForm();
    },
    ["info.lastname"]: function () {
      this.checkForm();
    },
    ["info.username"]: function () {
      this.checkForm();
    },
    ["info.password"]: function () {
      this.checkForm();
    },
    ["info.birthdate"]: function () {
      this.checkForm();
    },
  },

  methods: {
    ...mapActions(["signUp"]),

    async patternVerification() {
      if (this.infoError === false) {
        try {
          this.info.birthdate = new Date(this.info.birthdate).toISOString();
          await this.signUp(this.info);

          this.$toast.success("Kayıt işlemi başarılı. Giriş yapabilirsiniz.", {
            position: "bottom",
            duration: 2000,
          });

          await new Promise(() =>
            setTimeout(() => {
              this.info.firstname = "";
              this.info.lastname = "";
              this.info.username = "";
              this.info.birthdate = "";
              this.info.password = "";

              this.$router.push("/signin");
            }, 2000)
          );
        } catch (error) {
          this.$toast.error(
            "Kayıt işlemi başarısız! Lütfen tekrar deneyiniz.",
            {
              position: "bottom",
              duration: 2000,
            }
          );
        }
      } else {
        this.$toast.error("Lütfen tüm alanları doğru bir şekilde doldurunuz!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    checkForm() {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = this.info.username.match(pattern);
      const matchespassword = this.info.password.match(pattern);

      if (!this.info.firstname) {
        // hata varsa içerisine yazıyı gönderiyor
        this.errors.add("firstname");
      } else {
        this.errors.delete("firstname");
      }

      if (!this.info.lastname) {
        this.errors.add("lastname");
      } else {
        this.errors.delete("lastname");
      }

      if (
        !this.info.username ||
        matchesusername != null ||
        this.info.username.length < 6 ||
        this.info.username.length > 18
      ) {
        this.errors.add("username");
      } else {
        this.errors.delete("username");
      }

      if (!this.info.birthdate) {
        this.errors.add("birthdate");
      } else {
        this.errors.delete("birthdate");
      }

      if (
        !this.info.password ||
        matchespassword != null ||
        this.info.password.length < 6 ||
        this.info.password.length > 18
      ) {
        this.errors.add("password");
      } else {
        this.errors.delete("password");
      }

      if (this.errors.size === 0) {
        this.infoError = false;
      } else {
        this.infoError = true;
      }
    },

    checkFormError(slug) {
      return Array.from(this.errors).includes(slug);
    },
  },
};
</script>