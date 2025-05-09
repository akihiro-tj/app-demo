<script lang="ts">
import { generateMetaInfo } from "@/application/services/meta-info";
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/presentation/components/choice-list/choice-list.svelte";
import { visuallyHidden } from "styled-system/patterns";
import { fade } from "svelte/transition";
import { createQuizState } from "./helpers/quiz-state.svelte";
import {
	choiceListContainerStyle,
	headingContainerStyle,
	headingStyle,
	imageContainerStyle,
	mainColumnStyle,
	questionCountStyle,
	questionNumberStyle,
	questionStyle,
	resultTextContainerStyle,
	resultTextStyle,
	statementContainerStyle,
	titleContainerStyle,
	titleStyle,
	topPageLinkContainerStyle,
	topPageLinkStyle,
	totalResultContainerStyle,
	totalResultStyle,
	totalResultValueStyle,
} from "./styles";

const { data } = $props();
const { title, path, questions } = data.content;

const metaInfo = generateMetaInfo({ title, path });

const quizState = createQuizState(questions);

const handleClickChoice: ChoiceClickEventHandler = (e) =>
	quizState.setAnswer(e.choiceListId, e.choiceId);

const getCorrectText = (isCorrect: boolean | undefined) => {
	switch (isCorrect) {
		case true:
			return "正解";
		case false:
			return "不正解";
		default:
			return "";
	}
};
</script>

<svelte:head>
  <title>{metaInfo.title}</title>
  <meta property="og:title" content={metaInfo.title} />
  <meta property="og:type" content={metaInfo.ogType} />
  <meta property="og:url" content={metaInfo.ogURL} />
  <meta property="og:image" content={metaInfo.ogImage} />
</svelte:head>

<main class={mainColumnStyle}>
  <div class={titleContainerStyle}>
    <h1 class={titleStyle}>{title}</h1>
  </div>
  <div>
    {#each questions as question, qi (question.id)}
      {@const questionState = quizState.getQuestionState(qi)}
      {#if questionState && questionState.isVisible}
        <section
          class={questionStyle({ showBorder: questionState.selectedChoice !== undefined })}
          in:fade
        >
          <div class={headingContainerStyle}>
            <h2 class={headingStyle}>
              <span class={questionNumberStyle}>Q.{qi + 1}</span>
              <span class={questionCountStyle}>/ {questions.length}</span>
            </h2>
          </div>
          <div class={statementContainerStyle}>
            <p>{question.statement}</p>
          </div>
          <div class={imageContainerStyle}>
            <img src={question.imagePath} alt="地図の画像" />
          </div>
          <div class={choiceListContainerStyle}>
            <ChoiceList
              id={question.id}
              choices={question.choices}
              correctChoice={question.correctChoice.id}
              selectedChoice={questionState.selectedChoice}
              hasAnswered={questionState.selectedChoice !== undefined}
              onClickChoice={handleClickChoice}
            />
          </div>
          {#if questionState.selectedChoice !== undefined}
            <div in:fade>
              <div class={resultTextContainerStyle}>
                <p class={resultTextStyle({ isCorrect: questionState.isCorrect })}>
                  {getCorrectText(questionState.isCorrect)}
                </p>
              </div>
              <p class={visuallyHidden()}>{question.correctChoice.text}が正解です。</p>
              <p>{question.explanation}</p>
            </div>
          {/if}
        </section>
      {/if}
    {/each}
    {#if quizState.isTotalResultVisible}
      <section class={totalResultStyle} in:fade>
        <div class={headingContainerStyle}>
          <h2 class={questionNumberStyle}>結果</h2>
        </div>
        <p class={totalResultContainerStyle}>
          <span class={totalResultValueStyle}>
            {quizState.correctCount} / {questions.length} 問
          </span>
          <span>正解</span>
        </p>
      </section>
      <div class={topPageLinkContainerStyle}>
        <a href="/" class={topPageLinkStyle}>トップページ</a>
      </div>
    {/if}
  </div>
</main>
