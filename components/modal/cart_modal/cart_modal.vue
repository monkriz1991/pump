<template>
    <div class="layer">
         <v-app>
        <v-card  dark class="mx-auto">
            <div v-if="cartsClone.length">
              <v-row v-for="(cart,is1) in cartsClone" :key="is1"  dense>
                <v-col  cols="12">
                  <v-card
                   
                    dark
                  >
                  <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                      <v-card-title class="headline">
                        {{cart.name}}
                      </v-card-title>
                      <v-card-subtitle>
                          {{cart.product[0].name}} - {{cart.counter_cart}} x {{cart.product[0].price}} = {{roleRoundProce(cart.product[0].price*cart.counter_cart)}}
                          <hr>
                          <v-slider
                        v-model="cart.counter_cart"
                        color="orange"
                        label="количество"
                        min="1"
                        :max="cart.product[0].count"
                        thumb-label
                        @change="updateCart(cart,is1)"
                        ></v-slider>
                          </v-card-subtitle>
                        
                      <v-card-actions>                                        
                          <div><v-icon @click="delCart(cart.product[0].id)">fa-trash</v-icon></div>
                      </v-card-actions>
              </div>
                      <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="cart.img"></v-img>
              </v-avatar>
                  </div>
                </v-card>
            </v-col>
              </v-row>
              <div class="nothing">
              <v-row>
                  <v-col  cols="12">
                  скидка 0% Итог - {{total}}
                  </v-col>
              </v-row>
              </div>
              </div>
            <div v-else>
              <v-row dense>
                  <div class="nothing">Ничего не добавлено</div>
                  
                    

              </v-row>
              </div>
          <v-card-text>
            
          </v-card-text>
          <v-card-actions v-if="carts.length">
            <v-spacer></v-spacer>
            <v-btn color="error">Купить</v-btn>
          </v-card-actions>
        </v-card>
         </v-app>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default({
    data(){
        return{
            cartsClone:[],
        }
    },
    mounted () {
        
     this.$store.commit('cart/updateCarts');
    this.cartsClone = JSON.parse(JSON.stringify(this.carts));

    },
    computed: {
    carts () {
      return this.$store.state.cart.carts
    },
    total(){
        let totals = 0;
        for(let i of this.cartsClone){
          totals += +((i.product[0].price)*i.counter_cart);
      }
      totals = this.roleRoundProce(totals);
      return totals;
    }
    },
    watch:{
        carts (newCount, oldCount) {
      this.cartsClone =  JSON.parse(JSON.stringify(newCount));
      
      
    },
    },
    methods:{
        async delCart(id){
            this.$store.commit('cart/delCart', id);
            this.cartsClone = await this.$store.dispatch('cart/getCart');
        },
         updateCart(cart,i){
            this.$store.commit('cart/updateCart', [cart,i]);
        },
        roleRoundProce(oldprice){
            let price = oldprice;
            for(let i=100000000;i>99;i=i/10){
                price =  Math.round(price*i)/i;
            }
            return price.toFixed(2);
        }
    },
})
</script>
<style scoped>
.nothing{
    background-color: black;
    margin-top: 10%;
    padding-left: 22%;
}
.cart-card{
    background-color: coral;
}
.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
.layer {
    overflow: scroll; /* Добавляем полосы прокрутки */
    width: 500px; /* Ширина блока */
    height: 400px; /* Высота блока */
    padding-right: 0;
   } 
</style>