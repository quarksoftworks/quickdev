import ansi from "ansi-colors";

export function info (text: string) {console.log(`[${ansi.blueBright("INFO")}] ${text}`)}

export function success (text: string) {console.log(`[${ansi.greenBright("SUCCESS")}] ${text}`)}

export function warning (text: string) {console.log(`[${ansi.yellowBright("WARNING")}] ${text}`)}

export function error (text: string) {console.log(`[${ansi.redBright("ERROR")}] ${text}`)}
