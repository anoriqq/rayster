'use strict';
const { BrowserWindow } = require('electron');
const { app } = require('electron');

/* アプリケーションをコントロールするモジュール */

/* 全てのウィンドウが閉じたら終了 */
app.on('window-all-closed', function(){
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

/* electronの初期化完了後に実行 */
app.on('ready', function(){
  let win = null;

  /* ウィンドウサイズを1280*720(フレームサイズを含まない)に設定する */
  win = new BrowserWindow({ width: 1280, height: 742, show: false, frame: false, backgroundColor: '#000000' });

  /* 使用するHTMLファイルを指定する */
  win.loadURL(`file://${__dirname}/../html/index.html`);

  /* デベロッパーツールを表示する */
  win.openDevTools();

  /* ページのレタリングが終わったら表示 */
  win.once('ready-to-show', () => {
    win.show();
  });

  /* ウィンドウが閉じられたらアプリも終了 */
  win.on('closed', function(){
    win = null;
  });
});
