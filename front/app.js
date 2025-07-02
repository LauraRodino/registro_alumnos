// ===========================
// Archivo app.js
// Contiene las funciones principales de interacción con el backend (API)
// para gestionar estudiantes, carreras y categorías.
//DEFINICIÓN DE URLS Y HEADERS: se definen las URLs de la API para estudiantes,carreras y categorias, asi como los headers necesarios para las peticiones.
// ===========================
const API_STUDENTS_URL = "http://localhost:5001/api/students";
const API_CAREERS_URL = "http://localhost:5001/api/careers";
const API_CATEGORIES_URL = "http://localhost:5001/api/categories";
const API_KEY = "12345ABCDEF";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
};
// Servicios de comunicación con la API: se crean funciones asíncronas para: registrar, buscar y eliminar estudiantes. Registrar, buscar y eliminar carreras y categorias. Estas funciones usan fetch para  enviar y recibir datos del backend.
// Servicio para registrar un nuevo estudiante en la API
// Recibe nombre y carrera, los envía por POST
async function registerStudentService(name, career) {
    const response = await fetch(API_STUDENTS_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, career })
    });
    return response.json();
}
// Servicio para obtener un estudiante por ID (GET)
// Devuelve los datos del estudiante solicitado
async function getStudentByIdService(id) {
    const response = await fetch(`${API_STUDENTS_URL}/${id}`, {
        method: "GET",
        headers
    });
    return response.json();
}
// Servicio para obtener estudiantes por carrera (GET)
// Se utiliza para mostrar estudiantes filtrados por carrera
async function getStudentsByCareerService(career) {
    const response = await fetch(`${API_STUDENTS_URL}?career=${career}`, {
        method: "GET",
        headers
    });
    return response.json();
}

//servicio para eliminar un estudiante por ID
async function deleteStudentService(id) {
    const response = await fetch(`${API_STUDENTS_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    return response.json();
}
// Servicio para obtener todas las carreras registradas en la API
// Se usa para llenar el desplegable de selección de carrera
async function getAllCareersService() {
    const response = await fetch(API_CAREERS_URL, {
        method: "GET",
        headers
    });
    return response.json();
}
// Servicio para obtener todos los estudiantes
// ⚠️ Actualmente no se usa si no hay tabla visible
async function getAllStudentsService() {
    const response = await fetch(API_STUDENTS_URL, {
        headers
    });
    return response.json();
}

// Servicio para guardar una categoría. Toma los datos del formulario y los envía por POST a la API
async function registerCategoryService(nombre) {
    const response = await fetch(API_CATEGORIES_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: nombre })
    });
    return response.json();
}

// Servicio para buscar una categoría por ID
async function getCategoryByIdService(id) {
    const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
        method: "GET",
        headers
    });
    return response.json();
}

// Servicio para eliminar una categoría por ID
async function deleteCategoryService(id) {
    const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    return response.json();
}

// Servicio para registrar una nueva carrera en la API
async function registerCareersService(name, code = null, category, duration, type) {
    //Random de 4 digitos para code
    code = Math.floor(1000 + Math.random() * 9000).toString(); // Genera un código aleatorio de 4 dígitos
    const response = await fetch(API_CAREERS_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, code, category, duration, type })
    });
    return response.json();
}

// Servicio para eliminar un estudiante por ID
async function deleteStudentService(id) {
    const response = await fetch(`${API_STUDENTS_URL}/${id}`, {
        method: "DELETE",
        headers
    });
    return response.json();
}

// Validaciones
// Valida que los campos de nombre y carrera estén completos
// Luego llama a la función de registro
function validateAndRegister() {
    const name = document.getElementById('registerName')?.value.trim();
    const career = document.getElementById('registerCareer')?.value.trim();
    const error = document.getElementById('registerError');
    if (!name || !career) {
       error.classList.remove('d-none'); // Para mostrar
error.classList.add('d-none');    // Para ocultar
    } else {
        error.style.display = 'none';
        registerStudent();
    }
}
// Valida que se haya ingresado un ID antes de buscar estudiante
function validateAndGetStudent() {
    const id = document.getElementById('studentId')?.value.trim();
    const error = document.getElementById('getError');
    if (!id) {
        error.classList.remove('d-none'); // Para mostrar
error.classList.add('d-none');    // Para ocultar
    } else {
        error.style.display = 'none';
        getStudentById();
    }
}




// Funciones de lógica principal: Se implementan funciones que validan los datos ingresados por el usuario en los formularios. Llaman a los servicios de la API. Muestran mensajes de éxito o error usando alertas según la repuesta de la API. Actualizan la interfaz, limpiando campos o mostrando resultados.
// Registra un nuevo estudiante y muestra una alerta de éxito o error
// Limpia los campos del formulario y actualiza la tabla (si existe)
async function registerStudent() {
    const name = document.getElementById('registerName')?.value.trim();
    const career = document.getElementById('registerCareer')?.value.trim();
    const resultContainer = document.getElementById('registerResult');

    try {
        const result = await registerStudentService(name, career);
        Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            showConfirmButton: false,
            timer: 1500
        });
        resultContainer.innerHTML = `
            <strong>¡Registro exitoso!</strong><br>
            <strong>ID:</strong> ${result.student.id}<br>
            <strong>Nombre:</strong> ${result.student.name}<br>
            <strong>Carrera:</strong> ${result.student.career}
        `;
        document.getElementById('registerName').value = '';
        document.getElementById('registerCareer').value = '';
        await cargarTablaEstudiantes();
    } catch (error) {
        console.error("Error registrando estudiante:", error);
        Swal.fire("Error", "No se pudo registrar el estudiante.", "error");
    }
}
// Busca un estudiante por ID y muestra sus datos en pantalla
async function getStudentById() {
    const id = document.getElementById('studentId')?.value.trim();
    const resultContainer = document.getElementById('getResult');

    try {
        const student = await getStudentByIdService(id);
        if (student.error) {
            resultContainer.textContent = student.error;
        } else {
            resultContainer.innerHTML = `
                <strong>ID:</strong> ${student.id}<br>
                <strong>Nombre:</strong> ${student.name}<br>
                <strong>Carrera:</strong> ${student.career}
            `;
        }
    } catch (error) {
        console.error("Error obteniendo estudiante:", error);
        resultContainer.textContent = "Error al buscar el estudiante.";
    }
}
// Busca estudiantes según la carrera seleccionada
// Muestra los resultados con formato
async function getStudentsByCareer() {
    const career = document.getElementById('careerFilter')?.value.trim();
    const resultContainer = document.getElementById('careerResult');

    // ✅ Ya se validó antes, así que
    //  no volvemos a chequear si career está vacío

    try {
        const students = await getStudentsByCareerService(career);
        
        if (students.length === 0) {
            resultContainer.textContent = "No se encontraron estudiantes para esa carrera.";
            return;
        }

        resultContainer.innerHTML = '';
        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student-card');
            studentDiv.innerHTML = `
                <strong>ID:</strong> ${student.id}<br>
                <strong>Nombre:</strong> ${student.name}<br>
                <strong>Carrera:</strong> ${student.career}
            `;
            resultContainer.appendChild(studentDiv);
            resultContainer.appendChild(document.createElement('hr'));
        });
    } catch (error) {
        console.error("Error buscando estudiantes:", error);
        resultContainer.textContent = "No se pudo obtener la información.";
    }
}
//función de validación y eliminar estudiante
function validateAndDelete() {
    const id = document.getElementById('deleteId')?.value.trim();
    const error = document.getElementById('deleteError');
    if (!id) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
        deleteStudent();
    }
}

async function deleteStudent() {
    const id = document.getElementById('deleteId')?.value.trim();
    const resultContainer = document.getElementById('deleteResult');
    try {
        const response = await deleteStudentService(id);
        console.log(response);//<--aquí ves la respuesta real del backend
        if (
            response.success ||
            response.message === "Estudiante eliminado correctamente." ||
            response.message === "ok" ||
            response.message === "Student deleted successfully."
        ) {
            Swal.fire("Eliminado", "Estudiante eliminado con éxito", "success");
            resultContainer.textContent = "";
            await cargarTablaEstudiantes();
        } else if (response.error) {
            Swal.fire("Error", response.error, "error");
        } else {
            Swal.fire("Error", "No se pudo eliminar el estudiante.", "error");
        }
    } catch (error) {
        console.error("Error eliminando estudiante:", error);
        Swal.fire("Error", "Ocurrió un error inesperado.", "error");
    }
}

//Carga dinámica de datos: al cargar la página, algunas funciones obtienen datos de la API (como el listado de carreras) paera llenar sectores o tablas de manera dinámica.
// (Opcional) Carga todos los estudiantes en una tabla
// ⚠️ Verifica antes si existe el contenedor de tabla para evitar errores
async function cargarTablaEstudiantes() {
    const tabla = document.getElementById("tablaEstudiantes");

    // ⚠️ Si no hay tabla en el HTML, no sigas
    if (!tabla) return;S

    try {
        const estudiantes = await getAllStudentsService();
        tabla.innerHTML = "";
        estudiantes.forEach(student => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.career}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("No se pudieron cargar los estudiantes:", error);
    }
}


// Carga las opciones de carreras en el desplegable al registrar estudiant
async function cargarSelectCarreras() {
    const selectCareer = document.getElementById("registerCareer");
    if (!selectCareer) return;
    selectCareer.innerHTML = '<option value="">Selecciona una carrera</option>'; // Limpia antes de cargar
    try {
        const careers = await getAllCareersService(); // Debe devolver un array de carreras
        careers.forEach(career => {
            const option = document.createElement("option");
            option.value = career.name;
            option.textContent = career.name;
            selectCareer.appendChild(option);
        });
    } catch (error) {
        console.error("No se pudieron cargar las carreras:", error);
    }
}

// Nueva función para cargar categorías en el registro de estudiante
async function cargarSelectCategorias() {
    const selectCategoria = document.getElementById("categoria");
    if (!selectCategoria) return;
    selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';
    try {
        const response = await fetch("/registro_alumnos/api/categories.json");
        const categorias = await response.json();
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.name;
            option.textContent = cat.name;
            selectCategoria.appendChild(option);
        });
    } catch (error) {
        console.error("No se pudieron cargar las categorías:", error);
    }
}

// Funciones para carreras
// Guarda una nueva carrera con todos sus datos en la API
async function guardarCarrera() {
    const nombre = document.getElementById("nombre")?.value.trim();
    // const codigo = document.getElementById("codigo")?.value.trim(); // si tu backend lo requiere
    const categoria = document.getElementById("categoria")?.value;
    const duracion = document.getElementById("duracion")?.value.trim();
    const tipo = document.getElementById("tipo")?.value;

    if (
        !nombre ||
        // !codigo || // si tu backend lo requiere
        !duracion ||
        !categoria || categoria === "Seleccione una categoría" ||
        !tipo || tipo === "Seleccione un tipo"
    ) {
        Swal.fire("Campos incompletos", "Por favor completá todos los campos", "warning");
        return;
    }

    try {
        const data = await registerCareersService(nombre, null, categoria, duracion, tipo);
        if (data.id) {
            Swal.fire("¡Éxito!", "Carrera guardada correctamente", "success");
            document.getElementById("nombre").value = '';
            // document.getElementById("codigo").value = '';
            document.getElementById("categoria").value = '';
            document.getElementById("duracion").value = '';
            document.getElementById("tipo").value = '';
        } else {
            Swal.fire("Error", data.error || "No se pudo guardar la carrera", "error");
        }
    } catch (error) {
        console.error("Error al guardar carrera:", error);
        Swal.fire("Error", "Error al conectar con el servidor", "error");
    }
}

// Elimina una carrera por ID si existe
async function eliminarCarrera() {
    const id = document.getElementById("eliminarCarreraId")?.value.trim();

    if (!id) {
        Swal.fire("Falta ID", "Ingresá un ID válido para eliminar", "warning");
        return;
    }

    try {
        const response = await fetch(`${API_CAREERS_URL}/${id}`, {
            method: "DELETE",
            headers
        });

        const data = await response.json();

        if (data.success || data.message === "Carrera eliminada correctamente.") {
            Swal.fire("¡Eliminada!", "La carrera fue eliminada correctamente", "success");
            document.getElementById("eliminarCarreraId").value = '';
        } else {
            Swal.fire("Error", data.error || "No se pudo eliminar", "error");
        }
    } catch (error) {
        console.error("Error al eliminar carrera:", error);
        Swal.fire("Error", "Error al conectar con el servidor", "error");
    }
}
// Filtra carreras por nombre y muestra los datos en una alerta
async function filtrarCarrera() {
    const nombre = document.getElementById("careerFilter")?.value.trim();
    const error = document.getElementById("careerError");

    if (!nombre) {
        error.style.display = "block";
        return;
    } else {
        error.style.display = "none";
    }

    try {
        const response = await fetch(`${API_CAREERS_URL}?name=${nombre}`, {
            headers
        });

        const data = await response.json();

        if (data.length === 0) {
            Swal.fire("Sin resultados", "No se encontró ninguna carrera con ese nombre", "info");
        } else {
            Swal.fire({
                title: "Carrera encontrada",
                html: `<strong>Nombre:</strong> ${data[0].name}<br><strong>Código:</strong> ${data[0].code}<br><strong>Categoría:</strong> ${data[0].category}<br><strong>Duración:</strong> ${data[0].duration}<br><strong>Tipo:</strong> ${data[0].type}`,
                icon: "success"
            });
        }
    } catch (error) {
        console.error("Error al filtrar carrera:", error);
        Swal.fire("Error", "No se pudo buscar la carrera", "error");
    }
}

// Funciones para categorías
// Guarda una nueva categoría en la API
async function guardarCategoria() {
    const nombre = document.getElementById("nombreCategoria")?.value.trim();
    const error = document.getElementById("registerCategoryError");
    const result = document.getElementById("registerCategoryResult");
    if (!nombre) {
        error.style.display = "block";
        return;
    }
    error.style.display = "none";
    try {
        const response = await fetch(API_CATEGORIES_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ name: nombre })
        });
        const data = await response.json();
        console.log(data); // <-- Agrega esta línea aquí

        // Cambia esta validación:
        if (data.category && data.category.id) {
            Swal.fire("¡Éxito!", "Categoría guardada correctamente", "success");
            document.getElementById("nombreCategoria").value = '';
            result.textContent = JSON.stringify(data.category, null, 2);
        } else {
            Swal.fire("Error", data.error || "No se pudo guardar la categoría", "error");
        }
    } catch (err) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
}

// Lógica para buscar categoría
async function buscarCategoria() {
    const id = document.getElementById("categoryId")?.value.trim();
    const error = document.getElementById("getCategoryError");
    const result = document.getElementById("getCategoryResult");
    if (!id) {
        error.style.display = "block";
        return;
    }
    error.style.display = "none";
    try {
        const data = await getCategoryByIdService(id);
        if (data.id) {
            result.textContent = JSON.stringify(data, null, 2);
        } else {
            result.textContent = "No encontrada";
        }
    } catch (err) {
        result.textContent = "Error al buscar";
    }
}

// Lógica para eliminar categoría
async function eliminarCategoria() {
    const id = document.getElementById("deleteCategoryId")?.value.trim();
    const error = document.getElementById("deleteCategoryError");
    const result = document.getElementById("deleteCategoryResult");
    if (!id) {
        error.style.display = "block";
        return;
    }
    error.style.display = "none";
    try {
        const response = await fetch(`${API_CATEGORIES_URL}/${id}`, {
            method: "DELETE",
            headers
        });
        const data = await response.json();
        console.log(data); // Mira la respuesta real en consola

        // Cambia la validación: si la respuesta fue exitosa (response.ok), muestra éxito
        if (response.ok) {
            Swal.fire("¡Éxito!", "Categoría eliminada correctamente", "success");
            result.textContent = "";
        } else if (data.error) {
            Swal.fire("Error", data.error, "error");
        } else {
            Swal.fire("Error", "No se pudo eliminar la categoría", "error");
        }
    } catch (err) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
}

// Carga inicial
// Carga inicial cuando se abre la página
// Llama a funciones para llenar datos, registrar eventos, etc.
// Manejo de eventos: se agregan listeners a los botones del html para que , al hacer click, se ejecuten las funciones correspondientes.

document.addEventListener("DOMContentLoaded", () => {
    cargarSelectCarreras();
    cargarSelectCategorias();
    document.getElementById("btnGuardar")?.addEventListener("click", guardarCarrera);
    document.getElementById("btnGuardarCategoria").addEventListener("click", async () => {
        const nombre = document.getElementById("nombreCategoria").value.trim();
        const error = document.getElementById("registerCategoryError");
        const result = document.getElementById("registerCategoryResult");
        error.style.display = "none";
        result.textContent = "";

        if (!nombre) {
            error.style.display = "block";
            return;
        }

        try {
            const data = await registerCategoryService(nombre);
            console.log(data); // Para depuración

            if (data && data.category && data.category.id && data.category.name) {
                Swal.fire("¡Éxito!", "Categoría guardada correctamente", "success");
                document.getElementById("nombreCategoria").value = "";
                result.textContent = `ID: ${data.category.id} - Nombre: ${data.category.name}`;
            } else {
                Swal.fire("Error", data.error || "No se pudo guardar la categoría", "error");
            }
        } catch (err) {
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    });
    document.getElementById("btnBuscarCategoria").addEventListener("click", async () => {
        const id = document.getElementById("buscarCategoriaId").value.trim();
        const error = document.getElementById("buscarCategoryError");
        const result = document.getElementById("buscarCategoryResult");
        error.style.display = "none";
        result.textContent = "";

        if (!id) {
            error.style.display = "block";
            return;
        }

        try {
            const data = await getCategoryByIdService(id);
            if (data.id) {
                result.textContent = `ID: ${data.id} - Nombre: ${data.name}`;
            } else {
                result.textContent = "Categoría no encontrada.";
            }
        } catch (err) {
            result.textContent = "Error al buscar la categoría.";
        }
    });
    document.getElementById("btnEliminarCategoria").addEventListener("click", async () => {
        const id = document.getElementById("eliminarCategoriaId").value.trim();
        const error = document.getElementById("eliminarCategoryError");
        const result = document.getElementById("eliminarCategoryResult");
        error.style.display = "none";
        result.textContent = "";

        if (!id) {
            error.style.display = "block";
            return;
        }

        try {
            const data = await deleteCategoryService(id);
            if (data.message || data.success) {
                Swal.fire("¡Éxito!", "Categoría eliminada correctamente", "success");
                result.textContent = "";
            } else if (data.error) {
                Swal.fire("Error", data.error, "error");
            } else {
                Swal.fire("Error", "No se pudo eliminar la categoría", "error");
            }
        } catch (err) {
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    });
    // Lógica para eliminar CARRERA
     document.getElementById("btnEliminarCarrera")?.addEventListener("click", async () => {
        const id = document.getElementById("eliminarCarreraId").value.trim();
        if (!id) {
            Swal.fire("Error", "Ingresá un ID válido.", "error");
            return;
        }
        try {
            const data = await deleteCareerService(id);
            console.log(data); // Para depuración
            if (data.success || data.message) {
                Swal.fire("¡Éxito!", "Carrera eliminada correctamente", "success");
                document.getElementById("eliminarCarreraId").value = "";
            } else if (data.error) {
                Swal.fire("Error", data.error, "error");
            } else {
                Swal.fire("Error", "No se pudo eliminar la carrera", "error");
            }
        } catch (err) {
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    });
    document.getElementById("btnBuscarPorCarrera")?.addEventListener("click", validateAndGetByCareer);
});



async function guardarEstudiante() {
    const nombre = document.getElementById("nombreEstudiante")?.value.trim();
    const carrera = document.getElementById("carreraEstudiante")?.value.trim();
    if (!nombre || !carrera) {
        Swal.fire("Campos incompletos", "Por favor completá todos los campos", "warning");
        return;
    }
    try {
        const response = await fetch(API_STUDENTS_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ name: nombre, career: carrera })
        });
        const data = await response.json();
        console.log(data); // Ver la respuesta real

        // Solo muestra éxito si la respuesta es correcta y tiene un id
        if (response.ok && data.id) {
            Swal.fire("¡Éxito!", "Estudiante registrado correctamente", "success");
            document.getElementById("nombreEstudiante").value = '';
            document.getElementById("carreraEstudiante").value = '';
        } else if (data.error) {
            Swal.fire("Error", data.error, "error");
        } else {
            Swal.fire("Error", "No se pudo registrar el estudiante", "error");
        }
    } catch (err) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
}
//listener en el DOMContentLoaded 
document.addEventListener("DOMContentLoaded", () => {
    // ...otros listeners...
    document.getElementById("btnEliminarEstudiante")?.addEventListener("click", validateAndDelete);
    // ...otros listeners...
    document.getElementById("btnFiltrar")?.addEventListener("click", validateAndFilterCareer);
    // ...otros listeners...
     document.getElementById("btnEliminarCarrera")?.addEventListener("click", validateAndDeleteCareer);
     // ...otros listeners...
});

function validateAndFilterCareer() {
    const career = document.getElementById('careerFilter')?.value.trim();
    const error = document.getElementById('careerError');
    const result = document.getElementById('careerResult');

    if (!career) {
        error.style.display = 'block';
        result.textContent = '';
    } else {
        error.style.display = 'none';
        filtrarCarrera(career);
    }
}

async function filtrarCarrera(career) {
    const result = document.getElementById('careerResult');
    try {
        const response = await fetch(`${API_CAREERS_URL}?name=${encodeURIComponent(career)}`, {
            headers // <-- Usá este objeto, no lo reescribas
        });
        const data = await response.json();
        if (data && (Array.isArray(data) ? data.length > 0 : data.name)) {
            result.textContent = JSON.stringify(data, null, 2);
        } else {
            result.textContent = "No se encontró ninguna carrera con ese nombre.";
        }
    } catch (error) {
        result.textContent = "Error al buscar la carrera.";
    }
}

function validateAndDeleteCareer() {
    const id = document.getElementById('eliminarCarreraId')?.value.trim();
    const error = document.getElementById('eliminarCarreraError');
    const result = document.getElementById('eliminarCarreraResult');
    if (!id) {
        error.style.display = 'block';
        result.textContent = '';
    } else {
        error.style.display = 'none';
        eliminarCarrera(id);
    }
}

async function eliminarCarrera(id) {
    const result = document.getElementById('eliminarCarreraResult');
    try {
        const response = await deleteCareerService(id);
        console.log(response); // Para depuración
        if (response.success || response.message === "Career deleted successfully." || response.message === "ok") {
            Swal.fire("¡Éxito!", "Carrera eliminada correctamente", "success");
            document.getElementById('eliminarCarreraId').value = "";
            result.textContent = "";
        } else if (response.error) {
            Swal.fire("Error", response.error, "error");
        } else {
            Swal.fire("Error", "No se pudo eliminar la carrera.", "error");
        }
    } catch (error) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
}

async function deleteCareerService(id) {
    const response = await fetch(`${API_CAREERS_URL}/${id}`, {
        method: "DELETE",
        headers // Usa el objeto headers global si tu API lo requiere
    });
    return response.json();
}