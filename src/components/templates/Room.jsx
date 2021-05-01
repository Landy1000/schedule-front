import React,{useCallback, useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Calendar from 'react-calendar'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {push} from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux';


const Room = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const initialDate = new Date()
    const [startDate, setStartDate] = useState(initialDate)
    const handleChange = (date) => {
        setStartDate(date)
    }

    const editSchedules = () => {
        dispatch(push("/room/"+id+"/"+getStringFromDate(startDate)))
    }

    // date型の変換
    const getStringFromDate = (date)=>{
        const year_str = date.getFullYear();
        //月だけ+1すること
        let month_str = 1 + date.getMonth();
        let day_str = date.getDate();

        month_str = ('0' + month_str).slice(-2);
        day_str = ('0' + day_str).slice(-2);

        let format_str = 'YYYY-MM-DD';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        return format_str;
    }

    return(
        <div className="c-section-container">
            <h1 className="u-text_headline u-text-center">ようこそ</h1>
            <div className="center">
            <Link to={"/room/"+id+"/2020-05-23"}>edit</Link>
            <Link to={"/"}>ホーム</Link>
            </div>
            <Calendar
                locale="ja-JP"
                value={startDate}
            />
            <div className="center">
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                />
                <button type="button" onClick={editSchedules} >スケジュール登録</button>
            </div>
        </div>
    );
}

export default Room;
