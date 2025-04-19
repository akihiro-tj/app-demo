<script lang="ts">
import { generateMetaInfo } from "@/application/services/meta-info.service";
import ChoiceList, {
	type ChoiceClickEventHandler,
} from "@/presentation/components/choice-list/choice-list.svelte";
import { visuallyHidden } from "styled-system/patterns";
import { fade } from "svelte/transition";
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
	totalResultContainerStyle,
	totalResultStyle,
	totalResultValueStyle,
	topPageLinkContainerStyle,
	topPageLinkStyle,
} from "./styles";

const { data } = $props();
const { title, path, questions } = data.content;

const metaInfo = generateMetaInfo({ title, path });

let answers = $state(new Map<string, number>());

const currentQuestionIndex = $derived(answers.size);

const correctCount = $derived(
	questions.reduce((count, question) => {
		const answer = answers.get(question.id);
		return count + (answer === question.correctChoice.value ? 1 : 0);
	}, 0),
);

const isQuestionVisible = (questionIndex: number) =>
	questionIndex <= currentQuestionIndex;

const isQuestionResultVisible = (questionId: string) =>
	answers.get(questionId) !== undefined;

const isTotalResultVisible = () => currentQuestionIndex === questions.length;

const handleClickChoice: ChoiceClickEventHandler = (e) => {
	const questionId = e.choiceListId;
	const choiceId = e.choiceId;
	answers = new Map(answers).set(questionId, Number(choiceId));
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
      {#if isQuestionVisible(qi)}
        <section
          class={questionStyle({ showBorder: isQuestionResultVisible(question.id) })}
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
              correctChoice={question.correctChoice.value}
              selectedChoice={answers.get(question.id)}
              isAnswered={answers.has(question.id)}
              onClickChoice={handleClickChoice}
            />
          </div>
          {#if isQuestionResultVisible(question.id)}
            {@const isCorrect = answers.get(question.id) === question.correctChoice.value}
            <div in:fade>
              <div class={resultTextContainerStyle}>
                <p class={resultTextStyle({ isCorrect })}>
                  {isCorrect ? "正解" : "不正解"}
                </p>
              </div>
              <p class={visuallyHidden()}>{question.correctChoice.text}が正解です。</p>
              <p>{question.explanation}</p>
            </div>
          {/if}
        </section>
      {/if}
    {/each}
    {#if isTotalResultVisible()}
      <section class={totalResultStyle} in:fade>
        <div class={headingContainerStyle}>
          <h2 class={questionNumberStyle}>結果</h2>
        </div>
        <p class={totalResultContainerStyle}>
          <span class={totalResultValueStyle}>
            {correctCount} / {questions.length} 問
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
