/**
 * 
 * Функция получает из cooke список товаров добавленых в карзину
 * 
 * @returns {object} 
 */
function getCartFromLocalStorage(){
    if(process.browser){
       let carts =  JSON.parse(localStorage.getItem("carts"));
       if(carts==null){
        return [];
       }else{
        return carts;
       }
      
    }
    return [];
 }

 /**
  * 
  * Функция помещает в cookie список товаров карзины пользователя 
  * 
  * @param {object} carts массив товров для корзины
  */
 function setCartToLocalStorage(carts){
    if(process.browser){
        localStorage.setItem("carts", JSON.stringify(carts));
    }
 }


function counterUpdate(state){
    let carts=getCartFromLocalStorage();
        return carts.length;
 }

export default {
    namespaced: true,
  
    state: () => ({
    carts: [],
    counter:0,
  }),
  getters: {
  },
 mutations : {
    getCounterCart(state){
        state.counter = counterUpdate();
    },
     /**
      * 
      * метод добавяет в карзину товар
      * 
      * @param {*} state хранилище
      * @param {*} cart объект товара
      */
    addCart(state, cart){
        let carts=getCartFromLocalStorage();
        carts.push(cart);
        state.carts = carts;
        state.counter = carts.length;
        setCartToLocalStorage(state.carts);
    },
    /**
     * функция удаления товара из корзины
     * @param {*} state хранилище
     * @param {*} id идкнтификатор товара
     */
    delCart(state, id){
        state.carts=getCartFromLocalStorage();
        state.carts=state.cart.filter(x=>x.id!=id);
        state.counter = state.cart.length;
        setCartToLocalStorage(state.carts);
    }
  },

  actions: {
        getCart(){
            let carts=getCartFromLocalStorage();
            return carts;
        }
  }
}

