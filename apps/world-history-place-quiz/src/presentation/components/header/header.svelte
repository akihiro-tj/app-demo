<script>
import { SITE_NAME } from "@/application/constants/site.constant";
import { headerStyle, titleContainerStyle, titleStyle } from "./styles";
</script>

<header class={headerStyle}>
  <div class={titleContainerStyle}>
    <a class={titleStyle} href="/">{SITE_NAME}</a>
  </div>
</header>
