const songs = [
  { title: "Aankhein_Khuli", artist: "Lata_Mangeshkar_Udit_Narayan", src: "songs/Aankhein_Khuli_Song_Mohabbatein_Shah_Rukh_Khan_Aishwarya_Rai_Lata_Mangeshkar_Udit_Narayan.webm" },
  { title: "Larsha_Pekhawar", artist: "Ali_Zafar_ft._Gul_Panra", src: "songs/Larsha_Pekhawar_Ali_Zafar_ft._Gul_Panra_Fortitude_Pukhtoon_Core_Pashto_Song.webm" },
  { title: "Never_Gonna_Give_You_Up", artist: "Rick_Astley", src: "songs/Rick_Astley_-_Never_Gonna_Give_You_Up_Official_Video_4K_Remaster.webm" }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistContainer = document.getElementById("playlist");

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time
  let min = Math.floor(currentTime / 60);
  let sec = Math.floor(currentTime % 60).toString().padStart(2, "0");
  currentTimeEl.textContent = `${min}:${sec}`;

  if (duration) {
    let dMin = Math.floor(duration / 60);
    let dSec = Math.floor(duration % 60).toString().padStart(2, "0");
    durationEl.textContent = `${dMin}:${dSec}`;
  }
}

// Set progress bar position
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Playlist
function loadPlaylist() {
  songs.forEach((song, index) => {
    const songEl = document.createElement("div");
    songEl.textContent = `${song.title} - ${song.artist}`;
    songEl.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistContainer.appendChild(songEl);
  });
}

// Event listeners
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// Init
loadSong(songs[songIndex]);
loadPlaylist();
