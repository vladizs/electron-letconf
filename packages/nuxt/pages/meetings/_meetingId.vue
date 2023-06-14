<template>
  <div class="meeting">
    <MeetingList
      v-model="meetings"
      :active-id="activeId"
    />
    <MeetingRoom
      @joinClick="onJoinClick"
      v-if="selectedMeeting && !joinedRoom"
      :meeting="selectedMeeting"
    />
    <div v-show="joinedRoom" ref="videoGrid"></div>
  </div>
</template>

<style lang="scss">
video {
  width: 300px;
}
</style>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator';
import { meetings } from '~/api';
// import {createPeerConnectionContext} from '~/api/sockets';
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
  meetings = [];
  selectedMeeting: any = null;
  peerConnection: any = null;
  joinedRoom = false;
  myVideoStream!: any;

  @Ref('videoGrid') videoGrid!: any;

  async mounted () {
    const meetingsList = await meetings.getMeetings();
    const meetingData = await meetings.getMeetingById(this.activeId);
    this.meetings = meetingsList.data;
    this.selectedMeeting = meetingData.data;

    const { createPeerConnectionContext } = require('~/api/sockets');
    this.peerConnection = createPeerConnectionContext();
    this.peerConnection.onAddUser
  }

  async onJoinClick() {
    await this.peerConnection.joinRoom(this.activeId);
    this.peerConnection.onAddUser((user: any) => {
      const userVideo = document.createElement('video');
      this.peerConnection.addPeerConnection(`${user}`, this.myVideoStream, (_stream: any) => {
        this.addVideoStream(userVideo, _stream)
      });
      this.peerConnection.callUser(user);
    });
    const myVideo = document.createElement("video");
    myVideo.classList.add('video');
    myVideo.muted = true;
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
        this.joinedRoom = true;
        this.myVideoStream = stream;
        this.addVideoStream(myVideo, stream);
    });
  }

  addVideoStream(video: any, stream: any) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
        this.videoGrid.append(video);
    });
  };



}
</script>

<style lang="scss" scoped>
.meeting {
  display: flex;
  height: 100%;
}
</style>
