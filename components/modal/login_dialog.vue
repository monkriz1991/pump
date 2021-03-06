<template>
  <v-row>
    <v-col >
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Вход</v-btn>
        </template>


        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Авторизация</v-toolbar>
            <v-card-text>
              <login />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import login from '~/components/modal/form_login.vue'
export default {
    components:{
        login,
    },
    props:['dialog_show']
}
</script>