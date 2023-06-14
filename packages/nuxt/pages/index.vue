<template>
  <div id="index-page">
    <form action="#" class="login-form" @submit.prevent="onFormSubmit">
      <h1 class="form__title">
        Welcome to LetConf!
      </h1>
      <InputText
        id="username"
        v-model="login"
        label="Username"
      />
      <InputText
        id="password"
        v-model="password"
        label="Password"
        type="password"
        margin-bottom="48px"
      />
      <ButtonComponent>Sign in</ButtonComponent>
    </form>
    <div class="graphics">
      <img class="graphics__waved-block" src="@/assets/graphics/login/waved-block.svg">
      <img
        src="@/assets/graphics/login/illustration-meeting.svg"
        class="graphics__illustration-meeting"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { auth } from '~/api';

import ButtonComponent from '~/components/ButtonComponent.vue';
import InputText from '~/components/InputText.vue';

@Component({
  components: {
    InputText,
    ButtonComponent,
  },
})
export default class IndexPage extends Vue {
  resizing = true;
  login: string = '';
  password: string = '';

  beforeMount() {
    this.resizing = false;
    if (window?.appBridge) {
      window?.appBridge?.allowResizing(this.resizing);
    }
  }

  async onFormSubmit() {
    try {
      await auth.login(this.login, this.password);
      this.$router.replace('/meetings')
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
#index-page {
  position: relative;
  height: 100%;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  height: 100%;
  margin-left: 36px;
}

.graphics__waved-block {
  position: absolute;
  top: 0;
  right: 0;
}

.graphics__illustration-meeting {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 32px;
}

.login-form {
  .form__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 36px;
  }
}
</style>
