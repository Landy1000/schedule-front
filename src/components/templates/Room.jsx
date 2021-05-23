import React ,{ useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { PrimaryButton } from "../UIkit"
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../reducks/schedules/operations';
import { getRoomSchedules } from "../../reducks/schedules/selectors";
import { getRoommates } from "../../reducks/roommates/selectors";
import { push } from 'connected-react-router'

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

    useEffect( () => {
        dispatch(fetchSchedules(id))
    }, [dispatch, id]);

    const selector = useSelector(state => state)
    const scheduleList = getRoomSchedules(selector)
    const roommates = getRoommates(selector)

    // 月を決定
    const targetMonth = getStringFromDate(startDate).slice(0, 8);

    const match = {}
    const numberOfPeople = roommates.length

    for (let day = 1; day <32; day++) {
        let day_str = ('0' + day).slice(-2);

        // 日付が一致するものだけを抽出
        const schedules = []
        scheduleList.forEach(schedule=>{
            if ( schedule.date===(targetMonth+day_str) )
                schedules.push(schedule)
        })

        const temp = []
        // マッチ率の判定
        for (let i = 0; i <24; i++) {
            let count = 0
            schedules.forEach(schedule=>{
                if (schedule.time===i)
                count+=1
            })
            if (count === numberOfPeople)
                temp.push("match100")
            else if (count >= numberOfPeople/2)
                temp.push("match50")
            else if (count > 0)
                temp.push("match25")
            else
                temp.push("match0")
        }

        if (temp.indexOf("match100") !== -1)
            match[targetMonth+day_str] = '◎'
        else if (temp.indexOf("match50") !== -1)
            match[targetMonth+day_str] = '○'
        else if (temp.indexOf("match25") !== -1)
            match[targetMonth+day_str] = '△'
        else
            match[targetMonth+day_str] = '　'
    }

    const getTileContent = (props) => {
        if (props.view !== "month") {
            return null;
        }
        const targetDate = getStringFromDate(props.date)

        return   match[targetDate] ?
                <div>
                    <p>{match[targetDate]}</p>
                </div>
                : null
    };

    // カレンダーの矢印を押した際の動作
    const nextMonth = () => {
        const year = startDate.getFullYear();
        const month = (startDate.getMonth()+1);
        const nextDate = new Date(year, month, 1)
        setStartDate(nextDate)
    }
    const prevMonth = () => {
        const year = startDate.getFullYear();
        const month = (startDate.getMonth()-1);
        const prevDate = new Date(year, month, 1)
        if (startDate !== -1 )
            setStartDate(prevDate)
    }

    return(
        <div className="c-section-container">
            <Calendar
                locale="ja-JP"
                value={startDate}
                onClickDay={(value) => handleChange(value)}
                tileContent={getTileContent}
                prev2Label={null}
                next2Label={null}
                nextLabel={<div className="calender-btn" onClick={nextMonth}>&gt;</div>}
                prevLabel={<div className="calender-btn" onClick={prevMonth}>&lt;</div>}
            />
            <br />
            <div className="center">
                <PrimaryButton
                label={"スケジュール登録"}
                onClick={editSchedules}
                />
            </div>
        </div>
    );
}

export default Room;