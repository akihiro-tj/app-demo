<script lang="ts">
import { getMetaContent } from "./helpers/get-meta-content";
import {
	contentItemStyle,
	contentLinkStyle,
	contentListStyle,
	mainColumnStyle,
} from "./page.styles";

const { data } = $props();
const metaContent = getMetaContent();
</script>

<svelte:head>
  <title>{metaContent.title}</title>
  <meta property="og:title" content={metaContent.ogTitle} />
  <meta property="og:type" content={metaContent.ogType} />
  <meta property="og:url" content={metaContent.ogURL} />
  <meta property="og:image" content={metaContent.ogImage} />
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
