import { TemplatedApp } from "uWebSockets.js";
import mapRoutes from "../core/router/Router";
import { MapRoute } from "../core/router";
import create from "../core/router/parseToPostman";
import { body, test, validate } from "../controllers";

const startUrl = "/api/v1/";

const routes: MapRoute[] = [
  {
    method: "GET",
    path: "",
    handler: test,
  },
  {
    method: "POST",
    path: "",
    handler: body,
  },
  {
    method: "POST",
    path: "validate",
    handler: validate,
  },
];

export const postmanGenerate = () =>
  create(
    "./postman.json",
    "autogenerate",
    startUrl,
    routes,
    process.env.HOST_PROTO,
    process.env.HOST_ADDR,
    parseInt(process.env.HOST_PORT)
  );

export default function (app: TemplatedApp) {
  mapRoutes(routes, app, startUrl);
}
