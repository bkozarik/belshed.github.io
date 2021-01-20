<template>
  <div id="app">
    <component3/>
  </div>
</template>

<script>
// import component1 from './components/component1.vue';
import component3 from './components/comp3.vue';

export default {
  name: 'App',
  components: {
    // component1,
    component3
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0

body 
  min-height: 100vh
  margin: 0


#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  display: flex
  align-items: center
  justify-content: center
  min-height: 100vh


.column 
  display: flex
  flex-direction: column
  align-items: center


.row 
  display: flex
  align-items: center
  // flex-wrap: wrap

.container
  width: 100%
  max-width: 1200px
  margin: 0 auto
  padding: 0px 15px
</style>
