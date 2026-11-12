const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const pastaDoSite = path.resolve(__dirname, '..', 'site');
const tipos = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function criarServidor() {
  return http.createServer((requisicao, resposta) => {
    const caminhoDaUrl = requisicao.url === '/' ? '/index.html' : requisicao.url;
    const arquivo = path.resolve(pastaDoSite, `.${decodeURIComponent(caminhoDaUrl)}`);

    if (!arquivo.startsWith(`${pastaDoSite}${path.sep}`)) {
      resposta.writeHead(403);
      resposta.end('Acesso não permitido.');
      return;
    }

    fs.readFile(arquivo, (erro, conteudo) => {
      if (erro) {
        resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        resposta.end('Arquivo não encontrado.');
        return;
      }

      const tipo = tipos[path.extname(arquivo)] || 'application/octet-stream';
      resposta.writeHead(200, { 'Content-Type': tipo });
      resposta.end(conteudo);
    });
  });
}

module.exports = { criarServidor };
