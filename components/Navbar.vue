<template>
    <v-app-bar app color="white" flat >
      <v-container class="py-0 fill-height">
        <v-avatar width="164" :tile="true" >
            <nuxt-link to="/" >
                <img :src="require('@/assets/img/logo.png')" alt="logo">
            </nuxt-link>
        </v-avatar>

        <v-btn
          class="btn-header-link"
          text
          v-click-outside="hide"
          @click="toggle"
        >
          Каталог
           <v-icon>{{ opened ? 'fa-times' : 'fa-bars' }}</v-icon>
        </v-btn>

        <v-btn
          v-for="(link, idx) in links"
          :key="idx"
          :to="link.path"
          text class="btn-header-link"
        > {{ link.title }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn depressed to="/registration">
            Регистрация
        </v-btn>
        <v-btn depressed to="/login">
            Вход
        </v-btn>

      </v-container>
      <div 
        v-show="opened" 
        class="meny-header-category"
      >
         <v-container>
            <div class="header-cat-container">
              <div 
                v-for="n in 8"
                :key="n"
                link
                class="header-cat-link"
              >
                <nuxt-link to="/catalog" >
                  <v-icon>fa-file-contract</v-icon>
                  <span>категория {{ n }}</span>
                </nuxt-link>
              </div>

            </div>
          </v-container>
      </div>
    </v-app-bar>
</template>>

<script>
import ClickOutside from 'vue-click-outside'

  export default {
    async asyncData({$axios}){
        const data = await $axios.$get('http://193.123.37.74:8000/catalog/categories_second/')
        console.log($axios)
        const category = data.results
        
        return {category}
    },
    data () {
      return {
        //menyHeader: false,
        category: [],
        opened: false,
        links: [
          // { title: 'Каталог', path: ''},
          { title: 'Аренда оборудования', path: '/rent'},
          { title: 'Монтажники', path: '/installers'},
        ],
      }
    },
    methods: {
      toggle () {
        this.opened = !this.opened 
      },
      hide () {
        this.opened = false
      },
      // menyHeaderShow(){
      //   this.menyHeader = !this.menyHeader;
      // }
    },
    mounted () {
      // prevent click outside event with popupItem.
     // this.popupItem = this.$el
    },
 
    directives: {
      ClickOutside
    }
  }
</script>