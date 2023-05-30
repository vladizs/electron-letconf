<template>
  <div class="default-template">
    <Titlebar />
    <div class="default__inner">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Titlebar from '../components/Titlebar.vue';

@Component({
  components: {
    Titlebar,
  },
})
export default class DefaultTemplate extends Vue {

}
</script>

<style lang="scss" scoped>
$topbar-height: 30px;

.default__inner {
  height: calc(100vh - $topbar-height);
}
</style>
