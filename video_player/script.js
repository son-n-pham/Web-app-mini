const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
};

// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
const displayTime = timeSeconds => {
  let minutes = ('0' + Math.floor(timeSeconds / 60)).slice(-2);
  let seconds = ('0' + Math.floor(timeSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = displayTime(video.duration);
};

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / this.clientWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  console.log(video.currentTime);
}

// Volume Controls --------------------------- //

let lastVolume = 1;
let isMuted = false;

// Update Volume Icon
function updateVolumeIcon(volume) {
  volumeIcon.className = '';
  if (volume >= 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && 0 < volume) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }

  // Update the volume bar
  volumeBar.style.width = `${volume * 100}%`;
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / this.clientWidth;

  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }

  if (volume > 0.9) {
    volume = 1;
  }

  // Update video volume
  video.volume = volume;

  // Update volume icon
  updateVolumeIcon(volume);

  // Update lastVolume
  lastVolume = volume;
}

const toggleMute = e => {
  if (video.volume !== 0) {
    video.volume = 0;
  } else {
    video.volume = lastVolume;
  }
  updateVolumeIcon(video.volume);
};
// Change Playback Speed -------------------- //
const changePlaybackSpeed = e => {
  video.playbackRate = e.target.value;
};

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullScreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

let fullScreen = false;
function toggleFullScreen() {
  !fullScreen ? openFullScreen(player) : closeFullScreen();

  fullScreen = !fullScreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changePlaybackSpeed);
fullscreenBtn.addEventListener('click', toggleFullScreen);
