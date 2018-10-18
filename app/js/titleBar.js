/* エレメントを取得する関数 */
function getElemClass(className){
  return document.getElementsByClassName(className);
}

/* remoteを取得 */
const remote = require('electron').remote;

/* 現在のウィンドウを取得 */
const win = remote.getCurrentWindow();

/* 最小化 */
const minimize = getElemClass('minimize')[0];
minimize.addEventListener('click', function(){
  win.minimize();
});

/* 最大化と最大化解除 */
const maximize = document.querySelector('.maximize-unmaximize');
maximize.addEventListener('click', function(){
  if (win.isMaximized()){
    win.unmaximize();
  } else {
    win.maximize();
  }
});

/* ウィンドウを閉じる */
const close = document.querySelector('.close');
close.addEventListener('click', function(){
  win.close();
});
