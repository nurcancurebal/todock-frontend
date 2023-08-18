<template>
  <div>
    <div class="rounded shadow mx-3 my-2 p-2" style="border: 2px #dcdcdc solid">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style>
</style>