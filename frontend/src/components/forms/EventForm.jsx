import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const EventForm = ({ 
  event = {}, 
  onSubmit, 
  onCancel, 
  selectedDate = new Date() 
}) => {
  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    date: event.date || selectedDate.toISOString().split('T')[0],
    time: event.time || '',
    type: event.type || 'meeting'
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'from-blue-600 to-blue-700' },
    { value: 'task', label: 'Task', icon: '📋', color: 'from-green-600 to-green-700' },
    { value: 'reminder', label: 'Reminder', icon: '⏰', color: 'from-orange-600 to-orange-700' },
    { value: 'deadline', label: 'Deadline', icon: '🚨', color: 'from-red-600 to-red-700' },
    { value: 'personal', label: 'Personal', icon: '👤', color: 'from-purple-600 to-purple-700' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.date) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Event Title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter event title"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {eventTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleChange('type', type.value)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200
                ${formData.type === type.value 
                  ? `border-blue-500 bg-gradient-to-r ${type.color} text-white` 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange('date', e.target.value)}
        required
      />

      <Input
        label="Time"
        type="time"
        value={formData.time}
        onChange={(e) => handleChange('time', e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter event description"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          rows="3"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={!formData.title || !formData.date}
        >
          {event.id ? 'Update Event' : 'Add Event'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EventForm; 