import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;
const processes = [
  {
    name: 'API',
    executable: resolve(root, 'node_modules', 'tsx', 'dist', 'cli.mjs'),
    args: ['watch', 'src/server.ts'],
    cwd: resolve(root, 'backend'),
  },
  {
    name: 'Frontend',
    executable: resolve(root, 'node_modules', 'vite', 'bin', 'vite.js'),
    args: ['--host', '0.0.0.0'],
    cwd: resolve(root, 'frontend'),
  },
].map((service) => ({
  ...service,
  child: spawn(node, [service.executable, ...service.args], {
    cwd: service.cwd,
    stdio: 'inherit',
  }),
}));

let stopping = false;
function stopAll(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const service of processes) {
    if (service.child.exitCode === null) service.child.kill();
  }
  setTimeout(() => process.exit(exitCode), 300);
}

for (const service of processes) {
  service.child.on('error', (error) => {
    console.error(`[${service.name}] could not start: ${error.message}`);
    stopAll(1);
  });
  service.child.on('exit', (code) => {
    if (!stopping) {
      console.error(`[${service.name}] stopped; shutting down the other service.`);
      stopAll(code ?? 1);
    }
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
