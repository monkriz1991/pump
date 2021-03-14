
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
    export default function ({ app }, inject) 
    {
        inject('last10product', getLastTenProduct)
      }