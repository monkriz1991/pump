<template>

  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
          >

     
            
            <hooper  :centerMode="true" :wheelControl="false">
              <slide>
                slide 1
              </slide>
              <slide>
                slide 2
              </slide>
              <slide>
                slide 3
              </slide>
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>


          <section class="section-index">
            <v-container>
              <v-row>
              <!-- <h1>Arhiterm</h1> -->
              <v-col 
              v-for="(cat,idx) in category"
              :key="idx"
              cols="4"
              >
                <div class="index-category theme--light " >
                  <span>{{cat.title}}</span>               
                  <v-img 
                  contain
                  max-height="60"
                  :src="cat.photo" 
                  aspect-ratio="1"
                  alt=""
                  >
                  </v-img>
                </div>
              </v-col>
              <div 
              class="index-category-all"
              >
                <nuxt-link to="/">
                  все категории
                </nuxt-link>
              </div>
              </v-row>
            </v-container>
          </section>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>


    <v-container>
      <v-row>
        <div class="index-brand-container">
          <div class="index-brand-item">
            <a href="#">
              <img :src="require('@/assets/img/logo.png')" alt="logo">
              <div class="index-brand-item-bg"></div>
            </a>
          </div>
        </div>
      </v-row>
    </v-container>

  </v-main>

</template>
<script>

import {
  Hooper,
  Slide,
  Pagination as HooperPagination
  } from '@/node_modules/hooper/dist/hooper.min.js';
  import '@/node_modules/hooper/dist/hooper.css';

export default {

    data(){
    return {
      category: [
        {title:'категория', photo: 'https://picsum.photos/350/165?random'},
        {title:'категория', photo: 'https://picsum.photos/350/165?random'},
        {title:'категория', photo: 'https://picsum.photos/350/165?random'},
      ]
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination
  }
}
</script>
<style>

</style>
