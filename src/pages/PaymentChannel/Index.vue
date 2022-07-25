<template>
  <q-page class="q-pa-md">
    <q-table :rows="rows" :columns="columns">
      <template v-slot:top>
        <div class="col-2 q-table__title">Payment Channel</div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="img" :props="props">
            <q-img :src="baseUrl + props.row.img" />
          </q-td>
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
              disable
            />
          </q-td>
          <q-td key="unique_code" :props="props">
            <q-chip :ripple="false">{{ props.row.unique_code }}</q-chip>
          </q-td>
          <q-td key="fee" :props="props">
            <q-chip :ripple="false">
              {{ props.row.fee }}
            </q-chip>
          </q-td>
          <q-td key="fee_percent" :props="props">
            <q-chip :ripple="false">
              {{ props.row.fee_percent }}
            </q-chip>
          </q-td>
          <q-td key="min_amount" :props="props">
            <q-chip :ripple="false">{{ props.row.min_amount }}</q-chip>
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
  name: "PaymentChannel",
  preFetch({ currentRoute }) {
    const authStore = useAuthStore();
    const paymentStore = usePaymentStore();
    return authStore.axios
      .get("/payment/channel/", {
        params: { pm_id: currentRoute.params.pm_id },
      })
      .then((res) => {
        paymentStore.setPaymentChannels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { baseUrl } = useAuthStore();
    const { paymentChannels } = storeToRefs(usePaymentStore());
    return {
      baseUrl,
      rows: paymentChannels,
      columns: [
        {
          name: "img",
          label: "Image",
          field: "img",
          align: "left",
        },
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
          name: "unique_code",
          label: "Unique Code",
          field: "unique_code",
          align: "left",
        },
        {
          name: "fee",
          label: "Fixed Fee",
          field: "fee",
          align: "left",
        },
        {
          name: "fee_percent",
          label: "Percent Fee",
          field: "fee_percent",
          align: "left",
        },
        {
          name: "min_amount",
          label: "Min Amount",
          field: "min_amount",
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
      const params = {
        pm_id: this.$route.params.pm_id,
        id: row.id,
      };
      this.$router.push({ name: "paymentChannelEdit", params });
    },
  },
});
</script>
