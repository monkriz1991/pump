<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>

        <v-img
        :max-height="120"
        :max-width="120"
       v-if="$auth.user.img" :src="$auth.user.img"
    ></v-img>
        <v-col
          cols="12"
          md="5"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="15"
            label="Ваше имя"
            @change="update_param"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="5"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="15"
            label="Ваша фамилия"
            @change="update_param"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col
          cols="12"
          md="5"
        >
           <v-textarea
          solo
          @change="update_param"
          name="input-7-4"
          label="Описание"
          v-model="description"
        ></v-textarea>
          </v-col>
          <v-col
          cols="12"
          md="5"
        >
          <v-row justify="center">
    <v-date-picker v-model="picker"></v-date-picker>
          </v-row>
    </v-col>
  </v-row>
    </v-container>
    <snackbar :snackbar="show_snackbar" v-on:requestClose="close" :text="text_snackbar" />
  </v-form>
  
</template>



<script>
import snackbar from '@/components/modal/snackbar.vue'
  export default {
      components:{
          snackbar
      },
    data: () => ({
        show_snackbar:false,
        text_snackbar:'',
      valid: false,
      avatar_:'',
      firstname: '',
      picker: '',
      lastname: '',
      description:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 15 || 'Name must be less than 15 characters',
      ],
    }),
    mounted(){
        this.firstname = this.$auth.user.first_name;
        this.lastname = this.$auth.user.last_name;
        this.description = this.$auth.user.description;
        this.picker = this.$auth.user.birth_date;
    },
    methods:{
        close(){},
        async update_param(e){
            console.log(e);
            if (typeof(e) != "Object" || e.keyCode === 13) {
                console.log(this.picker);
            let data = {
                first_name:this.firstname,
                last_name:this.lastname,
                description:this.description,
                birth_date:this.picker,
            }
            let res = await this.$axios.put(`http://193.123.37.74:8000/users/mydata/${this.$auth.user.id}/`, data)
            if(res.status=='200'){
                     this.text_snackbar = "Параметр изменен";
                    this.show_snackbar = true;
            }else{
                        this.text_snackbar = "Параметр не изменен";
                    this.show_snackbar = true;
            }
        }   
            }
    },
  }
</script>