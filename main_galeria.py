from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import Cliente, Agentegaleria, Obra, Venta
from gestor_galeria import GestorGaleria
import os
import pydantic

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.get("/")
def root():
    return {"mensaje": "API GaleriaArte funcionando"}

@app.get("/clientes")
def get_clientes():
    gestor = GestorGaleria()
    return gestor.get_clientes()

@app.post("/clientes")
def create_cliente(cliente: Cliente = Depends(Cliente.as_form)):
    gestor = GestorGaleria()
    return gestor.create_cliente(cliente)

@app.get("/agentes")
def get_agentes():
    gestor = GestorGaleria()
    return gestor.get_agentes()

@app.post("/agentes")
def create_agente(agente: Agentegaleria = Depends(Agentegaleria.as_form)):
    gestor = GestorGaleria()
    return gestor.create_agente(agente)

@app.get("/obras")
def get_obras():
    gestor = GestorGaleria()
    return gestor.get_obras()

@app.post("/obras")
def create_obra(obra: Obra = Depends(Obra.as_form)):
    gestor = GestorGaleria()
    return gestor.create_obra(obra)

@app.get("/ventas")
def get_ventas():
    gestor = GestorGaleria()
    return gestor.get_ventas()

@app.post("/ventas")
def create_venta(venta: Venta = Depends(Venta.as_form)):
    gestor = GestorGaleria()
    return gestor.create_venta(venta)