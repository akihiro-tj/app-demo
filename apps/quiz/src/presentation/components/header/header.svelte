<script lang="ts">
import { headerStyle, titleContainerStyle, titleStyle } from "./styles";

interface HeaderProps {
	title: string;
}

const { title }: HeaderProps = $props();
</script>

<header class={headerStyle}>
  <div class={titleContainerStyle}>
    <a class={titleStyle} href="/">{title}</a>
  </div>
</header>
