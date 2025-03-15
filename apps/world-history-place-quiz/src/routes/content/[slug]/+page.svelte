<script lang="ts">
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/components/choice-list/choice-list.svelte";
import { SITE_ORIGIN } from "@/routes/constant";
import type { QuestionResult } from "@/routes/types/question-result";
import { visuallyHidden } from "styled-system/patterns";
import { fade } from "svelte/transition";
import { getQuestionResult } from "./helpers/get-question-result";
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
const { title, path, questions } = data.content;

let results = $state<QuestionResult[]>(
	questions.map((question) => getQuestionResult(question, null)),
);
const currentQuestionIndex = $derived(
	results.filter((result) => result.selectedChoice !== null).length,
);
const correctCount = $derived(
	results.filter((result) => result.isCorrect).length,
);

const handleClickChoice: ChoiceClickEventHandler = (e) => {
	const questionIndex = e.choiceListId;
	const choiceIndex = e.choiceId;
	const question = questions[questionIndex];
	if (!question) {
		return;
	}
	results[questionIndex] = getQuestionResult(question, choiceIndex);
};
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${SITE_ORIGIN}${path}`} />
  <meta property="og:image" content={`${SITE_ORIGIN}${path}/og-image.png`} />
</svelte:head>

<main>
  <h1>{title}</h1>
  <div class={columnStyle}>
    {#each questions as question, qi (question)}
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
    {#if currentQuestionIndex === questions.length}
      <section class={totalResultStyle} in:fade>
        <div class={headingContainerStyle}>
          <h2 class={headingStyle}>結果</h2>
        </div>
        <p class={totalResultContainerStyle}>
          <span class={totalResultValueStyle}>
            {correctCount} / {questions.length} 問
          </span>
          <span>正解</span>
        </p>
      </section>
    {/if}
  </div>
</main>
