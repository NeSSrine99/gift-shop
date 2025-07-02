"use client";

import { useEffect, useState } from "react";

export default function Notifications({ notifications, onClear }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClear) onClear();
    }, 60000);

    return () => clearTimeout(timer);
  }, [onClear]);

  if (!visible || notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 w-80 max-h-[70vh] overflow-y-auto space-y-2 z-50">
      {notifications.map((note) => (
        <div
          key={note.id}
          className="bg-purple-100 border border-purple-300 text-purple-800 rounded shadow p-3"
        >
          <p className="font-semibold">{note.title}</p>
          <p className="text-sm">{note.message}</p>
        </div>
      ))}
    </div>
  );
}

// Hook to use notifications in any component
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message) => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return { notifications, addNotification, clearNotifications };
}
