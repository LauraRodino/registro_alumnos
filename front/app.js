// ===========================
// Archivo app.js
// Contiene las funciones principales de interacción con el backend (API)
// para gestionar estudiantes, carreras y categorías.
// ===========================
const API_STUDENTS_URL = "http://localhost:5001/api/students";
const API_CAREERS_URL = "http://localhost:5001/api/careers";
const API_CATEGORIES_URL = "http://localhost:5001/api/categories";
const API_KEY = "12345ABCDEF";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
};

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
// Servicio para eliminar un estudiante por ID (DELETE)
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
// Valida que se haya seleccionado una carrera antes de buscar por filtro
function validateAndGetByCareer() {
    const career = document.getElementById('careerFilter')?.value.trim();
    const error = document.getElementById('careerError');

    if (!career) {
        // Mostrar error si el campo está vacío
        error.classList.remove('d-none');
        error.style.display = 'block';
    } else {
        // Ocultar el mensaje y continuar
        error.classList.add('d-none');
        error.style.display = 'none';
        getStudentsByCareer(); // Solo se llama si el input es válido
    }
}

// Valida que se haya ingresado un ID antes de intentar eliminar estudiante
function validateAndDelete() {
    const id = document.getElementById('deleteId')?.value.trim();
    const error = document.getElementById('deleteError');
    if (!id) {
        error.classList.remove('d-none'); // Para mostrar
error.classList.add('d-none');    // Para ocultar
    } else {
        error.style.display = 'none';
        deleteStudent();
    }
}

// Funciones de lógica principal
// Registra un nuevo estudiante y muestra una alerta de éxito o error
// Limpia los campos del formulario y actualiza la tabla (si existe)
async function registerStudent() {
    const name = document.getElementById('registerName')?.value.trim();
    const career = document.getElementById('registerCareer')?.value.trim();
    const resultContainer = document.getElementById('registerResult');

    try {
        const result = await registerStudentService(name, career);
        Swal.fire({
            position: "top-end",
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

    // ✅ Ya se validó antes, así que no volvemos a chequear si career está vacío

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


// Elimina un estudiante por ID y muestra mensaje de éxito o error
async function deleteStudent() {
    const id = document.getElementById('deleteId')?.value.trim();
    const resultContainer = document.getElementById('deleteResult');

    try {
        const response = await deleteStudentService(id);
        if (response.success || response.message === "Estudiante eliminado correctamente.") {
            Swal.fire("Eliminado", "Estudiante eliminado con éxito", "success");
            resultContainer.textContent = "";
            await cargarTablaEstudiantes();
        } else {
            Swal.fire("Error", "No se pudo eliminar el estudiante.", "error");
        }
    } catch (error) {
        console.error("Error eliminando estudiante:", error);
        Swal.fire("Error", "Ocurrió un error inesperado.", "error");
    }
}
// (Opcional) Carga todos los estudiantes en una tabla
// ⚠️ Verifica antes si existe el contenedor de tabla para evitar errores
async function cargarTablaEstudiantes() {
    const tabla = document.getElementById("tablaEstudiantes");

    // ⚠️ Si no hay tabla en el HTML, no sigas
    if (!tabla) return;

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
    try {
        const careers = await getAllCareersService();
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

// Funciones para carreras
// Guarda una nueva carrera con todos sus datos en la API
async function guardarCarrera() {
    const nombre = document.getElementById("nombre")?.value.trim();
    const codigo = document.getElementById("codigo")?.value.trim();
    const categoria = document.getElementById("categoria")?.value.trim();
    const duracion = document.getElementById("duracion")?.value.trim();
    const tipo = document.getElementById("tipo")?.value.trim();

    if (!nombre || !codigo || !categoria || !duracion || !tipo) {
        Swal.fire("Campos incompletos", "Por favor completá todos los campos", "warning");
        return;
    }

    try {
        const response = await fetch(API_CAREERS_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({
                name: nombre,
                code: codigo,
                category: categoria,
                duration: duracion,
                type: tipo
            })
        });

        const data = await response.json();

        if (data.career || data.success) {
            Swal.fire("¡Éxito!", "Carrera guardada correctamente", "success");
            document.getElementById("nombre").value = '';
            document.getElementById("codigo").value = '';
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

// Carga inicial
// Carga inicial cuando se abre la página
// Llama a funciones para llenar datos, registrar eventos, etc.

document.addEventListener("DOMContentLoaded", () => {
    cargarTablaEstudiantes();
    cargarSelectCarreras();

    document.getElementById("btnGuardar")?.addEventListener("click", guardarCarrera);
    document.getElementById("btnEliminarCarrera")?.addEventListener("click", eliminarCarrera);
    document.getElementById("btnFiltrar")?.addEventListener("click", validateAndGetByCareer);
;

    document.getElementById("btnRegistrarEstudiante")?.addEventListener("click", validateAndRegister);
document.getElementById("btnBuscarEstudiante")?.addEventListener("click", validateAndGetStudent);
document.getElementById("btnBuscarPorCarrera")?.addEventListener("click", validateAndGetByCareer);
document.getElementById("btnEliminarEstudiante")?.addEventListener("click", validateAndDelete);
});