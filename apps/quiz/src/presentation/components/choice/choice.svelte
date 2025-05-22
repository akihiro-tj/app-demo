<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { buttonStyle } from "./choice.styles";

export interface ChoiceProps {
	isCorrect: boolean | undefined;
}

const {
	isCorrect,
	children,
	...attributes
}: ChoiceProps & HTMLButtonAttributes = $props();
</script>

<button
  class={buttonStyle({ isCorrect })}
  {...attributes}
>
  {@render children?.()}
</button>
