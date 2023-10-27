// ? Node modules.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

// ? Inits.
Vue.use(Vuex);

const state = {
  todo: [],
  todoItem: [],
};

const getters = {

  todo(state) {

    return state.todo
  }
};

const mutations = {

  TODO(state, context) {

    state.todo = context;
  }
};

const actions = {

  async getTodo(context) {

    try {

      const result = await axios
        .get("http://localhost:3000/todo");

      console.log("getTodo", result.data);

      context.commit("TODO", result.data);

      return result;

    } catch (error) {

      console.error("getTodo", error);

    };
  },

  async createTodo(context, payload) {

    try {

      console.log(payload)

      const result = await axios.post("http://localhost:3000/todo", { title: payload.title });

      console.log("createTodo", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("createTodo", error);

    };
  },

  async updateTodo(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todo/${payload._id}`, { title: payload.title });

      console.log("updateTodo", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("updateTodo", error);

    };
  },

  async deleteTodo(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todo/${payload}`);

      console.log("deleteTodo", result.status);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("deleteTodo", error);

    };
  },

  async createTodoItem(context, payload) {

    try {

      const result = await axios.post(`http://localhost:3000/todo-item/${payload._id}`, { name: payload.name });

      console.log("createTodoItem", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("createTodoItem", error);

    };
  },

  async updateTodoItem(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todo-items/${payload.todoId}/${payload.itemId}`, { name: payload.name });

      console.log("updateTodoItem", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("updateTodoItem", error);

    };
  },

  async deleteTodoItem(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todo-items/${payload.todoId}/${payload.itemId}`);

      console.log("deleteTodoItem", result.status);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("deleteTodoItem", error);

    };
  },

  async signUp(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/auth/signup", { firstname: payload.firstname, lastname: payload.lastname, username: payload.username, birthdate: payload.birthdate, password: payload.password });

      console.log("signUp", result.data);

      return result;

    } catch (error) {

      console.error("signUp", error);

    };
  },


  async signIn(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/auth/signin", { username: payload.username, password: payload.password });

      console.log("signIn", result.data);

      return result;

    } catch (error) {

      console.error("signIn", error);

    };
  },

  async updateUser(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/user/${payload.id}`, { firstname: payload.firstname, lastname: payload.lastname, username: payload.username, birthdate: payload.birthdate });

      console.log("updateUser", result.data);

      return result;

    } catch (error) {

      console.error("updateUser", error);

    };
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });