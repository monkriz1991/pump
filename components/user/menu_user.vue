<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">

        <v-avatar  v-bind="attrs" v-on="on" color="primary" size="60">
            <img v-if="$auth.user.img" :src="$auth.user.img">
            <div v-else>{{avatar_}}</div>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title @click="item.method">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
      ],
       avatar_:'',
    }),
    mounted(){
        this.items.push({ title: 'кабинет' ,method:this.goToCabinet });
        this.items.push({ title: 'logout' ,method:this.logout });
        if(this.$auth.user.first_name != '' && this.$auth.user.last_name != ''){
            this.avatar_ = this.$auth.user.first_name[0]+""+this.$auth.user.last_name[0];
        }else{
            this.avatar_ = "NN";
        }
    },
    methods:{
        logout(){
            this.$auth.logout();
        },
        goToCabinet(){
            this.$router.push('/cabinet/')
        }
    },
  }
</script>