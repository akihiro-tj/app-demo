<script lang="ts">
const { data } = $props();
</script>

<ul>
  {#each data.contents as content (content.slug)}
    <li>
      <a href={`/content/${content.slug}`}>
        {content.title}
      </a>
    </li>
  {/each}
</ul>
