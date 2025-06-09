from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/")
def root():
    return {"mensaje": "API GaleriaArte funcionando"}

@app.get("/clientes")
def get_clientes(cliente: Cliente ):
    print(cliente)  
    gestor = GestorGaleria()
    if cliente.id_cliente:
        return gestor.get_clientes(cliente.id_cliente, cliente.nombre, cliente.email, cliente.telefono, cliente.direccion)
    return {
        "id_cliente": cliente.id_cliente,
        "nombre": cliente.nombre,
        "email": cliente.email,
        "telefono": cliente.telefono,
        "direccion": cliente.direccion
    }
@app.get("/clientes/{id_cliente}")
def get_cliente(id_cliente: int):
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
def delete_cliente(id_cliente: int):
    gestor = GestorGaleria()
    return gestor.delete_cliente(id_cliente)

@app.get("/agentes")
def get_agentes():
    gestor = GestorGaleria()
    return gestor.get_agentes()

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
def delete_agente(id_agente: int):
    gestor = GestorGaleria()
    return gestor.delete_agente(id_agente)

@app.get("/obras")
def get_obras():
    gestor = GestorGaleria()
    return gestor.get_obras()

@app.post("/obras")
def create_obra(
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

@app.get("/ventas")
def get_ventas():
    gestor = GestorGaleria()
    return gestor.get_ventas()

@app.post("/ventas")
def create_venta(
    id_obra: int = Form(...),
    id_cliente: int = Form(...),
    id_agente: int = Form(...),
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
    id_obra: int = Form(...),
    id_cliente: int = Form(...),
    id_agente: int = Form(...),
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