<template>
  <q-page class="q-pa-md">
    <q-table title="Payment Method" :rows="rows" :columns="columns">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <q-chip color="primary" text-color="white">{{
              props.row.name
            }}</q-chip>
          </q-td>
          <q-td key="status" :props="props">
            <q-toggle
              v-model="props.row.status"
              :true-value="1"
              :false-value="0"
              color="green"
              checked-icon="check"
              unchecked-icon="visibility_off"
              keep-color
              @click="onToggle(props.row)"
            />
          </q-td>
          <q-td key="code" :props="props">
            <q-chip>{{ props.row.code }}</q-chip>
          </q-td>
          <q-td key="date_created" :props="props">
            {{ $formatDate(props.row.date_created) }}
          </q-td>
          <q-td key="date_updated" :props="props">
            {{ $formatDate(props.row.date_updated) }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              label="Manage"
              outline
              color="primary"
              @click="manage(props.row)"
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
import { usePaymentStore } from "src/stores/payment";

export default defineComponent({
  name: "PaymentMethod",
  preFetch({ currentRoute }) {
    const authStore = useAuthStore();
    const paymentStore = usePaymentStore();
    return authStore.axios
      .get("/payment/method/", {
        params: { pg_id: currentRoute.params.id },
      })
      .then((res) => {
        paymentStore.setPaymentMethods(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { paymentMethods } = storeToRefs(usePaymentStore());
    return {
      rows: paymentMethods,
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "left",
        },
        {
          name: "code",
          label: "Code",
          field: "code",
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
    onToggle(row) {
      const authStore = useAuthStore();
      authStore.axios
        .put(`/payment/method/${row.id}`, {
          status: row.status,
        })
        .then((res) => {
          const { date_updated } = res.data;
          row.date_updated = date_updated;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    manage(row) {
      console.log("manage", row);
    },
  },
});
</script>
