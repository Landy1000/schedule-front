import React from 'react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";


export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(2019, 4, 17),
      //月のデータ
      month_days: {
        20190501: { is_holiday: true },
        20190502: { is_holiday: true },
        20190503: { is_holiday: true },
        20190506: { is_holiday: true },
        // 20190514: { text: 'バシャログ執筆' },
        // 20190517: { text: 'バシャログ出稿' }
      }
    };
    this.getTileClass = this.getTileClass.bind(this);
    this.getTileContent = this.getTileContent.bind(this);
  }

  // state の日付と同じ表記に変換
  getFormatDate(date) {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
  }

  //日付のクラスを付与 (祝日用)
  getTileClass({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return '';
    }
    const day = this.getFormatDate(date);
    return (this.state.month_days[day] && this.state.month_days[day].is_holiday) ?
      'holiday' : '';
  }

  //日付の内容を出力
  getTileContent({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return null;
    }
    const day = this.getFormatDate(date);
    return (
      <p>
        <br />
        {(this.state.month_days[day] && this.state.month_days[day].text) ?
          this.state.month_days[day].text : ' '
        }
      </p>
    );
  }

  render() {
    return (
      <div className="c-section-container">
        <Calendar
          locale="ja-JP"
          value={this.state.date}
          tileClassName={this.getTileClass}
          tileContent={this.getTileContent}
        />

        <div>
          <Link to="/schedule">テスト</Link>
        </div>
        <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        //selected={inputStart}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputStart"
        //onChange={(time: Date) => {
          //setInputStart(time)
        //}}
      />
      </div>
    );
  }
}
