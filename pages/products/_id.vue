<template>
    <v-main class="grey lighten-3">
        <v-container>
          <v-breadcrumbs :items="items_top"></v-breadcrumbs>
          <div class="tovar-block">
            <v-row>
              <v-col cols="5">
                <vue-picture-swipe :items="items"></vue-picture-swipe>
                <p>{{product.img}}</p>
              </v-col>
              <v-col cols="7">
                <h1>{{product.name}}</h1>
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
      return /\d+$/.test(params.id)
    },
      async asyncData({$axios, params}){
      const product = await $axios.$get('http://193.123.37.74:8000/catalog/product/'+params.id)
      //console.log(product)
      const items = []
      items.push({src: product.img,thumbnail:product.img})
      for (let i of product.images){
        items.push({src: i.img,thumbnail:i.img})
      }
      const img = product.img
     return {product,img,items}
    },
    data() {
      return {
        product:{},
        product_img:'',
        items: [{
          src: 'http://via.placeholder.com/600x400',
          thumbnail: 'http://via.placeholder.com/120x120',
          w: 600,
          h: 400
        },
        {
          src: 'http://via.placeholder.com/1200x900',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 1200,
          h: 900
        }
      ],
      items_top: [
        {
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
            text: 'Catalog',
            disabled: false,
            href: '/catalog',
          },
      ],
      }
    },
    mounted(){
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