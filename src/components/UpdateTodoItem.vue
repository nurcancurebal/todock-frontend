<template>
  <drag @dragstart="onDragStart" @dragend="onDragEnd">
    <drop @drop="onDrop">
      <div>
        <b-input-group
          class="mx-3 my-2"
          style="width: auto"
          v-show="todoItemShow"
        >
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
            {{ item }}
          </div>
        </div>
      </div>
    </drop>
  </drag>
</template>

<script>
import { mapActions } from "vuex";
import { Drag, Drop } from "vue-drag-drop";

export default {
  props: ["item", "_id", "todo_id", "order"],

  components: {
    Drag,
    Drop,
  },

  data() {
    return {
      todoItemShow: false,
      newItem: "",
      dragItem: "",
      dragTodoId: "",
      dragOrder: "",
      dropTodoId: "",
      dropOrder: "",
    };
  },

  /*   watch: {
    dropTodoId() {
      console.log(
        "dropTodoId:",
        "dragTodoId:",
        this.dragTodoId,
        "dropTodoId:",
        this.dropTodoId,
        "dragOrder:",
        this.dragOrder,
        "dropOrder:",
        this.dropOrder,
        "dragItem:",
        this.dragItem
      );
    },
    dragTodoId() {
      console.log(
        "dragTodoId:",
        "dragTodoId:",
        this.dragTodoId,
        "dropTodoId:",
        this.dropTodoId,
        "dragOrder:",
        this.dragOrder,
        "dropOrder:",
        this.dropOrder,
        "dragItem:",
        this.dragItem
      );
    },
  }, */

  methods: {
    ...mapActions(["updateTodoItem", "deleteTodoItem", "itemChange"]),

    updateCard() {
      this.updateTodoItem({
        item: this.newItem,
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
      this.newItem = this.item;
    },

    onDragStart(_data, event) {
      if (event) {
        event.stopPropagation();
      } else {
        console.error("Event is undefined");
      }
    },

    onDragEnd() {
      console.log(
        "ondragend",
        "this.dragItem =",
        this.item,
        "this.dragTodoId =",
        this.todo_id,
        "this.dropTodoId =",
        this.dropTodoId,
        "this.dragOrder =",
        this.order,
        "this.dropOrder =",
        this.dropOrder
      );
      this.dragItem = this.item;
      this.dragTodoId = this.todo_id;
      this.dragOrder = this.order;
    },

    onDrop() {
      console.log(
        "ondrop",
        "this.dropItem =",
        this.item,
        "this.dropTodoId =",
        this.todo_id,
        "this.dropOrder =",
        this.order
      );
      this.dropTodoId = this.todo_id;
      this.dropOrder = this.order;
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