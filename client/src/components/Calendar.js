import React, { useState } from 'react'
import moment from 'moment'

import MonthView from './MonthView'
import WeekView from './WeekView'
import DayView from './DayView'

function Calendar(){
    const [activeView, setActiveView] = useState('Month')
    const [dateContext, setDateContext] = useState(moment())

    const goPrevious = (timePeriod) => {        
        setDateContext(moment(dateContext).subtract(1, timePeriod).startOf(timePeriod))
    }    

    const goNext = (timePeriod) => {
        setDateContext(moment(dateContext).add(1, timePeriod).startOf(timePeriod))        
    }

    const goToday = () => {
        setDateContext(moment())
    }

    return(
        <div className="calendar">
            <header className="calendar__header">
                <nav className="button-group no-gaps">
                    <button className={activeView === 'Month' ? 'active button' : 'button'} onClick={() => setActiveView('Month')}>
                        <i className="fas fa-calendar-alt"></i>
                        <span>Month</span>
                    </button>
                    <button className={activeView === 'Week' ? 'active button' : 'button'} onClick={() => setActiveView('Week')}>
                        <i className="fas fa-calendar-week"></i>
                        <span>Week</span>
                    </button>
                    <button className={activeView === 'Day' ? 'active button' : 'button'} onClick={() => setActiveView('Day')}>
                        <i className="fas fa-calendar-day"></i>
                        <span>Day</span>
                    </button>
                </nav>
            </header>
            <div className="calendar__body">
                <aside className="calendar__sidebar"></aside>
                <main className="calendar__main">
                    {
                        activeView === 'Month' ? 
                            <MonthView 
                                dateContext={dateContext}
                                goPrevious={goPrevious}
                                goNext={goNext}
                                goToday={goToday}
                                setActiveView={setActiveView}
                                setDateContext={setDateContext} /> : 
                        activeView === 'Week' ?
                             <WeekView 
                                dateContext={dateContext}
                                goPrevious={goPrevious}
                                goNext={goNext}
                                goToday={goToday}
                                setActiveView={setActiveView}
                                setDateContext={setDateContext} /> :
                        activeView === 'Day' ? 
                            <DayView 
                                dateContext={dateContext}
                                goPrevious={goPrevious}
                                goNext={goNext}
                                goToday={goToday} /> :
                        null
                    }
                </main>
            </div>
        </div>
    )
}

export default Calendar