<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snack"
      :timeout="1500"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>
<script>
  export default {
      data(){
          return{
              snack:false,
          }
      },
    props:['text', 'snackbar'],
    watch:{
       snackbar:function(v){
           this.snack = v;
       } 
    }
  }
</script>