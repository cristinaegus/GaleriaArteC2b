from pydantic import BaseModel
from typing import Optional
from fastapi import Form
from uuid import UUID

class Cliente(BaseModel):
    id_cliente: Optional[UUID] = None
    nombre: str
    email: str
    telefono: str
    direccion: str

    @classmethod
    def as_form(cls, nombre: str = Form(...), email: str = Form(...), telefono: str = Form(...), direccion: str = Form(...)):
        return cls(nombre=nombre, email=email, telefono=telefono, direccion=direccion)

class Agentegaleria(BaseModel):
    id_agente: Optional[UUID] = None
    nombre: str
    email: str
    telefono: str
    direccion: str

    @classmethod
    def as_form(cls, nombre: str = Form(...), email: str = Form(...), telefono: str = Form(...), direccion: str = Form(...)):
        return cls(nombre=nombre, email=email, telefono=telefono, direccion=direccion)

class Obra(BaseModel):
    id_obra: Optional[UUID] = None
    titulo: str
    artista: str
    año: int
    tecnica: str
    precio: float
    disponible: Optional[bool] = True

    @classmethod
    def as_form(cls, titulo: str = Form(...), artista: str = Form(...), año: int = Form(...), tecnica: str = Form(...), precio: float = Form(...), disponible: Optional[bool] = Form(True)):
        return cls(titulo=titulo, artista=artista, año=año, tecnica=tecnica, precio=precio, disponible=disponible)

class Venta(BaseModel):
    id_venta: Optional[UUID] = None
    id_obra: UUID
    id_cliente: UUID
    id_agente: UUID
    fecha_venta: str
    precio_salida: float
    precio_final: float
    comision_agente: float

    @classmethod
    def as_form(cls, id_obra: UUID = Form(...), id_cliente: UUID = Form(...), id_agente: UUID = Form(...), fecha_venta: str = Form(...), precio_salida: float = Form(...), precio_final: float = Form(...), comision_agente: float = Form(...)):
        return cls(id_obra=id_obra, id_cliente=id_cliente, id_agente=id_agente, fecha_venta=fecha_venta, precio_salida=precio_salida, precio_final=precio_final, comision_agente=comision_agente)
