<template>
  <div class="sidebar">
    <SidebarItem
      link="/meetings"
      active
    >
      <template #icon>
        <img class="icon" src="@/assets/icons/meeting.svg" alt="">
      </template>
      <template #icon:active>
        <img class="icon" src="@/assets/icons/meeting-active.svg" alt="">
      </template>
    </SidebarItem>
    <SidebarItem
      link="/history"
    >
      <template #icon>
        <img class="icon" src="@/assets/icons/history.svg" alt="">
      </template>
      <template #icon:active>
        <img class="icon" src="@/assets/icons/history-active.svg" alt="">
      </template>
    </SidebarItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SidebarItem from './SidebarItem.vue';

@Component({
  components: {
    SidebarItem,
  },
})
export default class SidebarComponent extends Vue {

}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  height: 100%;
  width: 80px;
  flex-direction: column;
  background: #24262C;
  border-right: 2px solid #3B3E47;
}

img.icon {
  width: 28px;
  height: 28px;
}
</style>
