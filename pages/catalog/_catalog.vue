<template>



  <v-main class="grey lighten-3">

    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <v-row>
        <v-col cols="2">
            <div class="filter-catalog">
              <v-list color="transparent" v-if="filters">
                <div
                  v-for="(cat,n) in filters"
                  :key="n"
                  link
                  class="checkbox-catalog-block"
                >
                   <strong>
                      {{cat.name}}
                   </strong>
                    <div class="checkbox-catalog">
                      <v-checkbox
                        v-model="enabled[n]"
                        :label="cat.name"
                        color="orange"
                        :value="cat.id"
                        @change="checkFilter(n,cat)"
                        hide-details
                      ></v-checkbox>
                      <hr>
                      <div  v-for="(filter,n1) in cat.filters" :key="n1">
                        <strong>
                      {{filter.name}}
                   </strong>
                      <v-checkbox
                        v-for="(podcat,n2) in filter.filter_value"
                        :key="n2"
                        v-model="enabled_filter[n2]"
                        :label="podcat.value"
                        color="orange"
                        :value="podcat.id+'|||'+cat.id"
                        @change="checkFilterCat(n2,podcat)"
                        hide-details
                      ></v-checkbox>
                      </div>
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
                              <v-text-field
                                
                                hide-details
                                min="0"
                                step="1"
                                value="1"
                                single-line
                                type="number"
                              />
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

    <v-pagination
      v-model="page"
      :length="count_page"
      :total-visible="7"
      @input="nextPage"
    ></v-pagination>

  </v-main>

</template>


<script>
import VueContentLoading from 'vue-content-loading';
export default {
  
    async asyncData({store, params}){
        const product = await store.dispatch('products/getProductFromServer',{"limit":12,"offset":0,"cat":params.catalog});
        //const filters = await store.dispatch('categories/getsecondCategoryWithFilters',params.catalog);
        const filters = await store.dispatch('categories/getCatWithSecondCat',params.catalog);
        const hachatgs = product.results
        const count_pages = product.count
        return {hachatgs,count_pages,params, filters}
    },
    data () {
      return {
          hachatgs:[],
          enabled:[],
          enabled_filter:[],
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
      url : '/catalog/product/?limit=12&offset=',
      }
    },
    components: {
      VueContentLoading,
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
        this.count_page = Math.ceil(this.count_pages/12);
        console.log(this.count_pages);
      },
      async nextPage(z = {second_cat:[],filter:[]}){
        const nextOffset = (this.page-1)*12   
        let a = await this.$store.dispatch('products/getProductFromServer',{"limit":12,"offset":nextOffset,"cat":this.params.catalog,"second_cat":z.second_cat,"filter":z.filter});
        this.hachatgs = a.results;
        this.count_pages = a.count;
        this.countPages()
      },
        openProduct(id){
            this.$router.push('/products/'+id)
        },
        checkFilter(e,f){
          this.page = 1;
          let filter = {};
          let cartfilter = [];
          for(let s of this.enabled){
            if(s!=null){
                 cartfilter.push(s);
            }
           
          }
          
         this.nextPage({second_cat:cartfilter,filter:[]});
        },
         checkFilterCat(e,f){
           this.page = 1;
          let filter = {};
          let cartfilter = [];
          for(let s of this.enabled_filter){
            if(typeof(s)!="string"){continue}
            let after_split = s.split('|||');
            cartfilter.push(after_split[0]);
            if(filter[after_split[1]]==undefined){
              filter[after_split[1]] =[]
              filter[after_split[1]].push(Number.parseInt(after_split[0]));
            }else{
                filter[after_split[1]].push(Number.parseInt(after_split[0]));
            }
          }
          let result = [];
          for(let fil in filter){
            result.push({"parent":fil,"list":filter[fil]});
          }
         this.nextPage({second_cat:[],filter:cartfilter});
        }
    },
    created() {
        // this.getHachtags()
        this.countPages()
    }
  }
</script>