<script>
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import Header from "@/presentation/components/header/header.svelte";
import "./app.css";
import { SITE_NAME } from "@/application/constants/site";
</script>

<svelte:head>
  <meta property="og:description" content="" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<Header />
<slot />
