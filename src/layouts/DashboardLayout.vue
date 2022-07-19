<template>
  <q-layout view="hHh Lpr fFf">
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
        <q-btn label="Log Out" color="red-6" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="$q.platform.is.desktop ? miniState : false"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple @click="$router.push('/dashboard')">
            <q-item-section avatar>
              <q-icon color="primary" name="dashboard" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

    <!-- <q-footer v-if="$q.platform.is.mobile">
      <q-tabs v-model="tab" dense class="bg-primary">
        <q-tab name="dashboard" icon="dashboard" label="Home" />
        <q-tab name="dashboard" icon="dashboard" label="Home" />
        <q-tab name="dashboard" icon="dashboard" label="Home" />
        <q-tab name="dashboard" icon="dashboard" label="Home" />
        <q-tab name="dashboard" icon="dashboard" label="Home" />
      </q-tabs>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  // name: 'LayoutName',

  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
      tab: ref("dashboard"),
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
  },
};
</script>
