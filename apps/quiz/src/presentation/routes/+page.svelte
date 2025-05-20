<script lang="ts">
import { generateMetaInfo } from "../helpers/meta-info";
import {
	contentItemStyle,
	contentLinkStyle,
	contentListStyle,
	mainColumnStyle,
} from "./page.styles";

const { data } = $props();
const metaInfo = generateMetaInfo();
</script>

<svelte:head>
  <title>{metaInfo.title}</title>
  <meta property="og:title" content={metaInfo.ogTitle} />
  <meta property="og:type" content={metaInfo.ogType} />
  <meta property="og:url" content={metaInfo.ogURL} />
  <meta property="og:image" content={metaInfo.ogImage} />
</svelte:head>

<main class={mainColumnStyle}>
  <ul class={contentListStyle}>
    {#each data.contents as content (content.id)}
      <li class={contentItemStyle}>
        <a class={contentLinkStyle} href={content.path}>
          {content.title}
        </a>
      </li>
    {/each}
  </ul>
</main>
