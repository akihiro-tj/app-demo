import { z } from "zod";

export const metaInfoSchema = z.object({
	title: z.string().min(1, "Title must not be empty"),
});
