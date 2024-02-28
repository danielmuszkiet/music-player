const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

function changeSong(i) {
  songIndex = (songIndex + i) % songs.length;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Stelect First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currminutes = Math.floor(currentTime / 60);
    const currseconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
    currentTimeEl.textContent = `${currminutes}:${currseconds}`;
  }
}

function loadMetaDataDuration(e) {
  const { duration } = e.srcElement;
  const minutes = Math.floor(duration / 60);
  const seconds = String(Math.floor(duration % 60)).padStart(2, "0");
  durationEl.textContent = `${minutes}:${seconds}`;
}

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", () => changeSong(1));
prevBtn.addEventListener("click", () => changeSong(-1));
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("loadedmetadata", loadMetaDataDuration);
music.addEventListener("ended", () => changeSong(1));
// Set Progress Bar
progressContainer.addEventListener("click", (e) => {
  console.log(e);
  const percentOnBar = e.offsetX / progressContainer.offsetWidth;
  music.currentTime = music.duration * percentOnBar;
  playSong();
});
