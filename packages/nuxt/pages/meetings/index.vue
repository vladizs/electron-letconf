<template>
  <MeetingList
    v-model="meetings"
    :active-id="activeId"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import MeetingList from '~/components/Meetings/MeetingsList.vue';

@Component({
  layout: 'default-sidebar',
  components: {
    MeetingList,
  },
})
export default class MeetingsPage extends Vue {
  activeId = '60faec4e2a438d';
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
}
</script>
