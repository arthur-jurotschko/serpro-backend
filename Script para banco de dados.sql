
CREATE TABLE logs_consulta (
  id SERIAL PRIMARY KEY,
  tipo_consulta VARCHAR(50) NOT NULL,
  usuario_id INT, 
  dados_enviados JSON NOT NULL,
  resultado JSON NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente',
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM logs_consulta;

ALTER USER postgres PASSWORD 'Senha usuario';

