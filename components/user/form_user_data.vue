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
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="15"
            label="Ваше имя"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="15"
            label="Ваша фамилия"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        </v-col>
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
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 15 || 'Name must be less than 15 characters',
      ],
    }),
    mounted(){
        this.firstname = this.$auth.user.first_name;
        this.lastname = this.$auth.user.last_name;
    }
  }
</script>