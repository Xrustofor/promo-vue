import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";
import moment from 'moment';

const baseURL = process.env.VUE_APP_API_URL;
const http = axios.create({ baseURL });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    promo:{},
    items: [],
    item: 1
  },
  getters:{
    getitems(state){
      return state.items;
    },
    getPromo(state){
      return state.promo;
    }
  },
  mutations: {
    setPromo(state, payload){
      state.promo = payload
    },
    
    setPromoAll(state, payload){
      state.items = payload;
    },

    clearPromo(state){
     state.promo = {} 
    },
    removePromo(state){
      state.promo = {}
    }
  },
  actions: {
    async addPromo({ commit }, payload){
      console.log(commit);
      console.log(payload);
      await http.post('/api/create/', payload);
    },

    async getPromo({ commit }, id){
      let item = await http.get(`/api/edit/${id}`);
      console.log(item);
      item = item.data;
      item.images = item.images.map(img => ({
        id: img.id,
        title: img.title,
        url: `${baseURL}/${img.url}`
      }));

      commit('setPromo', item);
      return item;
    },

    async updatePromo({commit}, data){
      console.log(commit);

      const id = data.id;
      const fd = data.fd
      let item = await http.put(`/api/edit/${id}`, fd);
      return item;
    },


    async getPromoAll({commit}) {
      let items = await http.get('/api/');
      items = items.data.map(item => ({
        id: item.id,
        title: item.title,
        data: moment(item.updatedAt).format("DD.MM.YY-HH:mm"),
        images: item.images,
        description: item.description
      }))
      commit('setPromoAll', items);
      return items;
    },

    async removePromo({commit}, id){ 
      commit('removePromo');
      await http.delete(`/api/delete/${id}`)
    }
  }
});