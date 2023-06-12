<template>
  <div class="meeting">
    <MeetingList
      v-model="meetings"
      :active-id="activeId"
    />
    <MeetingRoom
      :meeting="selectedMeeting"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import MeetingRoom from '~/components/Meetings/MeetingRoom.vue';
import MeetingList from '~/components/Meetings/MeetingsList.vue';

@Component({
  layout: 'default-sidebar',
  components: {
    MeetingList,
    MeetingRoom
  },
})
export default class MeetingsPage extends Vue {
  activeId = this.$route.params.meetingId;
  meetings = [
    {
      id: '60faea8c8f438d',
      title: 'Daily meeting #1',
      description: 'invited by Ivan H.',
      date: new Date('11.06.2023, 20:00'),
    },
    {
      id: '60faec4e2a438d',
      title: 'Planning',
      description: 'invited by Temirlan A.',
      date: new Date('13.06.2023, 10:00'),
    },
  ];

  selectedMeeting = {
    title: 'Daily Meeting #1'
  }
}
</script>

<style lang="scss" scoped>
.meeting {
  display: flex;
  height: 100%;
}
</style>
