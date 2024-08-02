<template>
  <drop @drop="onDrop(item)">
    <drag @dragstart="onDragStart(item)">
      <div>
        <b-input-group
          class="mx-3 my-2"
          style="width: auto"
          v-show="todoItemShow"
        >
          <b-form-input
            type="text"
            class="focus-input rounded"
            v-model="newName"
            @keyup.enter="updateCard"
            @blur="handleBlur"
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
          <div id="overflowEllipsis" @click="setName">
            {{ item.name }}
          </div>
        </div>
      </div>
    </drag>
  </drop>
</template>

<script>
import { mapActions } from "vuex";
import { Drag, Drop } from "vue-drag-drop";

export default {
  props: [
    "item",
    "parent_id",
    "parent_drag_and_drop_stop",
    "cache_chield",
    "set_cache_chield",
    "chield_drop_stop",
  ],

  components: {
    Drag,
    Drop,
  },

  data() {
    return {
      todoItemShow: false,
      newName: "",
      dragName: "",
      dragTodoId: "",
      dragOrder: "",
      dropTodoId: "",
      dropOrder: "",
      dropName: "",
    };
  },

  methods: {
    ...mapActions(["updateTodoItem", "deleteTodoItem", "chieldMove"]),

    async updateCard() {
      try {
        await this.updateTodoItem({
          name: this.newName,
          itemId: this.item._id,
          todoId: this.item.todoId,
        });

        this.todoItemShow = false;
        this.newName = "";
        this.$toast.success("Kart güncellendi.", {
          position: "bottom",
          duration: 2000,
        });
      } catch (error) {
        this.$toast.error("Kart güncellenemedi!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async deleteCard() {
      try {
        await this.deleteTodoItem({
          itemId: this.item._id,
          todoId: this.item.todoId,
        });

        this.$toast.success("Kart silindi.", {
          position: "bottom",
          duration: 2000,
        });
        this.todoItemShow = false;
        this.newName = "";
      } catch (error) {
        this.$toast.error("Kart silinemedi!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    setName() {
      this.todoItemShow = true;
      this.newName = this.item.name;
    },

    onDragStart(item) {
      this.parent_drag_and_drop_stop(true);
      this.chield_drop_stop(true);
      this.set_cache_chield({
        dragItemName: item.name,
        dragItemOrder: item.order,
        dragItemParrentId: this.parent_id,
        dradItemId: item._id,
      });
    },

    async onDrop(item) {
      try {
        this.chield_drop_stop(false);
        await this.chieldMove({
          dragParrentId: this.cache_chield.dragItemParrentId,
          dropParrentId: item.todoId,
          dragOrder: this.cache_chield.dragItemOrder,
          dropOrder: item.order,
          dragName: this.cache_chield.dragItemName,
          dragId: this.cache_chield.dradItemId,
          dropId: item._id,
        });
        this.set_cache_chield({});
        this.parent_drag_and_drop_stop(false);
      } catch (error) {
        this.$toast.error("Kartları taşırken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
    handleBlur() {
      setTimeout(() => {
        this.newName = "";
        this.todoItemShow = false;
      }, 1000);
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