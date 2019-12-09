import React from 'react'
import moment from 'moment'

function DayView(props){
    const { 
        dateContext, 
        goPrevious, 
        goNext, 
        goToday 
    } = props
    
    const getDays = () => {
        let rows = []
        let cells = []
    
        for(let row = 0; row <= 23; row++){
            for(let col = 0; col < 2; col++){       
                let date = moment(dateContext).add(col-1, 'days')
                let day = moment(date).format('dddd')
                let className = (day === 'Sunday' || day === 'Saturday' ? 'time-slot time-slot--weekend' : 'time-slot')
                
                if(col === 0){
                    cells.push(
                        <th key={`${row}${col}`}className="day-time-slot">
                            {moment().hour(row).format('h A')}
                        </th>
                    )
                }else{
                    cells.push(
                        <td key={`${row}${col}`} className={className}>
                            <div className="time-slot__content"></div>
                        </td>
                    )
                }
            }
            rows.push(<tr key={row}>{cells}</tr>)
            cells = []
        }    
        return rows
    }
    
    let className = moment(dateContext).format('LL') === moment().format('LL') ? 'week-day-slot active' : 'week-day-slot'

    return(
        <div className="day-view">
            <header className="day-view__header">
                <h2>
                    <b>{moment(dateContext).format('MMMM')}</b>
                    <span>{` ${moment(dateContext).format('YYYY')}`}</span>
                </h2>
                <nav className="button-group">
                    <button className="button" onClick={() => goPrevious('days')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="button" onClick={() => goToday()}>
                        <span>Today</span>
                    </button>
                    <button className="button" onClick={() => goNext('days')}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
            </header>
            <div className="day-view__body">
                <main className="day-view__main">
                    <table>
                        <thead>
                            <tr>
                                <th className="corner-slot">
                                    <i className="far fa-clock"></i>
                                </th>
                                <th className={className}>
                                    <span className="week-day-slot__day">{moment(dateContext).format('dddd')}</span>
                                    <span className="week-day-slot__number">{moment(dateContext).format('D')}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDays()}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    )
}

export default DayView