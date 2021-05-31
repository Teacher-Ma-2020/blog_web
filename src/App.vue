<template>
  <div id="app" >
    <router-view />
  </div>
</template>
<script>
export default {
  name:'name',
  created () {
    window.L2Dwidget.init({
      pluginRootPath: 'static/live2dw/',
      pluginJsPath: 'lib/',
      pluginModelPath: 'live2d-widget-model-koharu/assets/',
      tagMode: false,
      debug: false,
      model: { jsonPath: '/static/live2dw/live2d-widget-model-haruto/assets/haruto.model.json' },
      display: { position: 'left', width: 95, height: 190 },
      mobile: { show: true },
      log: false
    })
  }
}

</script>

<style>

#app{
  /*max-width: 60%;*/
  /*margin: 0 auto;*/
}

</style>


