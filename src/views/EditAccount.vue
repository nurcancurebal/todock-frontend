<template>
  <div>
    <TheNavbar />
    <b-card
      style="max-width: 35rem; margin: auto; top: 75px; z-index: auto"
      class="p-2 my-5"
    >
      <b-form>
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Adın"
          class="mb-3 form-control-lg focus-input"
          required
        />

        <b-form-input
          v-model="form.surname"
          type="text"
          placeholder="Soy Adın"
          class="mb-3 form-control-lg focus-input"
          required
        />

        <b-form-input
          v-model="form.username"
          type="text"
          placeholder="Kullanıcı adı"
          class="mb-3 form-control-lg focus-input"
          required
        />

        <label for="datepicker" style="font-size: large; margin-left: 10px">
          Doğum Tarihi?
        </label>
        <b-form-datepicker
          id="datepicker"
          v-model="form.birthdate"
          class="mb-3"
          size="lg"
          style="text-align: left"
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
            to="/kanban"
          >
            Ana Sayfa
          </router-link>
        </b-link>
      </b-form>
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
        name: "",
        surname: "",
        username: "",
        birthdate: "",
        password: "",
      },
      errors: new Set(),
      formError: null,
    };
  },

  mounted() {
    this.getUser().then();
  },

  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    ...mapActions(["updateUser", "getUser"]),

    patternVerification() {
      if (this.formError === false) {
        this.updateUser(this.form).then(this.$router.push("kanban"));
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

<style>
</style>