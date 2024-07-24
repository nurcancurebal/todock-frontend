<template>
  <div>
    <b-input-group class="mx-3 my-2" style="width: auto" v-show="todoItemShow">
      <b-form-input
        type="text"
        class="focus-input rounded"
        v-model="newItem"
        @keyup.enter="updateCard"
        @blur="
          () => {
            newItem = '';
            todoItemShow = false;
          }
        "
      />

      <b-input-group-append>
        <b-icon-check-lg
          class="m-2 text-secondary hover-color"
          @click="updateCard"
        />

        <b-icon-x-lg
          class="m-2 text-secondary hover-color"
          @click="deleteCard"
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

    updateCard() {
      this.updateTodoItem({
        name: this.newItem,
        itemId: this._id,
        todoId: this.todo_id,
      })
        .then(() => {
          this.todoItemShow = false;
          this.newItem = "";
          this.$toast.success("Kart güncellendi.", {
            position: "bottom",
            duration: 2000,
          });
        })
        .catch(() => {
          this.$toast.error("Kart güncellenemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    deleteCard() {
      this.deleteTodoItem({ itemId: this._id, todoId: this.todo_id })
        .then(() => {
          this.$toast.success("Kart silindi.", {
            position: "bottom",
            duration: 2000,
          });
          this.todoItemShow = false;
          this.newItem = "";
        })
        .catch(() => {
          this.$toast.error("Kart silinemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    setItem() {
      this.todoItemShow = true;
      this.newItem = this.name;
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