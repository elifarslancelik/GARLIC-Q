import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import Modal from '../../common/Modal';
import EventForm from '../../forms/EventForm';
import Button from '../../common/Button';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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

  // Add or update event
  const handleEventSubmit = (eventData) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? { ...event, ...eventData } : event
      ));
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now(),
        ...eventData,
        createdAt: new Date().toISOString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setShowEventModal(false);
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

  // Open event modal
  const openEventModal = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
          <p className="text-gray-600">Manage your events and schedule</p>
        </div>

        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />

        {/* Add Event Button */}
        <div className="mb-4">
          <Button
            onClick={openEventModal}
            variant="primary"
            size="sm"
          >
            + Add Event
          </Button>
        </div>

        {/* Calendar Grid */}
        <CalendarGrid
          calendarDays={calendarDays}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          events={events}
          currentDate={currentDate}
        />

        {/* Event Modal */}
        <Modal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
          size="md"
        >
          <EventForm
            event={editingEvent}
            onSubmit={handleEventSubmit}
            onCancel={() => setShowEventModal(false)}
            selectedDate={selectedDate}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Calendar; 