import type { IContent } from "@/domain/entities/content";
import type { IQuestion } from "@/domain/entities/question";
import type { IContentRepository } from "../interfaces/content-repository";
import type {
	AppContent,
	AppQuestion,
	ContentService as IContentService,
} from "../interfaces/content-service";
import type { IContentsOrderRepository } from "../interfaces/contents-order-repository";

export class ContentService implements IContentService {
	constructor(
		private readonly contentRepository: IContentRepository,
		private readonly contentsOrderRepository: IContentsOrderRepository,
	) {}

	getContent(contentId: string): AppContent {
		const content = this.contentRepository.find({ contentId });
		const mappedContent = this.mapContent(content);
		return mappedContent;
	}

	getAllContents(): AppContent[] {
		const contents = this.contentRepository.findAll();
		const mappedContents = contents.map((content) => this.mapContent(content));
		const sortedContents = this.sortContents(mappedContents);
		return sortedContents;
	}

	getContentsEntries(): { slug: string }[] {
		const contents = this.getAllContents();
		return contents.map((content) => ({
			slug: content.id,
		}));
	}

	private mapContent(content: IContent): AppContent {
		const path = `/content/${content.id}`;
		const mappedQuestions: AppQuestion[] = content.questions.map(
			(question: IQuestion, index: number): AppQuestion => ({
				statement: question.statement,
				image: `${path}/q${index + 1}.png`,
				choices: question.choices,
				correctChoice: question.correctChoice,
				explanation: question.explanation,
			}),
		);
		return {
			id: content.id,
			path,
			title: content.title,
			questions: mappedQuestions,
		};
	}

	private sortContents(contents: AppContent[]): AppContent[] {
		const contentsOrder = this.contentsOrderRepository.find();
		const sortedContents = contents.sort((a, b) => {
			const aIndex = contentsOrder.contentIds.indexOf(a.id);
			const bIndex = contentsOrder.contentIds.indexOf(b.id);
			if (aIndex === -1 && bIndex === -1) return 0;
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		});
		return sortedContents;
	}
}
