from fastapi import FastAPI, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from models import Cliente, Agentegaleria, Obra, Venta
from gestor_galeria import GestorGaleria


app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Montar la carpeta actual como estáticos
app.mount("/static", StaticFiles(directory=os.path.dirname(__file__)), name="static")

@app.get("/")
def root():
    return {"mensaje": "API GaleriaArte funcionando"}

@app.get("/galeria")
def galeria_html():
    return FileResponse(os.path.join(os.path.dirname(__file__), "GaleriaCris.html"))

@app.get("/clientes")
def get_clientes(
    id_cliente: str = Query(None),
    nombre: str = Query(None),
    email: str = Query(None),
    telefono: str = Query(None),
    direccion: str = Query(None)
):
    gestor = GestorGaleria()
    clientes = gestor.get_clientes()
    if id_cliente is not None:
        clientes = [c for c in clientes if str(c["id_cliente"]) == str(id_cliente)]
    if nombre:
        clientes = [c for c in clientes if nombre.lower() in c["nombre"].lower()]
    if email:
        clientes = [c for c in clientes if email.lower() in c["email"].lower()]
    if telefono:
        clientes = [c for c in clientes if telefono in c["telefono"]]
    if direccion:
        clientes = [c for c in clientes if direccion.lower() in c["direccion"].lower()]
    return clientes

@app.get("/clientes/{id_cliente}")
def get_cliente(id_cliente: str):
    gestor = GestorGaleria()
    return gestor.get_cliente(id_cliente)   ;

@app.post("/clientes")
def create_cliente(
    nombre: str = Form(...),
    email: str = Form(...),
    telefono: str = Form(...),
    direccion: str = Form(...)
):
    cliente = Cliente(nombre=nombre, email=email, telefono=telefono, direccion=direccion)
    gestor = GestorGaleria()
    return gestor.create_cliente(cliente)

@app.delete("/clientes/{id_cliente}")
def delete_cliente(id_cliente: str):
    gestor = GestorGaleria()
    return gestor.delete_cliente(id_cliente)

@app.get("/agentes")
def get_agentes(
    id_agente: str = Query(None),
    nombre: str = Query(None),
    email: str = Query(None),
    telefono: str = Query(None),
    direccion: str = Query(None)
):
    gestor = GestorGaleria()
    agentes = gestor.get_agentes()
    if id_agente is not None:
        agentes = [a for a in agentes if str(a["id_agente"]) == str(id_agente)]
    if nombre:
        agentes = [a for a in agentes if nombre.lower() in a["nombre"].lower()]
    if email:
        agentes = [a for a in agentes if email.lower() in a["email"].lower()]
    if telefono:
        agentes = [a for a in agentes if telefono in a["telefono"]]
    if direccion:
        agentes = [a for a in agentes if direccion.lower() in a["direccion"].lower()]
    return agentes

@app.post("/agentes")
def create_agente(
    nombre: str = Form(...),
    email: str = Form(...),
    telefono: str = Form(...),
    direccion: str = Form(...)
):
    agente = Agentegaleria(nombre=nombre, email=email, telefono=telefono, direccion=direccion)
    gestor = GestorGaleria()
    return gestor.create_agente(agente)

@app.delete("/agentes/{id_agente}")
def delete_agente(id_agente: str):
    gestor = GestorGaleria()
    return gestor.delete_agente(id_agente)

@app.get("/obras")
def get_obras(
    id_obra: str = Query(None),
    titulo: str = Query(None),
    artista: str = Query(None),
    año: int = Query(None),
    tecnica: str = Query(None),
    precio: float = Query(None),
    disponible: bool = Query(None)
):
    gestor = GestorGaleria()
    obras = gestor.get_obras()
    if id_obra is not None:
        obras = [o for o in obras if str(o["id_obra"]) == str(id_obra)]
    if titulo:
        obras = [o for o in obras if titulo.lower() in o["titulo"].lower()]
    if artista:
        obras = [o for o in obras if artista.lower() in o["artista"].lower()]
    if año is not None:
        obras = [o for o in obras if o["año"] == año]
    if tecnica:
        obras = [o for o in obras if tecnica.lower() in o["tecnica"].lower()]
    if precio is not None:
        obras = [o for o in obras if o["precio"] == precio]
    if disponible is not None:
        obras = [o for o in obras if o["disponible"] == disponible]
    return obras

@app.post("/obras")
def create_obra(
    titulo: str = Form(...),
    artista: str = Form(...),
    año: int = Form(...),
    tecnica: str = Form(...),
    precio: float = Form(...),
    disponible: str = Form("True")  # Recibe como string
):
    # Conversión explícita de tipos
    try:
        año = int(año)
    except Exception:
        año = 0
    try:
        precio = float(precio)
    except Exception:
        precio = 0.0
    disponible_bool = True if str(disponible).lower() in ["true", "1", "si", "sí"] else False
    obra = Obra(titulo=titulo, artista=artista, año=año, tecnica=tecnica, precio=precio, disponible=disponible_bool)
    gestor = GestorGaleria()
    return gestor.create_obra(obra)

@app.get("/ventas")
def get_ventas(
    id_venta: str = Query(None),
    id_obra: str = Query(None),
    id_cliente: str = Query(None),
    id_agente: str = Query(None),
    fecha_venta: str = Query(None),
    precio_salida: float = Query(None),
    precio_final: float = Query(None),
    comision_agente: float = Query(None)
):
    gestor = GestorGaleria()
    ventas = gestor.get_ventas()
    if id_venta is not None:
        ventas = [v for v in ventas if str(v["id_venta"]) == str(id_venta)]
    if id_obra is not None:
        ventas = [v for v in ventas if str(v["id_obra"]) == str(id_obra)]
    if id_cliente is not None:
        ventas = [v for v in ventas if str(v["id_cliente"]) == str(id_cliente)]
    if id_agente is not None:
        ventas = [v for v in ventas if str(v["id_agente"]) == str(id_agente)]
    if fecha_venta:
        ventas = [v for v in ventas if fecha_venta in v["fecha_venta"]]
    if precio_salida is not None:
        ventas = [v for v in ventas if v["precio_salida"] == precio_salida]
    if precio_final is not None:
        ventas = [v for v in ventas if v["precio_final"] == precio_final]
    if comision_agente is not None:
        ventas = [v for v in ventas if v["comision_agente"] == comision_agente]
    return ventas

@app.post("/ventas")
def create_venta(
    id_obra: str = Form(...),
    id_cliente: str = Form(...),
    id_agente: str = Form(...),
    fecha_venta: str = Form(...),
    precio_salida: float = Form(...),
    precio_final: float = Form(...),
    comision_agente: float = Form(...)
):
    venta = Venta(
        id_obra=id_obra,
        id_cliente=id_cliente,
        id_agente=id_agente,
        fecha_venta=fecha_venta,
        precio_salida=precio_salida,
        precio_final=precio_final,
        comision_agente=comision_agente
    )
    gestor = GestorGaleria()
    nueva_venta = gestor.create_venta(venta)
    # Obtener los IDs disponibles
    obras = gestor.get_obras()
    clientes = gestor.get_clientes()
    agentes = gestor.get_agentes()
    return {
        "venta": nueva_venta,
        "ids_obras": [o["id_obra"] for o in obras],
        "ids_clientes": [c["id_cliente"] for c in clientes],
        "ids_agentes": [a["id_agente"] for a in agentes]
    }

@app.post("/clientes/form")
def create_cliente_form(
    nombre: str = Form(...),
    email: str = Form(...),
    telefono: str = Form(...),
    direccion: str = Form(...)
):
    cliente = Cliente(nombre=nombre, email=email, telefono=telefono, direccion=direccion)
    gestor = GestorGaleria()
    return gestor.create_cliente(cliente)

@app.post("/agentes/form")
def create_agente_form(
    nombre: str = Form(...),
    email: str = Form(...),
    telefono: str = Form(...),
    direccion: str = Form(...)
):
    agente = Agentegaleria(nombre=nombre, email=email, telefono=telefono, direccion=direccion)
    gestor = GestorGaleria()
    return gestor.create_agente(agente)

@app.post("/obras/form")
def create_obra_form(
    titulo: str = Form(...),
    artista: str = Form(...),
    año: int = Form(...),
    tecnica: str = Form(...),
    precio: float = Form(...),
    disponible: bool = Form(True)
):
    obra = Obra(titulo=titulo, artista=artista, año=año, tecnica=tecnica, precio=precio, disponible=disponible)
    gestor = GestorGaleria()
    return gestor.create_obra(obra)

@app.post("/ventas/form")
def create_venta_form(
    id_obra: str = Form(...),
    id_cliente: str = Form(...),
    id_agente: str = Form(...),
    fecha_venta: str = Form(...),
    precio_salida: float = Form(...),
    precio_final: float = Form(...),
    comision_agente: float = Form(...)
):
    venta = Venta(
        id_obra=id_obra,
        id_cliente=id_cliente,
        id_agente=id_agente,
        fecha_venta=fecha_venta,
        precio_salida=precio_salida,
        precio_final=precio_final,
        comision_agente=comision_agente
    )
    gestor = GestorGaleria()
    return gestor.create_venta(venta)