<template>
  <div>
    <b-input-group class="mx-3 my-2" style="width: auto" v-show="todoItemShow">
      <b-form-input
        type="text"
        class="focus-input rounded"
        v-model="newItem"
        @keydown.enter="
          updateTodoItem({
            itemId: _id,
            todoId: todo_id,
            name: newItem,
          }).then(closeItem)
        "
      />

      <b-input-group-append>
        <b-icon-check-lg
          class="m-2 text-secondary hover-color"
          @click="
            updateTodoItem({
              itemId: _id,
              todoId: todo_id,
              name: newItem,
            }).then(closeItem)
          "
        />

        <b-icon-x-lg
          class="m-2 text-secondary hover-color"
          @click="
            deleteTodoItem({ itemId: _id, todoId: todo_id }).then(closeItem)
          "
        />
      </b-input-group-append>
    </b-input-group>

    <div
      class="justify-content-between rounded shadow mx-3 my-2 p-2"
      style="border: 2px #dcdcdc solid; display: flex"
      v-show="!todoItemShow"
    >
      <div id="overflowEllipsis" @click="setItem">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
// ? Node modules.
import { mapActions } from "vuex";

export default {
  props: ["name", "_id", "todo_id"],
  data() {
    return {
      todoItemShow: false,
      newItem: "",
    };
  },

  methods: {
    ...mapActions(["updateTodoItem", "deleteTodoItem"]),

    setItem() {
      this.todoItemShow = true;
      this.newItem = this.name;
    },

    closeItem() {
      this.todoItemShow = false;
      this.newItem = "";
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