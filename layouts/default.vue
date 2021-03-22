<template>
  <v-app>
    <Navbarmy/>
    <nuxt/>
    
    <Footer/>
  </v-app>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name:"def",
 components: {
   Navbarmy:Navbar,
   Footer
 }, 
}

</script>