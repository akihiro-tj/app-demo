<script>
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import "../../app.css";
import { appConfig } from "@world-history-map/app-config";
import { Header } from "@world-history-map/ui";
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:description" content="" />
  <meta property="og:site_name" content={appConfig.name} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<Header title={appConfig.name} />
<slot />
