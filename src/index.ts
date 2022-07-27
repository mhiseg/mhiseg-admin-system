import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  const moduleName = "@mhiseg/esm-admin-app";

  const options = {
    featureName: "admin-system",
    moduleName,
  };


  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root.component"), options),
        route: "admin/admin-system",
        //privilege: "App: death.management"
      },
    ]
  };
}

export {importTranslation, setupOpenMRS };
