import React from 'react'
import moment from 'moment'

function MonthView(props){
    const { 
        dateContext, 
        goPrevious, 
        goNext, 
        goToday,
        setActiveView,
        setDateContext
    } = props
    
    const getFirstDayOfMonth = () => moment(dateContext).startOf('month').format('d')
    const getNumberOfDaysInMonth = () => moment(dateContext).daysInMonth('D')
    const getNumberOfDaysInPreviousMonth = () => moment(dateContext).subtract(1, 'month').daysInMonth('D')

    const getWeekdays = () => moment.weekdaysShort().map((day, i) => {
        return <th key={i} className="week-day-slot">{day}</th>
    })
    
    const getDaysInPreviousMonth = () => {
        let lastSundayOfPreviousMonth = getNumberOfDaysInPreviousMonth() - parseInt(getFirstDayOfMonth()) + 1
        let daysInPreviousMonth = []
        
        for(let dayNumber = lastSundayOfPreviousMonth; dayNumber <= getNumberOfDaysInPreviousMonth(); dayNumber++){
            let date = moment(dateContext).subtract(1, 'month').set('date', dayNumber)
            let day = moment(date).format('dddd')
            let className = (date.format('LL') === moment().format('LL') ? 'day-slot day-slot--previous-month active' : 'day-slot day-slot--previous-month')            
            
            daysInPreviousMonth.push(
                <td key={dayNumber*10} className={day === 'Sunday' || day === 'Saturday' ? className+= ' day-slot--weekend' : className}>
                    <div className="day-slot__content">
                        <div className="day-slot__date">
                            <span className="day-slot__number" onClick={() => {
                                setDateContext(moment(dateContext).subtract(1, 'month').set('date', dayNumber))
                                setActiveView('Day')
                            }}>{dayNumber}</span>
                        </div>
                    </div>
                </td>
            )
        }
        return daysInPreviousMonth
    }

    const getDaysInMonth = () => {
        let daysInMonth = []
        for(let dayNumber = 1; dayNumber <= getNumberOfDaysInMonth(); dayNumber++){
            let date = moment(dateContext).set('date', dayNumber)
            let day = moment(date).format('dddd')
            let className = (date.format('LL') === moment().format('LL') ? 'day-slot active' : 'day-slot')
            
            daysInMonth.push(
                <td key={dayNumber} className={day === 'Sunday' || day === 'Saturday' ? className+= ' day-slot--weekend' : className}>
                    <div className="day-slot__content">
                        <div className="day-slot__date">
                            <span className={`${dayNumber === 1 ? 'day-slot__month' : 'is-hidden'}`}>
                                {dayNumber === 1 ? moment(dateContext).format('MMM') : null}
                            </span>
                            <span className="day-slot__number" onClick={() => {
                                setDateContext(moment(dateContext).set('date', dayNumber))
                                setActiveView('Day')
                            }}>{dayNumber}</span>
                        </div>
                    </div>
                </td>
            )
        }
        return daysInMonth
    }
    
    const getDaysInNextMonth = () => {        
        let lenghtOfDaysInMonthAndPreviousMonth = getDaysInPreviousMonth().length + getDaysInMonth().length    
        let daysInNextMonth = []
        for(let dayNumber = 1; dayNumber < 43-lenghtOfDaysInMonthAndPreviousMonth; dayNumber++){
            let date = moment(dateContext).add(1, 'month').set('date', dayNumber)
            let day = moment(date).format('dddd')
            let className = (date.format('LL') === moment().format('LL') ? 'day-slot day-slot--next-month active' : 'day-slot day-slot--next-month')
            
            daysInNextMonth.push(
                <td key={dayNumber*100} className={day === 'Sunday' || day === 'Saturday' ? className+= ' day-slot--weekend' : className}>
                    <div className="day-slot__content">
                        <div className="day-slot__date">
                            <span className={`${dayNumber === 1 ? 'day-slot__month' : 'is-hidden'}`}>
                                {dayNumber === 1 ? moment(dateContext).add(1, 'month').format('MMM') : null}
                            </span>
                            <span className="day-slot__number" onClick={() => {
                                setDateContext(moment(dateContext).add(1, 'month').set('date', dayNumber))
                                setActiveView('Day')
                            }}>{dayNumber}</span>
                        </div>
                    </div>
                </td>
            )
        } 
        return daysInNextMonth
    }

    const getDays = () => {
        let daysInPreviousMonth = getDaysInPreviousMonth()
        let daysInMonth = getDaysInMonth()
        let daysInNextMonth = getDaysInNextMonth()
        
        let daysInCalendar = [...daysInPreviousMonth, ...daysInMonth, ...daysInNextMonth]
        let rows = []
        let cells = []
        
        daysInCalendar.forEach((day, i) => {                                 
            if(i % 7 !== 0){
                cells.push(day)            
            }else{
                // If cells empty, do not push into row yet. (Skip empty-array-push in first run)
                if(cells.length !== 0){
                    rows.push(cells)
                }
                cells = []                
                cells.push(day)
            }
            if(i === daysInCalendar.length - 1){
                rows.push(cells)
            }
        })

        return rows.map((row, i) => {
            return <tr key={i}>{row}</tr>
        })
    }

    return(
        <div className="month-view">
            <header className="month-view__header">
                <h2>
                    <b>{moment(dateContext).format('MMMM')}</b>
                    <span>{` ${moment(dateContext).format('YYYY')}`}</span>
                </h2>
                <nav className="button-group">
                    <button className="button" onClick={() => goPrevious('months')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="button" onClick={() => goToday()}>
                        Today
                    </button>
                    <button className="button" onClick={() => goNext('months')}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
            </header>
            <div className="month-view__body">
                <main className="month-view__main">
                    <table>
                        <thead>
                            <tr>
                                {getWeekdays()}
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

export default MonthView