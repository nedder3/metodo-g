// ==========================================
// AUDIO SYNTHESIZER (Web Audio API)
// ==========================================
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('murdock_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('murdock_volume') || '0.8'); // 0.0 to 1.0
    this.heartbeatTimer = null;
    this.heartbeatNode = null;
    
    // Music state
    this.musicGain = null;
    this.musicTimer = null;
    this.nextNoteTime = 0;
    this.currentStep = 0;
    this.musicStarted = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn('Web Audio API no está soportada en este navegador.', e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('murdock_muted', this.isMuted);
    
    if (this.isMuted) {
      this.stopHeartbeat();
      if (this.musicGain) {
        this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (this.musicGain) {
        // Smoothly fade music volume back in
        this.musicGain.gain.linearRampToValueAtTime(this.volume * 0.12, this.ctx.currentTime + 0.1);
      }
    }
    return this.isMuted;
  }

  setVolume(volPercent) {
    this.volume = volPercent / 100;
    localStorage.setItem('murdock_volume', this.volume);
    
    if (this.musicGain && !this.isMuted) {
      // Smoothly transition music volume
      this.musicGain.gain.linearRampToValueAtTime(this.volume * 0.12, this.ctx.currentTime + 0.1);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sintetizador de Música de Fondo (Secuenciador del Tema de Daredevil en C Menor)
  startMusic() {
    if (this.musicStarted || !this.ctx) return;
    this.musicStarted = true;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.12, this.ctx.currentTime);
    this.musicGain.connect(this.ctx.destination);

    this.nextNoteTime = this.ctx.currentTime;
    this.currentStep = 0;

    const scheduleAheadTime = 0.1; // segundos de anticipación
    const lookahead = 25.0; // frecuencia del timer en ms

    const scheduler = () => {
      while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
        this.scheduleMusicStep(this.currentStep, this.nextNoteTime);
        
        // Avanzar el paso del secuenciador
        this.currentStep = (this.currentStep + 1) % 32;
        // 240ms por nota (aprox 125 BPM en corcheas)
        this.nextNoteTime += 0.24; 
      }
      this.musicTimer = setTimeout(scheduler, lookahead);
    };

    scheduler();
  }

  scheduleMusicStep(step, time) {
    if (this.isMuted || this.volume === 0) return;

    // Patrón de 32 pasos en C Menor. Dividido en 4 acordes (8 pasos cada uno)
    // Cm (0-7), Ab (8-15), Fm (16-23), G (24-31)
    const chordIdx = Math.floor(step / 8);
    const noteInChord = step % 8;

    // Frecuencias para arpeggio
    const cmArp = [130.81, 155.56, 196.00, 261.63, 311.13, 261.63, 196.00, 155.56]; // C3, Eb3, G3, C4, Eb4, C4, G3, Eb3
    const abArp = [103.83, 130.81, 155.56, 207.65, 261.63, 207.65, 155.56, 130.81]; // Ab2, C3, Eb3, Ab3, C4, Ab3, Eb3, C3
    const fmArp = [87.31, 103.83, 130.81, 174.61, 207.65, 174.61, 130.81, 103.83];  // F2, Ab2, C3, F3, Ab3, F3, C3, Ab2
    const gArp = [98.00, 123.47, 146.83, 196.00, 246.94, 196.00, 146.83, 123.47];   // G2, B2, D3, G3, B3, G3, D3, B2

    let freq = cmArp[noteInChord];
    if (chordIdx === 1) freq = abArp[noteInChord];
    else if (chordIdx === 2) freq = fmArp[noteInChord];
    else if (chordIdx === 3) freq = gArp[noteInChord];

    // --- Arpegiador (Sintetizador melodía) ---
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, time);
    filter.frequency.exponentialRampToValueAtTime(180, time + 0.45);

    // Envolvente de volumen (ataque rápido, caída larga)
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.25, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

    osc.start(time);
    osc.stop(time + 0.5);

    // --- Bajo / Cello (Drone de fondo de baja frecuencia en los pasos 0 y 4) ---
    if (noteInChord === 0 || noteInChord === 4) {
      const bassRoots = [65.41, 51.91, 43.65, 49.00]; // C2, Ab1, F1, G1
      const bassFreq = bassRoots[chordIdx];

      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      const bassFilter = this.ctx.createBiquadFilter();

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.musicGain);

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, time);

      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(120, time);

      // Envolvente de bajo (ataque lento, caída larga para ligarse)
      bassGain.gain.setValueAtTime(0, time);
      bassGain.gain.linearRampToValueAtTime(0.4, time + 0.15);
      bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

      bassOsc.start(time);
      bassOsc.stop(time + 1.0);
    }
  }

  // Sonido de Radar (Sonar Ping)
  playRadarPulse() {
    if (this.isMuted || !this.ctx) return;
    this.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    // Sonido agudo descendente rápido, como un sonar de murciélago
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Sonido de Acierto (Metallic / Chime)
  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    this.resume();

    // Notas de acorde metálico ascendente (Do mayor / C5 y E5 y G5)
    const notes = [523.25, 659.25, 783.99]; 
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.5);
    });
  }

  // Sonido de Error (Dron descendente sordo y áspero)
  playDefeat() {
    if (this.isMuted || !this.ctx) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noise = this.createNoiseBufferNode();
    const oscGain = this.ctx.createGain();
    const noiseGain = this.ctx.createGain();

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    // Oscilador de baja frecuencia descendente
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.8);

    oscGain.gain.setValueAtTime(0.15, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.start(now);
    osc.stop(now + 0.9);

    // Ruido sordo para simular el impacto/golpe
    if (noise) {
      noise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      noise.start(now);
      noise.stop(now + 0.5);
    }
  }

  // Genera un buffer de ruido blanco de apoyo para el golpe de derrota
  createNoiseBufferNode() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 0.5; // medio segundo
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;
    return noiseNode;
  }

  // Latido del Corazón (Heartbeat) - Simula tensión
  startHeartbeat(bpm = 70) {
    this.stopHeartbeat();
    if (this.isMuted || !this.ctx) return;
    this.resume();

    const interval = 60000 / bpm; // ms entre latidos

    const triggerBeat = () => {
      if (this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;
      
      // El latido consta de 2 golpes de baja frecuencia ("lub-dub")
      const playThud = (time, intensity) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

        gain.gain.setValueAtTime(intensity, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.start(time);
        osc.stop(time + 0.2);
      };

      // Primer golpe (lub)
      playThud(now, 0.25);
      // Segundo golpe (dub) un poco más suave, 0.15s después
      playThud(now + 0.15, 0.18);
    };

    // Lanzar inmediatamente y luego en intervalos
    triggerBeat();
    this.heartbeatTimer = setInterval(triggerBeat, interval);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

const audio = new SoundController();

// ==========================================
// CITAS DE DAREDEVIL (Netflix / Comics)
// ==========================================
const defeatQuotes = [
  { text: "El chiste no es cómo caes. Es cómo te levantas.", author: "Jack Murdock" },
  { text: "Un hombre sin miedo es un hombre sin esperanza.", author: "Elektra Natchios" },
  { text: "La justicia es ciega, pero yo no.", author: "Matt Murdock" },
  { text: "No temo a la oscuridad. En la oscuridad, soy libre.", author: "Matt Murdock" },
  { text: "A veces, para hacer justicia, debes convertirte en el demonio.", author: "Matt Murdock" },
  { text: "La gente piensa que no ver significa no sentir. Están equivocados.", author: "Matt Murdock" },
  { text: "Para construir algo mejor, primero hay que destruir el mal.", author: "Wilson Fisk" }
];

// ==========================================
// LÓGICA Y ESTADO DEL JUEGO
// ==========================================
const GAME_TOTAL_QUESTIONS = 50;
let currentQuestions = [];
let currentImages = []; // Listado de imágenes barajadas correspondientes a las preguntas
let currentIdx = 0;
let streak = 0;

// Lista de archivos en la carpeta frames
const availableFrames = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
  "11.jpg", "12.webp", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg",
  "21.jpg", "22.jpg", "23.jpg"
];

// Genera una secuencia de 50 imágenes a partir del banco de 23 frames,
// asegurando que no haya imágenes consecutivas iguales y que el orden esté aleatorizado.
function generateImageSequence() {
  let sequence = [];
  
  while (sequence.length < GAME_TOTAL_QUESTIONS) {
    let chunk = shuffleQuestions(availableFrames);
    
    // Si la primera imagen del nuevo bloque es igual a la última del acumulado,
    // la intercambiamos con la segunda para evitar duplicados consecutivos.
    if (sequence.length > 0 && chunk[0] === sequence[sequence.length - 1]) {
      // Intercambiar primer y segundo elemento del chunk
      [chunk[0], chunk[1]] = [chunk[1], chunk[0]];
    }
    
    sequence = sequence.concat(chunk);
  }
  
  return sequence.slice(0, GAME_TOTAL_QUESTIONS);
}

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const triviaScreen = document.getElementById('trivia-screen');
const downedScreen = document.getElementById('downed-screen');
const victoryScreen = document.getElementById('victory-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const soundToggleBtn = document.getElementById('sound-toggle');
const bloodOverlay = document.getElementById('blood-overlay');

const qText = document.getElementById('q-text');
const optionsContainer = document.getElementById('options-container');
const currentQNum = document.getElementById('current-q-num');
const currentStreak = document.getElementById('current-streak');
const progressBar = document.getElementById('progress-bar');

const failedAtVal = document.getElementById('failed-at');
const failedConceptVal = document.getElementById('failed-concept');
const defeatQuoteText = document.getElementById('defeat-quote');
const defeatQuoteAuthor = document.getElementById('defeat-quote-author');

// Inicializar la interfaz de Sonido (HUD)
function updateSoundButtonUI() {
  const onIcon = document.getElementById('sound-icon-on');
  const offIcon = document.getElementById('sound-icon-off');
  
  if (audio.isMuted) {
    onIcon.style.display = 'none';
    offIcon.style.display = 'block';
    soundToggleBtn.classList.add('muted');
  } else {
    onIcon.style.display = 'block';
    offIcon.style.display = 'none';
    soundToggleBtn.classList.remove('muted');
  }
}

// Cambiar de pantalla
function showScreen(screen) {
  [welcomeScreen, triviaScreen, downedScreen, victoryScreen].forEach(s => {
    s.classList.remove('active');
  });
  screen.classList.add('active');
}

// Mezclador Procedural (Fisher-Yates)
function shuffleQuestions(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Inicializar el juego
function initGame() {
  audio.init();
  streak = 0;
  currentIdx = 0;
  
  // Mezclar el banco total (56 preguntas) y extraer exactamente 50
  const shuffledDb = shuffleQuestions(window.questionsData);
  currentQuestions = shuffledDb.slice(0, GAME_TOTAL_QUESTIONS);

  // Generar secuencia aleatoria de imágenes para esta partida
  currentImages = generateImageSequence();

  showScreen(triviaScreen);
  loadQuestion();
}

// Cargar la pregunta actual en la interfaz
function loadQuestion() {
  if (currentIdx >= GAME_TOTAL_QUESTIONS) {
    // Victoria alcanzada
    audio.stopHeartbeat();
    showScreen(victoryScreen);
    return;
  }

  const currentQ = currentQuestions[currentIdx];

  // Actualizar la imagen del aside derecho con la secuencia aleatorizada
  const imgName = currentImages[currentIdx];
  const imgEl = document.getElementById('aside-comic-img');
  if (imgEl) {
    imgEl.src = `frames/${imgName}`;
    imgEl.alt = `Comic Frame: ${imgName}`;
  }

  // Actualizar HUD
  currentQNum.textContent = (currentIdx + 1).toString();
  currentStreak.textContent = streak.toString();
  
  // Calcular porcentaje e inflar barra de progreso
  const progressPercent = (currentIdx / GAME_TOTAL_QUESTIONS) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressBar.parentElement.setAttribute('aria-valuenow', Math.round(progressPercent));

  // Tensión Auditiva (Latido de corazón)
  // Aumentamos los BPM según avanzamos en el juego para generar suspenso
  if (currentIdx >= 40) {
    audio.startHeartbeat(130); // Racha alta extrema
  } else if (currentIdx >= 25) {
    audio.startHeartbeat(100); // Racha media-alta
  } else if (currentIdx >= 10) {
    audio.startHeartbeat(75);  // Racha inicial tensa
  } else {
    audio.stopHeartbeat();      // Preguntas iniciales relajadas
  }

  // Sonido de radar al aparecer la pregunta
  audio.playRadarPulse();

  // Cargar texto
  qText.textContent = currentQ.question;
  
  // Limpiar y poblar opciones
  optionsContainer.innerHTML = '';
  const optionLetters = ['A', 'B', 'C'];
  
  currentQ.options.forEach((optText, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.innerHTML = `
      <span class="option-badge">${optionLetters[index]}</span>
      <span class="option-text">${optText}</span>
    `;
    
    button.addEventListener('click', () => handleOptionSelection(index, button));
    optionsContainer.appendChild(button);
  });
}

// Manejar selección de opción
function handleOptionSelection(selectedIndex, clickedBtn) {
  const currentQ = currentQuestions[currentIdx];
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  
  // Bloquear todos los botones de inmediato
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQ.answer) {
    // --- RESPUESTA CORRECTA ---
    streak++;
    audio.playSuccess();
    clickedBtn.classList.add('correct');
    
    // Avanzar después de una transición visual breve
    setTimeout(() => {
      currentIdx++;
      loadQuestion();
    }, 1200);

  } else {
    // --- RESPUESTA INCORRECTA (PERMADEATH) ---
    audio.stopHeartbeat();
    audio.playDefeat();
    
    clickedBtn.classList.add('wrong');
    // Revelar la respuesta correcta
    buttons[currentQ.answer].classList.add('correct');
    
    // Efectos de daño físico en pantalla
    document.getElementById('app').classList.add('screen-shake', 'screen-red-flash');
    bloodOverlay.classList.add('active');

    // Cargar estadísticas y frases de la derrota antes de transicionar
    failedAtVal.textContent = (currentIdx + 1).toString();
    failedConceptVal.textContent = currentQ.concept;
    
    // Frase aleatoria de Daredevil
    const randomQuote = defeatQuotes[Math.floor(Math.random() * defeatQuotes.length)];
    defeatQuoteText.textContent = `"${randomQuote.text}"`;
    defeatQuoteAuthor.textContent = randomQuote.author;

    // Transición a pantalla de derrota
    setTimeout(() => {
      // Limpiar animaciones de daño
      document.getElementById('app').classList.remove('screen-shake', 'screen-red-flash');
      bloodOverlay.classList.remove('active');
      
      showScreen(downedScreen);
    }, 1800);
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

const volumeSlider = document.getElementById('volume-slider');

// Sincronizar el valor inicial del slider
if (volumeSlider) {
  volumeSlider.value = Math.round(audio.volume * 100);
  
  // Escuchar cambios de volumen
  volumeSlider.addEventListener('input', (e) => {
    audio.init();
    audio.startMusic();
    audio.setVolume(parseFloat(e.target.value));
  });
}

// Iniciar Partida
startBtn.addEventListener('click', () => {
  audio.init();
  audio.startMusic();
  initGame();
});

// Reiniciar tras Derrota
restartBtn.addEventListener('click', () => {
  audio.init();
  audio.startMusic();
  initGame();
});

// Reiniciar tras Victoria
playAgainBtn.addEventListener('click', () => {
  audio.init();
  audio.startMusic();
  initGame();
});

// Control de Silencio (Mute)
soundToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  audio.init();
  audio.startMusic();
  const isMuted = audio.toggleMute();
  updateSoundButtonUI();
  
  // Si acabamos de desmutear y estamos jugando, reanudar sonidos/latidos
  if (!isMuted && triviaScreen.classList.contains('active')) {
    if (currentIdx >= 40) audio.startHeartbeat(130);
    else if (currentIdx >= 25) audio.startHeartbeat(100);
    else if (currentIdx >= 10) audio.startHeartbeat(75);
  }
});

// Iniciar música en la primera interacción general del usuario
window.addEventListener('click', () => {
  audio.init();
  audio.startMusic();
}, { once: true });

// Inicializar la interfaz del botón de volumen al cargar
updateSoundButtonUI();
