export const BASE = process.env.BASE_URL ?? "http://localhost:3123";

// redirect: "manual" so redirects can be asserted. A "host" header needs
// undici's fetch, which Node's global fetch forbids, so use http for that.
export async function get(path, headers = {}) {
  const url = new URL(path, BASE);
  const { request } = await import("node:http");
  return new Promise((resolve, reject) => {
    request(url, { headers }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (c) => {
        text += c;
      });
      res.on("end", () =>
        resolve({ status: res.statusCode, headers: res.headers, text }),
      );
    })
      .on("error", reject)
      .end();
  });
}
