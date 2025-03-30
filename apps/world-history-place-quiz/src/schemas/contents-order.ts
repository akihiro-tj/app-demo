import { z } from "zod";

export type RawContentsOrder = string[];

export const rawContentsOrderSchema = z.array(z.string());
