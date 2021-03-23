export default {
    namespaced: true,
    strict:true,
    state: () => ({
    selected: [],
  }),
  getters: {
  },
 mutations : {
     /**
      * 
      *
      * 
      * @param {*} state хранилище
      * @param {*} select объект товара
      */
    addSelected(state, selected){
        state.selected = selected;
    },
  },

  actions: {
        getCart(){
            let carts=getCartFromLocalStorage();
            return carts;
        },
  }
}
