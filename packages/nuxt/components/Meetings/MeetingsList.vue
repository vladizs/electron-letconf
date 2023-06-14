<template>
  <div class="meeting-list">
    <h1 class="block-title">
      Scheduled meetings
    </h1>
    <div
      v-for="meeting in meetings"
      :key="meeting.uuid"
      class="meeting"
      :class="{active: meeting.uuid === activeId}"
      @click="openMeetingRoom(meeting.uuid)"
    >
      <h3 class="title">
        {{ meeting.title }}
      </h3>
      <span v-if="meeting.description" class="description">
        {{ meeting.description }}
      </span>
      <span class="date">ongoing</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, VModel, Vue,
} from 'nuxt-property-decorator';

interface IMeeting {
  uuid: string;
  title: string;
  description: string;
  date: Date;
}

@Component
export default class MeetingList extends Vue {
  @Prop({ type: String }) activeId?: string;

  @VModel({ type: Array }) meetings!: IMeeting[];

  openMeetingRoom(id: string) {
    this.$router.push(`/meetings/${id}`);
    this.$emit('pickMeeting', id);
  }
}
</script>

<style lang="scss" scoped>
.meeting-list {
  width: 300px;
  height: 100%;
  background: #24262C;
  border-right: 2px solid #3B3E47;
}

.meeting {
  cursor: pointer;
  position: relative;
  height: 80px;
  padding: 8px 8px 8px 12px;

  &.active {
    background: rgba(72, 128, 243, 0.08);
  }

  h3.title {
    font-weight: 500;
    font-size: 18px;
  }

  span.description {
    margin-top: 4px;
    font-size: 14px;
    color: #6F7EA3;
  }

  span.date {
    position: absolute;
    font-size: 14px;
    bottom: 8px;
    right: 8px;
  }
}

h1.block-title {
  font-size: 21px;
  font-weight: 600;
  padding: 18px 8px 24px 12px
}
</style>
