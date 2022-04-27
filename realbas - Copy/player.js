let playpause_btn = document.querySelector('#play-pause');
let next_btn = document.querySelector('#next');
let prev_btn = document.querySelector('#prev');
let track_name = document.querySelector('#track-name');

let seek_slider = document.querySelector('#player');
let volume_slider = document.querySelector('#volume');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
// let wave = document.getElementById('wave');
// let randomIcon = document.querySelector('#random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    name: "Harley Bird - Home",
    artist: "Jordan Schor",
    music: "music/Faded.mp3"
  },
  {
    name: "Ikson Anywhere – Ikson",
    artist: "Audio Library",
    music: "music/fallingdown.mp3"
  },
  {
    name: "Beauz & Jvna - Crazy",
    artist: "Beauz & Jvna",
    music: "music/Rather Be.mp3"
  }
];

loadTrack(track_index);

function loadTrack(track_index){
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  track_name.innerHTML = music_list[track_index].name;
  curr_track.load();
  console.log("Start")

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener('ended', nextTrack);
}

function reset(){
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack(){
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
  curr_track.play();
  isPlaying = true;
  // track_art.classList.add('rotate');
  // wave.classList.add('loader');
  playpause_btn.src = './asset/icons/previous icon.svg';
}

function pauseTrack(){
  curr_track.pause();
  isPlaying = false;
  playpause_btn.src = './asset/icons/play icon.svg';
}

function nextTrack(){
  if(track_index < music_list.length - 1 && isRandom === false){
      track_index += 1;
  }else if(track_index < music_list.length - 1 && isRandom === true){
      let random_index = Number.parseInt(Math.random() * music_list.length);
      track_index = random_index;
  }else{
      track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack(){
  if(track_index > 0){
      track_index -= 1;
  }else{
      track_index = music_list.length -1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume(){
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(curr_track.duration)){
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

      if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
      if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
      if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationMinutes;
  }
}