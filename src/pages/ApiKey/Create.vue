<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Details</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-form @submit.prevent="createApiKey">
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
          <div class="row">
            <div class="col q-mr-md">
              <q-input
                outlined
                v-model="duration"
                :dense="dense"
                label="Duration"
                placeholder="22"
                type="number"
                :disable="isUnlimited"
                :rules="[
                  $rules.required('Duration is required'),
                  $rules.minValue(1, 'Duration must be greater than 0'),
                ]"
              />
            </div>
            <div class="col">
              <q-select
                outlined
                :dense="dense"
                v-model="duration_type"
                :options="durationTypes"
                label="Duration Type"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat size="sm" @click="$router.push({ name: 'apiKey' })"
            >Cancel</q-btn
          >
          <q-btn color="primary" size="sm" type="submit">Create</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">API Key</div>
          <div class="text-subtitle text-italic">
            Note: The API Key below can only be viewed once, so copy it and save
            it carefully.
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-input
            v-model="lastApiKey"
            :dense="dense"
            readonly
            label="API Key"
            autogrow
          >
            <template v-slot:append>
              <q-btn
                flat
                icon="content_copy"
                size="sm"
                @click="saveApiKeyToClipboard"
              ></q-btn>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            class="full-width"
            color="primary"
            size="sm"
            outline
            @click="showDialog = false"
            >Close</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { useApiKeyStore } from "src/stores/apikey";
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref } from "vue";
import { copyToClipboard } from "quasar";

export default defineComponent({
  name: "ApiKeyCreate",
  setup() {
    return {
      dense: true,
      showDialog: ref(false),
      lastApiKey: ref(null),
      name: ref(""),
      description: ref(""),
      duration: ref(0),
      duration_type: ref("unlimited"),
      durationTypes: ["unlimited", "minutes", "hours", "months", "years"],
    };
  },
  computed: {
    isUnlimited() {
      return this.duration_type === "unlimited";
    },
  },
  methods: {
    createApiKey() {
      var duration = this.duration;
      if (this.isUnlimited) {
        duration = 0;
      }
      const payload = {
        name: this.name,
        description: this.description,
        expiration_time: duration,
        expiration_type: this.duration_type,
      };
      const authStore = useAuthStore();
      const apiKeyStore = useApiKeyStore();
      authStore.axios.post("/apikey/", payload).then((res) => {
        const { api_key, ...data } = res.data;
        apiKeyStore.setApiKeys(data);
        this.lastApiKey = api_key;
        this.showDialog = true;
      });
    },
    saveApiKeyToClipboard() {
      copyToClipboard(this.lastApiKey);
      this.$q.notify({
        message: "API Key copied",
        color: "positive",
      });
    },
  },
});
</script>
