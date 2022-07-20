<template>
  <q-page padding class="flex justify-center items-center bg-primary">
    <!-- content -->
    <q-card style="width: 380px" class="q-pa-md">
      <q-form @submit.prevent="signIn">
        <q-input
          filled
          v-model="url"
          label="URL"
          type="url"
          class="q-mt-md q-mb-lg"
          placeholder="https://api.getpay.id/v1"
          required
        >
          <template v-slot:prepend>
            <q-icon name="link" />
          </template>
        </q-input>
        <q-input
          filled
          v-model="username"
          label="Email"
          type="email"
          class="q-mt-md"
          :rules="[
            $rules.required('Email is required'),
            $rules.email('Invalid email'),
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          filled
          v-model="password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
          class="q-mt-md"
          :rules="[
            $rules.required('Password is required'),
            $rules.minLength(8, 'Minimum password length is 8'),
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          color="primary"
          type="submit"
          label="sign in"
          style="width: 100%"
          class="q-mt-md"
        ></q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";

export default {
  // name: 'PageName',
  setup() {
    const authStore = useAuthStore();
    return {
      username: ref(null),
      password: ref(null),
      url: ref(authStore.apiUrl || null),
      isPwd: ref(true),
      store: authStore,
    };
  },
  methods: {
    async signIn() {
      this.store.setApiUrl(this.url);
      const { status, data } = await this.store.signIn(
        this.username,
        this.password
      );
      console.log(status, data);
      if (status === 200) {
        await this.$router.push("/");
      } else {
        setTimeout(() => {
          this.$q.notify({
            progress: true,
            message: data.detail,
            color: "negative",
          });
        }, 2000);
      }
    },
  },
};
</script>
