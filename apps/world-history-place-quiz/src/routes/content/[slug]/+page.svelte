<script lang="ts">
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/components/choice-list/choice-list.svelte";
import { SITE_ORIGIN } from "@/routes/constant";
import type { QuestionResult } from "@/routes/types/question-result";
import { visuallyHidden } from "styled-system/patterns";
import { fade } from "svelte/transition";
import { isCorrectChoice } from "./helpers/is-correct-choice";
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
	totalResultContainerStyle,
	totalResultStyle,
	totalResultValueStyle,
} from "./styles";

const { data } = $props();
let results = $state<Array<QuestionResult>>([]);
const currentQuestionIndex = $derived(
	results.filter((result) => result.selectedChoice !== null).length,
);
const correctCount = $derived(
	results.filter((result) => result.isCorrect).length,
);

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

<svelte:head>
  <title>{data.content?.title}</title>
  <meta property="og:title" content={data.content?.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${SITE_ORIGIN}${data.content?.path}`} />
  <meta property="og:image" content={`${SITE_ORIGIN}${data.content?.path}/og-image.png`} />
</svelte:head>

<main>
  {#if data.content}
    <h1>{data.content.title}</h1>
    <div class={columnStyle}>
      {#each data.content.questions as question, qi (question)}
        {#if results[qi] && qi <= currentQuestionIndex}
          <section class={questionStyle} in:fade>
            <div class={headingContainerStyle}>
              <h2 class={headingStyle}>Q.{qi + 1}</h2>
            </div>
            <div class={statementContainerStyle}>
              <p>{question.statement}</p>
            </div>
            <div class={imageContainerStyle}>
              <img src={question.image} alt="地図の画像" />
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
      {#if currentQuestionIndex === data.content.questions.length}
        <section class={totalResultStyle} in:fade>
          <div class={headingContainerStyle}>
            <h2 class={headingStyle}>結果</h2>
          </div>
          <p class={totalResultContainerStyle}>
            <span class={totalResultValueStyle}>
              {correctCount} / {data.content.questions.length} 問
            </span>
            <span>正解</span>
          </p>
        </section>
      {/if}
    </div>
  {/if}
</main>
