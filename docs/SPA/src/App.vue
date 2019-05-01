<template>
    <div id="app">
        <ns-charts></ns-charts>
    </div>
</template>

<script>
    import nsCharts from './components/ns-charts'

    export default {
        name: 'app',
        components: {nsCharts},
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
