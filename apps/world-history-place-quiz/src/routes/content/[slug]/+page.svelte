<script lang="ts">
import { fade } from "svelte/transition";
import { visuallyHidden } from "styled-system/patterns";
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/components/choice-list/choice-list.svelte";
import type { QuestionResult } from "./types";
import {
	choiceListContainerStyle,
	columnStyle,
	headingContainerStyle,
	headingStyle,
	imageContainerStyle,
	questionStyle,
	resultTextContainerStyle,
	resultTextStyle,
	statementContainerStyle,
} from "./styles";
import { isCorrectChoice } from "./helpers/is-correct-choice";

const { data } = $props();
let results = $state<Array<QuestionResult>>([]);

if (data.content) {
	const { questions } = data.content;
	results = [...Array(questions.length)].map((_, i) => ({
		choices: (questions[i]?.choices ?? []).map((choice) => ({
			text: choice,
			isCorrect: null,
		})),
		selectedChoice: null,
		isCorrect: null,
	}));
}

const handleClickChoice: ChoiceClickEventHandler = (e) => {
	const questionIndex = e.choiceListId;
	const choiceIndex = e.choiceId;
	const question = data.content?.questions[questionIndex];
	if (!question) {
		return;
	}
	results[questionIndex] = {
		choices: question.choices.map((choice, i) => ({
			text: choice,
			isCorrect: isCorrectChoice(i, choiceIndex, question.correctChoice.value),
		})),
		selectedChoice: choiceIndex,
		isCorrect: choiceIndex === question.correctChoice.value,
	};
};
</script>

<main>
  {#if data.content}
    <h1>{data.content.title}</h1>
    <div class={columnStyle}>
      {#each data.content.questions as question, qi (question)}
        {#if results[qi]}
          <section class={questionStyle}>
            <div class={headingContainerStyle}>
              <h2 class={headingStyle}>Q.{qi + 1}</h2>
            </div>
            <div class={statementContainerStyle}>
              <p>{question.statement}</p>
            </div>
            <!-- TODO: Implement img -->
            <div class={imageContainerStyle}>
              <img src={question.image} alt="this is alt text." />
            </div>
            <div class={choiceListContainerStyle}>
              <ChoiceList
                id={qi}
                choices={results[qi].choices}
                onClickChoice={handleClickChoice}
                isDisabled={results[qi].selectedChoice !== null}
              />
            </div>
            {#if results[qi].isCorrect !== null}
              <div in:fade>
                <div class={resultTextContainerStyle}>
                  <p class={resultTextStyle({ isCorrect: results[qi].isCorrect })}>
                    {results[qi].isCorrect ? "正解" : "不正解"}
                  </p>
                </div>
                <p class={visuallyHidden()}>{question.correctChoice.text}が正解です。</p>
                <p>{question.explanation}</p>
              </div>
            {/if}
          </section>
        {/if}
      {/each}
    </div>
  {/if}
</main>
