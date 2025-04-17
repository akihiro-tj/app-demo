<script lang="ts">
import type { QuestionViewModel } from "@/presentation/models/question.view-model";
import type { MouseEventHandler } from "svelte/elements";
import Choice from "../choice/choice.svelte";
import { listStyle } from "./styles";

export interface ChoiceListProps {
	id: number;
	choices: QuestionViewModel["choices"];
	correctChoice: QuestionViewModel["correctChoice"]["value"];
	selectedChoice?: QuestionViewModel["choices"][number]["value"];
	isAnswered?: boolean;
	onClickChoice: ChoiceClickEventHandler;
}

export interface ChoiceClickEvent {
	choiceListId: number;
	choiceId: number;
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
	const choiceId = Number(target.getAttribute("data-id"));
	onClickChoice({ choiceListId: id, choiceId });
};
</script>

<ul class={listStyle}>
  {#each choices as choice, index (choice)}
    {@const isSelected = choice.value === selectedChoice}
    {@const isCorrect = choice.value === correctChoice}
    <li>
      <Choice
        data-id={index}
        disabled={isAnswered}
        onclick={handleClickChoice}
        isCorrect={isAnswered && (isSelected || isCorrect) ? isCorrect : undefined}
      >
        {choice.text}
      </Choice>
    </li>
  {/each}
</ul>
