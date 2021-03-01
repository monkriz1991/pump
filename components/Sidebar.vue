<template>
  <div>
    <b-button v-b-toggle.sidebar-1>show categories</b-button>
    <b-sidebar id="sidebar-1" :title="title" shadow>
      <div class="px-3 py-2" v-if="!categories.name">
        <div v-for="cat in categories.results" :key='cat.id'>
             <b-img :src="cat.img" fluid thumbnail></b-img> 
         <a href="#">{{cat.name}}</a>
         <hr>
         <div v-if="cat.child.length">
            <div v-for="c in cat.child" :key="c.id">
                <a href="#" @click="gotoChildCat(c.id)">{{c.name}}</a>
            </div>
            </div>
         <div v-else >
                no child
         </div>
         <hr>
         <hr>
        </div>
      </div>
      <div class="px-3 py-2" v-else>
          <a href="#" class="alert" @click="get_cat">goback</a><hr>
          {{categories.name}}
          <div v-for="f in categories.filters" :key="f.id">
              <h5><a href="#">{{f.name}}</a></h5><input v-model="inp_check[f.id]" @change="check_filter(f)" type="checkbox"/>
              <div v-if="!f.rows.length">
                checkbox only  
              </div>
              <div v-else>
              <hr>
              min - {{inp_min[f.id]}}
              max - {{inp_max[f.id]}}
              <hr>
             max - <b-form-input type="range" v-model="inp_max[f.id]" @change="vvv_max(f)" :value="f.filter_max" :disabled="!inp_check[f.id]" :state="inp_max[f.id]>=inp_min[f.id]" :max="f.filter_max" :min="f.filter_min" step="1" ></b-form-input>
             min - <b-form-input type="range" v-model="inp_min[f.id]" @change="vvv_min(f)" :value="f.filter_min"  :disabled="!inp_check[f.id]" :state="inp_max[f.id]>=inp_min[f.id]" :max="f.filter_max" :min="f.filter_min" step="1" ></b-form-input>
              
              </div>
              <hr>
              <hr>
          </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

export default {
    data(){
        return{
            categories:[],
            inp_max:[],
            inp_min:[],
            inp_check:[],
            title:'categories',
            filters:[],
            range:[],
        }
    },
    mounted(){
        this.get_cat();
    },
  methods: {
    set_filter(a,b){
        let res="";
        let filter_string=JSON.stringify(a);
        let range_string = JSON.stringify(b);
        let symbol = "?";
        if(a.length){
           res += "?row="+filter_string;
            symbol = "&";
        }
        if(b.length){
           res += symbol+"range="+range_string;
        }
        this.$store.commit('filter/set_query_filter', res)
        this.$store.dispatch('filter/get_product')
    },
  async get_cat() {
      this.title = "categories"
      console.log(this.$http._defaults.prefixUrl)
    this.categories =  await this.$http.$get(`http://${this.$http._defaults.prefixUrl}/catalog/categories/`)
  },
  async gotoChildCat(id){
      this.title = "second categories"
      this.categories =  await this.$http.$get(`http://${this.$http._defaults.prefixUrl}/catalog/categories_second/${id}/`);
      for (let f of this.categories.filters){
          this.inp_max[f.id] = f.filter_max;
          this.inp_min[f.id] = f.filter_min;
      }
  },
  vvv_max(f){  
      for (let d of this.range){
              if(d.parent==f.id){
                    d.max = +(this.inp_max[f.id]);
                    break;
              }
          }
          let data = this.inp_max[f.id];
          this.changr_range(f, data,true)
  },
  vvv_min(f){  
      for (let d of this.range){
              if(d.parent==f.id){
                    d.min = +(this.inp_min[f.id]);
                    break;
              }
          }
          let data = this.inp_min[f.id];
          this.changr_range(f,data)
  },
  changr_range(f,data,status=false){
      for (let d of this.range){
              if(d.parent==f.id){
                    var index = this.range.indexOf(d);
                    if (index !== -1) {
                    if(status){
                        this.range[index]['max'] = data;
                }else{
                    this.range[index].min = data;
                }
                    break;
                    }
              }
          }
          this.set_filter(this.filters, this.range)
  },
  check_filter(filter){
      if(filter.filter_max==null && filter.filter_min==null && this.inp_check[filter.id]){
          this.filters.push(filter.id);
      }
      if(filter.filter_max==null && filter.filter_min==null && !this.inp_check[filter.id]){
          var index = this.filters.indexOf(filter.id);
            if (index !== -1) {
                this.filters.splice(index, 1);
            }
      }

      if(filter.filter_max!=null && filter.filter_min!=null && this.inp_check[filter.id]){
          let data = {"parent":filter.id,"max":this.inp_max[filter.id],"min":this.inp_min[filter.id]};
          this.range.push(data);
      }
      if(filter.filter_max!=null && filter.filter_min!=null && !this.inp_check[filter.id]){
          let data = {"parent":filter.id,"max":this.inp_max[filter.id],"min":this.inp_min[filter.id]};
          for (let d of this.range){
              if(d.parent==filter.id){
                    var index = this.range.indexOf(d);
                    if (index !== -1) {
                        this.range.splice(index, 1);
                    }
                    break;
              }
          }
      }
      this.set_filter(this.filters, this.range)
  },

  }
}
</script>