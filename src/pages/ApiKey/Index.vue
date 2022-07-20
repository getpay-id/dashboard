<template>
  <q-page class="q-pa-md">
    <q-table title="API Keys" :rows="rows" :columns="columns">
      <template v-slot:top>
        <div class="col-2 q-table__title">API Keys</div>
        <q-space />
        <q-btn
          color="primary"
          rounded
          label="Create New"
          size="sm"
          @click="$router.push({ name: 'apiKeyCreate' })"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <q-chip color="primary" text-color="white">{{
              props.row.name
            }}</q-chip>
          </q-td>
          <q-td key="description" :props="props">
            <q-chip>{{ props.row.description }}</q-chip>
          </q-td>
          <q-td key="duration" :props="props">
            <q-chip color="green" text-color="white">
              <q-avatar
                v-if="props.row.expiration_type !== 'unlimited'"
                color="white"
                text-color="black"
                size="sm"
              >
                {{ props.row.expiration_time }}
              </q-avatar>
              {{ props.row.expiration_type }}
            </q-chip>
          </q-td>
          <q-td key="expires_on" :props="props">
            {{ $formatDate(props.row.expires_on) }}
          </q-td>
          <q-td key="date_created" :props="props">
            {{ $formatDate(props.row.date_created) }}
          </q-td>
          <q-td key="date_updated" :props="props">
            {{ $formatDate(props.row.date_updated) }}
          </q-td>
          <q-td key="actions" :props="props" class="q-gutter-sm">
            <q-btn
              label="Edit"
              outline
              color="primary"
              icon="edit"
              @click="edit(props.row)"
              size="sm"
            />
            <q-btn
              label="Remove"
              outline
              color="red"
              icon="delete"
              @click="remove(props.row)"
              size="sm"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth";
import { useApiKeyStore } from "src/stores/apikey";

export default defineComponent({
  name: "ApiKey",
  preFetch() {
    const authStore = useAuthStore();
    const apiKeyStore = useApiKeyStore();
    return authStore.axios
      .get("/apikey/")
      .then((res) => {
        apiKeyStore.setApiKeys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { apikeys } = storeToRefs(useApiKeyStore());
    return {
      rows: apikeys,
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
        },
        {
          name: "description",
          label: "Description",
          field: "description",
          align: "left",
        },
        {
          name: "duration",
          label: "Duration",
          field: "duration",
          align: "left",
        },
        {
          name: "expires_on",
          label: "Expires On",
          field: "expires_on",
          align: "left",
        },
        {
          name: "date_created",
          label: "Date Created",
          field: "date_created",
          align: "left",
        },
        {
          name: "date_updated",
          label: "Date Updated",
          field: "date_updated",
          align: "left",
        },
        {
          name: "actions",
          field: "actions",
          label: "Actions",
          align: "left",
        },
      ],
    };
  },
  methods: {
    edit(row) {
      console.log("edit", row);
    },
    remove(row) {
      this.$q
        .dialog({
          title: "Delete API Key",
          message: "Are you sure you want to delete this API Key?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log("delete", row);
          const authStore = useAuthStore();
          authStore.axios
            .delete(`/apikey/${row.id}`)
            .then((res) => {
              if (res.data.success) {
                this.rows = this.rows.filter((r) => r.id !== row.id);
                this.$q.notify({
                  color: "positive",
                  message: "API Key Removed",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$q.notify({
                color: "negative",
                text: "API Key Could Not Be Removed",
              });
            });
        })
        .onCancel(() => {
          console.log("cancel");
        });
    },
  },
});
</script>
