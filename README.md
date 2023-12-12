## 使用WebSocket結合vue.js，在node.js的express實作一個線上聊天室
#### WebSocket加上發訊息時間，即時時間動態顯示，表情符號emoji，發文者訊息文字顏色不同等新功能。
這次把原始的VanillaJS(原生Java script)，轉換成vue.js的形式。<br />
我們可以發現傳換成vue後，程式碼的function都是寫在methods:中，<br />
而data() { return { }}裡面則是存放初始訊息，<br />
像是.html中有使用大括號{{ }}，它將資料動態地綁定到html的元素上，<br />
使得資料變更時能夠自動更新。<br />

Root Directory<br />
├── server.js<br />
├── public/<br />
│    ├── vue.js<br />
│    ├── styles.css<br />
│    ├── index.html<br />
  
**npm list** <br />
+-- express@4.18.2 <br />
`-- ws@8.14.2 <br />

## WebSocket實作講解
假設有兩個人在聊天室裡，互相傳訊息，分別為lala和蓮花，藉由network的message，<br />
可以藉由箭頭的方向，看出訊息的傳遞方向。<br />
![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/25.png)
>↑{"name":"lala","message":"我改了時間拿取方法❤️","time":"11:40:24"}	57	11:40:24.152 <br />
↓{"name":"lala","message":"我改了時間拿取方法❤️","time":"11:40:24"}	57	11:40:24.154 <br />
↓{"name":"蓮花","message":"我有看到唷~","time":"11:40:35"}	52	11:40:35.186 <br />
↓{"name":"蓮花","message":"好可愛歐!!!","time":"11:40:43"}	51	11:40:43.282 <br />
↑{"name":"lala","message":"我好喜歡愛心❤️符號~~ 好Q😊","time":"11:41:00"}	63	11:41:00.088 <br />
↓{"name":"lala","message":"我好喜歡愛心❤️符號~~ 好Q😊","time":"11:41:00"}	63	11:41:00.090 <br />

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/26.png)
>↓{"name":"lala","message":"我改了時間拿取方法❤️","time":"11:40:24"}	57	11:40:24.154<br />
↑{"name":"蓮花","message":"我有看到唷~","time":"11:40:35"}	52	11:40:35.183<br />
↓{"name":"蓮花","message":"我有看到唷~","time":"11:40:35"}	52	11:40:35.185<br />
↑{"name":"蓮花","message":"好可愛歐!!!","time":"11:40:43"}	51	11:40:43.279<br />
↓{"name":"蓮花","message":"好可愛歐!!!","time":"11:40:43"}	51	11:40:43.282<br />
↓{"name":"lala","message":"我好喜歡愛心❤️符號~~ 好Q😊","time":"11:41:00"}<br />

## 聊天室
space-between 會在 Flex 容器的主軸上平均分配子元素之間的空間， <br />
使得首尾元素分別位於容器的起始和結束處，而其餘的元素則均勻分布在中間。<br />
![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/23.png)

## Current Time
達成即時時間動態顯示 <br />
![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/24.png)

