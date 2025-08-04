import React from 'react';
import Button from '../../common/Button';

const CalendarHeader = ({ 
  currentDate, 
  onPreviousMonth, 
  onNextMonth, 
  onToday 
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDate = (date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onPreviousMonth}
          variant="outline"
          size="sm"
        >
          ← Previous
        </Button>
        
        <h2 className="text-2xl font-bold text-gray-900">
          {formatDate(currentDate)}
        </h2>
        
        <Button
          onClick={onNextMonth}
          variant="outline"
          size="sm"
        >
          Next →
        </Button>
      </div>
      
      <Button
        onClick={onToday}
        variant="primary"
        size="sm"
      >
        Today
      </Button>
    </div>
  );
};

export default CalendarHeader; 