<template>
  <b-row
    align-h="between"
    style="
      background-color: #48d1cc;
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      font-family: Georgia;
      z-index: 1;
    "
  >
    <b-col cols="10">
      <b-navbar>
        <b-navbar-nav>
          <b-navbar-brand>
            <h2
              class="mx-5 my-1 text-white"
              style="cursor: pointer"
              @click="redirectToHome"
            >
              ToDock
            </h2>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
    </b-col>

    <b-col cols="2">
      <b-navbar class="h-100">
        <b-navbar-nav>
          <b-nav-item-dropdown>
            <template #button-content>
              <em class="h5">Profil</em>
            </template>
            <b-dropdown-item>
              <router-link
                style="text-decoration: none; color: black"
                to="/updateaccount"
              >
                Hesabımı Düzenle
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="showToastAndRedirect">
              Çıkış
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
export default {
  methods: {
    showToastAndRedirect() {
      this.$toast.info("Çıkış yapılıyor.", {
        position: "bottom",
        duration: 2000,
      });
      setTimeout(() => {
        this.$router.push("/signin");
      }, 2000);
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
  },
};
</script>

<style>
a:focus-visible {
  box-shadow: none !important;
}
a[role="button"] {
  color: white;
}
a[role="button"]:focus {
  color: white;
}

.dropdown-item:active {
  background-color: #48d1cc !important;
}
</style>