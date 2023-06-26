import { HttpResponse as uHttpResponse, HttpRequest as uHttpRequest } from "uWebSockets.js";
import HttpResponse from "../responses/HttpResponse";
export type RouteHandler<T> = (res: uHttpResponse, req: uHttpRequest) => T;
export type MiddlewareHandler = RouteHandler<HttpResponse | void>;
export type EndpointHandler = RouteHandler<Promise<HttpResponse> | HttpResponse>;
