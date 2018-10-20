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
  mediaTitle.innerText = decodeURIComponent(path.basename(nextMedia.src));
}

/* 左右ボタンを2s間ホバーしたときにchangeMediaView関数を実行 */
let changeMediaViewTimeout = null;
let unListViewTimeout = null;
const mediaChangeButton = getElemClass('mediaChangeButton');
for(let i=0;i<mediaChangeButton.length;i++){
  mediaChangeButton[i].addEventListener('mouseenter', function(){
    window.clearTimeout(unListViewTimeout);
    changeMediaViewTimeout = window.setTimeout(changeMediaView, 500);
  });
  mediaChangeButton[i].addEventListener('mouseleave', function(){
    window.clearTimeout(changeMediaViewTimeout);
    unListViewTimeout = window.setTimeout(unListView, 500);
  });
  mediaChangeButton[i].addEventListener('click', function(){
    window.clearTimeout(changeMediaViewTimeout);
    window.clearTimeout(unListViewTimeout);
    changeMediaView();
  });
}

/* メディアリストを変更する関数 */
let regexp = /.*focusMedia.*/;
function changeMediaView(){
  let changeStartNumber = 0;
  let ListViewNumber = 0;
  for(let i=0;i<medias.length;i++){
    if(regexp.test(medias[i].classList.value)){
      changeStartNumber = i-3;
      break;
    }
  }
  let ListViewNumberSetFlag = false;
  for(let i=0;i<medias.length;i++){
    if(i >= changeStartNumber && i < changeStartNumber+7){
      medias[i].classList.add('listView');
      if(changeStartNumber<0 && !ListViewNumberSetFlag){
        ListViewNumber = changeStartNumber*-1;
        ListViewNumberSetFlag = true;
      }
      ListViewNumber++;
      removeListViewNumber(i);
      medias[i].classList.add(`LVN_${ListViewNumber}`);
    }else{
      medias[i].classList.remove('listView');
      removeListViewNumber(i);
    }
  }
}

/* クラスから要素配列を取得する関数 */
function getElemClass(className){
  return document.getElementsByClassName(className);
}

/* メディアを通常のビューみ戻す関数 */
function unListView(){
  for(let i=0;i<medias.length;i++){
    medias[i].classList.remove('listView');
    removeListViewNumber(i);
  }
}

/* リストビューナンバークラスを削除する関数 */
function removeListViewNumber(i){
  for(let j=1;j<=7;j++){
    medias[i].classList.remove(`LVN_${j}`);
  }
}
