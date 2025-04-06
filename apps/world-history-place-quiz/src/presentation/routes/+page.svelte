<script lang="ts">
import { getMeta } from "./helpers/get-meta";
import {
	contentItemStyle,
	contentLinkStyle,
	contentListStyle,
	mainColumnStyle,
} from "./page.styles";

const { data } = $props();
const meta = getMeta();
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta property="og:title" content={meta.ogTitle} />
  <meta property="og:type" content={meta.ogType} />
  <meta property="og:url" content={meta.ogURL} />
  <meta property="og:image" content={meta.ogImage} />
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
