CREATE TABLE usuarios
(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE transacoes
(
    id SERIAL PRIMARY KEY,
    valor INT NOT NULL,
    descricao TEXT NOT NULL,
  	data_transacao DATE NOT NULL DEFAULT NOW(),
  	tipo VARCHAR(8),
  	usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);