// ? Node modules.
import Vue from "vue";
import Vuex from "vuex";
import instance from "../services/axios";

// ? Inits.
Vue.use(Vuex);

const state = {
  user: {},
  todo: [],
};

const getters = {
  todo(state) {
    return state.todo;
  },

  user(state) {
    return state.user;
  },
};

const mutations = {
  TODO(state, context) {
    state.todo = context;
  },

  USER(state, context) {
    state.user = context;
  },
};

const actions = {
  async getTodo(context) {
    const result = await instance.get("/todo");

    const sortedData = result.data.sort((a, b) => a.order - b.order);

    sortedData.forEach((item) => {
      if (Array.isArray(item.items)) {
        item.items.sort((a, b) => a.order - b.order);
      }
    });

    context.commit("TODO", sortedData);

    return result;
  },

  async createTodo(context, payload) {
    const result = await instance.post("/todo", payload);

    context.dispatch("getTodo");

    return result;
  },

  async updateTodo(context, payload) {
    const result = await instance.put(`/todo/${payload._id}`, payload);

    context.dispatch("getTodo");

    return result;
  },

  async deleteTodo(context, payload) {
    const result = await instance.delete(`/todo/${payload}`);

    context.dispatch("getTodo");
    return result;
  },

  async createTodoItem(context, payload) {
    const result = await instance.post(`/todo-item/${payload._id}`, payload);

    context.dispatch("getTodo");
    return result;
  },

  async updateTodoItem(context, payload) {
    const result = await instance.put(
      `/todo-item/${payload.todoId}/${payload.itemId}`,
      { name: payload.name }
    );

    context.dispatch("getTodo");

    return result;
  },

  async deleteTodoItem(context, payload) {
    const result = await instance.delete(
      `/todo-item/${payload.todoId}/${payload.itemId}`
    );

    context.dispatch("getTodo");

    return result;
  },

  async signUp(_context, payload) {
    const result = await instance.post("/auth/signup", payload);

    return result;
  },

  async signIn(_context, payload) {
    const result = await instance.post("/auth/signin", payload);
    localStorage.setItem("token", result.data.token);

    return result;
  },

  async updateUser(context, payload) {
    const result = await instance.put(`/user`, payload);

    context.dispatch("getUser");

    return result;
  },

  async getUser(context) {
    const result = await instance.get("/user");

    context.commit("USER", result.data);

    return result;
  },

  async parrentMove(context, payload) {
    const result = await instance.put(
      `/drag-drop/title/change/order/${payload.dragId}/${payload.dropId}`,
      { dragOrder: payload.dragOrder, dropOrder: payload.dropOrder }
    );

    context.dispatch("getTodo");

    return result;
  },

  async chieldMove(context, payload) {
    const result = await instance.put(
      `/drag-drop/item/change/${payload.dragParrentId}/${payload.dropParrentId}`,
      payload
    );

    context.dispatch("getTodo");

    return result;
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });
