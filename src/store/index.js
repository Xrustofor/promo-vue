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
    countPromoOnPage: 5,
    currentPage: 1,
    countPages: 1,
    sort: 'date',
  },
  getters:{
    getItems(state){ return state.items },
    getPromo(state){ return state.promo },

    getCountPromoOnPage(state){ return state.countPromoOnPage  },
    getCountPages(state){ return state.countPages },
    getCurrentPage(state){ return state.currentPage },
    getSort(state){ return state.sort },
  },
  mutations: {

    setPromo(state, payload){ state.promo = payload },
    setPromoAll(state, payload){ state.items = payload },
    clearPromo(state){ state.promo = {} },
    removePromo(state){ state.promo = {} },

    setCountPromoOnPages(state, payload) { state.countPromoOnPage = payload },
    setCountPages(state, payload){ state.countPages = payload},
    setCurrentPage(state, payload){ state.currentPage = payload },
    setSort(state, payload){ state.sort = payload },
  },

  actions: {
    async addPromo({ commit }, payload){
      console.log(commit);
      await http.post('/api/create/', payload);
    },

    async getPromo({ commit }, id){
      let item = await http.get(`/api/edit/${id}`);
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


    async getPromoAll({commit, getters}, paramsQuery) {
      let items;

      if(paramsQuery){
          const currentPage = +getters.getCurrentPage;
          const countPromoOnPage = getters.getCountPromoOnPage;
          const sort = getters.getSort;


        items = await http.get(`/api/?currentPage=${currentPage}&countPromoOnPage=${countPromoOnPage}&sort=${sort}`);

        const result = items.data;
        commit('setCountPages', +result.countPages);
        commit('setCountPromoOnPages', +result.countPromoOnPage);
        commit('setCurrentPage', +result.currentPages);
        commit('setSort', result.sort);

        items = {
          countPages: +items.data.countPages,
          currentPages: +items.data.currentPages,
          result : items.data.result.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            data: moment(item.updatedAt).format("DD.MM.YY-HH:mm"),
            images: item.images,
            description: item.description,
          }))  
        } 
        commit('setPromoAll', items);

      }else{
        items = await http.get(`/api/`);
        items = items.data.result.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          data: moment(item.updatedAt).format("DD.MM.YY-HH:mm"),
          images: item.images,
          description: item.description,
        }))  
      }

      commit('setPromoAll', items);

      return items;
    },

    async removePromo({commit}, id){ 
      commit('removePromo');
      await http.delete(`/api/delete/${id}`)
    },
  }
});