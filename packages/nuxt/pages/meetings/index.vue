<template>
  <MeetingList
    v-model="meetings"
    :active-id="activeId"
    @pickMeeting="onMeetingPick"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { meetings } from '~/api';
import MeetingList from '~/components/Meetings/MeetingsList.vue';

@Component({
  layout: 'default-sidebar',
  components: {
    MeetingList,
  },
})
export default class MeetingsPage extends Vue {
  activeId = '';
  meetings = [];

  async mounted () {
    const { data } = await meetings.getMeetings();
    this.meetings = data;
  }

  onMeetingPick(id: string) {
    this.activeId = id;
  }
}
</script>
