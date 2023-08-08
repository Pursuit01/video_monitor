import type { App } from "vue";
import { registerStore } from "../store";
import zrComponent from "zr-component";

const zrComponentsOptions = {
  isImportElementPlus: false,
  elConfig: {
      zIndex: 3333,
  },
};
export default {
  install(app: App, { pinia }) {
    // console.log(123, app);
    registerStore(pinia);
    app.use(zrComponent, zrComponentsOptions)
  },
};
