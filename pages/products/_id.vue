<template>
    <v-main class="grey lighten-3">
        <v-container>
          <v-breadcrumbs :items="items_top"></v-breadcrumbs>
          <div class="tovar-block">
            <v-row>
              <v-col cols="5">
                <vue-picture-swipe :items="items"></vue-picture-swipe>
                <!-- <p>{{product.img}}</p> -->
              </v-col>
              <v-col cols="7">
                <div class="tovar-content">
                  <h1>{{product.name}}</h1>
                  <div class="cart-brand">
                    <span>Wavin Ekoplastik</span>
                  </div>
                  <div class="cart-price">
                    <span>1.92</span><strong>руб./м</strong>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
    </v-main>
</template>

<script>
  import VuePictureSwipe from '~/plugins/vue-picture-swipe';
  export default {
    validate({params}){
      return /^\d+$/.test(params.id)
    },
      async asyncData({$axios, params}){

      const product = await $axios.$get('http://193.123.37.74:8000/catalog/product/'+params.id)
      const product_img = product.img
      const bread_name = product.name
      const items_top = []
      items_top.push(        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Catalog',
          disabled: false,
          href: '/catalog',
        },
        {
            text: bread_name,
            disabled: false,
            href: '/catalog',
          })
      const items = []
      items.push({src: product.img,w: 600,h: 400,thumbnail:product.img,w: 600,h: 400})
      for (let i of product.images){
        items.push({src: i.img,thumbnail:i.img,w: 600,h: 400})
      }

     return {product,product_img,items,items_top}
    },
    data() {
      return {
        product_img:[],
        items: [],
        //bread_name:'',
        items_top: [],
      }
    },
    mounted(){
      this.$store.dispatch('lastproducts/setProduct',this.product);
      console.log(this.$last10product());
      //imgSlide(product_img){
        // this.product_img = img;
        //  console.log(product_img)
        //this.hachatgs = response.data.results;
      //}
    },
    methods:{
     
    },
    created(){
      // this.imgSlide()
    },
    components: {
      VuePictureSwipe,
    },
  }
</script>