<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit API Key</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-form @submit.prevent="updateApiKey">
        <q-card-section class="q-gutter-md">
          <q-input
            outlined
            v-model="name"
            :dense="dense"
            label="Name"
            placeholder="Mamang April"
            required
          />
          <q-input
            outlined
            v-model="description"
            :dense="dense"
            label="Description"
            placeholder="Punya Mamang April"
            required
          />
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat size="sm" @click="$router.push({ name: 'apiKey' })"
            >Cancel</q-btn
          >
          <q-btn color="primary" size="sm" type="submit">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
import { useApiKeyStore } from "src/stores/apikey";
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ApiKeyEdit",
  preFetch({ currentRoute }) {
    const apiKeyId = currentRoute.params.id;
    const apiKeytore = useApiKeyStore();
    const authStore = useAuthStore();
    return authStore.axios
      .get(`/apikey/${apiKeyId}`)
      .then((res) => {
        apiKeytore.setCurrentRow(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { currentRow } = useApiKeyStore();
    return {
      dense: true,
      name: ref(currentRow.name),
      description: ref(currentRow.description),
    };
  },
  computed: {
    isUnlimited() {
      return this.duration_type === "unlimited";
    },
  },
  methods: {
    updateApiKey() {
      const payload = {
        name: this.name,
        description: this.description,
      };
      const authStore = useAuthStore();
      const apiKeyStore = useApiKeyStore();
      authStore.axios
        .put(`/apikey/${apiKeyStore.currentRow.id}`, payload)
        .then((res) => {
          this.$q.notify({
            message: "API Key updated",
            color: "positive",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>
