<template>
  <div style="width: fit-content">
    <TheNavbar />
    <b-row>
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