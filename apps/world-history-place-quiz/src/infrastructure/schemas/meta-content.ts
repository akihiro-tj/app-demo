import { z } from "zod";

export const rawMetaContentSchema = z.object({
	title: z.string(),
});
