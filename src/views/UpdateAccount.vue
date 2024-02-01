<template>
  <div>
    <TheNavbar />
    <b-card
      style="max-width: 35rem; margin: auto; top: 75px; z-index: auto"
      class="p-2 my-5"
    >
      <b-form-group>
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
      </b-form-group>

      <b-form-group>
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
      </b-form-group>

      <b-form-group>
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
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="form.password"
          type="password"
          placeholder="Yeni Şifre"
          class="form-control-lg focus-input mt-3"
          required
        />
        <b-form-text
          class="mx-3"
          v-show="checkFormError('password')"
          style="color: red !important"
        >
          Şifre boş geçilemez, türkçe karakter kullanılamaz ve 6 ile 18 karakter
          arasında olmak zorundadır.
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

      <b-link>
        <router-link
          class="card-link hover-link"
          style="
            text-decoration: none;
            font-size: 23px;
            color: rgb(72, 209, 204);
            float: right;
          "
          to="/"
        >
          Ana Sayfa
        </router-link>
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

  computed: {
    ...mapGetters(["user"]),
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

  created() {
    this.getUser().then((response) => {
      this.form.firstname = response.data.firstname;
      this.form.lastname = response.data.lastname;
      this.form.username = response.data.username;
      this.form.birthdate = response.data.birthdate;
    });
  },

  methods: {
    ...mapActions(["updateUser", "getUser"]),

    patternVerification() {
      if (this.formError === false) {
        this.updateUser(this.form).then(this.$router.push("/"));
      }
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
};
</script>

<style>
</style>