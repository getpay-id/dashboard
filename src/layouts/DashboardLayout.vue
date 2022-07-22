<template>
  <q-layout view="hHh lpR fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          v-if="!$q.platform.is.desktop"
          flat
          round
          dense
          icon="menu"
          @click="drawer = true"
        />
        <q-toolbar-title> Getpay </q-toolbar-title>
        <q-btn
          label="Log Out"
          color="red"
          rounded
          size="sm"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="$q.platform.is.desktop ? miniState : false"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      :width="230"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable @click="$router.push('/')">
            <q-item-section avatar>
              <q-icon color="primary" name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <q-item clickable @click="$router.push({ name: 'paymentGateway' })">
            <q-item-section avatar>
              <q-icon color="primary" name="account_balance" />
            </q-item-section>
            <q-item-section>Payment Gateway</q-item-section>
          </q-item>
          <q-item clickable @click="$router.push({ name: 'apiKey' })">
            <q-item-section avatar>
              <q-icon color="primary" name="key" />
            </q-item-section>
            <q-item-section>API Keys</q-item-section>
          </q-item>
          <q-item clickable @click="$router.push({ name: 'media' })">
            <q-item-section avatar>
              <q-icon color="primary" name="web_asset" />
            </q-item-section>
            <q-item-section>Media</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";

export default defineComponent({
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
  methods: {
    onMouseOver() {
      if (this.$q.platform.is.desktop) {
        this.miniState = false;
      }
    },
    onMouseOut() {
      if (this.$q.platform.is.desktop) {
        this.miniState = true;
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
});
</script>
