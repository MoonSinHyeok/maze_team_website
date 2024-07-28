// 재생목록
const songList = [
  {
    name: "메이즈 전대 테마",
    src: "Resources/music/maze_theme.mp3",
  },
  {
    name: "강철의 눈보라",
    src: "Resources/music/blizard_of_steel.mp3",
  },
  {
    name: "육익",
    src: "Resources/music/six_wings.mp3",
  },
];

// html 문서에서 js에서 사용할 요소들 가져오기
const songName = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");

// song = new Audio(src) -> src위치에 있는 노래 객체 생성.
// currentSong -> 노래 전환을 위한 변수
// playing -> 재생중인지 여부를 나타내는 변수
// vol -> 볼륨 조절을 위한 변수: song.volume = vol;
let song = new Audio();
let currentSong = 0;
let playing = false;
let vol = 0.5;

// 이미지 슬라이드 인덱스
var slideIndex = 0;

// 실행될때마다 인덱스에 해당하는 이미지를 제외한 다른이미지 안보이게 + 인덱스에 해당하는 이미지 보이게 -> 애니메이션 적용되면서 나타남. index++해주고 다음 실행은 3000ms뒤
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "flex";

  setTimeout(showSlides, 3000); // 3초마다 이미지 변경
}

// 페이지 로드후("DOMContentLoaded") 실행되는 이벤트추가
// time, song.vol은 미리 초기화
// song에 timeupdate와 ended 이벤트 추가, 발생시 실행할 함수 넣기
// 버튼 및 진행 바에 클릭 이벤트와 실행할 함수 추가
document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  showSlides();
  time.innerText = "0:00 - 0:00";
  song.volume = vol;
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  minusBtn.addEventListener("click", minusVol);
  plusBtn.addEventListener("click", plusVol);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
});

// 노래를 불러오는 함수. song 객체에 src를 넣고 songName text 바꾸기
function loadSong(index) {
  const { name, src } = songList[index];
  songName.innerText = name;
  song.src = src;
}

// song 객체에서 timeupdate 이벤트가 생길때마다 실행될 함수.
// 시간 증가 및 진행 바 조정
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

// song.duration -> seconds 초단위로 입력됨. 소수점까지 들어와서 그런지 버그나서 parseInt해주고 00:00 - 00:00 형태 문자열로 변환
function formatTime(seconds) {
  seconds = parseInt(seconds);
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// playing에 따라 버튼 누를때마다 실행 정지 해주고 반대로. 아이콘 변환은 덤
function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle("bx-stop", playing); // 플레이 = true 면 bx-stop 추가 false면 제거
  playBtn.classList.toggle("bxs-right-arrow", !playing); //
}

// 간단한 볼륨조절 함수
function minusVol() {
  vol -= 0.1;
  if (vol < 0) {
    vol = 0;
  }
  song.volume = vol;
  console.log(vol, "minus");
}

function plusVol() {
  vol += 0.1;
  if (vol > 1) {
    vol = 1;
  }
  song.volume = vol;
  console.log(vol, "plus");
}

// songList길이를 이용해 다음 노래 이전노래 인덱스 조정
function nextSong() {
  currentSong = (currentSong + 1) % songList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songList.length) % songList.length;
  playMusic();
}

// currentSong 인덱스에 해당하는 노래를 재생
function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("bx-stop");
  playBtn.classList.remove("bxs-right-arrow");
}

// 바의 x길이와 부모 요소의 길이, 곡의 길이를 이용해 바의 길이 만큼 현재 곡 시간 반영
function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}
