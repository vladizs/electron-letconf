<template>
  <label :for="id" class="input-text" :style="componentStyles">
    <span class="input-text__label">{{ label }}</span>
    <input
      :id="id"
      v-model="text"
      class="input-text__input"
      :name="id"
      :type="type"
    >
  </label>
</template>

<script lang="ts">
import {
  Component, Prop, VModel, Vue,
} from 'nuxt-property-decorator';

/* eslint-disable */
enum InputTextSize { // todo: implement styles based on size
  DEFAULT = 'default',
  LARGE = 'large',
  SMALL = 'small',
}
/* eslint-enable */

@Component
export default class InputText extends Vue {
  @Prop({ type: String, required: true }) id!: string;
  @Prop({ type: String, default: 'text' }) type!: string;
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: String, default: InputTextSize.DEFAULT }) size!: InputTextSize;
  @Prop({ type: [String, Number], default: 24 }) marginBottom!: number | string;

  @VModel({ type: String }) text!: string;

  get componentStyles() {
    return {
      marginBottom: this.marginBottomString,
    };
  }

  get marginBottomString() {
    if (typeof this.marginBottom === 'number') {
      return `${this.marginBottom}px`;
    }

    return this.marginBottom;
  }
}
</script>

<style lang="scss" scoped>
.input-text {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.input-text__input {
  background: #3E4149;
  border: 1px solid #5A5C64;
  border-radius: 8px;
  outline: none;
  width: 300px;
  height: 48px;
  color: #fff;
  padding-left: 8px;
}

.input-text__label {
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
