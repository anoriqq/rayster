const previous = document.getElementById('previous');
const next = document.getElementById('next');

let focusMedia = null;

/* 次のメディアをフォーカス */
next.addEventListener('click', function(){
  focusMedia = getFocusMedia();
  if(focusMedia && focusMedia.nextElementSibling){
    focusChange(focusMedia, focusMedia.nextElementSibling);
  }
});

/* 前のメディアをフォーカス */
previous.addEventListener('click', function(){
  focusMedia = getFocusMedia();
  if(focusMedia && focusMedia.previousElementSibling){
    focusChange(focusMedia, focusMedia.previousElementSibling);
  }
});

/* focusMediaを取得する関数 */
function getFocusMedia(){
  return mediaList.getElementsByClassName('focusMedia')[0];
}

/* focusMediaクラスを付け替える関数 */
function focusChange(focusMedia, nextMedia){
  focusMedia.classList.remove('focusMedia');
  nextMedia.classList.add('focusMedia');
  mediaTitle.innerText = path.basename(nextMedia.src);
}
