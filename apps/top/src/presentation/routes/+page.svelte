<script lang="ts">
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import { appConfig } from "@world-history-map/app-config";
import "../../app.css";
import { base } from "$app/paths";
import Header from "../components/header/header.svelte";
import {
	contentItemStyle,
	contentLinkStyle,
	contentListStyle,
	mainColumnStyle,
} from "./page.styles";

const { data } = $props();
const { contents } = data;
const baseUrl = `${appConfig.origin}${base}`;
</script>

<svelte:head>
  <title>{appConfig.name}</title>
  <meta property="og:title" content={appConfig.name} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={baseUrl} />
  <meta property="og:image" content={`${baseUrl}/og-image.png`} />
  <meta property="og:description" content="" />
  <meta property="og:site_name" content={appConfig.name} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<Header title={appConfig.name} />
<main class={mainColumnStyle}>
  <ul class={contentListStyle}>
    {#each contents as content (content.id)}
      <li class={contentItemStyle}>
        <a class={contentLinkStyle} href={content.path}>
          {content.title}
        </a>
      </li>
    {/each}
  </ul>
</main>
