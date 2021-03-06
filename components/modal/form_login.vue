<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
   <v-list-item>
      <v-list-item-content v-for="error in errors" :key="error">
        <v-list-item-title>{{error}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-text-field
      v-model="logininfo.username"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    
    <v-text-field
            v-model="logininfo.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="пароль"
            hint="пароль должен быть длинее"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

    <v-btn
      @click="authenticate"
    >
      Вход
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      logininfo:{username:'',password:''},
      errors:[],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        show1:false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async authenticate(){
            await this.$auth.loginWith('local', { data: this.logininfo }).then(response => { 
                console.log(response);
                alert('Success login');
            })
            .catch(error => {
                this.errors = [];
                let str = "";
                for(let i in error.response.data){
                    for (let s of error.response.data[i]){
                        str += `${s}`;
                        this.errors.push(`${i}: ${s}`);
                    }
                }
            });
        
      },
    },
  }
</script>