import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Dropdown } from 'react-bootstrap'; // Assurez-vous d'importer Bootstrap
import { FaBell } from 'react-icons/fa'; // Importer l'icône de notification

const NotificationDropdown = () => {
  const { notifications } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(0);

  console.log('Notifications:', notifications); // Vérifiez ici

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setDisplayedCount(0);
    } else {
      setDisplayedCount(notifications.length);
    }
  };

  // Obtenez les deux dernières notifications
  const lastTwoNotifications = notifications.slice(-2);

  return (
    <Dropdown show={isDropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle as="div" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        <FaBell size={24} color={lastTwoNotifications.length > 0 ? '#E8092E' : 'inherit'} />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', borderRadius: '8px', padding: '0' }}>
        {notifications.length === 0 ? (
          <Dropdown.Item disabled>Aucune notification</Dropdown.Item>
        ) : (
          notifications.map((notification, index) => (
            <Dropdown.Item key={index} style={{
              whiteSpace: 'normal',
              padding: '10px 15px',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              borderBottom: '1px solid #e0e0e0',
              transition: 'background-color 0.3s',
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff'}>
              {notification.message}
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown; 