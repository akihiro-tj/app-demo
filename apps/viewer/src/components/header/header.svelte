<script>
import { SITE_NAME } from "@/constants";
import { headerStyle, titleContainerStyle, titleStyle } from "./header.styles";
</script>

<!-- TODO: Move this component to packages -->
<header class={headerStyle}>
  <div class={titleContainerStyle}>
    <a class={titleStyle} href="/">{SITE_NAME}</a>
  </div>
</header>
