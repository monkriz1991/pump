<template>
    <v-main class="grey lighten-3">
        <v-container>
            <validation-observer
                ref="observer"
                v-slot="{ invalid }"
            >
                <form @submit.prevent="submit">
                <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:20"
                >
                    <v-text-field
                    v-model="name"
                    :counter="10"
                    :error-messages="errors"
                    label="Name"
                    required
                    ></v-text-field>
                </validation-provider>
                <validation-provider
                    v-slot="{ errors }"
                    name="phoneNumber"
                    :rules="{
                    required: true,
                    digits: 7,
                    regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
                    }"
                >
                    <v-text-field
                    v-model="phoneNumber"
                    :counter="7"
                    :error-messages="errors"
                    label="Phone Number"
                    required
                    ></v-text-field>
                </validation-provider>
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                    <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                    ></v-text-field>
                </validation-provider>

                <validation-provider
                >
                    <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        
                        name="input-10-1"
                        label="password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                </validation-provider>
                <validation-provider
                >
                <v-text-field
                    v-model="password2"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="password2"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                ></v-text-field>
                </validation-provider>                
                <validation-provider
                    v-slot="{ errors }"
                    name="select"
                    rules="required"
                >
                    <v-select
                    v-model="select"
                    :items="items"
                    :error-messages="errors"
                    label="Select"
                    data-vv-name="select"
                    required
                    ></v-select>
                </validation-provider>
                <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="checkbox"
                >
                    <v-checkbox
                    v-model="checkbox"
                    :error-messages="errors"
                    value='true'
                    label="Согласны на условия конракта на душу"
                    type="checkbox"
                    required
                    ></v-checkbox>
                </validation-provider>

                <v-btn
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                >
                    submit
                </v-btn>
                <v-btn @click="clear">
                    clear
                </v-btn>
                </form>
            </validation-observer>
        </v-container>
    </v-main>
</template>


<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      password2:'',
      show1: false,
      show2: false,
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
        this.registerUser()
      },
       async registerUser(){
         let registrationinfo = {
          username: this.name,
          password: this.password,
          password2:this.password2
         }
            console.log(registrationinfo);
            await this.$axios.post('registration/backend/registration/',registrationinfo).then(response => { 
                console.log(response)
            })
            .catch(error => {
                this.errors = [];
                let str = "";
                for(let i in error.response.data){
                    for (let s of error.response.data[i]){
                        str += `${i}: ${s}`;
                        this.errors.push(`${i}: ${s}`);
                    }
                }
            });    
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.password = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>