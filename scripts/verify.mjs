// Build, serve, run the tests against the server, stop it, exit with the test status.
import { spawn, spawnSync } from "node:child_process";

const PORT = 3123;
const run = (args) =>
  spawnSync("pnpm", ["exec", ...args], { stdio: "inherit", shell: true });

if (run(["next", "build"]).status !== 0) process.exit(1);

const server = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
});
const stop = () => {
  if (process.platform === "win32")
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
  else server.kill();
};

let status = 1;
try {
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    up = await fetch(`http://localhost:${PORT}/`).then(
      () => true,
      () => new Promise((r) => setTimeout(r, 500)).then(() => false),
    );
  }
  if (!up) throw new Error("server did not start");
  status = spawnSync(process.execPath, ["--test", "tests/*.test.mjs"], {
    stdio: "inherit",
    env: { ...process.env, BASE_URL: `http://localhost:${PORT}` },
  }).status;
} finally {
  stop();
}
process.exit(status ?? 1);
