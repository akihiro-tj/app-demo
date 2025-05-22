<script lang="ts">
import type { ChoiceViewModel } from "@/presentation/models/choice";
import type { MouseEventHandler } from "svelte/elements";
import Choice from "../choice/choice.svelte";
import { listStyle } from "./choice-list.styles";

export interface ChoiceListProps {
	id: string;
	choices: ChoiceViewModel[];
	correctChoice: ChoiceViewModel["id"];
	selectedChoice?: ChoiceViewModel["id"];
	hasAnswered?: boolean;
	onClickChoice: ChoiceClickEventHandler;
}

export interface ChoiceClickEvent {
	choiceListId: string;
	choiceId: string;
}

export type ChoiceClickEventHandler = (e: ChoiceClickEvent) => void;

const {
	id,
	choices,
	correctChoice,
	selectedChoice,
	hasAnswered,
	onClickChoice,
}: ChoiceListProps = $props();

const handleClickChoice: MouseEventHandler<HTMLButtonElement> = (e) => {
	const target = e.currentTarget;
	const choiceId = target.getAttribute("data-id") ?? "";
	onClickChoice({ choiceListId: id, choiceId });
};
</script>

<ul class={listStyle}>
  {#each choices as choice (choice.id)}
    {@const isSelected = choice.id === selectedChoice}
    {@const isCorrect = choice.id === correctChoice}
    <li>
      <Choice
        data-id={choice.id}
        disabled={hasAnswered}
        onclick={handleClickChoice}
        isCorrect={hasAnswered && (isSelected || isCorrect) ? isCorrect : undefined}
      >
        {choice.text}
      </Choice>
    </li>
  {/each}
</ul>
