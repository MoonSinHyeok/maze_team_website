const songList = [
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3"
  },
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3"
  },
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3"
  },
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3"
  },
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3"
  }
];


const songName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;


document.addEventListener('DOMContentLoaded', () => {
  loadSong(currentSong);
  time.innerText = "0:00 - 0:00";
  song.addEventListener('timeupdate', updateProgress);
  song.addEventListener('ended', nextSong);
  minusBtn.addEventListener('click', minusVol);
  plusBtn.addEventListener('click', plusVol);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  playBtn.addEventListener('click', togglePlayPause);
  prog.addEventListener('click', seek);
});


function loadSong(index) {
  const { name, src } = songList[index];
  songName.innerText = name;
  song.src = src;
}


function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;
    const tmp = parseInt(song.duration);
    const duration = formatTime(tmp);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}


function formatTime(seconds) {
  seconds = parseInt(seconds);
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle('bx-stop', playing);
  playBtn.classList.toggle('bxs-right-arrow', !playing);
}


function minusVol() {

}

function plusVol() {

}

function nextSong() {
  currentSong = (currentSong + 1) % songList.length;
  playMusic();
}


function prevSong() {
  currentSong = (currentSong - 1 + songList.length) % songList.length;
  playMusic();
}


function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add('bx-stop');
  playBtn.classList.remove('bxs-right-arrow');
}


function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}

