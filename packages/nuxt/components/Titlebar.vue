<template>
  <div class="titlebar" :class="{ 'is-mac': isMac, 'is-focused': isFocused }">
    <span class="title">
      LetConf
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TitlebarComponent extends Vue {
  isFocused = true;
  isMac = false;

  mounted() {
    this.isMac = window?.appBridge?.isMac;
    window.appBridge?.onFocusStateChange(this.changeFocusState)
  }

  changeFocusState(state: boolean) {
    this.isFocused = state;
  }
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
  &.is-mac {
    justify-content: center;
  }
  * {
    user-select: none;
  }
}

.titlebar .title {
  opacity: 0.5;
}

.titlebar.is-focused .title {
  opacity: 1;
}
</style>
