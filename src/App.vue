<template>
  <div>
    <HeaderTitle title='Welcome to FifaTransferCoins V2.0!' />
    <CoinsTransfer />
  </div>    
</template>

<script>
  import CoinsTransfer from './components/CoinsTransfer.vue'
  import HeaderTitle from './components/HeaderTitle.vue'

  export default {
    name: 'App',
    components: {
      CoinsTransfer,
      HeaderTitle
    }
}
</script>

<style>
  #app {
    font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
