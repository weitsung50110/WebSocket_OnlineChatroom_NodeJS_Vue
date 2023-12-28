// 建立 WebSocket 連接
const socket = new WebSocket('ws://localhost:3000'); // 根據您的伺服器位址和埠號設定

// 連接成功時的事件處理
socket.onopen = function(event) {
  console.log('已連接至 WebSocket 伺服器');
};

// 接收到訊息時的事件處理
socket.onmessage = function(event) {
    // console.log('接收到伺服器訊息：', event.data);
    // 解析接收到的 JSON 資料
    console.log('only event接收到伺服器訊息：', event);
    console.log('before JSON.parse接收到伺服器訊息：', event.data);
    const data = JSON.parse(event.data);
    console.log('JSON.parse接收到伺服器訊息：', data.name+": "+data.message+";時間: "+data.time);

    // 將訊息顯示在畫面上
    let messageBox = document.getElementById('messageBox');
    let nodeDiv=document.createElement("div");
    nodeDiv.style.display = "flex";  //運用Flexbox 佈局
    nodeDiv.style.justifyContent = "space-between"; // 設置 flex 容器屬性，讓兩個元素(ex:span)可以分隔最開

    let nodeSpan1=document.createElement("span");
    let nodeSpan2=document.createElement("span");
    nodeSpan2.classList.add("timestamp");  // 添加 class 到 <span> 元素
    let br = document.createElement("br");

    check_name(data.name, nodeSpan1); //(確認名字name是否相同) 如果發表訊息的人是自己 就將訊息的顏色進行更改

    textnode=document.createTextNode(`- ${data.name} : ${data.message}`);
    texttime=document.createTextNode(`- ${data.time}`);
    
    // 將 <span> 元素和文字節點附加到訊息框中
    messageBox.appendChild(nodeDiv).appendChild(nodeSpan1).appendChild(textnode);
    messageBox.appendChild(nodeDiv).appendChild(nodeSpan2).appendChild(texttime);
    messageBox.appendChild(br); // 在 <span> 元素後面插入 <br> 元素
};

// 關閉連接時的事件處理
socket.onclose = function(event) {
  console.log('WebSocket 連接已關閉');
};

// 送出訊息函數
document.getElementById('text_btn').addEventListener('click', () =>{
    const inputName = document.getElementById('inputName').value;
    const inputMessage = document.getElementById('inputMessage').value;

    // 獲取當前時間
    formattedTime = getTime()

    // 組合名稱和訊息成為一個物件，然後將其轉換成 JSON 格式的字串
    const data = JSON.stringify({ name: inputName, message: inputMessage, time: formattedTime });

    socket.send(data);
    document.getElementById('inputMessage').value = ''; // 清空輸入框

    //產生名字在頁面上
    document.querySelector('.user-name').textContent = "name: "+inputName

})

function check_name(dataname, nodeSpan1){
  let inputName = document.getElementById('inputName').value;
  if(dataname===inputName){
    nodeSpan1.style.color = 'blue'; // 如果是自己發表的文字 將它變成Blue顏色
  }
}

// 獲取當前時間函式
function getTime() {
  // 獲取當前時間
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // 將時間補零到兩位數
  // 它的作用是根據條件的真假來返回不同的值。如果條件成立，則返回冒號前面的值，否則返回冒號後面的值。
  const formattedHours = hours < 10 ? `0${hours}` : hours; 
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; // 格式化為 HH:MM 格式

  // 將格式化後的時間值作為物件返回
  return formattedTime;
}

// 更新時間
function updateClock() {
  // 獲取當前時間
  formattedTime = getTime()
  document.getElementById('realTimeClock').textContent = `Current Time: ${formattedTime}`;
}

// 每秒更新時間  //它會以指定的時間間隔執行指定的函式，不會重新整理整個網頁。
setInterval(updateClock, 1000);

// 網頁載入時先執行一次更新
updateClock();

document.getElementById('smileyButton').addEventListener('click', () => {
  insertEmoji('😊'); // 插入笑臉符號
});

document.getElementById('heartButton').addEventListener('click', () => {
  insertEmoji('❤️'); // 插入心形符號
});

function insertEmoji(emoji) {
  const inputMessage = document.getElementById('inputMessage');
  inputMessage.value += emoji;
}