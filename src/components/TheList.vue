<template>
  <div style="display: flex; flex-wrap: nowrap">
    <div v-for="todo in todos" :key="todo.id">
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
            v-model="todo.title"
            class="focus-input rounded"
          />

          <b-input-group-append>
            <b-icon-check-lg class="m-2 text-secondary hover-color" />

            <b-icon-x-lg
              class="m-2 text-secondary hover-color"
              @click="
                showTodoAddTitle = showTodoAddTitle.filter(
                  (item) => item != todo._id
                )
              "
            />
          </b-input-group-append>
        </b-input-group>

        <div
          class="justify-content-between"
          v-show="!showTodoAddTitle.includes(todo._id)"
          style="display: flex"
        >
          <span class="p-2 m-2 h6" @click="showTodoAddTitle.push(todo._id)">
            {{ todo.title }}
          </span>
          <b-button
            variant="none"
            class="text-secondary hover-color"
            @click="deleteTodos(todo._id)"
          >
            <b-icon-x font-scale="2" />
          </b-button>
        </div>

        <TheCard
          v-for="todoItem in todo.items"
          :key="todoItem._id"
          :name="todoItem.name"
        />

        <b-input-group
          class="mx-3 my-2"
          style="width: auto"
          v-show="showTodoAddItem.includes(todo._id)"
          @keydown.enter="
            createTodoItems({ todoId: todo._id, name: items }).then(() =>
              deleteTodoInput(todo._id)
            )
          "
        >
          <b-form-input
            type="text"
            v-model="items"
            class="focus-input rounded"
          ></b-form-input>

          <b-input-group-append>
            <b-icon-check-lg
              class="m-2 text-secondary hover-color"
              @click="
                createTodoItems({ todoId: todo._id, name: items }).then(() =>
                  deleteTodoInput(todo._id)
                )
              "
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
          <b-icon-plus font-scale="2" /> Add a card
        </b-button>
      </div>
    </div>

    <div v-show="!newColumnStatus">
      <b-button
        variant="light"
        class="p-2 m-4 text-secondary hover-color justify-content-center align-items-center"
        style="display: flex; width: 120px"
        @click="newColumnStatus = true"
      >
        <b-icon-plus font-scale="2" /> New List
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
          placeholder="Enter list title..."
          class="p-2 rounded focus-input"
          style="border: 2px #dcdcdc solid; outline: none; width: 100%"
          v-model="title"
          @keydown.enter="createTodos(title).then(() => afterCreateTitle())"
        />

        <div class="mt-2">
          <b-button
            variant="light"
            class="text-secondary hover-color"
            @click="createTodos(title).then(() => afterCreateTitle())"
          >
            Add list
          </b-button>
          <button
            style="border: none; background-color: white"
            @click="afterCreateTitle"
            class="text-secondary hover-color"
          >
            <b-icon-x-lg class="mx-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ? Node modules.
import { mapActions, mapGetters } from "vuex";

// ? Components.
import TheCard from "./TheCard.vue";

export default {
  components: {
    TheCard,
  },

  data() {
    return {
      newColumnStatus: false,
      title: "",
      itemName: "",
      items: "",
      showTodoAddItem: [],
      showTodoAddTitle: [],
    };
  },

  computed: {
    ...mapGetters(["todos"]),
  },

  methods: {
    ...mapActions([
      "getTodos",
      "createTodos",
      "deleteTodos",
      "createTodoItems",
    ]),

    afterCreateTitle() {
      this.title = "";
      this.newColumnStatus = false;
    },

    deleteTodoInput(id) {
      this.showTodoAddItem = this.showTodoAddItem.filter((item) => item != id);
      this.items = "";
    },
  },

  created() {
    this.getTodos();
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