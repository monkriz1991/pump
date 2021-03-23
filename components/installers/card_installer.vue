<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="mounter.whoiam.img?mounter.whoiam.img:'http://193.123.37.74:8000/media/img/noimg.png'"
      height="200px"
    ></v-img>

    <v-card-title>
     {{mounter.whoiam.first_name?mounter.whoiam.first_name:'noname'}} {{mounter.whoiam.last_name?mounter.whoiam.last_name:'no lastname'}}
       <v-chip
      class="ma-2"
      color="green"
      text-color="white"
    >
      {{mounter.price}} руб/час
    </v-chip>
    <v-chip
      class="ma-2"
      color="yelow"
      text-color="white"
    >
      {{mounter.raiting}}
    </v-chip>
    </v-card-title>

    <v-card-subtitle>
     {{mounter.about}}
    </v-card-subtitle>
    <v-card-subtitle> <v-chip
      class="ma-2"
      color="red"
      text-color="white"
      v-for="tag in mounter.tag_s"
      :key="tag.id"
    >
      {{tag.name}}
    </v-chip></v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="show = !show"
      >
        описание
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'fa-chevron-up' : 'fa-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{mounter.description}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      show: false,
    }),
    props:['mounter'],
  }
</script>