import React from 'react';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ 
  calendarDays, 
  selectedDate, 
  onDateSelect, 
  events, 
  currentDate 
}) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          
          return (
            <CalendarDay
              key={index}
              date={date}
              events={dayEvents}
              isToday={isToday(date)}
              isSelected={isSelected}
              isCurrentMonth={isCurrentMonth(date)}
              onClick={() => onDateSelect(date)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid; 