<script lang="ts">
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/components/choice-list/choice-list.svelte";
import type { QuestionResult } from "@/routes/types/question-result";
import { visuallyHidden } from "styled-system/patterns";
import { fade } from "svelte/transition";
import { getCorrectCount } from "./helpers/get-correct-count";
import { getCurrentQuestionIndex } from "./helpers/get-current-question-index";
import { getMetaContent } from "./helpers/get-meta-content";
import { getQuestionResult } from "./helpers/get-question-result";
import { shouldShowQuestion } from "./helpers/should-show-question";
import { shouldShowQuestionResult } from "./helpers/should-show-question-result";
import { shouldShowTotalResult } from "./helpers/should-show-total-result";
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
const { questions } = data.content;

const metaContent = getMetaContent(data.content);

let results = $state<QuestionResult[]>(
	questions.map((question) => getQuestionResult(question, null)),
);
const currentQuestionIndex = $derived(getCurrentQuestionIndex(results));
const correctCount = $derived(getCorrectCount(results));

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
  <title>{metaContent.title}</title>
  <meta property="og:title" content={metaContent.title} />
  <meta property="og:type" content={metaContent.ogType} />
  <meta property="og:url" content={metaContent.ogURL} />
  <meta property="og:image" content={metaContent.ogImage} />
</svelte:head>

<main>
  <h1>{data.content.title}</h1>
  <div class={columnStyle}>
    {#each questions as question, qi (question)}
      {#if shouldShowQuestion(qi, currentQuestionIndex) && results[qi]}
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
          {#if shouldShowQuestionResult(results[qi].isCorrect)}
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
    {#if shouldShowTotalResult(questions, currentQuestionIndex)}
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
