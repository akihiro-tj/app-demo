<script lang="ts">
import type { Choice as IChoice } from "@/application/interfaces/content-service";
import type { MouseEventHandler } from "svelte/elements";
import Choice from "../choice/choice.svelte";
import { listStyle } from "./styles";

export interface ChoiceListProps {
	id: number;
	choices: IChoice[];
	onClickChoice: ChoiceClickEventHandler;
	isDisabled?: boolean;
}

export interface ChoiceClickEvent {
	choiceListId: number;
	choiceId: number;
}

export type ChoiceClickEventHandler = (e: ChoiceClickEvent) => void;

const { id, isDisabled, choices, onClickChoice }: ChoiceListProps = $props();

const handleClickChoice: MouseEventHandler<HTMLButtonElement> = (e) => {
	const target = e.currentTarget;
	const choiceId = Number(target.getAttribute("data-id"));
	onClickChoice({ choiceListId: id, choiceId });
};
</script>

<ul class={listStyle}>
  {#each choices as choice, index (choice)}
    <li>
      <Choice
        data-id={index}
        disabled={isDisabled}
        onclick={handleClickChoice}
        isCorrect={choice.isCorrect}
      >
        {choice.text}
      </Choice>
    </li>
  {/each}
</ul>
