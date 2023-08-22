<template>
  <div
    class="d-flex justify-content-between rounded shadow mx-3 my-2 p-2"
    style="border: 2px #dcdcdc solid"
  >
    <div id="overflowEllipsis">
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
#overflowEllipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>