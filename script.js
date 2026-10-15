"use strict";


/* ============================================================
   CONFIGURACIÓN GENERAL
   ============================================================ */

/*
    Familia comienza desde el segundo 49 del archivo.

    00:49 = 49 segundos.
*/
const INICIO_FAMILIA = 49;


/*
    Detectamos si la persona prefiere reducir el movimiento.

    En ese caso evitaremos el confeti final y algunas
    animaciones complementarias.
*/
const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ============================================================
   ELEMENTOS PRINCIPALES
   ============================================================ */

const pantallaInicial =
    document.getElementById("pantallaInicial");

const escenario =
    document.getElementById("escenario");

const botonIniciar =
    document.getElementById("botonIniciar");


/* ============================================================
   MONITOR
   ============================================================ */

const monitor =
    document.getElementById("monitor");

const estadoMonitor =
    document.getElementById("estadoMonitor");


/* ============================================================
   ESCENAS
   ============================================================ */

const escenas =
    [...document.querySelectorAll(".escena")];

const escenaColegio =
    document.getElementById("escenaColegio");

const escenaTaxi =
    document.getElementById("escenaTaxi");

const escenaMamaNegra =
    document.getElementById("escenaMamaNegra");

const escenaDiagnostico =
    document.getElementById("escenaDiagnostico");

const escenaFoto =
    document.getElementById("escenaFoto");

const escenaTransicion =
    document.getElementById("escenaTransicion");

const escenaEmocional =
    document.getElementById("escenaEmocional");

const escenaCierre =
    document.getElementById("escenaCierre");


/* ============================================================
   ESCENA DEL COLEGIO
   ============================================================ */

const dialogoJordy =
    document.getElementById("dialogoJordy");

const dialogoDiana =
    document.getElementById("dialogoDiana");

const remateColegio =
    document.getElementById("remateColegio");

const textoOchoAnios =
    document.getElementById("textoOchoAnios");

/*
    Personajes específicos de la escena del colegio.

    Nos permiten animarlos cuando cada uno habla
    o reacciona.
*/
const jordyColegio =
    document.querySelector(
        "#escenaColegio .avatar--jordy"
    );

const dianaColegio =
    document.querySelector(
        "#escenaColegio .avatar--diana"
    );


/*
    Personajes de la escena de Mama Negra.
*/
const jordyMamaNegra =
    document.querySelector(
        "#escenaMamaNegra .avatar--jordy"
    );

const desconocidaMamaNegra =
    document.querySelector(
        "#escenaMamaNegra .avatar--desconocida"
    );


/* ============================================================
   ESCENA DEL TAXI
   ============================================================ */

const vasos =
    [...document.querySelectorAll(".vaso")];

const jordyBorracho =
    document.getElementById("jordyBorracho");

const mensajeTome =
    document.getElementById("mensajeTome");

const taxi =
    document.getElementById("taxi");

const accidenteTaxi =
    document.getElementById("accidenteTaxi");

const resultadoTaxi =
    document.getElementById("resultadoTaxi");


/* ============================================================
   ESCENA MAMA NEGRA
   ============================================================ */

const dialogoPresentacion =
    document.getElementById("dialogoPresentacion");

const efectoBeso =
    document.getElementById("efectoBeso");

const alertaDato =
    document.getElementById("alertaDato");


/* ============================================================
   DIAGNÓSTICO
   ============================================================ */

const resultados =
    [...document.querySelectorAll(".resultado")];

const radar =
    document.getElementById("radar");


/* ============================================================
   FOTO
   ============================================================ */

const fotoEvidencia =
    document.getElementById("fotoEvidencia");

const fraseFotoUno =
    document.querySelector(".frase-foto--1");

const fraseFotoDos =
    document.querySelector(".frase-foto--2");


/* ============================================================
   CAMBIO EMOCIONAL
   ============================================================ */

const fueraDeJoda =
    document.querySelector(".fuera-de-joda");

const mensajeEmocional =
    document.getElementById("mensajeEmocional");

/*
    Elementos visuales de la parte emocional.
*/
const recuerdoVisual =
    document.getElementById("recuerdoVisual");

const fotoEmocional =
    document.getElementById("fotoEmocional");


/* ============================================================
   CIERRE
   ============================================================ */

const resultadoFinal =
    document.getElementById("resultadoFinal");

const felicitacionFinal =
    document.getElementById("felicitacionFinal");

const botonAlta =
    document.getElementById("botonAlta");

const confeti =
    document.getElementById("confeti");


/* ============================================================
   CONTROL DE AUDIO
   ============================================================ */

const controlAudio =
    document.getElementById("controlAudio");

const iconoAudio =
    document.getElementById("iconoAudio");

const musicaInicio =
    document.getElementById("musicaInicio");

const musicaFamilia =
    document.getElementById("musicaFamilia");


/* ============================================================
   ESTADO GENERAL
   ============================================================ */

let experienciaIniciada = false;

let faseMusical = "inicio";

let audioActivo = musicaInicio;

let animacionSincronizacion = null;

let transicionMusicalIniciada = false;

let altaRealizada = false;


/* ============================================================
   AVATARES ILUSTRADOS
   ============================================================ */

/*
    Los personajes ahora se representan mediante ilustraciones
    SVG en lugar de figuras completas hechas con divs.

    La ventaja es que siempre conservan exactamente las mismas
    proporciones en celular, tablet y computadora.
*/
function crearAvatares() {

    const avatares =
        document.querySelectorAll(
            "[data-avatar]"
        );


    avatares.forEach(
        (avatar) => {

            const nombre =
                avatar.dataset.nombre;


            /*
                Todos utilizan la misma estructura.

                Los colores y el tipo de cabello cambian
                mediante las clases CSS del personaje.
            */
            avatar.innerHTML = `
                <svg
                    class="avatar-svg"
                    viewBox="0 0 120 120"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <!-- Halo de color -->
                    <circle
                        class="avatar-halo"
                        cx="60"
                        cy="60"
                        r="56"
                    />

                    <!-- Hombros -->
                    <path
                        class="avatar-ropa"
                        d="
                            M22 116
                            C25 91 40 80 60 80
                            C80 80 95 91 98 116
                            Z
                        "
                    />

                    <!-- Cuello -->
                    <rect
                        class="avatar-piel avatar-cuello"
                        x="51"
                        y="68"
                        width="18"
                        height="20"
                        rx="8"
                    />

                    <!-- Cabello largo detrás del rostro -->
                    <path
                        class="avatar-cabello avatar-cabello-largo"
                        d="
                            M31 53
                            C27 31 38 16 60 16
                            C82 16 93 31 89 53
                            L91 82
                            C82 87 75 84 72 77
                            L48 77
                            C45 84 38 87 29 82
                            Z
                        "
                    />

                    <!-- Orejas -->
                    <circle
                        class="avatar-piel"
                        cx="34"
                        cy="51"
                        r="6"
                    />

                    <circle
                        class="avatar-piel"
                        cx="86"
                        cy="51"
                        r="6"
                    />

                    <!-- Cara -->
                    <rect
                        class="avatar-piel avatar-cara"
                        x="35"
                        y="24"
                        width="50"
                        height="56"
                        rx="23"
                    />

                    <!-- Cabello superior -->
                    <path
                        class="avatar-cabello avatar-cabello-frente"
                        d="
                            M36 43
                            C35 24 45 17 60 17
                            C75 17 85 24 84 43
                            C73 37 62 34 51 36
                            C45 37 40 40 36 43
                            Z
                        "
                    />

                    <!-- Ojos -->
                    <circle
                        class="avatar-ojo"
                        cx="49"
                        cy="52"
                        r="2.8"
                    />

                    <circle
                        class="avatar-ojo"
                        cx="71"
                        cy="52"
                        r="2.8"
                    />

                    <!-- Mejillas -->
                    <circle
                        class="avatar-mejilla"
                        cx="44"
                        cy="62"
                        r="4"
                    />

                    <circle
                        class="avatar-mejilla"
                        cx="76"
                        cy="62"
                        r="4"
                    />

                    <!-- Boca -->
                    <path
                        class="avatar-boca"
                        d="
                            M51 65
                            Q60 72 69 65
                        "
                    />
                </svg>

                ${
                    nombre
                        ? `
                            <span class="nombre-avatar">
                                ${nombre}
                            </span>
                        `
                        : ""
                }
            `;

        }
    );

}


/*
    Dibujamos todos los avatares al cargar la página
*/
crearAvatares();


/* ============================================================
   PREPARAR EL SEGUNDO AUDIO
   ============================================================ */

/*
    Intentamos dejar Familia posicionada desde 00:49.

    Si todavía no se han cargado los metadatos,
    esperamos hasta que estén disponibles.
*/
function prepararFamilia() {

    const posicionar = () => {

        try {

            musicaFamilia.currentTime =
                INICIO_FAMILIA;

        } catch (error) {

            console.warn(
                "Todavía no fue posible posicionar Familia.",
                error
            );

        }

    };


    if (musicaFamilia.readyState >= 1) {

        posicionar();

        return;

    }


    musicaFamilia.addEventListener(
        "loadedmetadata",
        posicionar,
        {
            once: true
        }
    );

}


prepararFamilia();


/* ============================================================
   CAMBIAR DE ESCENA
   ============================================================ */

/*
    Solo una escena permanece visible a la vez.

    Esto evita acumular contenido y mantiene la experiencia
    rápida, limpia y fácil de seguir.
*/
function mostrarEscena(escenaNueva) {

    escenas.forEach(
        (escena) => {

            escena.classList.remove(
                "activa"
            );

            escena.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );


    escenaNueva.classList.add(
        "activa"
    );


    escenaNueva.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* ============================================================
   ESTADO DEL MONITOR
   ============================================================ */

function monitorNormal() {

    monitor.classList.remove(
        "alerta"
    );


    estadoMonitor.textContent =
        "ESTABLE";

}


function monitorEnAlerta() {

    monitor.classList.add(
        "alerta"
    );


    estadoMonitor.textContent =
        "⚠ ALERTA";

}


/* ============================================================
   MENSAJES EMOCIONALES
   ============================================================ */

function mostrarMensajeEmocional(texto) {

    /*
        Si ya existe un mensaje visible,
        lo retiramos primero.
    */
    if (
        mensajeEmocional.classList.contains(
            "visible"
        )
    ) {

        mensajeEmocional.classList.add(
            "saliendo"
        );


        window.setTimeout(
            () => {

                mensajeEmocional.textContent =
                    texto;


                mensajeEmocional.classList.remove(
                    "saliendo"
                );


                mensajeEmocional.classList.add(
                    "visible"
                );

            },
            movimientoReducido
                ? 0
                : 300
        );


        return;

    }


    mensajeEmocional.textContent =
        texto;


    mensajeEmocional.classList.add(
        "visible"
    );

}


/* ============================================================
   CAMBIAR FOTOGRAFÍA EMOCIONAL
   ============================================================ */

function cambiarFotoEmocional(ruta) {

    /*
        Si todavía no se había mostrado ninguna foto,
        simplemente la hacemos aparecer.
    */
    if (
        !recuerdoVisual.classList.contains(
            "visible"
        )
    ) {

        fotoEmocional.src = ruta;

        recuerdoVisual.classList.add(
            "visible"
        );

        return;

    }


    /*
        Primero hacemos desaparecer suavemente
        la fotografía actual.
    */
    fotoEmocional.classList.add(
        "cambiando"
    );


    window.setTimeout(
        () => {

            fotoEmocional.src = ruta;


            /*
                Esperamos a que la nueva imagen esté
                disponible antes de volver a mostrarla.
            */
            const mostrarNuevaFoto = () => {

                fotoEmocional.classList.remove(
                    "cambiando"
                );

            };


            if (fotoEmocional.complete) {

                mostrarNuevaFoto();

            } else {

                fotoEmocional.addEventListener(
                    "load",
                    mostrarNuevaFoto,
                    {
                        once: true
                    }
                );

            }

        },
        movimientoReducido
            ? 0
            : 350
    );

}


/* ============================================================
   TRANSICIÓN MUSICAL
   ============================================================ */

/*
    La instrumental baja poco a poco mientras Familia
    comienza desde 00:49.

    La transición dura aproximadamente 1.4 segundos.
*/
async function iniciarFamilia() {

    if (transicionMusicalIniciada) {

        return;

    }


    transicionMusicalIniciada = true;

    faseMusical = "familia";


    try {

        musicaFamilia.currentTime =
            INICIO_FAMILIA;


        musicaFamilia.volume =
            0;


        await musicaFamilia.play();


        audioActivo =
            musicaFamilia;


        actualizarControlAudio();


        realizarCrossfade();

    } catch (error) {

        /*
            Si algún navegador impide iniciar Familia,
            dejamos registrada la situación.

            El control musical seguirá permitiendo
            intentar reproducirla manualmente.
        */
        console.warn(
            "No fue posible iniciar Familia.",
            error
        );


        musicaFamilia.volume =
            1;


        audioActivo =
            musicaFamilia;


        actualizarControlAudio();

    }

}


/* ============================================================
   CROSSFADE
   ============================================================ */

function realizarCrossfade() {

    const duracion =
        1400;


    const momentoInicial =
        performance.now();


    function animar(volumenActual) {

        const progreso =
            Math.min(
                (
                    volumenActual -
                    momentoInicial
                ) /
                duracion,
                1
            );


        musicaInicio.volume =
            Math.max(
                0,
                1 - progreso
            );


        musicaFamilia.volume =
            Math.min(
                1,
                progreso
            );


        if (progreso < 1) {

            window.requestAnimationFrame(
                animar
            );

            return;

        }


        musicaInicio.pause();

        musicaInicio.volume =
            1;


        musicaFamilia.volume =
            1;

    }


    window.requestAnimationFrame(
        animar
    );

}


/* ============================================================
   LÍNEA DE TIEMPO
   MÚSICA INICIAL
   ============================================================ */

/*
    Todos estos tiempos corresponden a musica-inicio.mp3.

    Como comienza desde 00:00, el valor también representa
    aproximadamente el segundo de la experiencia.
*/
const accionesInicio = [

    /* --------------------------------------------------------
       COLEGIO
       -------------------------------------------------------- */

    {
        tiempo: 0.8,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaColegio
            );

            monitorNormal();

        }
    },


    {
        tiempo: 1.5,
        ejecutada: false,

        accion: () => {

            dialogoJordy.classList.add(
                "visible"
            );

            /*
                Jordy se mueve ligeramente mientras habla.
            */
            jordyColegio.classList.add(
                "hablando"
            );

        }
    },


    {
        tiempo: 4.0,
        ejecutada: false,

        accion: () => {

            dialogoJordy.classList.remove(
                "visible"
            );

            jordyColegio.classList.remove(
                "hablando"
            );


            dialogoDiana.classList.add(
                "visible"
            );

            /*
                Diana responde inmediatamente.
            */
            dianaColegio.classList.add(
                "hablando"
            );

        }
    },


    {
        tiempo: 6.1,
        ejecutada: false,

        accion: () => {

            dialogoDiana.classList.remove(
                "visible"
            );

            dianaColegio.classList.remove(
                "hablando"
            );


            /*
                Pequeña reacción después de mandar a Jordy
                de regreso a su antigua escuela.
            */
            dianaColegio.classList.add(
                "reaccionando"
            );


            remateColegio.classList.add(
                "visible"
            );

        }
    },


    {
        tiempo: 7.6,
        ejecutada: false,

        accion: () =>

            textoOchoAnios.classList.add(
                "visible"
            )
    },


    /* --------------------------------------------------------
       PRIMERA BORRACHERA
       -------------------------------------------------------- */

    {
        tiempo: 9.2,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaTaxi
            );

            monitorNormal();

        }
    },


    /*
        Los vasos aparecen uno por uno para mostrar
        visualmente que Jordy tomó bastante.
    */
    {
        tiempo: 9.9,
        ejecutada: false,

        accion: () =>
            vasos[0].classList.add(
                "visible"
            )
    },


    {
        tiempo: 10.2,
        ejecutada: false,

        accion: () =>
            vasos[1].classList.add(
                "visible"
            )
    },


    {
        tiempo: 10.5,
        ejecutada: false,

        accion: () =>
            vasos[2].classList.add(
                "visible"
            )
    },


    {
        tiempo: 10.8,
        ejecutada: false,

        accion: () =>
            vasos[3].classList.add(
                "visible"
            )
    },


    {
        tiempo: 11.1,
        ejecutada: false,

        accion: () =>
            vasos[4].classList.add(
                "visible"
            )
    },


    {
        tiempo: 11.7,
        ejecutada: false,

        accion: () => {

            jordyBorracho.classList.add(
                "visible"
            );


            mensajeTome.classList.add(
                "visible"
            );

        }
    },


    {
        tiempo: 12.9,
        ejecutada: false,

        accion: () => {

            /*
                Diana acompaña a Jordy hasta el taxi.

                Ambos personajes bajan visualmente hacia el vehículo
                justo antes de que este aparezca.
            */
            jordyBorracho.classList.add(
                "subiendo"
            );

        }
    },


    /*
        El taxi entra después de establecer visualmente
        que fue una borrachera seria.
    */
    {
        tiempo: 13.3,
        ejecutada: false,

        accion: () =>

            taxi.classList.add(
                "visible"
            )
    },


    /*
        El ECG cambia a rojo justo antes del accidente.
    */
    {
        tiempo: 14.6,
        ejecutada: false,

        accion: monitorEnAlerta
    },


    {
        tiempo: 15.2,
        ejecutada: false,

        accion: () =>

            accidenteTaxi.classList.add(
                "visible"
            )
    },


    {
        tiempo: 15.9,
        ejecutada: false,

        accion: () =>

            resultadoTaxi.classList.add(
                "visible"
            )
    },


    /* --------------------------------------------------------
       MAMA NEGRA
       -------------------------------------------------------- */

    {
        tiempo: 18.0,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaMamaNegra
            );

            monitorNormal();

        }
    },


    {
        tiempo: 18.9,
        ejecutada: false,

        accion: () =>

            dialogoPresentacion.classList.add(
                "visible"
            )
    },


    /*
        Jordy presenta a Diana y al primo.

        Poco después sucede el beso.
    */
    {
        tiempo: 20.5,
        ejecutada: false,

        accion: () => {

            dialogoPresentacion.classList.remove(
                "visible"
            );


            /*
                Ambos personajes se acercan justo antes
                del remate de la escena.
            */
            escenaMamaNegra.classList.add(
                "beso-activo"
            );


            efectoBeso.classList.add(
                "visible"
            );

        }
    },


    /*
        El verdadero remate aparece después de una
        pequeña pausa incómoda.
    */
    {
        tiempo: 21.6,
        ejecutada: false,

        accion: () => {

            efectoBeso.classList.remove(
                "visible"
            );

            escenaMamaNegra.classList.remove(
                "beso-activo"
            );


            alertaDato.classList.add(
                "visible"
            );

        }
    },


    /* --------------------------------------------------------
       DIAGNÓSTICO EXPRESS
       -------------------------------------------------------- */

    {
        tiempo: 23.4,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaDiagnostico
            );

            monitorNormal();

        }
    },


    {
        tiempo: 24.0,
        ejecutada: false,

        accion: () =>

            resultados[0].classList.add(
                "visible"
            )
    },


    {
        tiempo: 24.7,
        ejecutada: false,

        accion: () =>

            resultados[1].classList.add(
                "visible"
            )
    },


    {
        tiempo: 25.4,
        ejecutada: false,

        accion: () =>

            resultados[2].classList.add(
                "visible"
            )
    },


    {
        tiempo: 26.1,
        ejecutada: false,

        accion: () => {

            resultados[3].classList.add(
                "visible"
            );


            /*
                El radar aparece precisamente cuando se
                confirman sus "gustos patrióticos".
            */
            radar.classList.add(
                "visible"
            );

        }
    },


    /* --------------------------------------------------------
       FOTO
       -------------------------------------------------------- */

    {
        tiempo: 28.2,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaFoto
            );


            monitorNormal();

        }
    },


    {
        tiempo: 28.8,
        ejecutada: false,

        accion: () =>

            fotoEvidencia.classList.add(
                "visible"
            )
    },


    {
        tiempo: 29.8,
        ejecutada: false,

        accion: () =>

            fraseFotoUno.classList.add(
                "visible"
            )
    },


    {
        tiempo: 31.1,
        ejecutada: false,

        accion: () => {

            fraseFotoUno.classList.remove(
                "visible"
            );


            fraseFotoDos.classList.add(
                "visible"
            );

        }
    },


    /* --------------------------------------------------------
       CAMBIO DE TONO
       -------------------------------------------------------- */

    {
        tiempo: 32.8,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaTransicion
            );


            monitorNormal();

        }
    },


    {
        tiempo: 33.2,
        ejecutada: false,

        accion: () =>

            fueraDeJoda.classList.add(
                "visible"
            )
    },


    /*
        Familia comienza mientras todavía vemos
        "Fuera de joda…".

        Eso hace que el cambio musical se sienta natural.
    */
    {
        tiempo: 34.2,
        ejecutada: false,

        accion: iniciarFamilia
    }

];


/* ============================================================
   LÍNEA DE TIEMPO
   FAMILIA
   ============================================================ */

/*
    Estos tiempos pertenecen directamente a familia.mp3.

    El archivo comienza para nosotros desde 00:49.
*/
const accionesFamilia = [

    /* --------------------------------------------------------
       PARTE SINCERA
       -------------------------------------------------------- */

    {
        tiempo: 49.8,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaEmocional
            );


            cambiarFotoEmocional(
                "assets/fotos/juntos-01.jpg"
            );

            mostrarMensajeEmocional(
                "Gracias por estar."
            );


            monitorNormal();

        }
    },


    {
        tiempo: 52.8,
        ejecutada: false,

        accion: () => {

            cambiarFotoEmocional(
                "assets/fotos/recuerdo-divertido-02.jpg"
            );

            mostrarMensajeEmocional(
                "Por los consejos, buenos o malos."
            );

        }
    },


    {
        tiempo: 55.9,
        ejecutada: false,

        accion: () => {

            cambiarFotoEmocional(
                "assets/fotos/diana-montana.jpg"
            );

            mostrarMensajeEmocional(
                "Te quiero mucho."
            );

        }
    },


    {
        tiempo: 59.0,
        ejecutada: false,

        accion: () => {

            cambiarFotoEmocional(
                "assets/fotos/juntos-02.jpg"
            );

            mostrarMensajeEmocional(
                "Eres más que una amiga, como la hermana que nunca tuve."
            );

        }
    },


    /* --------------------------------------------------------
       DIAGNÓSTICO FINAL
       -------------------------------------------------------- */

    {
        tiempo: 63.0,
        ejecutada: false,

        accion: () => {

            mostrarEscena(
                escenaCierre
            );


            monitorNormal();

        }
    },


    /*
        Después de mostrar por un momento:

        - Clasismo incurable.
        - Gustos patrióticos sin tratamiento.

        desaparecen suavemente para dejar espacio
        al feliz cumpleaños.
    */
    {
        tiempo: 65.7,
        ejecutada: false,

        accion: () => {

            resultadoFinal.style.transition =
                "opacity 450ms ease, transform 450ms ease";


            resultadoFinal.style.opacity =
                "0";


            resultadoFinal.style.transform =
                "translateY(-0.4rem)";

        }
    },


    {
        tiempo: 66.3,
        ejecutada: false,

        accion: () =>

            felicitacionFinal.classList.add(
                "visible"
            )
    },


    {
        tiempo: 67.0,
        ejecutada: false,

        accion: () =>

            botonAlta.classList.add(
                "visible"
            )
    }

];


/* ============================================================
   PROCESAR LÍNEAS DE TIEMPO
   ============================================================ */

function procesarAcciones(
    acciones,
    tiempoActual
) {

    acciones.forEach(
        (elemento) => {

            if (
                !elemento.ejecutada &&
                tiempoActual >=
                    elemento.tiempo
            ) {

                elemento.ejecutada =
                    true;


                elemento.accion();

            }

        }
    );

}


/* ============================================================
   SINCRONIZACIÓN CONTINUA
   ============================================================ */

/*
    requestAnimationFrame comprueba continuamente el tiempo
    real del audio que está manejando la historia.

    No estamos moviendo elementos manualmente cada frame:
    las animaciones visuales siguen estando en CSS.
*/
function sincronizarHistoria() {

    if (!experienciaIniciada) {

        return;

    }


    if (
        faseMusical ===
        "inicio"
    ) {

        procesarAcciones(
            accionesInicio,
            musicaInicio.currentTime
        );

    }


    if (
        faseMusical ===
        "familia"
    ) {

        procesarAcciones(
            accionesFamilia,
            musicaFamilia.currentTime
        );

    }


    animacionSincronizacion =
        window.requestAnimationFrame(
            sincronizarHistoria
        );

}


/* ============================================================
   INICIAR LA EXPERIENCIA
   ============================================================ */

async function iniciarExperiencia() {

    if (experienciaIniciada) {

        return;

    }


    experienciaIniciada =
        true;


    botonIniciar.disabled =
        true;


    /*
        Posicionamos ambos audios antes de iniciar.
    */
    musicaInicio.currentTime =
        0;


    musicaInicio.volume =
        1;


    try {

        musicaFamilia.currentTime =
            INICIO_FAMILIA;

    } catch (error) {

        console.warn(
            "Familia todavía no pudo posicionarse.",
            error
        );

    }


    /*
        Primero pedimos reproducir la canción inicial.

        Como esta función viene directamente del clic
        sobre el botón, el navegador normalmente permitirá
        la reproducción con sonido.
    */
    try {

        await musicaInicio.play();

    } catch (error) {

        console.warn(
            "El navegador bloqueó la música inicial.",
            error
        );

    }


    audioActivo =
        musicaInicio;


    /*
        Cerramos la portada y mostramos el escenario.
    */
    pantallaInicial.classList.add(
        "oculta"
    );


    escenario.classList.add(
        "activo"
    );


    escenario.setAttribute(
        "aria-hidden",
        "false"
    );


    controlAudio.classList.add(
        "visible"
    );


    actualizarControlAudio();


    /*
        Comienza el seguimiento de la música.
    */
    animacionSincronizacion =
        window.requestAnimationFrame(
            sincronizarHistoria
        );

}


/* ============================================================
   BOTÓN INICIAL
   ============================================================ */

botonIniciar.addEventListener(
    "click",
    iniciarExperiencia,
    {
        once: true
    }
);


/* ============================================================
   CONTROL MUSICAL
   ============================================================ */

function actualizarControlAudio() {

    if (!audioActivo) {

        return;

    }


    const pausado =
        audioActivo.paused;


    iconoAudio.textContent =
        pausado
            ? "▶"
            : "❚❚";


    const texto =
        pausado
            ? "Reanudar música"
            : "Pausar música";


    controlAudio.setAttribute(
        "aria-label",
        texto
    );


    controlAudio.setAttribute(
        "title",
        texto
    );

}


/* ============================================================
   PAUSAR / REANUDAR
   ============================================================ */

controlAudio.addEventListener(
    "click",
    async () => {

        if (!audioActivo) {

            return;

        }


        try {

            if (audioActivo.paused) {

                await audioActivo.play();

            } else {

                /*
                    Pausamos ambos por seguridad.

                    Normalmente solo uno estará reproduciéndose.
                */
                musicaInicio.pause();

                musicaFamilia.pause();

            }

        } catch (error) {

            console.warn(
                "No fue posible cambiar el estado del audio.",
                error
            );

        }


        actualizarControlAudio();

    }
);


/* ============================================================
   ACTUALIZAR AUTOMÁTICAMENTE EL BOTÓN MUSICAL
   ============================================================ */

musicaInicio.addEventListener(
    "play",
    actualizarControlAudio
);

musicaInicio.addEventListener(
    "pause",
    actualizarControlAudio
);

musicaFamilia.addEventListener(
    "play",
    actualizarControlAudio
);

musicaFamilia.addEventListener(
    "pause",
    actualizarControlAudio
);


/* ============================================================
   REPETIR FAMILIA DESDE 00:49
   ============================================================ */

/*
    Si Diana permanece en la pantalla después del cierre,
    Familia vuelve a comenzar desde el fragmento elegido.

    No usamos el atributo HTML "loop", porque ese volvería
    al segundo cero del archivo.
*/
musicaFamilia.addEventListener(
    "ended",
    async () => {

        try {

            musicaFamilia.currentTime =
                INICIO_FAMILIA;


            await musicaFamilia.play();

        } catch (error) {

            console.warn(
                "No fue posible repetir Familia.",
                error
            );

        }

    }
);


/* ============================================================
   CONFETI FINAL
   ============================================================ */

function crearConfeti() {

    if (movimientoReducido) {

        return;

    }


    const colores = [
        "#41e3aa",
        "#f4c542",
        "#ff6f75",
        "#a982d8",
        "#55b7d9",
        "#a7bc76"
    ];


    /*
        55 piezas son suficientes para que se sienta
        como celebración sin cargar demasiado el teléfono.
    */
    const cantidad =
        55;


    for (
        let indice = 0;
        indice < cantidad;
        indice += 1
    ) {

        const pieza =
            document.createElement(
                "span"
            );


        pieza.className =
            "pieza-confeti";


        const posicionX =
            Math.random() * 100;


        const desplazamiento =
            (
                Math.random() *
                12
            ) -
            6;


        const rotacion =
            360 +
            Math.random() *
            720;


        const duracion =
            2.2 +
            Math.random() *
            1.5;


        const color =
            colores[
                Math.floor(
                    Math.random() *
                    colores.length
                )
            ];


        pieza.style.setProperty(
            "--x",
            `${posicionX}%`
        );


        pieza.style.setProperty(
            "--desplazamiento",
            `${desplazamiento}rem`
        );


        pieza.style.setProperty(
            "--rotacion",
            `${rotacion}deg`
        );


        pieza.style.setProperty(
            "--duracion",
            `${duracion}s`
        );


        pieza.style.setProperty(
            "--color-confeti",
            color
        );


        confeti.appendChild(
            pieza
        );


        /*
            Una vez termina la caída, eliminamos la pieza
            para no dejar elementos innecesarios en el DOM.
        */
        pieza.addEventListener(
            "animationend",
            () => pieza.remove(),
            {
                once: true
            }
        );

    }

}


/* ============================================================
   DAR DE ALTA
   ============================================================ */

botonAlta.addEventListener(
    "click",
    () => {

        if (altaRealizada) {

            return;

        }


        altaRealizada =
            true;


        crearConfeti();


        botonAlta.textContent =
            "Paciente dada de alta ✓";


        botonAlta.disabled =
            true;

    }
);


/* ============================================================
   LIMPIEZA AL CERRAR LA PÁGINA
   ============================================================ */

window.addEventListener(
    "pagehide",
    () => {

        if (animacionSincronizacion) {

            window.cancelAnimationFrame(
                animacionSincronizacion
            );

        }


        musicaInicio.pause();

        musicaFamilia.pause();

    }
);