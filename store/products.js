export default {
    namespaced: true,
  
    state: () => ({
    products: []
  }),
  getters: {
    getProduct(state) {
      return state.products;
    },

  },
 mutations : {
    setProduct(state, products){
        state.products = products;
    }
  },

  actions: {
    async getProductFromServer(store, q) {
        console.log(typeof(q));
        if(typeof(q)=='undefined'){
            q = {}
        }
        if(q['limit'] =='undefined'){
            q['limit'] = 12
        }
        if( q['offset'] =='undefined'){
            q['offset'] = 0
        }
        let url = `/catalog/product/?limit=${q['limit']}&offset=${q['offset']}`;
        if( q['cat'] !=undefined){
            url = `/catalog/product/?limit=${q['limit']}&offset=${q['offset']}&cat=${q['cat']}`;
        }
        if( q['second_cat'] !=undefined && q['second_cat'].length){
            url += `&cat_second=${JSON.stringify(q['second_cat'])}`;
        }
        console.log(url);
        let data = await this.$axios.$get(url);
        
        return data;
      },
  }
}