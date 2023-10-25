import { dirname } from "path";
import { fileURLToPath } from "url";

export const RUNTOKEN = process.env.AUTHTOKEN;
export const PORT = process.env.PORT;
export const __dirname = dirname(fileURLToPath(import.meta.url));