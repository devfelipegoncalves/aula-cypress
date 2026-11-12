const { spawn } = require('node:child_process');
const path = require('node:path');
const { criarServidor } = require('./servidor');

const modo = process.argv[2] === 'run' ? 'run' : 'open';
const servidor = criarServidor();
let cypress;
let encerrando = false;

function encerrar(codigo = 0) {
  if (encerrando) return;
  encerrando = true;
  if (cypress && !cypress.killed) cypress.kill();
  servidor.close(() => process.exit(codigo));
}

servidor.listen(0, '127.0.0.1', () => {
  const { port } = servidor.address();
  const nomeDoBinario = process.platform === 'win32' ? 'cypress.cmd' : 'cypress';
  const binarioCypress = path.resolve(__dirname, '..', 'node_modules', '.bin', nomeDoBinario);
  const endereco = `http://127.0.0.1:${port}`;
  const argumentos = [modo, '--e2e', '--browser', 'chrome', '--config', `baseUrl=${endereco}`];
  cypress = spawn(binarioCypress, argumentos, { stdio: 'inherit', shell: process.platform === 'win32' });
  cypress.on('exit', (codigo) => encerrar(codigo || 0));
  cypress.on('error', () => encerrar(1));
});

servidor.on('error', () => encerrar(1));

process.on('SIGINT', () => encerrar());
process.on('SIGTERM', () => encerrar());
