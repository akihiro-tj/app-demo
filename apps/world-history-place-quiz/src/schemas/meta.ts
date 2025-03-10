import { z } from "zod";

export interface RawMeta {
	title: string;
}

export const rawMetaSchema = z.object({
	title: z.string(),
});
