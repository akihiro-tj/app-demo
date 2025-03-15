<script lang="ts">
import { getMetaContent } from "./helpers/get-meta-content";

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

<ul>
  {#each data.contents as content (content.id)}
    <li>
      <a href={content.path}>
        {content.title}
      </a>
    </li>
  {/each}
</ul>
