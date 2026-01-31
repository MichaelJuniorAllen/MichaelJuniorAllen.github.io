//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones.forEach(function(opcion) {
        opcion.className = "";
    });
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

// ============= SISTEMA DE TRADUCCIÓN MULTIIDIOMA =============
let idiomaActual = localStorage.getItem('idioma') || 'pt';

// Función para cambiar idioma
function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    localStorage.setItem('idioma', idioma);
    aplicarTraducciones();
}

// Función para obtener traducción
function obtenerTexto(clave) {
    if (traduciones[idiomaActual] && traduciones[idiomaActual][clave]) {
        return traduciones[idiomaActual][clave];
    }
    // Si no existe traducción, retornar la del portugués por defecto
    return traduciones['pt'][clave] || clave;
}

// Función principal para aplicar todas las traducciones
function aplicarTraducciones() {
    // Traducir título de la página
    var pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = obtenerTexto('page-title');
    
    // Traducir navegación
    var links = document.querySelectorAll('#links a');
    if (links[0]) links[0].textContent = obtenerTexto('nav-inicio');
    if (links[1]) links[1].textContent = obtenerTexto('nav-sobremi');
    if (links[2]) links[2].textContent = obtenerTexto('nav-portfolio');
    if (links[3]) links[3].textContent = obtenerTexto('nav-contacto');
    
    // Traducir sección inicio
    var bienvenida = document.querySelector('.bienvenida');
    if (bienvenida) bienvenida.textContent = obtenerTexto('titulo-bienvenida');
    
    var nombrePrincipal = document.querySelector('.presentacion h2');
    if (nombrePrincipal) {
        var span = nombrePrincipal.querySelector('span');
        nombrePrincipal.innerHTML = obtenerTexto('titulo-nombre').replace('Michael Reyes', '') + '<span>Michael Reyes</span>';
    }
    
    var profesionPrincipal = document.querySelector('.presentacion h3');
    if (profesionPrincipal) profesionPrincipal.textContent = obtenerTexto('titulo-profesion');
    
    var descripcion = document.querySelector('.presentacion .descripcion');
    if (descripcion) descripcion.textContent = obtenerTexto('descripcion-skills');
    
    var btnProyecto = document.querySelector('.presentacion a');
    if (btnProyecto) btnProyecto.textContent = obtenerTexto('btn-proyecto');
    
    // Traducir sección sobre mí
    var tituloSobremi = document.querySelector('#sobremi .titulo-seccion');
    if (tituloSobremi) tituloSobremi.textContent = obtenerTexto('titulo-sobremi');
    
    var nombreSobremi = document.querySelector('#sobremi .sobremi h2');
    if (nombreSobremi) {
        var spanNombre = nombreSobremi.querySelector('span');
        nombreSobremi.innerHTML = obtenerTexto('nombre-sobremi').replace('Michael Reyes', '') + '<span>Michael Reyes</span>';
    }
    
    var profesionSobremi = document.querySelector('#sobremi .sobremi h3');
    if (profesionSobremi) profesionSobremi.textContent = obtenerTexto('profesion-sobremi');
    
    var parrafos = document.querySelectorAll('#sobremi .sobremi p:not(.titulo-seccion)');
    if (parrafos[0]) parrafos[0].textContent = obtenerTexto('parrafo1');
    if (parrafos[1]) parrafos[1].textContent = obtenerTexto('parrafo2');
    
    var btnCV = document.querySelector('#sobremi .sobremi a');
    if (btnCV) btnCV.textContent = obtenerTexto('btn-cv');
    
    // Traducir sección portfolio
    var tituloPortfolio = document.querySelector('#portfolio .titulo-seccion');
    if (tituloPortfolio) tituloPortfolio.textContent = obtenerTexto('titulo-portfolio');
    
    // Traducir sección contacto
    var tituloContacto = document.querySelector('#contacto .titulo-seccion');
    if (tituloContacto) tituloContacto.textContent = obtenerTexto('titulo-contacto');
    
    var inputNombre = document.querySelector('input[name="Nome"]');
    if (inputNombre) inputNombre.placeholder = obtenerTexto('placeholder-nombre');
    
    var inputEmail = document.querySelector('input[name="Email"]');
    if (inputEmail) inputEmail.placeholder = obtenerTexto('placeholder-email');
    
    var inputAsunto = document.querySelector('input[name="assunto"]');
    if (inputAsunto) inputAsunto.placeholder = obtenerTexto('placeholder-asunto');
    
    var textareaMensaje = document.querySelector('textarea[name="mensagem"]');
    if (textareaMensaje) textareaMensaje.placeholder = obtenerTexto('placeholder-mensaje');
    
    var btnEnviar = document.querySelector('.btn-enviar');
    if (btnEnviar) btnEnviar.value = obtenerTexto('btn-enviar');
    
    // Traducir footer
    var footerTexto = document.querySelector('footer p');
    if (footerTexto) footerTexto.textContent = obtenerTexto('footer-derechos');
    
    // Cambiar atributo lang del HTML
    document.documentElement.lang = idiomaActual;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma guardado en el selector
    var selector = document.getElementById('selectorIdioma');
    if (selector) {
        selector.value = idiomaActual;
    }
    
    // Aplicar traducciones iniciales
    aplicarTraducciones();
    
    // ============= VALIDACIÓN DEL FORMULARIO DE CONTACTO =============
    var formulario = document.getElementById('formularioContacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar mensajes de error anteriores
            limpiarErrores();
            
            // Obtener valores del formulario
            var nombre = document.querySelector('input[name="Nome"]').value.trim();
            var email = document.querySelector('input[name="Email"]').value.trim();
            var assunto = document.querySelector('input[name="assunto"]').value.trim();
            var mensagem = document.querySelector('textarea[name="mensagem"]').value.trim();
            
            // Variables para validación
            var esValido = true;
            
            // Validar nombre
            if (nombre === '') {
                mostrarError('error-nome', obtenerTexto('error-nombre-vacio'));
                esValido = false;
            } else if (nombre.length < 3) {
                mostrarError('error-nome', obtenerTexto('error-nombre-minimo'));
                esValido = false;
            }
            
            // Validar email
            if (email === '') {
                mostrarError('error-email', obtenerTexto('error-email-vacio'));
                esValido = false;
            } else if (!validarEmail(email)) {
                mostrarError('error-email', obtenerTexto('error-email-invalido'));
                esValido = false;
            }
            
            // Validar asunto
            if (assunto === '') {
                mostrarError('error-assunto', obtenerTexto('error-asunto-vacio'));
                esValido = false;
            } else if (assunto.length < 5) {
                mostrarError('error-assunto', obtenerTexto('error-asunto-minimo'));
                esValido = false;
            }
            
            // Validar mensaje
            if (mensagem === '') {
                mostrarError('error-mensagem', obtenerTexto('error-mensaje-vacio'));
                esValido = false;
            } else if (mensagem.length < 10) {
                mostrarError('error-mensagem', obtenerTexto('error-mensaje-minimo'));
                esValido = false;
            }
            
            // Si es válido, enviar formulario
            if (esValido) {
                formulario.submit();
                mostrarExito(obtenerTexto('exito-mensaje'));
            }
        });
        
        // Limpiar error cuando el usuario empieza a escribir
        document.querySelectorAll('#formularioContacto input, #formularioContacto textarea').forEach(function(campo) {
            campo.addEventListener('input', function() {
                this.classList.remove('input-error');
            });
        });
    }
});

// Función para validar email
function validarEmail(email) {
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Función para mostrar error
function mostrarError(elementId, mensaje) {
    var elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        // Encontrar el input relacionado y añadir clase de error
        var campo = elemento.previousElementSibling;
        if (campo) {
            campo.classList.add('input-error');
        }
    }
}

// Función para limpiar errores
function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(function(elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    });
    document.querySelectorAll('.input-error').forEach(function(campo) {
        campo.classList.remove('input-error');
    });
}

// Función para mostrar mensaje de éxito
function mostrarExito(mensaje) {
    var elementoExito = document.getElementById('mensagem-sucesso');
    if (elementoExito) {
        elementoExito.textContent = mensaje;
        elementoExito.style.display = 'block';
        
        // Limpiar formulario
        document.getElementById('formularioContacto').reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(function() {
            elementoExito.style.display = 'none';
        }, 5000);
    }
}

// ============= ANIMACIÓN DE PORTAFOLIO =============
document.addEventListener('DOMContentLoaded', function() {
    // Animar imágenes del portafolio al pasar el mouse
    var proyectos = document.querySelectorAll('#portfolio .fila .proyecto');
    
    proyectos.forEach(function(proyecto) {
        var img = proyecto.querySelector('img');
        
        proyecto.addEventListener('mouseenter', function() {
            // Agregar clase para animar con JavaScript
            if (img) {
                img.style.transform = 'scale(1.12)';
            }
        });
        
        proyecto.addEventListener('mouseleave', function() {
            // Remover escala
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Agregar efecto de aparición suave a los proyectos al cargar la página
    proyectos.forEach(function(proyecto, index) {
        proyecto.style.opacity = '0';
        proyecto.style.transform = 'translateY(20px)';
        proyecto.style.transition = 'all 0.6s ease';
        
        setTimeout(function() {
            proyecto.style.opacity = '1';
            proyecto.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
