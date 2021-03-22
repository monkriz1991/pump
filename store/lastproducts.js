/**
 * получение из хранилища последних 10 просмотренных продуктов
 * @returns {array}
 */
function getLastTenProduct(){
    if(process.browser){
        let lastproducts =  JSON.parse(localStorage.getItem("lastproducts"));
        if(lastproducts==null){
            return [];
        }else{
            return lastproducts;
        } 
    }
}
/**
 * добавляет просмотренный продукт в хранилище
 * @param {object} product 
 */
function setProductToLocalStorage(product){
    if(process.browser){
        let products = getLastTenProduct();
        products = products.filter(x=>x.id!=product.id);
        if(products.length>=10){
            products.pop();
        }
        products.unshift(product);
        localStorage.setItem("lastproducts", JSON.stringify(products));
    }
 }

 export default {
    namespaced: true,
    strict:true,
    state: () => ({
    products: [],
  }),
  getters: {
  },
 mutations : {
 },
 actions:{
     getProducts(state){
         return getLastTenProduct();
     },
     setProduct(state,product){
        setProductToLocalStorage(product);
     }
 }
}