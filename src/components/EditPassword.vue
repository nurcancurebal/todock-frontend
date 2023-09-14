<template>
  <b-card style="max-width: 35rem; margin: auto" class="p-2 my-5">
    <b-form>

<b-form-input
        v-model="form.password"
        type="password"
        placeholder="Şifre"
        class="mb-3 form-control-lg focus-input"
        required
      />

      <b-form-input
        v-model="form.password"
        type="password"
        placeholder="Yeni Şifre"
        class="mb-3 form-control-lg focus-input"
        required
      />

    <b-form-input
        v-model="form.password"
        type="password"
        placeholder="Yeni Şifre Tekrar"
        class="mb-3 form-control-lg focus-input"
        required
      />

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
        Ana Sayfa
      </b-link>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        surname: "",
        userName: "",
        birthdate: "",
        password: "",
      },
    };
  },
};
</script>

<style>
</style>