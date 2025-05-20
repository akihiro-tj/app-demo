<script lang="ts">
import { headerStyle, titleContainerStyle, titleStyle } from "./header.styles";

interface HeaderProps {
	title: string;
}

const { title }: HeaderProps = $props();
</script>

<!-- TODO: Move this component to packages -->
<header class={headerStyle}>
  <div class={titleContainerStyle}>
    <a class={titleStyle} href="/">{title}</a>
  </div>
</header>
