// import React from 'react';

// // React Calendar, axios のimport文追加
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from 'axios';

// // axios で取得するjsonファイルのパスを宣言
// const URL = 'http://localhost:3001/rooms/1/schedules';

// // App クラス コンポーネント
// const Test = () => {

  
//   const [loading, setLoading] = useState(true);
//   const [database, setDatabase] = useState([]);

//   // Component が Mount された後に実行されるメソッド
//   // Ajax を使ったデータ フェッチなどの処理を記述
  
  
  
//   useEffect( () => {
//     dispatch(getJson())
// }, []);

//   // jsonファイルを取得する関数定義
//   // response データと取得結果の状態をstateに設定
//   getJson = () => {
//     const state = getState()
//     const token = state.users.accessToken
//     const uid = state.users.uid
//     const client = state.users.client
//     axios({
//       method: 'get',
//       url: 'http://localhost:3001/users',
//       headers: {
//         ["access-token"]: token,
//         uid: uid,
//         client: client,
//         //["Content-Type"]: "application/json"
//       }
//     })
//     .then(res => {
//       this.setState({
//         console.log(res.data)
//         setLoading = false
//       });
//     });
//   };

//   // カレンダーのタイルに表示する内容を取得する関数定義
//   getTileContent = (calendar) => {
//     // 日付フォーマット処理(YYYYMMDD)
//     let year = calendar.date.getFullYear();
//     let month = calendar.date.getMonth() + 1;
//     let day = calendar.date.getDate();
//     month = ('0' + month).slice(-2);
//     day = ('0' + day).slice(-2);
//     let formatDate = year + month + day;
//     // タイルに表示する内容の初期化
//     let message = "";

//     // 取得したjsonデータを読み込みカレンダーの日付と一致する場合にタイル内容設定
//     this.state.database.forEach(element => {
//       if(formatDate === element.startDate) {
//         message = element.content;
//       }
//     });// end forEach

//     // タイルに表示する内容を返却
//     return (
//       <p>{message}　</p>
//     );
//   }

//   render() {

//     // jsonファイルの読み込み中は以下を表示
//     if (this.state.loading) {
//       return (<div>Now loading</div>)
//     }

//     // jsonファイルの読み込み完了後にカレンダー表示
//     return (
//       <div>
//         <Calendar
//           value={new Date(2020, 6, 1)} // デモ用に固定値を指定
//           tileContent={this.getTileContent}
//         />
//       </div>
//     );
//   }

// }

// export default Test;