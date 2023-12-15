# 使用WebSocket結合vue.js，在node.js的express實作一個線上聊天室
#### WebSocket加上發訊息時間，即時時間動態顯示，表情符號emoji，發文者訊息文字顏色不同等新功能。
這次把原始的VanillaJS(原生Java script)，轉換成vue.js的形式，其中可以注意到有/public/front.js檔案，這個檔案是VanillaJS的版本。


**> Tree structure**<br />
Root Directory<br />
├── server.js<br />
├── public/<br />
│    ├── vue.js<br />
│    ├── styles.css<br />
│    ├── index.html<br />
  
**> npm list** <br />
+-- express@4.18.2 <br />
`-- ws@8.14.2 <br />

## WebSocket實作講解
假設有兩個人在聊天室裡，互相傳訊息，分別為lala和Emily，藉由network的message，<br />
可以藉由箭頭的方向，看出訊息的傳遞方向。

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/39.png)
>↑{{"name":"Lala","message":"Hello❤️","time":"16:56:16"}	53	16:56:16.893 <br />
↓{"name":"Lala","message":"Hello❤️","time":"16:56:16"}	53	16:56:16.902 <br />
↓{"name":"Emily","message":"Hihi~ Nice to meet u:\">","time":"16:56:48"}	71	16:56:48.951 <br />
↓{"name":"Emily","message":"I love u😊","time":"16:57:01"}	57	16:57:02.017 <br />
↑{"name":"Lala","message":"me too !!","time":"16:57:12"}	55	16:57:12.926 <br />
↓{"name":"Lala","message":"me too !!","time":"16:57:12"}	55	16:57:12.941 

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/40.png)
>↓{"name":"Lala","message":"Hello❤️","time":"16:56:16"}	53	16:56:16.904 <br />
↑{"name":"Emily","message":"Hihi~ Nice to meet u:\">","time":"16:56:48"}	71	16:56:48.934 <br />
↓{"name":"Emily","message":"Hihi~ Nice to meet u:\">","time":"16:56:48"}	71	16:56:48.945 <br />
↑{"name":"Emily","message":"I love u😊","time":"16:57:01"}	57	16:57:01.989 <br />
↓{"name":"Emily","message":"I love u😊","time":"16:57:01"}	57	16:57:02.010 <br />
↓{"name":"Lala","message":"me too !!","time":"16:57:12"}	55	16:57:12.936 <br />

## 聊天室
space-between 會在 Flex 容器的主軸上平均分配子元素之間的空間，<br />使得首尾元素分別位於容器的起始和結束處，而其餘的元素則均勻分布在中間。

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/42.png)

將發文者的訊息文字用不同顏色來標示，可以看到當在Name為Lala的頁面時，所有Lala的訊息顏色都會有所不同。

## Emoji
聊天室中加入Emoji功能，可以加入可愛的❤️和😊，讓表達更生動。

Adding the cute ❤️ and 😊 emojis to the chatroom enhances expressions, making communication more vibrant.

## Current Time
達成即時時間動態顯示 。

Achieving real-time dynamic display of timestamps.

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/24.png)

## Server running status
    node server.js
當有2位使用者連進來時，1個人發訊息出去，全部人都會收到(此例為2位使用者)。

When two users are connected and one of them sends a message, it will be received by both users.

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/32.png)
![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/41.png)

