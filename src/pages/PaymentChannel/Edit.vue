<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Payment Channel</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-form @submit.prevent="updatePaymentChannel">
        <q-card-section class="q-gutter-sm">
          <div class="column justify-center items-center">
            <q-img
              :src="baseUrl + data.img"
              fit="contain"
              width="250px"
              height="250px"
            />
            <q-btn
              outline
              icon="file_upload"
              label="Select File"
              size="sm"
              @click="showMediaDialog"
            ></q-btn>
          </div>
          <div class="q-mb-md">
            <div class="q-mb-md">Channel Name</div>
            <q-input v-model="data.name" outlined :dense="dense"></q-input>
          </div>
          <div class="q-mb-md">
            <div>Status</div>
            <q-toggle
              v-model="data.status"
              :true-value="1"
              :false-value="0"
              color="green"
              checked-icon="check"
              unchecked-icon="visibility_off"
              keep-color
              size="sm"
            />
            <q-chip>{{ data.status == 1 ? "Active" : "Inactive" }}</q-chip>
          </div>
          <div class="q-mb-md">
            <div class="q-mb-md">Unique Code</div>
            <q-input
              v-model="data.unique_code"
              outlined
              readonly
              :dense="dense"
            ></q-input>
          </div>
          <div class="q-mb-md">
            <div class="q-mb-md">Fixed Fee</div>
            <q-input
              v-model="data.fee"
              outlined
              type="number"
              :dense="dense"
            ></q-input>
          </div>
          <div class="q-mb-md">
            <div class="q-mb-md">Percent Fee</div>
            <q-input
              v-model="data.fee_percent"
              outlined
              type="number"
              step="0.1"
              :dense="dense"
            ></q-input>
          </div>
          <div class="q-mb-md">
            <div class="q-mb-md">Minimum Amount</div>
            <q-input
              v-model="data.min_amount"
              outlined
              type="number"
              :dense="dense"
            ></q-input>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat size="sm" @click="$router.go(-1)">Cancel</q-btn>
          <q-btn color="primary" size="sm" type="submit">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-dialog v-model="mediaDialog" persistent full-width>
      <q-card>
        <q-card-section horizontal>
          <div class="text-h6 q-pa-sm">Media</div>
          <q-space />
          <q-btn
            flat
            icon="close"
            size="sm"
            @click="mediaDialog = false"
          ></q-btn>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-table
            grid
            hide-header
            hide-no-data
            :rows="mediaRows"
            :columns="mediaColumns"
            :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:item="props">
              <div class="q-ma-md">
                <q-card @click="markMedia(props.row)">
                  <div class="flex justify-center q-pa-xs">
                    <q-img
                      :src="baseUrl + props.row.file"
                      :width="$q.screen.lt.sm ? '110px' : '100px'"
                      height="100px"
                      fit="contain"
                    />
                    <q-badge
                      v-if="selectedRow && selectedRow.id == props.row.id"
                      rounded
                      color="green-7"
                      class="absolute"
                      style="top: 0; right: -10px; transform: translateY(-50%)"
                    >
                      <q-icon name="check"></q-icon>
                    </q-badge>
                  </div>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions class="justify-between">
          <q-btn
            color="primary"
            size="sm"
            outline
            @click="newUpload"
            icon="file_upload"
            >New Upload</q-btn
          >
          <q-btn
            v-if="selectedRow"
            color="primary"
            size="sm"
            outline
            @click="selectMedia"
            >Select</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { usePaymentStore } from "src/stores/payment";
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "PaymentChannelEdit",
  preFetch({ currentRoute }) {
    const pc_id = currentRoute.params.id;
    const paymentStore = usePaymentStore();
    const authStore = useAuthStore();
    return authStore.axios
      .get(`/payment/channel/${pc_id}`)
      .then((res) => {
        paymentStore.setPaymentChannelObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { paymentChannelObject } = storeToRefs(usePaymentStore());
    const { baseUrl } = useAuthStore();
    return {
      dense: true,
      mediaDialog: ref(false),
      baseUrl,
      selectedRow: ref(null),
      mediaRows: ref([]),
      mediaColumns: [
        {
          name: "file",
          // label: "File",
          align: "center",
          field: "file",
        },
      ],
      data: paymentChannelObject,
    };
  },
  methods: {
    newUpload() {
      console.log("newUpload, belum...");
    },
    selectMedia() {
      console.log("selectMedia", this.selectedRow);
      this.data.img = this.selectedRow.file;
      this.selectedRow = null;
      this.mediaDialog = false;
    },
    markMedia(row) {
      for (var i = 0; i < this.mediaRows.length; i++) {
        const r = this.mediaRows[i];
        if (r.id != row.id) {
          r.selected = false;
        }
      }
      if (row.selected) {
        this.selectedRow = null;
        row.selected = false;
      } else {
        this.selectedRow = row;
        row.selected = true;
      }
    },
    showMediaDialog() {
      const authStore = useAuthStore();
      // TODO: add pagination
      authStore.axios
        .get("/media/", {
          params: {
            page: 1,
            size: 100,
          },
        })
        .then((res) => {
          const data = res.data.data.map((item) => {
            return {
              ...item,
              selected: false,
            };
          });
          this.mediaRows = data;
          this.mediaDialog = true;
        });
    },
    updatePaymentChannel() {
      const payload = {
        name: this.data.name,
        status: this.data.status,
        fee: this.data.fee,
        fee_percent: parseFloat(this.data.fee_percent),
        min_amount: this.data.min_amount,
        img: this.data.img,
      };
      const authStore = useAuthStore();
      authStore.axios
        .put(`/payment/channel/${this.data.id}`, payload)
        .then((res) => {
          this.$q.notify({
            message: "Payment Channel Updated",
            color: "positive",
          });
        })
        .catch((err) => {
          this.$q.notify({
            message: err.response.data.detail,
            color: "negative",
          });
        });
    },
  },
});
</script>
