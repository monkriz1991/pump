<template>
 <div class="filter-installers">
   <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      flat
      color="transparent"
    >
      <v-toolbar-title>Поиск по тегам</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="$refs.search.focus()"
        
      >
        <v-icon>fa-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container class="py-0">
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          v-for="(selection, i) in selections"
          :key="selection.name"
          class="shrink"
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            {{ selection.name }}
          </v-chip>
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="поиск"
            single-line
            @blur="setFirstItems()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-list>
      <template v-for="item in items">
        <v-list-item
          v-if="!selected.includes(item)"
          :key="item.name"
          :disabled="loading"
          @click="selected.push(item)"
        >
          <v-list-item-avatar>
              {{item.count}}
          </v-list-item-avatar>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      
    </v-card-actions>
  </v-card>
 </div>
</template>

<script>
export default {
    async fetch(){
        const items = await this.$axios.$get('/mounters/most_popular_tag/')
        this.items = items.results;
        this.first_items = JSON.parse(JSON.stringify(items.results));
    },
    data: () => ({
      items: [  ],
      first_items:[],
      loading: false,
      search: '',
      selected: [],
    }),

    computed: {
      categories () {
        const search = this.search

        if (!search) return this.items
        
        this.findtag(search);
        return this.finded;
      },
      selections () {
        const selections = []

        for (const selection of this.selected) {
          selections.push(selection)
        }

        return selections
      },
    },

    watch: {
      selected () {
        this.$store.commit('installers/addSelected',JSON.parse(JSON.stringify(this.selected)));
      },
      search(){
           this.findtag(this.search);
      }
    },

    methods: {
      next () {
        this.loading = true

        setTimeout(() => {
          this.search = ''
          this.loading = false
        }, 2000)
      },
      async findtag(str=""){
          let res = []
          if(str.length>0){
              let data = await this.$axios.get(`/tagcloud/${str}/`);
              if(data.status==200){
                   res =  data.data.results;
                  this.items = res;
              }else{
                  this.items = [];
              }
              
          }else{
              this.items = this.first_items;
          }
      },
      setFirstItems(){
          if(this.search.length<=0){
          this.items = this.first_items;
          }
      }
    },
  }
</script>

<style scoped>
.filter-installers{

}
</style>