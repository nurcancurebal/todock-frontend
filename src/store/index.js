// ? Node modules.
import Vue from "vue";
import Vuex from "vuex";
import instance from "../services/axios";

// ? Inits.
Vue.use(Vuex);

const state = {
  user: {},
  todo: [],
  todoItem: [],
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
    try {
      const result = await instance.get("/todo");

      console.log("getTodo", result.data);

      context.commit("TODO", result.data);

      return result;
    } catch (error) {
      console.error("getTodo", error);
    }
  },

  async createTodo(context, payload) {
    try {
      const result = await instance.post("/todo", payload);

      console.log("createTodo", result.data);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateTodo(context, payload) {
    try {
      const result = await instance.put(`/todo/${payload._id}`, payload);

      console.log("updateTodo", result.data);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteTodo(context, payload) {
    try {
      const result = await instance.delete(`/todo/${payload}`);

      console.log("deleteTodo", result.status);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      throw error;
    }
  },

  async createTodoItem(context, payload) {
    try {
      const result = await instance.post(`/todo-item/${payload._id}`, payload);

      console.log("createTodoItem", result.data);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateTodoItem(context, payload) {
    try {
      const result = await instance.put(
        `/todo-item/${payload.todoId}/${payload.itemId}`,
        { item: payload.item }
      );

      console.log("updateTodoItem", result.status);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      console.error("updateTodoItem", error);
      throw error;
    }
  },

  async deleteTodoItem(context, payload) {
    try {
      const result = await instance.delete(
        `/todo-item/${payload.todoId}/${payload.itemId}`
      );

      console.log("deleteTodoItem", result.status);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      console.error("deleteTodoItem", error);
      throw error;
    }
  },

  async signUp(_context, payload) {
    try {
      return await instance.post("/auth/signup", payload);
    } catch (error) {
      throw error;
    }
  },

  async signIn(_context, payload) {
    try {
      const result = await instance.post("/auth/signin", payload);
      localStorage.setItem("token", result.data.token);

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(context, payload) {
    try {
      const result = await instance.put(`/user`, payload);

      console.log("updateUser", result.data);

      context.dispatch("getUser");

      return result;
    } catch (error) {
      throw error;
    }
  },

  async getUser(context) {
    try {
      const result = await instance.get("/user");

      console.log("getUser", result.data);

      context.commit("USER", result.data);

      return result;
    } catch (error) {
      console.error("getUser", error);
    }
  },

  async titleChangeOrder(context, payload) {
    try {
      const result = await instance.put(
        `/drag-drop/title/change/order/${payload.dragId}`,
        { dragOrder: payload.dragOrder, dropOrder: payload.dropOrder }
      );

      console.log("titleChangeOrder", result.data);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      console.log("titleChangeOrder", error);
      return error;
    }
  },

  async itemChange(context, payload) {
    try {
      const result = await instance.put(
        `/drag-drop/item/change/${payload.dragTodoId}/${payload.dropTodoId}`,
        payload
      );

      console.log("itemChange", result.data);

      context.dispatch("getTodo");

      return result;
    } catch (error) {
      console.log("itemChange", error);
      return error;
    }
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });
