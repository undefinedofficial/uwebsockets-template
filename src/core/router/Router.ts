import { HttpRequest, HttpResponse, TemplatedApp } from "uWebSockets.js";
import { MapRoute, RouteEndpoint, isEndpoint } from "./route";
import { HTTPCODES } from "../utils";
import ThrowResponse from "../responses/ThrowResponce";
import logger from "../logger";

function isPromise(prom: any): prom is Promise<any> {
  return typeof prom === "object" && typeof prom.then === "function";
}
const isLogging = !process.env.RELEASE;
function registerRoute(endpoint: RouteEndpoint, app: TemplatedApp, fullpath: string) {
  fullpath = fullpath.endsWith("/") ? fullpath.substring(0, fullpath.length - 1) : fullpath;
  const routeHandler = (res: HttpResponse, req: HttpRequest) => {
    try {
      // if (endpoint.middlewares)
      //   for (const middleware of endpoint.middlewares) {
      //     const result = middleware(res, req);
      //     if (result) return result.send(res, req);
      //   }
      const result = endpoint.handler(res, req);

      if (!isPromise(result)) return result.send(res, req) as any;

      res.onAborted(() => (res.aborted = true));
      return result.then((r) => r.send(res, req));
    } catch (err: any) {
      const error = err ?? new Error("OPS!!!");
      logger.error(error, endpoint);
      return new ThrowResponse(error, HTTPCODES.INTERNAL_SERVER_ERROR).send(res, req);
    }
    console.error("How'd I get here?");
  };
  const debugRouteHandler = async (res: HttpResponse, req: HttpRequest) => {
    const method = req.getMethod();
    const path = req.getUrl();
    const startTime = Date.now();
    const response = await routeHandler(res, req);
    logger.debug(`${method}-${path}:${response.status}--timelapse: ${Date.now() - startTime}ms`);
  };
  logger.debug(`Register route: ${endpoint.method}${fullpath}`);

  switch (endpoint.method) {
    case "GET":
      app.get(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "HEAD":
      app.head(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "POST":
      app.post(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "PUT":
      app.put(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "PATCH":
      app.patch(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "DELETE":
      app.del(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "CONNECT":
      app.connect(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "TRACE":
      app.trace(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "OPTIONS":
      app.options(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    case "ANY":
      app.any(fullpath, isLogging ? debugRouteHandler.bind(app) : routeHandler.bind(app));
      break;
    default:
      throw new Error(`Method ${endpoint.method} not supported`);
  }
}

export default function mapRoutes(routes: MapRoute[], app: TemplatedApp, parentPath = "/"): void {
  logger.debug(`Reqistering routes for ${parentPath} development mode`);
  routes.forEach((route) =>
    isEndpoint(route)
      ? registerRoute(route, app, `${parentPath}${route.path}`)
      : mapRoutes(route.children, app, `${parentPath}${route.path}/`)
  );
}
