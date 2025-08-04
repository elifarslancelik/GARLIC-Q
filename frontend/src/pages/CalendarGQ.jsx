import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarGQ = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'meeting'
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'from-blue-600 to-blue-700' },
    { value: 'task', label: 'Task', icon: '📋', color: 'from-green-600 to-green-700' },
    { value: 'reminder', label: 'Reminder', icon: '⏰', color: 'from-orange-600 to-orange-700' },
    { value: 'deadline', label: 'Deadline', icon: '🚨', color: 'from-red-600 to-red-700' },
    { value: 'personal', label: 'Personal', icon: '👤', color: 'from-purple-600 to-purple-700' }
  ];

  // Get current month's calendar data
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Add new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: Date.now(),
        ...newEvent,
        createdAt: new Date().toISOString()
      };
      setEvents(prev => [...prev, event]);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        type: 'meeting'
      });
      setShowEventModal(false);
    }
  };

  // Open event modal with selected date
  const openEventModal = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setNewEvent(prev => ({
      ...prev,
      date: formattedDate
    }));
    setShowEventModal(true);
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const calendarDays = getCalendarDays();
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-black/40 to-gray-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-800/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-gray-900/30"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="relative group perspective-1000">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main glassmorphism card */}
          <div className="relative bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-[3rem] shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] p-8 w-[95vw] min-h-[90vh] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-[3rem] before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]">
            
            {/* Header */}
            <div className="text-center space-y-4 relative z-10 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h1 className="text-2xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Calendar-GQ
                  </h1>
                  <p className="text-white/60 text-sm font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Smart Calendar & Event Management
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <button
                onClick={goToPreviousMonth}
                className="p-3 bg-black/20 rounded-lg text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
              >
                ←
              </button>
              
              <div className="text-center">
                <h2 className="text-xl font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={goToToday}
                  className="text-sm text-white/60 hover:text-white transition-all duration-200"
                >
                  Today
                </button>
              </div>
              
              <button
                onClick={goToNextMonth}
                className="p-3 bg-black/20 rounded-lg text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
              >
                →
              </button>
            </div>

            {/* Main Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Calendar
                  </h3>
                  
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-white/60 text-sm font-light p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                      const isToday = day.toDateString() === new Date().toDateString();
                      const isSelected = day.toDateString() === selectedDate.toDateString();
                      const dayEvents = getEventsForDate(day);
                      
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDate(day)}
                          className={`relative p-2 text-center cursor-pointer rounded-lg transition-all duration-200 ${
                            isCurrentMonth 
                              ? 'text-white hover:bg-white/10' 
                              : 'text-white/30'
                          } ${
                            isToday ? 'bg-gradient-to-r from-purple-600 to-purple-700' : ''
                          } ${
                            isSelected ? 'ring-2 ring-purple-500' : ''
                          }`}
                        >
                          <span className="text-sm">{day.getDate()}</span>
                          {dayEvents.length > 0 && (
                            <div className="flex justify-center mt-1">
                              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                <div
                                  key={eventIndex}
                                  className={`w-1 h-1 rounded-full mx-0.5 ${
                                    event.type === 'meeting' ? 'bg-blue-500' :
                                    event.type === 'task' ? 'bg-green-500' :
                                    event.type === 'reminder' ? 'bg-orange-500' :
                                    event.type === 'deadline' ? 'bg-red-500' :
                                    'bg-purple-500'
                                  }`}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <span className="text-xs text-white/60">+{dayEvents.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Events Panel */}
              <div className="space-y-4">
                {/* Selected Date Events */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Events
                    </h3>
                    <button
                      onClick={openEventModal}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-sm font-light hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
                    >
                      + Add
                    </button>
                  </div>
                  
                  <div className="text-sm text-white/60 mb-3">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedDateEvents.length === 0 ? (
                      <div className="text-center text-white/40 text-sm py-4">
                        No events for this date
                      </div>
                    ) : (
                      selectedDateEvents.map(event => {
                        const eventType = eventTypes.find(type => type.value === event.type);
                        return (
                          <div
                            key={event.id}
                            className={`p-3 rounded-lg border border-white/10 ${
                              event.type === 'meeting' ? 'bg-blue-500/20' :
                              event.type === 'task' ? 'bg-green-500/20' :
                              event.type === 'reminder' ? 'bg-orange-500/20' :
                              event.type === 'deadline' ? 'bg-red-500/20' :
                              'bg-purple-500/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{eventType?.icon}</span>
                                <div>
                                  <h4 className="text-white font-light text-sm">{event.title}</h4>
                                  {event.time && (
                                    <p className="text-white/60 text-xs">{event.time}</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-white/40 hover:text-white/80 transition-all duration-200"
                              >
                                ✕
                              </button>
                            </div>
                            {event.description && (
                              <p className="text-white/60 text-xs mt-2">{event.description}</p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    This Month
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Total Events</span>
                      <span className="text-white font-light">{events.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Meetings</span>
                      <span className="text-white font-light">{events.filter(e => e.type === 'meeting').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Tasks</span>
                      <span className="text-white font-light">{events.filter(e => e.type === 'task').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center pt-6 relative z-10">
              <button
                onClick={() => navigate('/hub')}
                className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Back to Hub
              </button>
            </div>
            
            {/* Floating elements for extra effect */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-black/30 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white/10 rounded-full blur-sm"></div>
            <div className="absolute bottom-1/4 -left-6 w-3 h-3 bg-gray-600/20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Add Event
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 bg-black/20 rounded-lg text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="Event title"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Time (Optional)</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Event description"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white text-sm font-light hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-sm font-light hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarGQ; 