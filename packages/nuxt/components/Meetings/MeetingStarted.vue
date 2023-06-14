<template>
  <div class="meeting-started">
    <h3>{{ titleString }}</h3>
    <div class="circles">
      <div class="circle" v-for="member in circlesCount" :key="member"></div>
    </div>
    <button @click="onJoinClick" class="join-btn">Join</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

interface IMember {
  name: string;
  avatar: string;
}

@Component
export default class MeetingStarted extends Vue {

  @Prop({ type: Array }) members!: IMember[];

  get circlesCount() {
    return this.members.length < 3 ? this.members.length : 3;
  }

  get titleString() {
    const c = this.members.length;
    switch(c) {
      case 0:
        return 'No one is connected'
      case 1:
        return `${this.members[0].name} is in room`;
      case 2:
        return `${this.members[0].name} and ${this.members[1].name} are in room`
      default:
        return `${this.members[0].name}, ${this.members[1].name} & ${c-2} more people are in room`;
    }
  }

  onJoinClick() {
    this.$emit('joinClick');
  }
}
</script>

<style lang="scss" scoped>
.meeting-started {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}
h3 {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
}

.circles {
  display: flex;
}
.circle {
  height: 180px;
  width: 180px;
  border: 8px solid #2A2D35;
  border-radius: 50%;
  background: #ddd;

  &:not(:first-child) {
    margin-left: -110px;
  }
}

.join-btn {
  width: 180px;
  height: 48px;
  font-size: 20px;
  font-weight: 600;
  background: #3070F3;
  color: #fff;
  border: none;
  border-radius: 8px;
  margin-top: 60px;
  cursor: pointer;
}

span {
  text-transform: uppercase;
  color: #5973AA;
}
</style>
