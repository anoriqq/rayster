/* エレメントを取得する関数 */
function getElemClass(className){
  return document.getElementsByClassName(className);
}
function getElemId(id){
  return document.getElementById(id);
}

/* Inputタグの取得 */
const mediaFileInput = getElemId('mediaFileInput');

/* cntrollerをクリックしたときにInputをクリックしたときと同じ動作をするようにする */
const cntroller = getElemClass('cntroller');
cntroller[0].addEventListener('click', function(){
  mediaFileInput.click();
});

/* Inputが変更されたときに実行 */
const crypto = require('crypto');
const mediaList = getElemId('mediaList');
mediaFileInput.addEventListener('change', function(e){
  let files = e.srcElement.files;
  let filesLength = files.length;

  /* 選択ファイルが複数のときは選択分をリストに追加､単数のときはディレクトリ内のメディアを追加､選択されていないときはスルーする */
  if(filesLength){
    for(let i=0;i<filesLength;i++){
      let videoElem = document.createElement('video');
      let filePath = files[i].path;
      videoElem.src = filePath;
      let md4 = crypto.createHash('md4');
      md4.update(filePath);
      let hash = md4.digest('hex');
      videoElem.setAttribute('id', `video_${i}_${hash}`);
      mediaList.appendChild(videoElem);
    }/*else if(filesLength === 1){
      // 単数
    }else{
      // 選択無し
    }*/
  }
});
