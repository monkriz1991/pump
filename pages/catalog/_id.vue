<template>



  <v-main class="grey lighten-3">

    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <v-row>
        <v-col cols="2">
            <div class="filter-catalog">
              <v-list color="transparent">
                <div
                  v-for="(f,idx) in filter"
                  :key="idx"
                  link
                  class="checkbox-catalog-block"
                >
                   <strong>
                    {{ f.name }}
                   </strong>
                    <div class="checkbox-catalog">
                      <v-checkbox
                        v-for="chi in f.child"
                        :key="chi.id"
                        :label="chi.name"
                        color="orange"
                        :value="chi.id"
                        hide-details
                        @click.prevent="checkProduct(chi.id)"
                      ></v-checkbox>
                    </div>

                </div>

              </v-list>
            </div>
          </v-col>
        <v-col cols="10">
          <v-sheet
            class="catalog-block"
            rounded="lg"
          >
            <v-row>
                <v-col 
                    v-for="(n,idx) in hachatgs"
                    :key="idx"
                    class="d-flex child-flex"
                    cols="3"
                >
                
                    <v-sheet class="catalog-card">

                        <vue-content-loading hidden :width="300" :height="503" v-show="loading">
                          <rect x="0" y="0" rx="6" ry="6" width="100%" height="345" />
                          <rect x="0" y="375" rx="6" ry="6" width="100%" height="20" />
                          <rect x="0" y="405" rx="6" ry="6" width="100%" height="20" />
                          <rect x="0" y="435" rx="6" ry="6" width="80%" height="20" />
                          <rect x="0" y="473" rx="6" ry="6" width="50%" height="30" />
                        </vue-content-loading>

                        <v-img 
                        contain
                        height="225"
                        :src="n.img"
                        :lazy-src="n.img"
                        aspect-ratio="1"
                        class="white lighten-2"
                        
                        >
                            <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>

                        <div class="catalog-cart-desc" >
                          <a href="#" @click.prevent="openProduct(n.id)">
                              {{n.name }}
                          </a>
                          <div class="catalog-cart-price">
                            <span>{{ n.s1_id || 'null' }}</span><strong>руб./м</strong>
                          </div>
                          <div class="catalog-cart-bottom">
                            <div class="catalog-cart-type">
                              Размер:
                            </div>
                            <v-radio-group
                            v-model="n.s1_id"
                            :mandatory="true">
                            <v-row>
                              <v-radio 
                                v-for="cd in n.product"
                                :key="cd.id"
                                :label="`${cd.price}`"
                                :value="cd.price"
                              ></v-radio>
                            </v-row>
                            </v-radio-group>
                            <div class="catalog-cart-calc">
                              <vue-number-input 
                                 
                                :min="1" 
                                :value="1"
                                inline 
                                size="small"
                                controls
                              >
                              </vue-number-input>
                            </div>
                            <v-btn
                              depressed
                              small
                            >В корзину</v-btn>
                          </div>
                        </div>
                        </v-sheet>
                </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>

    <v-container>
      <v-row>
        <v-col cols="10" offset="2">
          <v-pagination
            class="pagination-catalog"
            v-model="page"
            :length="count_page"
            :total-visible="7"
            @input="nextPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

</template>


<script>
import axios from 'axios';
import VueContentLoading from 'vue-content-loading';
import VueNumberInput from '@chenfengyuan/vue-number-input';
export default {
      validate({params}){
        console.log(params.id)
      return /^\d+$/.test(params.id)
    },
    async asyncData({$axios, params}){
        const product = await $axios.$get('http://193.123.37.74:8000/catalog/product/?limit=12&offset=12')
        const category = await $axios.$get('http://193.123.37.74:8000/catalog/categories/'+params.id)
        const filter = []
        filter.push(category)
        const hachatgs = product.results
        const count_pages = product.count
        return {hachatgs,count_pages,filter}
    },
    data () {
      return {
          hachatgs:[],
          filter:[],
          page: 1,
          loading:true,
          count_page:'',
          loading_desc:false,
          selected: [],
          radioGroup:'',
          items: [
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
      ],
      url : 'http://193.123.37.74:8000/catalog/product/?limit=12&offset=',
      }
    },
    components: {
      VueContentLoading,
      VueNumberInput,
    },
    mounted(){
      setTimeout(() =>{
        this.setLoadingState(false)
        this.setLoadingDesc(true)
      },900)
    },
    methods: {
      setLoadingState(state){
        this.loading = state
      },
      setLoadingDesc(state){
        this.loading_desc = state
      },
      countPages(hachatgs){
        this.count_page = Math.round(this.count_pages/12) 
      },
      nextPage(page){
        const nextOffset = this.page*12
          this.$axios.get(this.url+nextOffset).then((response) => {
              this.hachatgs = response.data.results;
             
          });       
      },
      checkProduct(id){
        console.log(id)
      },
        // getHachtags(){
        //     axios.get(this.url.hachatgs).then((response) => {
        //         this.hachatgs = response.data;
        //     })
        // },
        openProduct(id){
            this.$router.push('/products/'+id)
        }
    },
    created() {
        // this.getHachtags()
        this.countPages()
    }
  }
</script>