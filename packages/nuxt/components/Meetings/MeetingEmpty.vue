<template>
  <div class="meeting-empty">
    <h3>Meeting is not started yet</h3>
    <span>Waiting for the organizer</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class MeetingEmpty extends Vue {

}
</script>

<style lang="scss" scoped>
.meeting-empty {
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
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 12px;
}

span {
  text-transform: uppercase;
  color: #5973AA;
}
</style>
