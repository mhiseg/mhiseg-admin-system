import { getAsyncLifecycle, registerBreadcrumbs } from "@openmrs/esm-framework";

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
      path: `${window.spaBase}/settings`,
      title: "admin-system", 
      parent: `${window.spaBase}/home`,
    }
  ]);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root.component"), options),
        route: "settings",
        privilege: "App: system.management"
      },
      {
        load: getAsyncLifecycle(() => import("./components/user-profile/user-profile"), options),
        route: "profile",
      },
    ],
     extensions: [
      {
         id: "system-administration-link",
         slot: "app-menu-slot",
         load: getAsyncLifecycle(
           () => import("./refapp-links/refapp-links"),
           options
         ),
         privilege: "App: system.management",
       }
     ],
  };
}

export { importTranslation, setupOpenMRS };