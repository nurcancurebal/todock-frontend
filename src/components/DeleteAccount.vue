<template>
  <b-card style="max-width: 35rem; margin: auto" class="p-2 my-5">
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
        v-model="form.userName"
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
        Hesabı Sil
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