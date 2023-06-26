import { RecognizedString } from "uWebSockets.js";
import { HTTPCODES } from "../utils";

// any status code
export type HttpStatus = string | HTTPCODES;

// Success status code
export type HttpStatusSuccess = `2${string}` & HTTPCODES;

// Redirection status code
export type HttpStatusRedirection = `3${string}` & HTTPCODES;

// Client error status code
export type HttpStatusClientError = `4${string}` & HTTPCODES;

// Server error status code
export type HttpStatusServerError = `5${string}` & HTTPCODES;

// header list object
export type HeaderList = Record<string, RecognizedString>;
