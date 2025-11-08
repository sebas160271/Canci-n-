// Funcionalidad principal: reproducir, copiar y abrir videos
const playlist = Array.from(document.querySelectorAll('.track'));
const playerIframe = document.getElementById('player');
const nowTitle = document.getElementById('nowTitle');
const copyBtn = document.getElementById('copyLink');

function ytWatchUrl(id){ return 'https://www.youtube.com/watch?v=' + id; }
function embedUrl(id){ return 'https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1'; }

function loadVideo(id, title){
  playerIframe.src = embedUrl(id);
  nowTitle.textContent = title || 'Reproduciendo';
  copyBtn.dataset.url = ytWatchUrl(id);
}

// Cargar video al hacer click
playlist.forEach(tr => {
  tr.addEventListener('click', e => {
    if(e.target && e.target.matches('button')) return;
    loadVideo(tr.dataset.id, tr.dataset.title);
  });

  // Botón "Abrir" abre YouTube
  tr.querySelector('[data-open]').addEventListener('click', ev => {
    ev.stopPropagation();
    window.open(ytWatchUrl(tr.dataset.id), '_blank', 'noopener');
  });
});

// Copiar link
copyBtn.addEventListener('click', async () => {
  const url = copyBtn.dataset.url || ytWatchUrl('LdzcheaMh8Q');
  try{
    await navigator.clipboard.writeText(url);
    copyBtn.textContent = 'Copiado ✅';
    setTimeout(()=> copyBtn.textContent = 'Copiar link', 1500);
  }catch(err){
    prompt('Copia el enlace manualmente:', url);
  }
});

// Botones de acción
document.getElementById('playFirst').addEventListener('click', () => {
  const first = playlist[0];
  loadVideo(first.dataset.id, first.dataset.title);
});
document.getElementById('shuffle').addEventListener('click', () => {
  const rand = playlist[Math.floor(Math.random() * playlist.length)];
  loadVideo(rand.dataset.id, rand.dataset.title);
});

// Inicial
copyBtn.dataset.url = ytWatchUrl('LdzcheaMh8Q');
