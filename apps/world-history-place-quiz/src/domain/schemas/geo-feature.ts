import { z } from "zod";

export const geoFeatureSchema = z.object({
	id: z.string(),
});
