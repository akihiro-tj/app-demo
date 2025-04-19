<script lang="ts">
import type { ChoiceViewModel } from "@/presentation/models/choice-view-model";
import type { MouseEventHandler } from "svelte/elements";
import Choice from "../choice/choice.svelte";
import { listStyle } from "./styles";

export interface ChoiceListProps {
	id: string;
	choices: ChoiceViewModel[];
	correctChoice: ChoiceViewModel["value"];
	selectedChoice?: ChoiceViewModel["value"];
	isAnswered?: boolean;
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
	isAnswered,
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
    {@const isSelected = choice.value === selectedChoice}
    {@const isCorrect = choice.value === correctChoice}
    <li>
      <Choice
        data-id={choice.value}
        disabled={isAnswered}
        onclick={handleClickChoice}
        isCorrect={isAnswered && (isSelected || isCorrect) ? isCorrect : undefined}
      >
        {choice.text}
      </Choice>
    </li>
  {/each}
</ul>
