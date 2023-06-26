import { Methods } from "./methods";
import { MiddlewareHandler, EndpointHandler } from "./handlers";
// forbidden characters '/'
type Banned = `${string}${"/"}${string}`;

type PathString<T extends string> = `${T extends Banned ? never : T}`;

export interface Route {
  // not mixed !!!!!!!!!!!
  path: PathString<string>;
}

export interface RouteNode extends Route {
  children: Array<MapRoute>;
}

export interface RouteEndpoint extends Route {
  method: Methods;
  // middlewares?: Array<MiddlewareHandler>;
  handler: EndpointHandler;
}

export type MapRoute = RouteNode | RouteEndpoint;

export function isEndpoint(route: any): route is RouteEndpoint {
  return route.handler && typeof route.handler === "function";
}
