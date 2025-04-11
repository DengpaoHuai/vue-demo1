import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import Lara from "@primeuix/themes/lara";
import { definePreset } from "@primeuix/themes";
import { Button } from "primevue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import LogoutLayout from "./components/layouts/LogoutLayout.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{fuchsia.50}",
      100: "{fuchsia.100}",
      200: "{fuchsia.200}",
      300: "{fuchsia.300}",
      400: "{fuchsia.400}",
      500: "{fuchsia.500}",
      600: "{fuchsia.600}",
      700: "{fuchsia.700}",
      800: "{fuchsia.800}",
      900: "{fuchsia.900}",
      950: "{fuchsia.950}",
    },
  },
});

//overrie default theme with blue
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.use(router);
app.use(pinia);

app.component("Button", Button);

app.component("DefaultLayout", DefaultLayout);
app.component("LogoutLayout", LogoutLayout);

app.mount("#app");
