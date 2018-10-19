/* エレメントを取得する関数 */
function getElemClass(className){
  return document.getElementsByClassName(className);
}
function getElemId(id){
  return document.getElementById(id);
}

/* Inputタグの取得 */
const mediaFileInput = getElemId('mediaFileInput');

/* mediaTitleをクリックしたときにInputをクリックしたときと同じ動作をするようにする */
const mediaTitle = getElemClass('mediaTitle')[0];
mediaTitle.addEventListener('click', function(){
  mediaFileInput.click();
});

/* Inputが変更されたときに実行 */
let mediaList = null;
let medias = getElemClass('media');
const fs = require('fs');
const path = require('path');
const url = require('url');
mediaList = getElemId('mediaList');
mediaFileInput.addEventListener('change', function(e){
  let files = e.srcElement.files;
  let filesLength = files.length;
  let folderPath = null;

  /* 選択ファイルが複数のときは選択分をリストに追加､単数のときはディレクトリ内のメディアを追加､選択されていないときはスルーする */
  if(filesLength > 1){
    toggleFocusMedia();
    for(let i=0;i<filesLength;i++){
      let filePath = files[i].path;
      addMedia(filePath, files);
    }
  }else{
    toggleFocusMedia();
    folderPath = path.dirname(files[0].path);
    fs.readdir(folderPath, function(err, filesList){
      filesLength = filesList.length;
      for(let i=0;i<filesLength;i++){
        let filePath = folderPath + '\\' + filesList[i]; // ファイルパスの復元
        addMedia(filePath, files);
      }
    });
  }
});

/* filePath内i番目のファイルをエレメントに追加 */
const mime = require('mime');
function addMedia(filePath, files){
  let MediaElem = null;

  let mimeType = mime.getType(filePath).match(/(.+)\/.+/)[1];
  if(mimeType == 'image'){
    mimeType = 'img';
  }
  MediaElem = document.createElement(mimeType);

  MediaElem.setAttribute('class', 'media');
  MediaElem.src = filePath;

  /* 1つ目のmediaにfocusMediaクラスを追加 */
  if(files[0].path == filePath){
    MediaElem.setAttribute('class', 'media focusMedia');
    mediaTitle.innerText = path.basename(filePath);
  }

  /* 同じファイルが追加された場合に既存のファイルを削除 */
  for(let i=0;i<medias.length;i++){
    if(url.parse(medias[i].src).path.replace(/^\//, '') == filePath.replace(/\\/g, '/')){
      mediaList.removeChild(medias[i]);
    }
  }

  mediaList.appendChild(MediaElem);
}

/* focusMediaクラスがついたmediaからfocusMediaクラスを削除する関数 */
let focusMedias = null;
function toggleFocusMedia(){
  focusMedias = mediaList.getElementsByClassName('focusMedia');
  if(focusMedias.length !== 0){
    focusMedias[0].classList.remove('focusMedia');
  }
}
