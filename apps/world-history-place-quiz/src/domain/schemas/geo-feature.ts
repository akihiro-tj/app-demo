import { z } from "zod";

export const geoFeatureSchema = z.object({
	id: z.number(),
	name: z.string(),
});
