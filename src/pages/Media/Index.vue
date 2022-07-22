<template>
  <q-page class="q-pa-md">
    <q-table :rows="rows" :columns="columns">
      <template v-slot:top>
        <div class="col-2 q-table__title">Media</div>
        <q-space />
        <q-btn
          color="primary"
          rounded
          label="Upload"
          size="sm"
          @click="uploadDialog = true"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="file" :props="props">
            <q-img :src="baseUrl + props.row.file" width="100" height="100" />
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
    <q-dialog v-model="uploadDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Upload File</div>
          <div class="text-subtitle">Upload or Drag & Drop your file here</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-uploader
            label="Select File"
            :url="baseUrl + '/v1/media/'"
            field-name="file"
            accept=".jpg, .jpeg, .png, .webp"
            max-file-size="7000000"
            max-files="1"
            :headers="[
              { name: 'Authorization', value: 'Bearer ' + accessToken },
            ]"
            @rejected="fileRejected"
            @uploaded="fileUploaded"
            @failed="uploadFailed"
          ></q-uploader>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            size="sm"
            outline
            @click="uploadDialog = false"
            >Close</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit File</div>
          <div class="text-subtitle">Upload or Drag & Drop your file here</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-img :src="baseUrl + row.file" width="100" height="100" />
          <q-uploader
            ref="editUploader"
            label="Select File"
            :url="baseUrl + `/v1/media/${row.id}`"
            field-name="file"
            accept=".jpg, .jpeg, .png, .webp"
            max-file-size="7000000"
            max-files="1"
            :headers="[
              { name: 'Authorization', value: 'Bearer ' + accessToken },
            ]"
            @rejected="fileRejected"
            @uploaded="fileUpdated"
            @failed="uploadFailed"
          ></q-uploader>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            size="sm"
            outline
            @click="editDialog = false"
            >Close</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth";
import { useMediaStore } from "src/stores/media";

export default defineComponent({
  name: "MediaPage",
  preFetch() {
    const authStore = useAuthStore();
    const mediaStore = useMediaStore();
    return authStore.axios
      .get("/media/")
      .then((res) => {
        mediaStore.setMedia(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setup() {
    const { baseUrl, accessToken } = useAuthStore();
    const { media, currentRow } = storeToRefs(useMediaStore());
    return {
      baseUrl,
      accessToken,
      row: currentRow,
      uploadDialog: ref(false),
      editDialog: ref(false),
      rows: media,
      columns: [
        {
          name: "file",
          label: "File",
          field: "file",
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
    fileRejected(e) {
      this.$q.notify({
        color: "warning",
        message:
          "Files rejected. Our server only supports files (.jpg, .png and .webp) and the maximum file size is 7MB",
      });
    },
    fileUploaded(i) {
      const { xhr } = i;
      const { color, message } = this._getDefaultMessage(
        xhr,
        "File uploaded successfully"
      );
      if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);
        this.rows.unshift(data);
      }
      this.$q.notify({
        color: color,
        message: message,
      });
    },
    fileUpdated(i) {
      const { xhr } = i;
      const { color, message } = this._getDefaultMessage(
        xhr,
        "File updated successfully"
      );
      if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);
        let file_id = (Math.random() + 1).toString(36).substring(7);
        data["file"] = data.file + "?id=" + file_id;
        this.rows = this.rows.map((row) => {
          if (row.id == data.id) {
            return data;
          }
          return row;
        });
      }
      this.$q.notify({
        color: color,
        message: message,
      });
    },
    uploadFailed(i) {
      const { xhr } = i;
      const { color, message } = this._getDefaultMessage(
        xhr,
        "Oops! There is something wrong with your server"
      );
      this.$q.notify({
        color: color,
        message: message,
      });
    },
    _getDefaultMessage(xhr, message) {
      var color = "positive";
      const { detail } = JSON.parse(xhr.responseText);
      if (xhr.status == 400 && detail == "Token has expired") {
        message = "Needs Re-Authentication";
        color = "negative";
        const authStore = useAuthStore();
        setTimeout(() => {
          authStore.logout();
        }, 1500);
      }
      return { color, message };
    },
    remove(row) {
      this.$q
        .dialog({
          title: "Delete Media",
          message: "Are you sure you want to delete this media?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          const authStore = useAuthStore();
          authStore.axios
            .delete(`/media/${row.id}`)
            .then((res) => {
              if (res.data.success) {
                this.rows = this.rows.filter((r) => r.id !== row.id);
                this.$q.notify({
                  color: color,
                  message: "File Removed",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$q.notify({
                color: "negative",
                text: "Failed to remove file",
              });
            });
        });
    },
    edit(row) {
      const mediaStore = useMediaStore();
      mediaStore.setCurrentRow(row);
      this.editDialog = true;
    },
  },
});
</script>
