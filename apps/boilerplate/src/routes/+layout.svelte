<script lang="ts">
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import "../app.css";
import { appConfig } from "@world-history-map/app-config";
import { Header } from "@world-history-map/ui";
</script>

<Header title={appConfig.name} />
<slot />
