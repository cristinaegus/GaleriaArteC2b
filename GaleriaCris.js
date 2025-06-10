const API_URL = "http://localhost:8020"; // Cambia el puerto si tu backend usa otro

function mostrarSeccion(seccion) {
  document
    .querySelectorAll(".seccion")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(seccion).style.display = "block";
}

// --- Clientes ---
const formCliente = document.getElementById("formCliente");
if (formCliente) {
  formCliente.onsubmit = async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    await fetch(`${API_URL}/clientes`, {
      method: "POST",
      body: new URLSearchParams(data),
    });
    this.reset();
    cargarClientes();
  };
}

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
  const form = document.getElementById("formCliente");
  if (form) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarCliente";
    btn.textContent = "Buscar/Filtrar";
    btn.onclick = filtrarClientes;
    form.appendChild(btn);
  }
}

async function cargarClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  const clientes = await res.json();
  window.clientesCache = clientes;
  const tbody = document.querySelector("#tablaClientes tbody");
  if (!tbody) return; // Evita error si no existe la tabla
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
const formAgente = document.getElementById("formAgente");
if (formAgente) {
  formAgente.onsubmit = async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    await fetch(`${API_URL}/agentes`, {
      method: "POST",
      body: new URLSearchParams(data),
    });
    this.reset();
    cargarAgentes();
  };
}

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
  const form = document.getElementById("formAgente");
  if (form) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarAgente";
    btn.textContent = "Buscar/Filtrar";
    btn.onclick = filtrarAgentes;
    form.appendChild(btn);
  }
}

async function cargarAgentes() {
  const res = await fetch(`${API_URL}/agentes`);
  const agentes = await res.json();
  window.agentesCache = agentes;
  const tbody = document.querySelector("#tablaAgentes tbody");
  if (!tbody) return; // Evita error si no existe la tabla
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
const formObra = document.getElementById("formObra");
if (formObra) {
  formObra.onsubmit = async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    await fetch(`${API_URL}/obras`, {
      method: "POST",
      body: new URLSearchParams(data),
    });
    this.reset();
    cargarObras();
  };
}

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
  const form = document.getElementById("formObra");
  if (form) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarObra";
    btn.textContent = "Buscar/Filtrar";
    btn.onclick = filtrarObras;
    form.appendChild(btn);
  }
}

async function cargarObras() {
  const res = await fetch(`${API_URL}/obras`);
  const obras = await res.json();
  window.obrasCache = obras;
  const tbody = document.querySelector("#tablaObras tbody");
  if (!tbody) return; // Evita error si no existe la tabla
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
const formVenta = document.getElementById("formVenta");
if (formVenta) {
  formVenta.onsubmit = async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    // No modificar los IDs, se envían como string
    try {
      const res = await fetch(`${API_URL}/ventas`, {
        method: "POST",
        body: new URLSearchParams(data),
      });
      if (!res.ok) {
        const error = await res.text();
        alert("Error al registrar venta: " + error);
      }
    } catch (err) {
      alert("Error de red al registrar venta: " + err);
    }
    this.reset();
    cargarVentas();
    actualizarSelectsVenta(); // Actualizar selects tras registrar venta
  };
}

async function filtrarVentas() {
  const form = document.getElementById("formVenta");
  if (!form) return;
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
  if (!tbody) return;
  tbody.innerHTML = "";
  if (Array.isArray(ventas)) {
    ventas.forEach((v) => {
      let cliente = "";
      let agente = "";
      let tituloObra = "";
      if (window.clientesCache) {
        const c = window.clientesCache.find(
          (cli) => cli.id_cliente === v.id_cliente
        );
        if (c) cliente = c.nombre;
      }
      if (window.agentesCache) {
        const a = window.agentesCache.find(
          (ag) => ag.id_agente === v.id_agente
        );
        if (a) agente = a.nombre;
      }
      if (window.obrasCache) {
        const o = window.obrasCache.find(
          (ob) => String(ob.id_obra) === String(v.id_obra)
        );
        if (o) tituloObra = o.titulo;
      }
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${v.id_venta ?? ""}</td>
            <td>${v.id_obra}</td>
            <td>${tituloObra}</td>
            <td>${v.id_cliente}</td>
            <td>${cliente}</td>
            <td>${v.id_agente}</td>
            <td>${agente}</td>
            <td>${v.fecha_venta}</td>
            <td>${v.precio_salida}</td>
            <td>${v.precio_final}</td>
            <td>${v.comision_agente}</td>
        `;
      tbody.appendChild(tr);
    });
  } else if (ventas && ventas.id_venta) {
    // Si el backend devuelve un solo objeto
    let cliente = "";
    let agente = "";
    let tituloObra = "";
    if (window.clientesCache) {
      const c = window.clientesCache.find(
        (cli) => cli.id_cliente === ventas.id_cliente
      );
      if (c) cliente = c.nombre;
    }
    if (window.agentesCache) {
      const a = window.agentesCache.find(
        (ag) => ag.id_agente === ventas.id_agente
      );
      if (a) agente = a.nombre;
    }
    if (window.obrasCache) {
      const o = window.obrasCache.find(
        (ob) => String(ob.id_obra) === String(ventas.id_obra)
      );
      if (o) tituloObra = o.titulo;
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${ventas.id_venta ?? ""}</td>
            <td>${ventas.id_obra}</td>
            <td>${tituloObra}</td>
            <td>${ventas.id_cliente}</td>
            <td>${cliente}</td>
            <td>${ventas.id_agente}</td>
            <td>${agente}</td>
            <td>${ventas.fecha_venta}</td>
            <td>${ventas.precio_salida}</td>
            <td>${ventas.precio_final}</td>
            <td>${ventas.comision_agente}</td>
        `;
    tbody.appendChild(tr);
  }
}
if (!document.getElementById("btnFiltrarVenta")) {
  const form = document.getElementById("formVenta");
  if (form) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarVenta";
    btn.textContent = "Buscar/Filtrar";
    btn.onclick = filtrarVentas;
    form.appendChild(btn);
  }
}

async function cargarVentas() {
  const res = await fetch(`${API_URL}/ventas`);
  const ventas = await res.json();
  const tbody = document.querySelector("#tablaVentas tbody");
  if (!tbody) return; // Evita error si no existe la tabla
  tbody.innerHTML = "";
  ventas.forEach((v) => {
    // Buscar nombres de cliente, agente y título de obra
    let cliente = "";
    let agente = "";
    let tituloObra = "";
    if (window.clientesCache) {
      const c = window.clientesCache.find(
        (cli) => cli.id_cliente === v.id_cliente
      );
      if (c) cliente = c.nombre;
    }
    if (window.agentesCache) {
      const a = window.agentesCache.find((ag) => ag.id_agente === v.id_agente);
      if (a) agente = a.nombre;
    }
    if (window.obrasCache) {
      const o = window.obrasCache.find(
        (ob) => String(ob.id_obra) === String(v.id_obra)
      );
      if (o) tituloObra = o.titulo;
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${v.id_venta ?? ""}</td>
            <td>${v.id_obra}</td>
            <td>${tituloObra}</td>
            <td>${v.id_cliente}</td>
            <td>${cliente}</td>
            <td>${v.id_agente}</td>
            <td>${agente}</td>
            <td>${v.fecha_venta}</td>
            <td>${v.precio_salida}</td>
            <td>${v.precio_final}</td>
            <td>${v.comision_agente}</td>
        `;
    tbody.appendChild(tr);
  });
}

// --- Selects dinámicos para ventas ---
async function actualizarSelectsVenta() {
  const selectObra = document.getElementById("selectObra");
  const selectCliente = document.getElementById("selectCliente");
  const selectAgente = document.getElementById("selectAgente");
  if (!selectObra || !selectCliente || !selectAgente) return; // Evita error si no existen los selects

  // Obras disponibles (solo disponibles)
  const resObras = await fetch(`${API_URL}/obras?disponible=true`);
  const obras = await resObras.json();
  selectObra.innerHTML = '<option value="">Seleccione Obra</option>';
  obras.forEach((o) => {
    selectObra.innerHTML += `<option value="${o.id_obra}">${o.titulo} (${o.artista}) [${o.id_obra}]</option>`;
  });

  // Clientes
  const resClientes = await fetch(`${API_URL}/clientes`);
  const clientes = await resClientes.json();
  selectCliente.innerHTML = '<option value="">Seleccione Cliente</option>';
  clientes.forEach((c) => {
    selectCliente.innerHTML += `<option value="${c.id_cliente}">${c.nombre} [${c.id_cliente}]</option>`;
  });

  // Agentes
  const resAgentes = await fetch(`${API_URL}/agentes`);
  const agentes = await resAgentes.json();
  selectAgente.innerHTML = '<option value="">Seleccione Agente</option>';
  agentes.forEach((a) => {
    selectAgente.innerHTML += `<option value="${a.id_agente}">${a.nombre} [${a.id_agente}]</option>`;
  });
}

// --- Filtrado avanzado por obra en ventas ---
function crearSelectFiltrarObraVentas() {
  // Solo en la página de ventas
  if (!document.getElementById("selectFiltrarObraVentas")) {
    const contenedor = document.getElementById("contenedorFiltrarObraVentas");
    if (!contenedor) return;
    const label = document.createElement("label");
    label.textContent = "Filtrar ventas por obra: ";
    label.htmlFor = "selectFiltrarObraVentas";
    const select = document.createElement("select");
    select.id = "selectFiltrarObraVentas";
    select.innerHTML = '<option value="">Seleccione una obra</option>';
    if (window.obrasCache) {
      window.obrasCache.forEach((o) => {
        select.innerHTML += `<option value="${o.id_obra}">${o.titulo} (${o.artista}) [${o.id_obra}]</option>`;
      });
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarPorObraVentas";
    btn.textContent = "Buscar/Filtrar por Obra";
    btn.onclick = filtrarPorObraEnVentas;
    contenedor.appendChild(label);
    contenedor.appendChild(select);
    contenedor.appendChild(btn);
    // Crear tabla de resultados si no existe
    if (!document.getElementById("tablaFiltrarObraVentas")) {
      const tabla = document.createElement("table");
      tabla.id = "tablaFiltrarObraVentas";
      tabla.innerHTML = `
        <thead><tr>
          <th>ID Obra</th><th>Título</th><th>Artista</th><th>Comprador</th><th>Agente</th><th>Fecha</th><th>Precio salida</th>
        </tr></thead>
        <tbody></tbody>
      `;
      contenedor.appendChild(tabla);
    }
  }
}

async function filtrarPorObraEnVentas() {
  const select = document.getElementById("selectFiltrarObraVentas");
  const idObra = select ? select.value : "";
  const tbody = document.querySelector("#tablaFiltrarObraVentas tbody");
  if (!idObra || !tbody) {
    tbody &&
      (tbody.innerHTML = "<tr><td colspan='7'>Seleccione una obra</td></tr>");
    return;
  }
  // Buscar ventas de esa obra
  const res = await fetch(`${API_URL}/ventas?id_obra=${idObra}`);
  const ventas = await res.json();
  tbody.innerHTML = "";
  let ventasArr = Array.isArray(ventas)
    ? ventas
    : ventas.id_venta
    ? [ventas]
    : [];
  if (ventasArr.length === 0) {
    tbody.innerHTML =
      "<tr><td colspan='7'>No hay ventas para esta obra</td></tr>";
    return;
  }
  ventasArr.forEach((v) => {
    let obra =
      window.obrasCache &&
      window.obrasCache.find((o) => o.id_obra === v.id_obra);
    let cliente =
      window.clientesCache &&
      window.clientesCache.find((c) => c.id_cliente === v.id_cliente);
    let agente =
      window.agentesCache &&
      window.agentesCache.find((a) => a.id_agente === v.id_agente);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${obra ? obra.id_obra : v.id_obra}</td>
      <td>${obra ? obra.titulo : ""}</td>
      <td>${obra ? obra.artista : ""}</td>
      <td>${cliente ? cliente.nombre : v.id_cliente}</td>
      <td>${agente ? agente.nombre : v.id_agente}</td>
      <td>${v.fecha_venta}</td>
      <td>${v.precio_salida}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Llamar a la creación del select y tabla al cargar ventas
function inicializarFiltradoPorObraVentas() {
  crearSelectFiltrarObraVentas();
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  cargarAgentes();
  cargarObras();
  cargarVentas();
  actualizarSelectsVenta(); // Poblar selects al cargar
  inicializarFiltradoPorObraVentas(); // Nuevo: inicializar filtrado por obra en ventas
  showTab("clientes");
});

// --- Navegación por pestañas ---
function showTab(tab) {
  const tabContent = document.getElementById(tab);
  if (!tabContent) return; // Evita error si no existe la sección
  document
    .querySelectorAll(".tab-content")
    .forEach((sec) => (sec.style.display = "none"));
  tabContent.style.display = "block";
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const idx = ["clientes", "agentes", "obras", "ventas"].indexOf(tab);
  if (idx >= 0)
    document.querySelectorAll(".tab-btn")[idx].classList.add("active");
}

// --- Filtrado específico por obra en ventas ---
async function filtrarPorObraEnVentas() {
  const selectObra = document.getElementById("selectObra");
  if (!selectObra || !selectObra.value) {
    alert("Seleccione una obra para filtrar.");
    return;
  }
  const idObra = selectObra.value;
  // Buscar ventas de esa obra
  const res = await fetch(`${API_URL}/ventas?id_obra=${idObra}`);
  const ventas = await res.json();
  // Buscar info de la obra
  const obra = window.obrasCache?.find((o) => o.id_obra == idObra);
  // Limpiar tabla previa si existe
  let tablaDetalle = document.getElementById("tablaDetalleObraVenta");
  if (tablaDetalle) tablaDetalle.remove();
  // Crear tabla nueva
  tablaDetalle = document.createElement("table");
  tablaDetalle.id = "tablaDetalleObraVenta";
  tablaDetalle.className = "tabla-detalle-obra";
  let html = `<thead><tr><th>ID Obra</th><th>Título</th><th>Artista</th><th>Año</th><th>Técnica</th><th>Precio salida</th><th>Comprador</th><th>Agente</th><th>Fecha venta</th></tr></thead><tbody>`;
  if (Array.isArray(ventas) && ventas.length > 0) {
    ventas.forEach((v) => {
      const cliente = window.clientesCache?.find(
        (c) => c.id_cliente === v.id_cliente
      );
      const agente = window.agentesCache?.find(
        (a) => a.id_agente === v.id_agente
      );
      html += `<tr>
        <td>${obra?.id_obra ?? v.id_obra}</td>
        <td>${obra?.titulo ?? ""}</td>
        <td>${obra?.artista ?? ""}</td>
        <td>${obra?.año ?? ""}</td>
        <td>${obra?.tecnica ?? ""}</td>
        <td>${v.precio_salida}</td>
        <td>${cliente ? cliente.nombre : v.id_cliente}</td>
        <td>${agente ? agente.nombre : v.id_agente}</td>
        <td>${v.fecha_venta}</td>
      </tr>`;
    });
  } else if (ventas && ventas.id_venta) {
    const v = ventas;
    const cliente = window.clientesCache?.find(
      (c) => c.id_cliente === v.id_cliente
    );
    const agente = window.agentesCache?.find(
      (a) => a.id_agente === v.id_agente
    );
    html += `<tr>
        <td>${obra?.id_obra ?? v.id_obra}</td>
        <td>${obra?.titulo ?? ""}</td>
        <td>${obra?.artista ?? ""}</td>
        <td>${obra?.año ?? ""}</td>
        <td>${obra?.tecnica ?? ""}</td>
        <td>${v.precio_salida}</td>
        <td>${cliente ? cliente.nombre : v.id_cliente}</td>
        <td>${agente ? agente.nombre : v.id_agente}</td>
        <td>${v.fecha_venta}</td>
      </tr>`;
  } else {
    html += `<tr><td colspan="9">No hay ventas para esta obra.</td></tr>`;
  }
  html += "</tbody>";
  tablaDetalle.innerHTML = html;
  // Insertar tabla debajo del formulario de ventas
  const formVenta = document.getElementById("formVenta");
  if (formVenta) {
    formVenta.parentNode.insertBefore(tablaDetalle, formVenta.nextSibling);
  }
}
// Botón para filtrar por obra en ventas (si no existe)
if (!document.getElementById("btnFiltrarPorObraVenta")) {
  const formVenta = document.getElementById("formVenta");
  if (formVenta) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnFiltrarPorObraVenta";
    btn.textContent = "Buscar/Filtrar por Obra";
    btn.style.marginLeft = "1em";
    btn.onclick = filtrarPorObraEnVentas;
    formVenta.appendChild(btn);
  }
}
