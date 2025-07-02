Herramientas de Inteligencia Artificial utilizadas:

Durante el desarrollo del proyecto, se utilizaron dos modelos de inteligencia artificial:

•	GitHub Copilot (integrado en Visual Studio Code)
•	ChatGPT (OpenAI)

Ambos modelos facilitaron la implementación del código, la organización del proyecto y la resolución de errores. Copilot se utilizó principalmente para autocompletar funciones en JavaScript y para sugerencias rápidas mientras se codificaba. Por su parte, ChatGPT fue clave para la planificación de la lógica, validaciones, diseño de formularios, interpretación de errores y redacción de comentarios explicativos.


Ejemplos de prompts utilizados:

Se formularon distintos prompts orientados a resolver problemas concretos del proyecto. Algunos ejemplos efectivos fueron:

1.	“Quiero que me ayudes a crear una página web en formato estudiantil utilizando Bootstrap 5. El diseño debe ser simple, moderno y funcional, con un estilo institucional. Debe incluir un navbar con enlaces a las secciones "Inicio", "Estudiantes", "Carreras" y "Categorías", un formulario con campos bien organizados y estilos coherentes con el resto del sitio. Necesito que el código HTML sea accesible, bien estructurado y fácil de mantener. Agregá comentarios en el código explicando cada parte.”
2.	“Generá una función en JavaScript que registre un estudiante usando una API REST con método POST.”
3.	“Explicame por qué un fetch me devuelve error 400 en consola al abrir la página.”
4.	“Ayudame a crear un formulario HTML accesible y completo para la gestión de estudiantes. Debe incluir las siguientes funcionalidades: registrar estudiante (con nombre y carrera), buscar estudiante por ID, buscar estudiantes por carrera y eliminar estudiante por ID. Usá Bootstrap 5 para el diseño y asegurate de que los campos estén bien organizados, los botones sean claros y que el código sea limpio, comentado y fácil de entender.”
5.	“Ayudame a desarrollar un formulario HTML accesible para la gestión de carreras. Debe permitir registrar una carrera (con nombre, código, duración, tipo y categoría), eliminar una carrera por ID y buscar una carrera por nombre. Usá Bootstrap 5 para el diseño, asegurate de que los campos estén bien distribuidos y el formulario sea claro y funcional. El código debe estar ordenado y comentado para facilitar su comprensión.”
6.	“Ayudame a crear un formulario HTML accesible para la gestión de categorías. Tiene que incluir opciones para registrar una nueva categoría, buscar categoría por ID y eliminar categoría por ID. Quiero que uses Bootstrap 5 para una buena presentación visual y accesibilidad, y que el código esté limpio, estructurado y comentado para entender fácilmente su funcionamiento.”
7.	 “Corregí esta función para que no consulte la API si no hay tabla HTML disponible.”



EXPLICACIÓN DEL FLUJO PARA REGISTRAR UN ESTUDIANTE:
1. El usuario completa el formulario y hace clic en Registrar".
2. Se valida que los campos no estén vacíos.
3. Se llama a la función que envía los datos a la API (registerStudentService).
4. Según la respuesta, se muestra un mensaje de éxito o error.
5. Si fue exitoso, se limpian los campos y se puede actualizar la lista de estudiantes.
EXPLICACIÓN DEL FLUJO PARA BUSCAR UN ESTUDIANTE POR ID:
1. El usuario ingresa un ID y hace clic en "Buscar".
2. Se valida que el campo de ID no esté vacío.
3. Se llama a la función que consulta la API (getStudentByIdService).
4. Según la respuesta, se muestra la información del estudiante o un mensaje de error.
5. Si fue exitoso, se muestran los datos en pantalla.
EXPLICACIÓN DEL FLUJO PARA BUSCAR UN ESTUDIANTE POR CARRERA:
1. El usuario selecciona una carrera y hace clic en "Buscar".
2. Se valida que se haya seleccionado una carrera.
3. Se llama a la función que consulta la API (getStudentsByCareerService).
4. Según la respuesta, se muestran los estudiantes encontrados o un mensaje si no hay resultados.
5. Si fue exitoso, se listan los estudiantes en pantalla.
EXPLICACIÓN DEL FLUJO PARA ELIMINAR ESTUDIANTE:
1. El usuario ingresa el ID del estudiante y hace clic en "Eliminar".
2. Se valida que el campo de ID no esté vacío.
3. Se llama a la función que envía la petición de borrado a la API (deleteStudentService).
4. Según la respuesta, se muestra un mensaje de éxito o error.
5. Si fue exitoso, se limpia el campo y se actualiza la lista de estudiantes.
EXPLICACIÓN DEL FLUJO DE GUARDAR CARRERA:
1. El usuario completa el formulario de carrera y hace clic en "Guardar".
2. Se valida que todos los campos estén completos.
3. Se llama a la función que envía los datos a la API (POST).
4. Según la respuesta, se muestra un mensaje de éxito o error.
5. Si fue exitoso, se limpian los campos del formulario.
EXPLICACIÓN DEL FLUJO PARA FILTRAR CARRERA:
1. El usuario ingresa o selecciona el nombre de una carrera y hace clic en "Filtrar".
2. Se valida que el campo no esté vacío.
3. Se llama a la función que consulta la API con el filtro.
4. Según la respuesta, se muestra la información de la carrera o un mensaje si no hay resultados.
EXPLICACIÓN DEL FLUJO PARA ELIMINAR CARRERA:
1. El usuario ingresa el ID de la carrera y hace clic en "Eliminar".
2. Se valida que el campo de ID no esté vacío.
3. Se llama a la función que envía la petición de borrado a la API.
4. Según la respuesta, se muestra un mensaje de éxito o error.
5.Si fue exitoso, se limpia el campo.
EXPLICACIÓN DEL FLUJO PARA GUARDAR CATEGORÍA:
1. El usuario ingresa el nombre de la categoría y hace clic en "Guardar".
2. Se valida que el campo no esté vacío.
3. Se llama a la función que envía los datos a la API (registerCategoryService).
4. Según la respuesta, se muestra un mensaje de éxito o error.
5. Si fue exitoso, se limpia el campo y se muestra la categoría guardada.
EXPLICACIÓN DEL FLUJO PARA BUSCAR CATEGORÍA POR ID:
1. El usuario ingresa el ID de la categoría y hace clic en "Buscar".
2. Se valida que el campo no esté vacío.
3. Se llama a la función que consulta la API (getCategoryByIdService).
4. Según la respuesta, se muestra la información de la categoría o un mensaje si no hay resultados.
EXPLICACIÓN DEL FLUJO PARA ELIMINAR CATEGORÍA:
1. El usuario ingresa el ID de la categoría y hace clic en "Eliminar".
2. Se valida que el campo no esté vacío.
3. Se llama a la función que envía la petición de borrado a la API (deleteCategoryService).
4. Según la respuesta, se muestra un mensaje de éxito o error.
5. Si fue exitoso, se limpia el campo.