<template>
  <div class="meeting-room">
    <header class="meeting-header">
      <h2>{{ meeting.title }}</h2>
    </header>
    <main class="meeting-room__inner">
      <!-- <MeetingEmpty></MeetingEmpty> -->
      <MeetingStarted @joinClick="onJoinClick" :members="meeting.connectedMembers"></MeetingStarted>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IMeetingData } from '~/interfaces/meeting';
import MeetingEmpty from './MeetingEmpty.vue';
import MeetingStarted from './MeetingStarted.vue';

@Component({
  components: {
    MeetingEmpty,
    MeetingStarted
  }
})
export default class MeetingRoom extends Vue {
  @Prop({ type: Object }) meeting!: IMeetingData;

  mounted() {
    console.log(this.meeting);
  }

  onJoinClick() {
    this.$emit('joinClick');
  }

}
</script>

<style lang="scss" scoped>
.meeting-room {
  width: 75%;
}

.meeting-room__inner {
  height: calc(100% - 72px);
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
