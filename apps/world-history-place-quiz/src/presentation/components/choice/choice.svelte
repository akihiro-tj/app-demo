<script lang="ts">
import type { Choice } from "@/application/interfaces/content-service";
import type { HTMLButtonAttributes } from "svelte/elements";
import { buttonStyle } from "./styles";

export interface ChoiceProps {
	isCorrect: Choice["isCorrect"];
}

const {
	isCorrect,
	children,
	...attributes
}: ChoiceProps & HTMLButtonAttributes = $props();
</script>

<button
  class={buttonStyle({ isCorrect: isCorrect ?? undefined })}
  {...attributes}
>
  {@render children?.()}
</button>
