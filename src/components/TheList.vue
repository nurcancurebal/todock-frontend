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
        <div class="d-flex justify-content-between">
          <span class="p-2 m-2 h6">{{ todo.title }}</span>
          <b-button
            variant="light"
            style="font-weight: 700"
            class="m-2 text-secondary hover-color"
            @click="deleteTodos(todo._id)"
          >
            X
          </b-button>
        </div>

        <TheCard
          v-for="todoItem in todo.items"
          :key="todoItem._id"
          :name="todoItem.name"
        />

        <b-button variant="light" class="m-2 text-secondary hover-color">
          <b-icon-plus /> Add a card
        </b-button>
      </div>
    </div>

    <div v-show="!newColumnStatus">
      <b-button
        variant="light"
        class="p-2 m-4 shadow"
        style="display: flex; width: 100px"
        @click="newColumnStatus = true"
      >
        <b-icon-plus /> New List
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
        class="p-2 rounded m-4 shadow"
      >
        <input
          type="text"
          placeholder="Enter list title..."
          class="p-2 rounded"
          style="border-color: #dcdcdc; outline: none; width: 100%"
          v-model="title"
          @keydown.enter="createTodos(title).then(() => afterCreateTitle())"
        />
        <div class="mt-2">
          <b-button
            variant="light"
            @click="createTodos(title).then(() => afterCreateTitle())"
          >
            Add list
          </b-button>
          <button
            style="border: none; background-color: white"
            @click="afterCreateTitle"
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
    };
  },

  computed: {
    ...mapGetters(["todos"]),
  },

  methods: {
    ...mapActions(["getTodos", "createTodos", "deleteTodos"]),
    afterCreateTitle() {
      this.title = "";
      this.newColumnStatus = false;
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
</style>