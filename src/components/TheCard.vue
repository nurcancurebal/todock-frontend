<template>
  <div>
    <b-input-group class="mx-3 my-2" style="width: auto" v-show="todoItemsShow">
      <b-form-input type="text" class="focus-input rounded" v-model="newItem" />

      <b-input-group-append>
        <b-icon-check-lg class="m-2 text-secondary hover-color" />

        <b-icon-x-lg
          class="m-2 text-secondary hover-color"
          @click="todoItemsShow = false"
        />
      </b-input-group-append>
    </b-input-group>

    <div
      class="justify-content-between rounded shadow mx-3 my-2 p-2"
      style="border: 2px #dcdcdc solid; display: flex"
      v-show="!todoItemsShow"
    >
      <div id="overflowEllipsis" @click="setItem">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
// ? Node modules.

export default {
  props: ["name"],
  data() {
    return {
      todoItemsShow: false,
      newItem: "",
    };
  },

  methods: {
    setItem() {
      this.todoItemsShow = true;
      this.todoItems = this.newItem;
    },
  },
};
</script>

<style>
#overflowEllipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hover-color:hover {
  color: black !important;
}

.focus-input:focus {
  border-color: rgba(32, 31, 31, 0.425) !important;
  box-shadow: 0 0 0 0.25rem rgba(10, 0, 0, 0.045) !important;
}
</style>