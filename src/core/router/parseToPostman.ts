import { writeFileSync } from "fs";
import { MapRoute, isEndpoint } from ".";
import { randomUUID } from "crypto";

function createRequest(
  name: string,
  method: string,
  proto: string,
  host: string,
  port: number,
  path: string
) {
  return {
    name,
    request: {
      method,
      header: [],
      url: {
        raw: `${proto}://${host}:${port}/${path}`,
        protocol: proto,
        host: host.split("."),
        port: port.toString(),
        path: path.split("/"),
      },
    },
    response: [],
  };
}

function createFolder(
  name: string,
  items: MapRoute[],
  proto: string,
  host: string,
  port: number,
  path: string
) {
  return {
    name,
    item: deepCopy(items, proto, host, port, path),
  };
}

function deepCopy(items: MapRoute[], proto: string, host: string, port: number, path: string) {
  const heap: any[] = [];
  items.forEach((item) => {
    isEndpoint(item)
      ? heap.push(createRequest(item.path, item.method, proto, host, port, `${path}/${item.path}`))
      : heap.push(
          createFolder(item.path, item.children, proto, host, port, `${path}/${item.path}`)
        );
  });
  return heap;
}

export default function create(
  filepath: string,
  name = "empty",
  rootPath = "",
  items: MapRoute[],
  proto: string,
  host: string,
  port: number
) {
  const json = JSON.stringify({
    info: {
      _postman_id: randomUUID(),
      name: name,
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: deepCopy(items, proto, host, port, rootPath),
  });
  writeFileSync(filepath, json, { encoding: "utf8" });
  console.log("postman document", filepath);
}
