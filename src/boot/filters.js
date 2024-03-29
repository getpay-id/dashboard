import { boot } from "quasar/wrappers";
import moment from "moment-timezone";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // You can create filters here, I recommend using the '$' prefix before the function name.
  app.config.globalProperties.$formatDate = function (dateString) {
    if (dateString) {
      if (!dateString.includes("+")) {
        dateString = dateString + "+00:00";
      }
      const date = new Date(dateString);
      return moment(date).tz("Asia/Jakarta").format("DD/MM/YYYY, h:mm a");
    }
  };
});
