from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from models import Cliente, Agentegaleria, Obra, Venta
from datetime import datetime, timedelta
import uuid

# URL de conexión correcta para Neon PostgreSQL
DB_URL = "postgresql+psycopg2://GaleriaArte_owner:npg_EK2uSIDJr3OG@ep-mute-sea-a2d5a91w-pooler.eu-central-1.aws.neon.tech:5432/GaleriaArte?sslmode=require"

class GestorGaleria:
    def __init__(self):
        self.engine = create_engine(DB_URL)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
    def __del__(self):
        self.session.close()

    def create_cliente(self, cliente):
        sql = text("""
        INSERT INTO Cliente (nombre, email, telefono, direccion)
        VALUES (:nombre, :email, :telefono, :direccion)
        RETURNING id_cliente;
        """)
        result = self.session.execute(sql, {
            "nombre": cliente.nombre,
            "email": cliente.email,
            "telefono": cliente.telefono,
            "direccion": cliente.direccion
        })
        self.session.commit()
        cliente.id_cliente = result.fetchone()[0]
        return cliente

    def get_clientes(self):
        sql = text("SELECT id_cliente, nombre, email, telefono, direccion FROM Cliente")
        result = self.session.execute(sql)
        clientes = []
        for row in result.fetchall():
            clientes.append({
                "id_cliente": str(row[0]),
                "nombre": row[1],
                "email": row[2],
                "telefono": row[3],
                "direccion": row[4]
            })
        return clientes

    def create_agente(self, agente):
        sql = text("""
        INSERT INTO AgenteGaleria (nombre, email, telefono, direccion)
        VALUES (:nombre, :email, :telefono, :direccion)
        RETURNING id_agente;
        """)
        result = self.session.execute(sql, {
            "nombre": agente.nombre,
            "email": agente.email,
            "telefono": agente.telefono,
            "direccion": agente.direccion
        })
        self.session.commit()
        agente.id_agente = result.fetchone()[0]
        return agente

    def get_agentes(self):
        sql = text("SELECT id_agente, nombre, email, telefono, direccion FROM AgenteGaleria")
        result = self.session.execute(sql)
        agentes = []
        for row in result.fetchall():
            agentes.append({
                "id_agente": str(row[0]),
                "nombre": row[1],
                "email": row[2],
                "telefono": row[3],
                "direccion": row[4]
            })
        return agentes

    def create_obra(self, obra):
        sql = text("""
        INSERT INTO Obra (titulo, artista, año, tecnica, precio, disponible)
        VALUES (:titulo, :artista, :año, :tecnica, :precio, :disponible)
        RETURNING id_obra;
        """)
        result = self.session.execute(sql, {
            "titulo": obra.titulo,
            "artista": obra.artista,
            "año": obra.año,
            "tecnica": obra.tecnica,
            "precio": obra.precio,
            "disponible": obra.disponible
        })
        self.session.commit()
        obra.id_obra = result.fetchone()[0]
        return obra

    def get_obras(self):
        sql = text("SELECT id_obra, titulo, artista, año, tecnica, precio, disponible FROM Obra")
        result = self.session.execute(sql)
        obras = []
        for row in result.fetchall():
            obras.append({
                "id_obra": str(row[0]),
                "titulo": row[1],
                "artista": row[2],
                "año": row[3],
                "tecnica": row[4],
                "precio": float(row[5]),
                "disponible": row[6]
            })
        return obras

    def create_venta(self, venta):
        sql = text("""
        INSERT INTO Venta (id_obra, id_cliente, id_agente, fecha_venta, precio_salida, precio_final, comision_agente)
        VALUES (:id_obra, :id_cliente, :id_agente, :fecha_venta, :precio_salida, :precio_final, :comision_agente)
        RETURNING id_venta;
        """)
        result = self.session.execute(sql, {
            "id_obra": str(venta.id_obra),
            "id_cliente": str(venta.id_cliente),
            "id_agente": str(venta.id_agente),
            "fecha_venta": venta.fecha_venta,
            "precio_salida": venta.precio_salida,
            "precio_final": venta.precio_final,
            "comision_agente": venta.comision_agente
        })
        self.session.commit()
        venta.id_venta = result.fetchone()[0]
        return venta

    def get_ventas(self):
        sql = text("SELECT id_venta, id_obra, id_cliente, id_agente, fecha_venta, precio_salida, precio_final, comision_agente FROM Venta")
        result = self.session.execute(sql)
        ventas = []
        for row in result.fetchall():
            ventas.append({
                "id_venta": str(row[0]),
                "id_obra": str(row[1]),
                "id_cliente": str(row[2]),
                "id_agente": str(row[3]),
                "fecha_venta": str(row[4]),
                "precio_salida": float(row[5]),
                "precio_final": float(row[6]),
                "comision_agente": float(row[7])
            })
        return ventas

    def delete_cliente(self, id_cliente):
        sql = text("DELETE FROM Cliente WHERE id_cliente = %s RETURNING id_cliente;")
        result = self.session.execute(sql, (id_cliente,))
        self.session.commit()
        deleted_id = result.fetchone()
        return {"deleted_id": deleted_id[0] if deleted_id else None}

    def delete_agente(self, id_agente):
        sql = text("DELETE FROM AgenteGaleria WHERE id_agente = %s RETURNING id_agente;")
        result = self.session.execute(sql, (id_agente,))
        self.session.commit()
        deleted_id = result.fetchone()
        return {"deleted_id": deleted_id[0] if deleted_id else None}
