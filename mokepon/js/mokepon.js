const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedor-ataques');

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionesDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let mascotaJugador;
let mascotaJugadorObjeto;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './mokemap.png';
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadx = 0;
        this.velocidady = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodoge = new Mokepon('Hipodoge', './mokepons_mokepon_hipodoge_attack.png', 5, './hipodoge.png');
let Capipepo = new Mokepon('Capipepo', './mokepons_mokepon_capipepo_attack.png', 5, './capipepo.png');
let Ratigueya = new Mokepon('Ratigueya', './mokepons_mokepon_ratigueya_attack.png', 5, './ratigueya.png');

let HipodogeEnemigo = new Mokepon('Hipodoge', './mokepons_mokepon_hipodoge_attack.png', 5, './hipodoge.png');
let CapipepoEnemigo = new Mokepon('Capipepo', './mokepons_mokepon_capipepo_attack.png', 5, './capipepo.png');
let RatigueyaEnemigo = new Mokepon('Ratigueya', './mokepons_mokepon_ratigueya_attack.png', 5, './ratigueya.png');

Hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua-Hipodoge' },
    { nombre: '💧', id: 'boton-agua-Hipodoge' },
    { nombre: '💧', id: 'boton-agua-Hipodoge' },
    { nombre: '🔥', id: 'boton-fuego-Hipodoge' },
    { nombre: '🌱', id: 'boton-tierra-Hipodoge' }
);

Capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra-Capipepo' },
    { nombre: '🌱', id: 'boton-tierra-Capipepo' },
    { nombre: '🌱', id: 'boton-tierra-Capipepo' },
    { nombre: '💧', id: 'boton-agua-Capipepo' },
    { nombre: '🔥', id: 'boton-fuego-Capipepo' }
);

Ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego-Ratigueya' },
    { nombre: '🔥', id: 'boton-fuego-Ratigueya' },
    { nombre: '🔥', id: 'boton-fuego-Ratigueya' },
    { nombre: '💧', id: 'boton-agua-Ratigueya' },
    { nombre: '🌱', id: 'boton-tierra-Ratigueya' }
);

mokepones.push(Hipodoge, Capipepo, Ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionesDeMokepones;
    });

    sectionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    
    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert('Selecciona una mascota');
        return;
    }
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    contenedorAtaques.innerHTML = "";

    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botones = document.querySelectorAll('.BAtaque');

    secuenciaAtaque();
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO');
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA');
            } else {
                ataqueJugador.push('TIERRA');
            }
            console.log(ataqueJugador);
            boton.style.background = '#DC5F00';
            boton.disabled = true; // Desactivar el botón después de hacer clic
            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == '🔥') {
        ataqueEnemigo.push('FUEGO');
    } else if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == '💧') {
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas();
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadx;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidady;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

    mascotaJugadorObjeto.pintarMokepon();
    HipodogeEnemigo.pintarMokepon();
    CapipepoEnemigo.pintarMokepon();
    RatigueyaEnemigo.pintarMokepon();

    if (mascotaJugadorObjeto.velocidadx !== 0 || mascotaJugadorObjeto.velocidady !== 0) {
        revisarColision(HipodogeEnemigo);
        revisarColision(CapipepoEnemigo);
        revisarColision(RatigueyaEnemigo);
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadx = 5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadx = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidady = 5;
}

function moverArriba() {
    mascotaJugadorObjeto.velocidady = -5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadx = 0;
    mascotaJugadorObjeto.velocidady = 0;
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mapa.width = 800 - 4;
    mapa.height = 600 - 4;
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribamascota = mascotaJugadorObjeto.y;
    const abajomascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechamascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdamascota = mascotaJugadorObjeto.x;

    if (
        abajomascota < arribaEnemigo ||
        arribamascota > abajoEnemigo ||
        derechamascota < izquierdaEnemigo ||
        izquierdamascota > derechaEnemigo 
    ) {
        return;
    }

    detenerMovimiento();
    seleccionarMascotaEnemigo(enemigo);
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
}

window.addEventListener('load', iniciarJuego);

