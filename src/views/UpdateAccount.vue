<template>
  <div>
    <TheNavbar />
    <b-card
      style="max-width: 35rem; margin: auto; top: 75px; z-index: auto"
      class="p-2 my-5"
    >
      <b-form-group>
        <b-form-input
          v-model="cacheForm.firstname"
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
          v-model="cacheForm.lastname"
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
          v-model="cacheForm.username"
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
          Kullanıcı adı boş geçilemez, türkçe karakter kullanılamaz ve 6 ile 18
          karakter arasında olmak zorundadır.
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
          v-model="cacheForm.birthdate"
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
      </b-form-group>

      <b-button
        style="width: 100%"
        variant="light"
        class="btn-lg my-3 text-dark"
        @click="patternVerification"
      >
        Düzenle
      </b-button>

      <hr />

      <b-link
        class="card-link hover-link"
        style="
          text-decoration: none;
          font-size: 23px;
          color: rgb(72, 209, 204);
          float: right;
        "
        @click="redirectToHome"
      >
        Ana Sayfa
      </b-link>
    </b-card>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TheNavbar,
  },

  data() {
    return {
      cacheForm: {
        firstname: "",
        lastname: "",
        username: "",
        birthdate: null,
      },
      errors: new Set(),
      formError: null,
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  watch: {
    ["cacheForm.firstname"]: function () {
      this.checkForm();
    },
    ["cacheForm.lastname"]: function () {
      this.checkForm();
    },
    ["cacheForm.username"]: function () {
      this.checkForm();
    },
    ["cacheForm.birthdate"]: function () {
      this.checkForm();
    },
  },

  created() {
    this.userInformation();
  },

  methods: {
    ...mapActions(["updateUser", "getUser"]),

    async userInformation() {
      try {
        await this.getUser();

        Object.keys(this.user).forEach((key) => {
          this.cacheForm[key] = this.user[key];
        });
      } catch (error) {
        this.$toast.error(error.message, {
          position: "bottom",
          duration: 50000,
        });
      }
    },

    redirectToHome() {
      this.$toast.info("Ana sayfaya yönlendiriliyorsunuz...", {
        duration: 2000,
        position: "bottom",
      });

      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },

    async patternVerification() {
      try {
        if (this.formError === false) {
          this.cacheForm.birthdate = new Date(
            this.cacheForm.birthdate
          ).toISOString();
          await this.updateUser(this.cacheForm);

          this.$toast.success("Kullanıcı bilgileri güncellendi.", {
            position: "bottom",
            duration: 2000,
          });
          this.$router.push("/");
        }
      } catch (error) {
        this.$toast.error("Kullanıcı bilgileri güncellenemedi.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    checkForm() {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = this.cacheForm.username.match(pattern);

      if (!this.cacheForm.firstname) {
        // hata varsa içerisine yazıyı gönderiyor
        this.errors.add("firstname");
      } else {
        this.errors.delete("firstname");
      }

      if (!this.cacheForm.lastname) {
        this.errors.add("lastname");
      } else {
        this.errors.delete("lastname");
      }

      if (
        !this.cacheForm.username ||
        matchesusername != null ||
        this.cacheForm.username.length < 6 ||
        this.cacheForm.username.length > 18
      ) {
        this.errors.add("username");
      } else {
        this.errors.delete("username");
      }

      if (!this.cacheForm.birthdate) {
        this.errors.add("birthdate");
      } else {
        this.errors.delete("birthdate");
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
};
</script>