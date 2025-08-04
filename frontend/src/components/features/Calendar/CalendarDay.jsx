import React from 'react';

const CalendarDay = ({ 
  date, 
  events, 
  isToday, 
  isSelected, 
  isCurrentMonth, 
  onClick 
}) => {
  const eventTypes = {
    meeting: { icon: '🤝', color: 'bg-blue-500' },
    task: { icon: '📋', color: 'bg-green-500' },
    reminder: { icon: '⏰', color: 'bg-orange-500' },
    deadline: { icon: '🚨', color: 'bg-red-500' },
    personal: { icon: '👤', color: 'bg-purple-500' }
  };

  return (
    <div
      onClick={onClick}
      className={`
        min-h-[120px] p-2 border-r border-b border-gray-200 cursor-pointer
        transition-all duration-200 hover:bg-gray-50
        ${isSelected ? 'bg-blue-50 border-blue-300' : ''}
        ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
      `}
    >
      {/* Date number */}
      <div className="flex items-center justify-between mb-1">
        <span className={`
          text-sm font-medium
          ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
          ${isSelected ? 'text-blue-600' : ''}
        `}>
          {isToday ? date.getDate() : date.getDate()}
        </span>
        
        {/* Event count indicator */}
        {events.length > 0 && (
          <span className="text-xs text-gray-500">
            {events.length} event{events.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {/* Events */}
      <div className="space-y-1">
        {events.slice(0, 3).map((event, index) => (
          <div
            key={event.id || index}
            className={`
              text-xs p-1 rounded truncate
              ${eventTypes[event.type]?.color || 'bg-gray-500'} text-white
            `}
            title={event.title}
          >
            <span className="mr-1">{eventTypes[event.type]?.icon || '📅'}</span>
            {event.title}
          </div>
        ))}
        
        {events.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay; 