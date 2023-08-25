<template>
  <div>
    <TheNavbar />
    <b-row class="mt-5">
      <b-col>
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>