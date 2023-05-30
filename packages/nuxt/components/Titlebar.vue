<template>
  <div class="titlebar">
    <span class="title">
      LetConf
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TitlebarComponent extends Vue {

}
</script>

<style lang="scss" scoped>
.titlebar {
  background: #1F2127;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  -webkit-app-region: drag;
}
</style>
