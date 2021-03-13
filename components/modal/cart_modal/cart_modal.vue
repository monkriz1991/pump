<template>
    <div>
        <v-card max-height="300" max-width="500" dark class="mx-auto">
            <div v-if="cartsClone.length">
              <v-row  dense>
                <v-col v-for="(cart,is1) in cartsClone" :key="is1" cols="12">
                  <v-card
                    color="#385F73"
                    dark
                  >
                      <v-card-title class="headline">
                        {{cart.name}}
                      </v-card-title>

                      <v-card-subtitle>
                          {{cart.product[0].name}} - {{cart.counter_cart}} x {{cart.product[0].price}} = {{cart.product[0].price*cart.counter_cart}}
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
                </v-card>
            </v-col>
              </v-row>
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
    },
    methods:{
        async delCart(id){
            this.$store.commit('cart/delCart', id);
            this.cartsClone = await this.$store.dispatch('cart/getCart');
        },
         updateCart(cart,i){
            this.$store.commit('cart/updateCart', [cart,i]);
            
        },
    },
})
</script>
<style scoped>
.nothing{
    margin-top: 10%;
    padding-left: 22%;
}
</style>