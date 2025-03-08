<script lang="ts">
import { SITE_ORIGIN, SITE_NAME } from "./constant";

const { data } = $props();
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta property="og:title" content={SITE_NAME} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_ORIGIN} />
  <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
</svelte:head>

<ul>
  {#each data.contents as content (content.slug)}
    <li>
      <a href={content.path}>
        {content.title}
      </a>
    </li>
  {/each}
</ul>
