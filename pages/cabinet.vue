<template>
    <v-main class="grey lighten-3">
    <v-container>
        <v-row>
            <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
          >
        <h1> CABINET for {{$auth.user.username}} </h1>
        <div>
            <userform />
        </div>
          </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    </v-main>
</template>

<script>
import userform from '@/components/user/form_user_data.vue'
export default {
    middleware: 'auth',
    components:{
        userform
    },
}
</script>