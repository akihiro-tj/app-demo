import { z } from "zod";

export const orderSchema = z.array(z.string());
