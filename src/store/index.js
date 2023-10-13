// ? Node modules.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

// ? Inits.
Vue.use(Vuex);

const state = {
  todos: [],
  todoItems: [],
  users: []
};

const getters = {

  todos(state) {

    return state.todos
  },
  users(state) {

    return state.users
  }
};

const mutations = {

  TODOS(state, context) {

    state.todos = context;
  },
  USERS(state, context) {

    state.users = context;
  }
};

const actions = {

  async getTodos(context) {

    try {

      const result = await axios
        .get("http://localhost:3000/todos");

      console.log("getTodos", result.data);

      context.commit("TODOS", result.data);

      return result;

    } catch (error) {

      console.error("getTodos", error);

    };
  },

  async createTodos(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/todos", { title: payload });

      console.log("createTodos", result.data);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("createTodos", error);

    };
  },

  async updateTodos(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todos/${payload._id}`, { title: payload.title });

      console.log("updateTodos", result.data);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("updateTodos", error);

    };
  },

  async deleteTodos(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todos/${payload}`);

      console.log("deleteTodos", result.status);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("deleteTodos", error);

    };
  },

  async createTodoItems(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/todo-items", payload);

      console.log("createTodoItems", result.data);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("createTodoItems", error);

    };
  },

  async updateTodoItems(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todo-items/${payload.id}`, { name: payload.name });

      console.log("updateTodoItems", result.data);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("updateTodoItems", error);

    };
  },

  async deleteTodoItems(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todo-items/${payload}`);

      console.log("deleteTodoItems", result.status);

      context.dispatch("getTodos");

      return result;

    } catch (error) {

      console.error("deleteTodoItems", error);

    };
  },
  async getUsers(context) {

    try {

      const result = await axios
        .get("http://localhost:3000/auth");

      console.log("getUsers", result.data);

      context.commit("USERS", result.data);

      return result;

    } catch (error) {

      console.error("getUsers", error);

    };
  },

  async createUsers(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/auth", { firstname: payload.firstname, lastname: payload.lastname, username: payload.username, birthdate: payload.birthdate, password: payload.password });

      console.log("createUsers", result.data);

      context.dispatch("getUsers");

      return result;

    } catch (error) {

      console.error("createUsers", error);

    };
  },
  async updateUsers(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/auth/${payload.id}`, { firstname: payload.firstname, lastname: payload.lastname, username: payload.username, birthdate: payload.birthdate });

      console.log("updateUsers", result.data);

      context.dispatch("getUsers");

      return result;

    } catch (error) {

      console.error("updateUsers", error);

    };
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });