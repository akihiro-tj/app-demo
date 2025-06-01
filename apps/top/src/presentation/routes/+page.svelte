<script lang="ts">
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import { ChevronRight } from "@lucide/svelte";
import { appConfig } from "@world-history-map/app-config";
import "../../app.css";
import { base } from "$app/paths";
import { Header } from "@world-history-map/ui";
import {
	contentColumnStyle,
	contentItemStyle,
	contentLinkStyle,
	contentListStyle,
	headingStyle,
	mainColumnStyle,
	viewerLinkContainerStyle,
	viewerLinkStyle,
	viewerLinkTextStyle,
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
  <div class={contentColumnStyle}>

    <div>
      <h2 class={headingStyle}>地図を見る</h2>
      <div class={viewerLinkContainerStyle}>
        <a class={viewerLinkStyle} href="/viewer">
          <span class={viewerLinkTextStyle}>世界史地図ビューアー</span>
          <ChevronRight size={24} />
        </a>
      </div>
    </div>

    <div>
      <h2 class={headingStyle}>クイズを解く</h2>
      <ul class={contentListStyle}>
        {#each contents as content (content.id)}
          <li class={contentItemStyle}>
            <a class={contentLinkStyle} href={content.path}>
              <span>{content.title}</span>
              <ChevronRight size={24} />
            </a>
          </li>
        {/each}
      </ul>
    </div>

  </div>
</main>
