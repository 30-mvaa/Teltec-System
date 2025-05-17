CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL, -- (Administrador, Atención al Cliente, Cobranzas, Auditor)
    status BOOLEAN DEFAULT TRUE, -- Activo o Inactivo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
