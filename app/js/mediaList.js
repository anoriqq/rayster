const previous = document.getElementById('previous');
const next = document.getElementById('next');

let focusMedia = null;

/* 次のメディアをフォーカス */
next.addEventListener('click', function(){
  focusMedia = mediaList.getElementsByClassName('focusMedia')[0];
  if(focusMedia && focusMedia.nextElementSibling){
    focusMedia.classList.remove('focusMedia');
    focusMedia.nextElementSibling.classList.add('focusMedia');
    mediaTitle.innerText = path.basename(focusMedia.nextElementSibling.src);
  }
});

/* 前のメディアをフォーカス */
previous.addEventListener('click', function(){
  focusMedia = mediaList.getElementsByClassName('focusMedia')[0];
  if(focusMedia && focusMedia.previousElementSibling){
    focusMedia.classList.remove('focusMedia');
    focusMedia.previousElementSibling.classList.add('focusMedia');
    mediaTitle.innerText = path.basename(focusMedia.previousElementSibling.src);
  }
});
