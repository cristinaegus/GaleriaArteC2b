# GaleriaArte.py


from connection import get_connection


# URL de conexión para SQLAlchemy
DATABASE_URL = "postgresql+psycopg2://GaleriaArte_owner:npg_EK2uSIDJr3OG@ep-mute-sea-a2d5a91w-pooler.eu-central-1.aws.neon.tech:5432/GaleriaArte?sslmode=require"

# Conexión a la base de datos PostgreSQL en Neon
conn = get_connection()
cursor = conn.cursor()

# Crear extensión para UUID
cursor.execute('''
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
''')

# Crear tablas
cursor.execute('''
CREATE TABLE IF NOT EXISTS Cliente (
    id_cliente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS AgenteGaleria (
    id_agente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS Obra (
    id_obra UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(200),
    artista VARCHAR(100),
    año INT,
    tecnica VARCHAR(100),
    precio DECIMAL(10,2),
    disponible BOOLEAN DEFAULT TRUE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS Venta (
    id_venta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_obra UUID,
    id_cliente UUID,
    id_agente UUID,
    fecha_venta DATE,
    precio_salida DECIMAL(10,2),
    precio_final DECIMAL(10,2),
    comision_agente DECIMAL(10,2),
    FOREIGN KEY (id_obra) REFERENCES Obra(id_obra),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_agente) REFERENCES AgenteGaleria(id_agente)
)
''')

conn.commit()
cursor.close()
conn.close()
