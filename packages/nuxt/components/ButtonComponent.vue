<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

/* eslint-disable */
enum ButtonSize { // todo: implement styles based on size
  DEFAULT = 'default',
  LARGE = 'large',
  SMALL = 'small',
}
/* eslint-enable */

@Component
export default class ButtonComponent extends Vue {
  @Prop({ type: String, default: ButtonSize.DEFAULT }) size!: ButtonSize;
}
</script>

<style lang="scss" scoped>
button.button {
  width: 300px;
  height: 48px;
  background: #3070F3;
  border-radius: 8px;
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
}
</style>
