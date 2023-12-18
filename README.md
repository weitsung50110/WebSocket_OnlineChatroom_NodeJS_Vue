# 使用WebSocket結合vue.js，在node.js的express實作一個線上聊天室 
# Develop an online chatroom by integrating WebSocket with Vue.js in an Express framework within Node.js 

### WebSocket功能摘要 ; Summary of WebSocket Features
- 訊息發送時間 ; Message sending timestamps
- 即時時間動態顯示 ; Real-time dynamic display of timestamps
- 表情符號emoji ; Emoji support for emoticons
- 發文者訊息文字顏色不同 ; Different text color for messages from different senders.

### Comparison of Implementations in VanillaJS and Vue.js
本專案有在connectWebSocket使用原始的VanillaJS(原生Java script)進行實作，檔案在vanilla/public/front.js當中。<br />
本專案也有運用框架vue.js進行實作，檔案存在public/vue.js當中。

藉由兩者的實作比較，可以發現使用vue框架撰寫的語法會比較乾淨、簡潔，且易讀一點，因此推薦大家使用vue.js的版本。

This project is implemented using raw VanillaJS (native JavaScript) in connectWebSocket, located in vanilla/public/front.js. 
There is also an implementation using the Vue.js framework, found in public/vue.js.

By comparing the two implementations, it's evident that the syntax written with Vue.js framework is cleaner, more concise, and easier to read. Therefore, I recommend using the Vue.js version.

**> Tree structure**<br />
Root Directory<br />
├── server.js<br />
├── public/<br />
│    ├── vue.js<br />
│    ├── styles.css<br />
│    ├── index.html<br />
├── vanilla/<br />
│    ├── server.js<br />
│    │    ├── index.html<br />
│    │    ├── styles.css<br />
│    │    ├── front.js<br />
  
**> npm list** <br />
+-- express@4.18.2 <br />
`-- ws@8.14.2 <br />

## WebSocket實作講解 WebSocket Practical Demonstration
假設有兩個人在聊天室裡，互相傳訊息，分別為lala和Emily，藉由network的message，
可以藉由箭頭的方向，看出訊息的傳遞方向。

Suppose there are two individuals, namely Lala and Emily, communicating in a chatroom by exchanging messages. 
By observing the network's messages, one can determine the message transmission direction through the arrows.

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

## 聊天室 Online Chatroom
space-between 會在 Flex 容器的主軸上平均分配子元素之間的空間，<br />使得首尾元素分別位於容器的起始和結束處，而其餘的元素則均勻分布在中間。

"space-between" evenly distributes the space between flex container's child elements along the main axis. This places the first and last elements at the beginning and end of the container respectively, while the remaining elements are evenly distributed in between.

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/42.png)

將發文者的訊息文字用不同顏色來標示，可以看到當在Name為Lala的頁面時，所有Lala的訊息顏色都會有所不同。

To differentiate the messages of the poster, the text color is varied. When viewing a page associated with the name "Lala," all messages from "Lala" will have distinct colors.

## Emoji
聊天室中加入Emoji功能，可以加入可愛的❤️和😊，讓表達更生動。

Adding the cute ❤️ and 😊 emojis to the chatroom enhances expressions, making communication more vibrant.

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/43.png)

## Current Time
達成即時時間動態顯示 。

Achieving real-time dynamic display of timestamps.

    // 每秒更新一次時間 //它會以指定的時間間隔執行指定的函式，不會重新整理整個網頁。
    setInterval(() => {
      this.updateClock();
    }, 1000);


![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/24.png)

## Server running status
    node server.js
當有2位使用者連進來時，1個人發訊息出去，全部人都會收到(此例為2位使用者)。

When two users are connected and one of them sends a message, it will be received by both users.

![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/32.png)
![](https://raw.githubusercontent.com/weitsung50110/WebSocketwithNodeJSandVue/main/github_images/41.png)

