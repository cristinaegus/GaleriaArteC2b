const API_URL = "http://localhost:8020"; // Cambia el puerto si tu backend usa otro

function mostrarSeccion(seccion) {
  document
    .querySelectorAll(".seccion")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(seccion).style.display = "block";
}

// --- Clientes ---
document.getElementById("formCliente").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  await fetch(`${API_URL}/clientes`, {
    method: "POST",
    body: new URLSearchParams(data),
  });
  this.reset();
  cargarClientes();
};

// Nuevo: función para filtrar clientes usando los campos del formulario
async function filtrarClientes() {
  const form = document.getElementById("formCliente");
  const params = new URLSearchParams();
  ["id_cliente", "nombre", "email", "telefono", "direccion"].forEach(
    (campo) => {
      const input = form.elements[campo];
      if (input && input.value) params.append(campo, input.value);
    }
  );
  const res = await fetch(`${API_URL}/clientes?${params.toString()}`);
  const clientes = await res.json();
  const tbody = document.querySelector("#tablaClientes tbody");
  tbody.innerHTML = "";
  if (Array.isArray(clientes)) {
    clientes.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${c.id_cliente ?? ""}</td>
            <td>${c.nombre}</td>
            <td>${c.email}</td>
            <td>${c.telefono}</td>
            <td>${c.direccion}</td>
            <td><button onclick="eliminarCliente(${
              c.id_cliente
            })">Eliminar</button></td>
        `;
      tbody.appendChild(tr);
    });
  } else if (clientes.id_cliente) {
    // Si el backend devuelve un solo cliente como objeto
    const c = clientes;
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${c.id_cliente ?? ""}</td>
            <td>${c.nombre}</td>
            <td>${c.email}</td>
            <td>${c.telefono}</td>
            <td>${c.direccion}</td>
            <td><button onclick="eliminarCliente(${
              c.id_cliente
            })">Eliminar</button></td>
        `;
    tbody.appendChild(tr);
  }
}

// Botón para filtrar clientes (puedes añadirlo en el HTML si lo deseas)
if (!document.getElementById("btnFiltrarCliente")) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnFiltrarCliente";
  btn.textContent = "Buscar/Filtrar";
  btn.onclick = filtrarClientes;
  document.getElementById("formCliente").appendChild(btn);
}

async function cargarClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  const clientes = await res.json();
  const tbody = document.querySelector("#tablaClientes tbody");
  tbody.innerHTML = "";
  clientes.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${c.id_cliente ?? ""}</td>
            <td>${c.nombre}</td>
            <td>${c.email}</td>
            <td>${c.telefono}</td>
            <td>${c.direccion}</td>
            <td><button onclick="eliminarCliente(${
              c.id_cliente
            })">Eliminar</button></td>
        `;
    tbody.appendChild(tr);
  });
}
async function eliminarCliente(id) {
  if (confirm("¿Eliminar cliente?")) {
    await fetch(`${API_URL}/clientes/${id}`, { method: "DELETE" });
    cargarClientes();
  }
}

// --- Agentes ---
document.getElementById("formAgente").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  await fetch(`${API_URL}/agentes`, {
    method: "POST",
    body: new URLSearchParams(data),
  });
  this.reset();
  cargarAgentes();
};

async function filtrarAgentes() {
  const form = document.getElementById("formAgente");
  const params = new URLSearchParams();
  ["id_agente", "nombre", "email", "telefono", "direccion"].forEach((campo) => {
    const input = form.elements[campo];
    if (input && input.value) params.append(campo, input.value);
  });
  const res = await fetch(`${API_URL}/agentes?${params.toString()}`);
  const agentes = await res.json();
  const tbody = document.querySelector("#tablaAgentes tbody");
  tbody.innerHTML = "";
  if (Array.isArray(agentes)) {
    agentes.forEach((a) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${a.id_agente ?? ""}</td>
            <td>${a.nombre}</td>
            <td>${a.email}</td>
            <td>${a.telefono}</td>
            <td>${a.direccion}</td>
            <td><button onclick=\"eliminarAgente(${
              a.id_agente
            })\">Eliminar</button></td>
        `;
      tbody.appendChild(tr);
    });
  } else if (agentes.id_agente) {
    const a = agentes;
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${a.id_agente ?? ""}</td>
            <td>${a.nombre}</td>
            <td>${a.email}</td>
            <td>${a.telefono}</td>
            <td>${a.direccion}</td>
            <td><button onclick=\"eliminarAgente(${
              a.id_agente
            })\">Eliminar</button></td>
        `;
    tbody.appendChild(tr);
  }
}
if (!document.getElementById("btnFiltrarAgente")) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnFiltrarAgente";
  btn.textContent = "Buscar/Filtrar";
  btn.onclick = filtrarAgentes;
  document.getElementById("formAgente").appendChild(btn);
}

async function cargarAgentes() {
  const res = await fetch(`${API_URL}/agentes`);
  const agentes = await res.json();
  const tbody = document.querySelector("#tablaAgentes tbody");
  tbody.innerHTML = "";
  agentes.forEach((a) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${a.id_agente ?? ""}</td>
            <td>${a.nombre}</td>
            <td>${a.email}</td>
            <td>${a.telefono}</td>
            <td>${a.direccion}</td>
            <td><button onclick="eliminarAgente(${
              a.id_agente
            })">Eliminar</button></td>
        `;
    tbody.appendChild(tr);
  });
}
async function eliminarAgente(id) {
  if (confirm("¿Eliminar agente?")) {
    await fetch(`${API_URL}/agentes/${id}`, { method: "DELETE" });
    cargarAgentes();
  }
}

// --- Obras ---
document.getElementById("formObra").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  await fetch(`${API_URL}/obras`, {
    method: "POST",
    body: new URLSearchParams(data),
  });
  this.reset();
  cargarObras();
};

async function filtrarObras() {
  const form = document.getElementById("formObra");
  const params = new URLSearchParams();
  [
    "id_obra",
    "titulo",
    "artista",
    "año",
    "tecnica",
    "precio",
    "disponible",
  ].forEach((campo) => {
    const input = form.elements[campo];
    if (input && input.value) params.append(campo, input.value);
  });
  const res = await fetch(`${API_URL}/obras?${params.toString()}`);
  const obras = await res.json();
  const tbody = document.querySelector("#tablaObras tbody");
  tbody.innerHTML = "";
  if (Array.isArray(obras)) {
    obras.forEach((o) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${o.id_obra ?? ""}</td>
            <td>${o.titulo}</td>
            <td>${o.artista}</td>
            <td>${o.año}</td>
            <td>${o.tecnica}</td>
            <td>${o.precio}</td>
            <td>${o.disponible ? "Sí" : "No"}</td>
        `;
      tbody.appendChild(tr);
    });
  } else if (obras.id_obra) {
    const o = obras;
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${o.id_obra ?? ""}</td>
            <td>${o.titulo}</td>
            <td>${o.artista}</td>
            <td>${o.año}</td>
            <td>${o.tecnica}</td>
            <td>${o.precio}</td>
            <td>${o.disponible ? "Sí" : "No"}</td>
        `;
    tbody.appendChild(tr);
  }
}
if (!document.getElementById("btnFiltrarObra")) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnFiltrarObra";
  btn.textContent = "Buscar/Filtrar";
  btn.onclick = filtrarObras;
  document.getElementById("formObra").appendChild(btn);
}

async function cargarObras() {
  const res = await fetch(`${API_URL}/obras`);
  const obras = await res.json();
  const tbody = document.querySelector("#tablaObras tbody");
  tbody.innerHTML = "";
  obras.forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${o.id_obra ?? ""}</td>
            <td>${o.titulo}</td>
            <td>${o.artista}</td>
            <td>${o.año}</td>
            <td>${o.tecnica}</td>
            <td>${o.precio}</td>
            <td>${o.disponible ? "Sí" : "No"}</td>
        `;
    tbody.appendChild(tr);
  });
}

// --- Ventas ---
document.getElementById("formVenta").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  await fetch(`${API_URL}/ventas`, {
    method: "POST",
    body: new URLSearchParams(data),
  });
  this.reset();
  cargarVentas();
};

async function filtrarVentas() {
  const form = document.getElementById("formVenta");
  const params = new URLSearchParams();
  [
    "id_venta",
    "id_obra",
    "id_cliente",
    "id_agente",
    "fecha_venta",
    "precio_salida",
    "precio_final",
    "comision_agente",
  ].forEach((campo) => {
    const input = form.elements[campo];
    if (input && input.value) params.append(campo, input.value);
  });
  const res = await fetch(`${API_URL}/ventas?${params.toString()}`);
  const ventas = await res.json();
  const tbody = document.querySelector("#tablaVentas tbody");
  tbody.innerHTML = "";
  if (Array.isArray(ventas)) {
    ventas.forEach((v) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${v.id_venta ?? ""}</td>
            <td>${v.id_obra}</td>
            <td>${v.id_cliente}</td>
            <td>${v.id_agente}</td>
            <td>${v.fecha_venta}</td>
            <td>${v.precio_salida}</td>
            <td>${v.precio_final}</td>
            <td>${v.comision_agente}</td>
        `;
      tbody.appendChild(tr);
    });
  } else if (ventas.id_venta) {
    const v = ventas;
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${v.id_venta ?? ""}</td>
            <td>${v.id_obra}</td>
            <td>${v.id_cliente}</td>
            <td>${v.id_agente}</td>
            <td>${v.fecha_venta}</td>
            <td>${v.precio_salida}</td>
            <td>${v.precio_final}</td>
            <td>${v.comision_agente}</td>
        `;
    tbody.appendChild(tr);
  }
}
if (!document.getElementById("btnFiltrarVenta")) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnFiltrarVenta";
  btn.textContent = "Buscar/Filtrar";
  btn.onclick = filtrarVentas;
  document.getElementById("formVenta").appendChild(btn);
}

async function cargarVentas() {
  const res = await fetch(`${API_URL}/ventas`);
  const ventas = await res.json();
  const tbody = document.querySelector("#tablaVentas tbody");
  tbody.innerHTML = "";
  ventas.forEach((v) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${v.id_venta ?? ""}</td>
            <td>${v.id_obra}</td>
            <td>${v.id_cliente}</td>
            <td>${v.id_agente}</td>
            <td>${v.fecha_venta}</td>
            <td>${v.precio_salida}</td>
            <td>${v.precio_final}</td>
            <td>${v.comision_agente}</td>
        `;
    tbody.appendChild(tr);
  });
}

// --- Navegación por pestañas ---
function showTab(tab) {
  document
    .querySelectorAll(".tab-content")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(tab).style.display = "block";
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const idx = ["clientes", "agentes", "obras", "ventas"].indexOf(tab);
  if (idx >= 0)
    document.querySelectorAll(".tab-btn")[idx].classList.add("active");
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  cargarAgentes();
  cargarObras();
  cargarVentas();
  showTab("clientes");
});
