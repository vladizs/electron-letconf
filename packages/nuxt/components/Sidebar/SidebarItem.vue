<template>
  <div class="sidebar-item" :class="{ active }" @click="routeToPage">
    <div class="icon icon-inactive">
      <slot name="icon" />
    </div>
    <div class="icon icon-active">
      <slot name="icon:active" />
    </div>
    <div v-if="badgeCount > 0" class="badge">
      {{ badgeCount }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class SidebarItemComponent extends Vue {
  @Prop({ type: Number }) badgeCount?: number;
  @Prop({ type: Boolean }) active!: boolean;
  @Prop({ type: String }) link!: string;

  routeToPage() {
    this.$router.push(this.link);
  }
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 16px;
  height: 48px;
  width: 100%;
  border-left: 3px solid transparent;
  background: transparent;
  &.active {
    border-left: 3px solid #4880F3;
    background: rgba(48, 112, 243, 0.12);
  }
  .icon-active {
    display: none;
  }
}

.icon {
  width: 28px;
  height: 28px;
}

.sidebar-item.active {
  .icon-inactive {
    display: none;
  }
  .icon-active {
    display: block;
  }
}
</style>
