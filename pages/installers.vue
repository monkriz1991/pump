<template>
    <v-main class="grey lighten-3">
        <v-container>
        <v-row>
            <v-col cols="2">
                 <v-container fluid>
                                <v-select
                                v-model="value"
                                :items="ordering"
                                label="Выберите направление"
                                >
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                    <span>{{ item.text }}</span>
                                    </v-chip>
                                    <span
                                    v-if="index === 1"
                                    class="grey--text caption"
                                    >
                                    (+{{ value.length - 1 }} others)
                                    </span>
                                </template>
                                </v-select>
                                </v-container>
                <filter-installers />
            </v-col>
            <v-col cols="10">
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
            <div class="text-center"  v-if="loading">
            <v-progress-circular
               
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
            </div>
                <v-row v-else>
                           
                <v-col 
                   v-for="mounter in mounters"
                   :key="mounter.id"
                    class="d-flex child-flex"
                    cols="3"
                >
                    <card-installer :mounter="mounter" />
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
      @input="udateMounters"
    ></v-pagination>
    </v-main>
</template>

<script>
import filterInstallers from '@/components/installers/filter_installers.vue'
import cardInstaller from '@/components/installers/card_installer.vue'
export default ({
    async asyncData({store, $axios, params,route}){
        let page = route.query.page?parseInt(route.query.page):1;
        const nextOffset = (page-1)*12
        let data = await $axios.get(`/mounters/mounters/?limit=12&offset=${nextOffset}`);
        let count_page =  Math.ceil((data.data.count?data.data.count:1)/12);
        let mounters = data.data.results;
        return {mounters, count_page,page};
    },
    components:{
        filterInstallers,
        cardInstaller
    },
    data() {
        return{
            loading:false,
            page:1,
            query:'',
            orderings:'',
            value:{text:"без сортировки",value:"&"},
            ordering:[
                {text:"без сортировки",value:"&"},
                {text:"по возрастанию цены",value:"&ordering=price&"},
                 {text:"по убывания цены",value:"&ordering=-price&"},
                 {text:"по рейтингу",value:"&ordering=-mounterraiting__value&"},
            ],
        }
    },
    computed:{
        selected(){
            return this.$store.state.installers.selected;
        }
    },
    watch:{
         selected (newCount, oldCount) {
             let q = '&';
            if(newCount.length){
                    for(let i of newCount){q+=`tags=${JSON.stringify(i.id)}&`}
            }
             this.query = q.slice(0, -1);
    },
    query(newVal,oldVal){
        this.udateMounters();
    },
    orderings(newVal,oldVal){
       
        this.udateMounters();
    },
    value(newVal,oldVal){
        this.orderings = newVal; 
        this.orderings = this.orderings.slice(0, -1);
    },
    },
    methods:{
        async udateMounters(){
            this.loading = true;
            const nextOffset = (this.page-1)*12
            console.log(`/mounters/mounters/?limit=12&offset=${nextOffset}${this.query}${this.orderings}`);
            let data = await this.$axios.get(`/mounters/mounters/?limit=12&offset=${nextOffset}${this.query}${this.orderings}`);
            history.pushState(null, null, window.location.protocol + '//' + window.location.host + window.location.pathname+`?page=${this.page}`);
            this.mounters = data.data.results;
            this.count_page =  Math.ceil((data.data.count?data.data.count:1)/12);
            this.loading = false;
        }
    },
})
</script>
