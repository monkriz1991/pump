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
           <v-textarea
          solo
          @change="update_param"
          name="input-7-4"
          label="Описание"
          v-model="description"
        ></v-textarea>
      </v-row>
    </v-container>
  </v-form>
</template>



<script>
  export default {
    data: () => ({
      valid: false,
      avatar_:'',
      firstname: '',
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
    },
    methods:{
        update_param(){
            let data = {
                first_name:this.firstname,
                last_name:this.lastname,
                description:this.description,
            }
            this.$axios.put(`http://193.123.37.74:8000/users/mydata/${this.$auth.user.id}/`, data);
        }
    },
  }
</script>