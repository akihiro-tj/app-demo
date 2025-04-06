<script>
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import Header from "@/presentation/components/header/header.svelte";
import "./app.css";
import { SITE_NAME } from "./constant";
import { headerContainerStyle } from "./layout.styles";
</script>

<svelte:head>
  <meta property="og:description" content="" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<header class={headerContainerStyle}>
  <Header />
</header>
<slot />
