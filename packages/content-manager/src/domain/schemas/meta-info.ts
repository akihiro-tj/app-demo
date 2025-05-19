import { z } from "zod";

export const metaInfoSchema = z.object({
	title: z.string(),
});
