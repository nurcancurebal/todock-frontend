<template>
  <div>
    <TheNavbar />

    <div
      style="display: flex; flex-wrap: nowrap; position: absolute; top: 75px"
      class="mt-4"
    >
      <div v-for="todo in todo" :key="todo.id">
        <div
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
              @blur="
                () => {
                  deleteTodoTitle(todo._id);
                  newTitle = '';
                }
              "
            />

            <b-input-group-append>
              <b-icon-check-lg
                class="m-2 text-secondary hover-color"
                @click="updateListTitle(todo._id)"
              />

              <b-icon-x-lg
                class="m-2 text-secondary hover-color"
                @click="deleteTodoTitle(todo._id)"
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
            :item="todoItem.item"
            :_id="todoItem._id"
            :todo_id="todoItem.todoId"
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
              @blur="
                () => {
                  deleteTodoInput(todo._id);
                  items = '';
                }
              "
            />

            <b-input-group-append>
              <b-icon-check-lg
                class="m-2 text-secondary hover-color"
                @click="createTodoCard(todo._id)"
              />

              <b-icon-x-lg
                class="m-2 text-secondary hover-color"
                @click="deleteTodoInput(todo._id)"
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
        </div>
      </div>

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
              @blur="
                () => {
                  newColumnStatus = false;
                  title = '';
                }
              "
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
    ]),

    createTodoCard(id) {
      this.createTodoItem({ _id: id, item: this.items })
        .then(() => {
          this.deleteTodoInput(id);
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
        .then(this.deleteTodoTitle(id))
        .then(
          this.$toast.success("Liste başlığı güncellendi.", {
            position: "bottom",
            duration: 2000,
          })
        )
        .catch(() => {
          this.$toast.error("Liste başlığı güncellenemedi.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },

    deleteTodoInput(id) {
      this.showTodoAddItem = this.showTodoAddItem.filter((item) => item != id);
      this.items = "";
    },

    deleteTodoTitle(_id) {
      this.showTodoAddTitle = this.showTodoAddTitle.filter(
        (item) => item != _id
      );
      this.newTitle = this.title;
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
</style>