import { z } from "zod";

export const rawMetaSchema = z.object({
	title: z.string(),
});
