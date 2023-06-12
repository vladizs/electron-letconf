<template>
  <div class="default-sidebar-template layout">
    <Titlebar />
    <div class="layout__content">
      <aside class="layout__sidebar">
        <Sidebar />
      </aside>
      <main class="layout__inner">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SidebarComponent from '~/components/Sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar: SidebarComponent,
  },
})
export default class DefaultSidebarTemplate extends Vue {

}
</script>

<style lang="scss" scoped>
$titlebar-height: 30px;

.layout {
  height: calc(100vh - $titlebar-height);
}

.layout__content {
  display: flex;
  height: 100%;
}

.layout__sidebar {
  height: 100%;
}

.layout__inner {
  width: 100%;
}
</style>
