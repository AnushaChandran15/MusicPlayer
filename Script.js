let musicPlayer=document.getElementById('musicPlayer');
let img=document.getElementById('img');
let songName=document.getElementById('songHeading');
let artist=document.getElementById('artist');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let play = document.getElementById('play');
let playPause = document.getElementById('playPause');
let shuffle = document.getElementById('shuffle');
let mainAudio=document.getElementById('main-audio');
let progressArea = document.querySelector('.progress-area');
let progressbar=document.getElementById('progressbar');
let currentTimeDisplay = document.querySelector('.current-timer:first-child');
let durationDisplay = document.querySelector('.current-timer:last-child');
let thumb = document.getElementById('thumb');
let musicListBar = document.getElementById('music-list-bar');
let myMusics=document.getElementById('my-musics');
let musicId=document.querySelector('musics')
let index = 0;

// let songs = [
//   {
//       "title": "Who Says",
//       "artist": "Selena GomeZ",
//       "image": "./assets/Selena-Gomez-img.jpg",
//       "path": "./assets/Who-Says.mp3"
//   },
//   {
//       "title": "Beliver",
//       "artist": "Imagine Dragons",
//       "image": "./assets/believer-img.jpg",
//       "path": "./assets/Believer.mp3"
//   },
//   {
//       "title": "Let it go",
//       "artist": "Idina Menzal",
//       "image": "./assets/idinaMenzel-let-it-go1.jpg",
//       "path": "./assets/Let-it-go.mp3"
//   },
//   {
//       "title": "Pickup the phone",
//       "artist": "Henry Moodie",
//       "image": "./assets/HenryMoodie-pickup-the-phone.jpg",
//       "path": "./assets/Pickup-the-phone.mp3"
//   }
// ];
let playing=false;
let songs;
// let myMusicList;
async function makeRequest () {
    const url = './data.json';
    try
    {
    songs = await fetch(url).then((res)=>res.json());
    load(songs[index]);
    }
    catch(rej)
    {
      console.log("Json file can not supported...");
    }
}
makeRequest();
// myMusicList=songs;
function load(data)
{
    img.src=data["image"];
    mainAudio.src=data["path"];
    songName.textContent=data["title"];
    artist.textContent=data["artist"];
}

function playButtonUpdates()
{
    playing ? playPause.className=playPause.className = 'fa-solid fa-pause' : playPause.className = 'fa-solid fa-play';
    playing ? play.title='play' :play.title='pause';

}

 musicListBar.addEventListener("click",()=>{
  console.log(songs);
  let i=0;
 // console.log(myMusicList);
  myMusics.classList.toggle('show');
  musicPlayer.classList.toggle('move-left');
  const songsContainer=document.getElementById('musics');
    songsContainer.innerHTML='';
    songs.forEach(song=>
      {
        const songDiv = document.createElement('div');
        songDiv.classList.add('music');
        songDiv.addEventListener("click",()=>{
            load(song);
            mainAudio.play();
            playing=true;
            playButtonUpdates();
        })
      
        songDiv.innerHTML = `<p id="song">${song["title"]}</p><p id="art">${song["artist"]}</p>`;
        songsContainer.appendChild(songDiv);
      });
     
 });

play.addEventListener("click",()=>{

    if(playing)
    {
         mainAudio.pause();
         playing=false;
         playButtonUpdates();
    }
    else
    {
        mainAudio.play();
        playing=true;
        playButtonUpdates();
    }
});

prev.addEventListener("click",()=>
{
    index--;
   index= index < 0 ? songs.length-1:index;
   load(songs[index]);
   mainAudio.play();
   playing=true;
   playButtonUpdates();

});

next.addEventListener("click",()=>{
  index++;
  index=index>songs.length-1 ? 0:index;
  load(songs[index]);
  mainAudio.play();
  playing=true;
  playButtonUpdates();
});

repeat.addEventListener("click",()=>
{
  load(songs[index]);
  mainAudio.play();
  playing=true;
  playButtonUpdates();
});
shuffle.addEventListener("click",()=>
{
  for(let i=songs.length-1;i>=0;i--)
  {
      let j=Math.floor(Math.random()*(i+1));
      let temp=songs[i];
      songs[i]=songs[j];
      songs[j]=temp;
  }
  console.log(songs);
}
);
mainAudio.addEventListener('timeupdate', () => {
  let currentTime = mainAudio.currentTime;
  let duration = mainAudio.duration;
  let progressbarWidth = (currentTime / duration) * 100;
  progressbar.style.width = progressbarWidth + '%';
  thumb.style.left=progressbarWidth+'%';

  currentTimeDisplay.textContent = formatTime(currentTime);

  if (duration) {
      durationDisplay.textContent = formatTime(duration);
  }

  if (currentTime === duration) {
      next.click();
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

progressArea.addEventListener('click', (e) => {
  let width = progressArea.clientWidth;
  let clickX = e.clientX - progressArea.getBoundingClientRect().left;
  let percent = (clickX / width);
  mainAudio.currentTime = percent * mainAudio.duration;
  progressbar.style.width = (percent * 100) + '%';
  thumb.style.left = (percent * 100) + '%';
});



