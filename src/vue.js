import './styles.scss'; // 引入 SCSS 樣式文件

const app = Vue.createApp({
    data() {
      return {
        socket: null,
        messages_qu: [], // 用來存放聊天訊息的陣列
        currentTime: '',
        username: 'empty'
      };
    },
    methods: {
      connectWebSocket() {
        this.socket = new WebSocket('ws://localhost:3000');
        
        this.socket.onopen = () => {
          console.log('已連接至 WebSocket 伺服器');
        };
  
        this.socket.onmessage = (event) => {
            // console.log('接收到伺服器訊息：', event.data);
            // 解析接收到的 JSON 資料
            console.log('only event接收到伺服器訊息：', event);
            console.log('before JSON.parse接收到伺服器訊息：', event.data);
            const data = JSON.parse(event.data);
            console.log('JSON.parse接收到伺服器訊息：', data.name+": "+data.message+";時間: "+data.time);

            this.messages_qu.push(data);
            // 將訊息放進messages_qu: [] 陣列中
        };
  
        this.socket.onclose = () => {
          console.log('WebSocket 連接已關閉');
        };
      },
      sendMessage() {
        let formattedTime = this.getTime();
        let inputName = document.getElementById('inputName').value;
        let inputMessage = document.getElementById('inputMessage').value;

         // 組合名稱和訊息成為一個物件，然後將其轉換成 JSON 格式的字串
        const data = JSON.stringify({ name: inputName, message: inputMessage, time: formattedTime });

        this.socket.send(data);
        document.getElementById('inputMessage').value = ''; // 清空輸入框

        //產生名字在頁面上
        this.username= inputName
        //document.querySelector('.user-name').textContent = "name: "+inputName
      },
      getTime() {
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
      },
      updateClock() {
        const formattedTime = this.getTime();
        this.currentTime = `Current Time: ${formattedTime}`;
      },
      insertEmoji(emoji) {
        const inputMessage = document.getElementById('inputMessage');
        inputMessage.value += emoji;
      },
    },
    mounted() {
      this.updateClock(); // 在 Vue 實例被掛載後先執行一次更新時間
  
      // 每秒更新一次時間
      setInterval(() => {
        this.updateClock();
      }, 1000);

    },
    created() {  //created 鉤子是在 Vue 實例被建立後立即觸發的
      this.connectWebSocket();
    }
  });
  app.mount('.chat-container');