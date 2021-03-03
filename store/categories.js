export default {
    namespaced: true,
  
    state: () => ({
    categories: []
  }),
  getters: {
    currentCategories(state) {
      return state.categories;
    },

  },
 mutations : {
    addCategories(state, cat) {
        state.categories.push(cat);
    },
    setCategoreis(state, categories){
        state.categories = categories;
    }
  },

  actions: {
        async getsecondCategoryWithFilters(store, id){
            let data = await this.$axios.$get(`/catalog/categories_second/${id}/`);
            return data.filters;
        },
        async getCategoriesFromServer(store, payload) {
            let data = await this.$axios.$get('/catalog/categories/');
            store.commit('setCategoreis', data.results)
            return data.results;
        },
  }
}