<template>
  <div>
    <TheNavbar />

    <div
      style="display: flex; flex-wrap: nowrap; position: absolute; top: 75px"
      class="mt-4"
    >
      <drop :key="todo.id" v-for="todo in todo" @drop="onDrop(todo)">
        <drag
          @dragstart="onDragStart(todo)"
          style="
            display: flex;
            flex-direction: column;
            width: 225px;
            border: 2px #dcdcdc solid;
          "
          class="rounded m-4 shadow"
        >
          <b-input-group
            class="mx-3 my-2"
            style="width: auto"
            v-show="showTodoAddTitle.includes(todo._id)"
          >
            <b-form-input
              type="text"
              v-model="newTitle"
              class="focus-input rounded"
              @keydown.enter="updateListTitle(todo._id)"
              @blur="handleTitleBlur(todo._id)"
            />

            <b-input-group-append>
              <b-icon-check-lg
                class="m-2 text-secondary hover-color"
                @click="updateListTitle(todo._id)"
              />

              <b-icon-x-lg
                class="m-2 text-secondary hover-color"
                @click="closeNewTitle(todo._id)"
              />
            </b-input-group-append>
          </b-input-group>

          <div
            class="justify-content-between"
            v-show="!showTodoAddTitle.includes(todo._id)"
            style="display: flex"
          >
            <span
              class="p-2 m-2 h6"
              @click="
                () => {
                  showTodoAddTitle.push(todo._id);
                  newTitle = todo.title;
                }
              "
            >
              {{ todo.title }}
            </span>
            <b-button
              variant="none"
              class="text-secondary hover-color"
              @click="
                deleteTodo(todo._id)
                  .then(() =>
                    $toast.success('Liste silindi.', {
                      position: 'bottom',
                      duration: 2000,
                    })
                  )
                  .catch(() =>
                    $toast.error('Liste silinemedi.', {
                      position: 'bottom',
                      duration: 2000,
                    })
                  )
              "
            >
              <b-icon-x font-scale="2" />
            </b-button>
          </div>

          <UpdateTodoItem
            v-for="todoItem in todo.items"
            :key="todoItem._id"
            :item="todoItem"
            :parent_id="todo._id"
            :parent_drag_and_drop_stop="parentDragAndDropStop"
            :chield_drop_stop="chieldDropStop"
            :cache_chield="cacheChield"
            :set_cache_chield="setCacheChield"
            class="todo-item"
          />

          <b-input-group
            class="mx-3 my-2"
            style="width: auto"
            v-show="showTodoAddItem.includes(todo._id)"
          >
            <b-form-input
              type="text"
              v-model="items"
              class="focus-input rounded"
              @keyup.enter="createTodoCard(todo._id)"
              @blur="handleItemBlur(todo._id)"
            />

            <b-input-group-append>
              <b-icon-check-lg
                class="m-2 text-secondary hover-color"
                @click="createTodoCard(todo._id)"
              />

              <b-icon-x-lg
                class="m-2 text-secondary hover-color"
                @click="closeItemInput(todo._id)"
              />
            </b-input-group-append>
          </b-input-group>

          <b-button
            variant="light"
            class="mx-3 my-2 text-secondary hover-color justify-content-center align-items-center"
            style="display: flex"
            @click="showTodoAddItem.push(todo._id)"
            v-show="!showTodoAddItem.includes(todo._id)"
          >
            <b-icon-plus font-scale="2" /> Bir kart ekle
          </b-button>
        </drag>
      </drop>

      <div>
        <div v-show="!newColumnStatus">
          <b-button
            variant="light"
            class="p-2 m-4 text-secondary hover-color justify-content-center align-items-center"
            style="display: flex; width: 120px"
            @click="newColumnStatus = true"
          >
            <b-icon-plus font-scale="2" /> Yeni Liste Ekle
          </b-button>
        </div>

        <div v-show="newColumnStatus">
          <div
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              border: 2px #dcdcdc solid;
              align-items: flex-end;
              width: 275px;
            "
            class="rounded m-4 p-2 shadow"
          >
            <input
              type="text"
              placeholder="Liste Başlığını Girin ..."
              class="p-2 rounded focus-input"
              style="border: 2px #dcdcdc solid; outline: none; width: 100%"
              v-model="title"
              @keydown.enter="addNewList"
              @blur="handleListBlur"
            />

            <div class="mt-2">
              <b-button
                variant="light"
                class="text-secondary hover-color"
                @click="addNewList"
              >
                Liste Ekle
              </b-button>
              <button
                style="border: none; background-color: white"
                @click="
                  () => {
                    title = '';
                    newColumnStatus = false;
                  }
                "
                class="text-secondary hover-color"
              >
                <b-icon-x-lg class="mx-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UpdateTodoItem from "@/components/UpdateTodoItem.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import { Drag, Drop } from "vue-drag-drop";

export default {
  components: {
    UpdateTodoItem,
    TheNavbar,
    Drag,
    Drop,
  },

  data() {
    return {
      newColumnStatus: false,
      title: "",
      items: "",
      showTodoAddItem: [],
      showTodoAddTitle: [],
      newTitle: "",
      dragTodoId: null,
      dragTodoOrder: null,
      dragAndDropStop: false,
      dropStop: false,
      cacheChield: {},
    };
  },

  computed: {
    ...mapGetters(["todo"]),
  },

  created() {
    this.getTodo();
  },

  methods: {
    ...mapActions([
      "getTodo",
      "createTodo",
      "updateTodo",
      "deleteTodo",
      "createTodoItem",
      "parrentMove",
      "chieldMove",
    ]),

    onDragStart(todo) {
      try {
        if (this.dragAndDropStop) return;
        this.dragTodoId = todo._id;
        this.dragTodoOrder = todo.order;
      } catch (error) {
        this.$toast.error(error.message, {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async onDrop(todo) {
      if (!this.dragAndDropStop) {
        try {
          if (!this.dragTodoId) throw new Error("Not found drag todo ID!");

          if (!todo._id) throw new Error("Not found drop todo ID!");

          if (typeof this.dragTodoOrder != "number")
            throw new Error("Drag todo order has not number!");

          if ([null, "", undefined].includes(this.dragTodoOrder))
            throw new Error("Drag todo order type not!");

          if (typeof todo.order != "number")
            throw new Error("Drop todo order has not number!");

          if ([null, "", undefined].includes(todo.order))
            throw new Error("Drop todo order type not!");
          await this.parrentMove({
            dragId: this.dragTodoId,
            dragOrder: this.dragTodoOrder,
            dropId: todo._id,
            dropOrder: todo.order,
          });

          this.dragTodoOrder = null;
          this.dragTodoId = null;
        } catch (error) {
          this.$toast.error(error.message, {
            position: "bottom",
            duration: 2000,
          });
        }
      } else if (this.dragAndDropStop && this.dropStop) {
        try {
          const cacheChieldData = { ...this.cacheChield };
          await this.chieldMove({
            dragParrentId: cacheChieldData.dragItemParrentId,
            dropParrentId: todo._id,
            dragOrder: cacheChieldData.dragItemOrder,
            dropOrder: todo.order,
            dragItem: cacheChieldData.dragItemText,
            dragId: cacheChieldData.dradItemId,
          });
          this.setCacheChield({});
          this.parentDragAndDropStop(false);
        } catch (error) {
          this.$toast.error(error.message, {
            position: "bottom",
            duration: 50000,
          });
        }
      }
    },

    parentDragAndDropStop(value) {
      this.dragAndDropStop = value;
    },
    chieldDropStop(value) {
      this.dropStop = value;
    },

    setCacheChield(data) {
      this.cacheChield = data;
    },

    createTodoCard(id) {
      this.createTodoItem({ _id: id, item: this.items })
        .then(() => {
          this.closeItemInput(id);
          this.$toast.success("Yeni kart eklendi.", {
            position: "bottom",
            duration: 2000,
          });
        })
        .catch(() => {
          this.$toast.error("Yeni kart eklenemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    addNewList() {
      this.createTodo({ title: this.title })
        .then(() => {
          this.$toast.success("Yeni liste eklendi.", {
            position: "bottom",
            duration: 2000,
          });
          this.title = "";
          this.newColumnStatus = false;
        })
        .catch(() => {
          this.$toast.error("Yeni liste eklenemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    updateListTitle(id) {
      this.updateTodo({ title: this.newTitle, _id: id })
        .then(() => {
          this.closeNewTitle(id);
          this.$toast.success("Liste başlığı güncellendi.", {
            position: "bottom",
            duration: 2000,
          });
        })
        .catch(() => {
          this.$toast.error("Liste başlığı güncellenemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    closeItemInput(id) {
      this.showTodoAddItem = this.showTodoAddItem.filter((item) => item != id);
      this.items = "";
    },

    closeNewTitle(_id) {
      this.showTodoAddTitle = this.showTodoAddTitle.filter(
        (item) => item != _id
      );
      this.newTitle = this.title;
    },
    handleItemBlur(id) {
      setTimeout(() => {
        this.closeItemInput(id);
      }, 1000);
    },
    handleTitleBlur(id) {
      setTimeout(() => {
        this.closeNewTitle(id);
      }, 1000);
    },
    handleListBlur() {
      setTimeout(() => {
        this.newColumnStatus = false;
        this.title = "";
      }, 1000);
    },
  },
};
</script>

<style scoped>
.hover-color:hover {
  color: black !important;
}

.focus-input:focus {
  border-color: rgba(32, 31, 31, 0.425) !important;
  box-shadow: 0 0 0 0.25rem rgba(10, 0, 0, 0.045) !important;
}

.todo-item {
  z-index: 999999;
}
</style>