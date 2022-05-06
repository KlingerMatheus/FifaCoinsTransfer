<template>
    <div class="container">
        <p>{{ title }}</p>
        <p class="description">Make your transfer coins with safety and precisely to please your customers.</p>
    </div>  
</template>

<script>
export default {
  name: 'HeaderTitle', 
  props: ['title']
}
</script>

<style scoped>
    .container {
        background-color: rgba(0,0,30,0.7);
        padding: 25px;
        font-weight: bold;
        font-family: 'Roboto';
        font-size: 26px;
        color: #fff;
        border-bottom: 4px solid rgba(0,0,30,0.7);
        margin-bottom: 25px;
        transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);        
    }

    .description {
        font-weight: 300;
        font-family: 'Roboto';
        font-size: 16px;
    }
</style>
