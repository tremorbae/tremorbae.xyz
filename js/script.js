// ===== MP4 Player =====
const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

playPause.addEventListener('click', () => {
  if (video.paused) video.play();
  else video.pause();
});

video.addEventListener('play', () => {
  if (audio && !audio.paused) audio.pause();
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
  playPause.classList.add('playing');
  playPause.setAttribute('aria-label', 'Pause');
});

video.addEventListener('pause', () => {
  pauseIcon.classList.add('hidden');
  playIcon.classList.remove('hidden');
  playPause.classList.remove('playing');
  playPause.setAttribute('aria-label', 'Play');
});

// ===== Music Player =====
const audio = document.getElementById('audio');
const musicPlayPause = document.getElementById('musicPlayPause');
const musicPlayIcon = document.getElementById('musicPlayIcon');
const musicPauseIcon = document.getElementById('musicPauseIcon');
const musicSeek = document.getElementById('musicSeek');
const musicTime = document.getElementById('musicTime');

function fmtTime(t) {
  if (isNaN(t) || !isFinite(t)) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateMusicTime() {
  musicTime.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  musicSeek.style.setProperty('--seek-fill', pct + '%');
}

musicPlayPause.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

audio.addEventListener('play', () => {
  if (video && !video.paused) video.pause();
  musicPlayIcon.classList.add('hidden');
  musicPauseIcon.classList.remove('hidden');
  musicPlayPause.setAttribute('aria-label', 'Pause');
});

audio.addEventListener('pause', () => {
  musicPauseIcon.classList.add('hidden');
  musicPlayIcon.classList.remove('hidden');
  musicPlayPause.setAttribute('aria-label', 'Play');
});

audio.addEventListener('loadedmetadata', () => {
  musicSeek.max = audio.duration || 100;
  updateMusicTime();
});

audio.addEventListener('timeupdate', () => {
  musicSeek.value = audio.currentTime;
  updateMusicTime();
});

musicSeek.addEventListener('input', () => {
  audio.currentTime = musicSeek.value;
  updateMusicTime();
});

// ===== 90 Day Countdown =====
// Start: May 19, 2026 9:00 PM Eastern. End: +90 days -> Aug 17, 2026 9:00 PM Eastern.
const START = new Date('2026-05-19T21:00:00-04:00').getTime();
const END = new Date('2026-08-17T21:00:00-04:00').getTime();
const TOTAL = END - START;

const progressInner = document.getElementById('progressInner');
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');

const pad = (n) => String(n).padStart(2, '0');

function renderCountdown() {
  const now = Date.now();
  let remaining = END - now;
  if (remaining < 0) remaining = 0;

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);

  const elapsed = Math.min(Math.max(now - START, 0), TOTAL);
  const pct = (elapsed / TOTAL) * 100;
  progressInner.style.width = pct + '%';
}

renderCountdown();
setInterval(renderCountdown, 1000);
