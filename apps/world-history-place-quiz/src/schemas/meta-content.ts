import { z } from "zod";

export interface RawMetaContent {
	title: string;
}

export const rawMetaContentSchema = z.object({
	title: z.string(),
});
