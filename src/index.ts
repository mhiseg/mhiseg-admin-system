import { getAsyncLifecycle, defineConfigSchema, registerBreadcrumbs } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  const moduleName = "@mhiseg/esm-admin-system-app";

  const options = {
    featureName: "admin-system",
    moduleName,
  };
  registerBreadcrumbs([
    {
      path: `${window.spaBase}/admin`,
      title: "admin-system",
      parent: `${window.spaBase}/admin-system`,
    }
  ]);

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

export { importTranslation, setupOpenMRS };
