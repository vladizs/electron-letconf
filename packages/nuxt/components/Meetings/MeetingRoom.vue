<template>
  <div class="meeting-room">
    <header class="meeting-header">
      <h2>{{ meeting.title }}</h2>
      <div class="avatar-line">
        <div class="avatar"></div>
        <div class="avatar"></div>
        <div class="avatar"></div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IMeetingData } from '~/interfaces/meeting';

@Component
export default class MeetingRoom extends Vue {
  @Prop({ type: Object }) meeting!: IMeetingData;
}
</script>

<style lang="scss" scoped>
.meeting-room {
  width: 75%;
}
.meeting-header {
  display: flex;
  width: 100%;
  height: 72px;
  padding: 0 24px;
  align-items: center;
  border-bottom: 2px solid #3B3E47;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  .avatar-line {
    display: flex;
  }

  .avatar {
    width: 42px;
    height: 42px;
    background: #ddd;
    border-radius: 50%;
    border: 2px solid #2A2D35;
    &:not(:first-child) {
      margin-left: -21px;
    }
  }
}
</style>
