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
const fs = require('fs');
const path = require('path');
mediaList = getElemId('mediaList');
mediaFileInput.addEventListener('change', function(e){
  let files = e.srcElement.files;
  let filesLength = files.length;
  let folderPath = null;

  /* 選択ファイルが複数のときは選択分をリストに追加､単数のときはディレクトリ内のメディアを追加､選択されていないときはスルーする */
  if(filesLength > 1){
    toggleFocusVideo();
    filesLength = files.length;
    for(let i=0;i<filesLength;i++){
      let filePath = files[i].path;
      addMedia(filePath, i);
    }
  }else{
    toggleFocusVideo();
    folderPath = path.dirname(files[0].path);
    fs.readdir(folderPath, function(err, files){
      filesLength = files.length;
      for(let i=0;i<filesLength;i++){
        let filePath = folderPath + '\\' + files[i]; // ファイルパスの復元
        addMedia(filePath, i);
      }
    });
  }
});

/* filePath内i番目のファイルをエレメントに追加 */
function addMedia(filePath, i){
  let videoElem = document.createElement('video');
  videoElem.src = filePath;

  /* 1つ目のvideoにfocusMediaクラスを追加 */
  if(i === 0){
    videoElem.setAttribute('class', 'focusMedia');
    mediaTitle.innerText = path.basename(filePath);
  }
  mediaList.appendChild(videoElem);
}

/* focusMediaクラスがついたvideoタグからfocusMediaクラスを削除する関数 */
let focusMedias = null;
function toggleFocusVideo(){
  focusMedias = mediaList.getElementsByClassName('focusMedia');
  if(focusMedias.length !== 0){
    focusMedias[0].classList.remove('focusMedia');
  }
}
