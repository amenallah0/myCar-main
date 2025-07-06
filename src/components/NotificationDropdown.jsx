import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Dropdown, Badge } from 'react-bootstrap';
import { FaBell, FaCheck, FaClock, FaUser, FaCar, FaFileAlt } from 'react-icons/fa';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
    transform: scale(1.05);
  }
`;

const NotificationBadge = styled(Badge)`
  position: absolute;
  top: -2px;
  right: -2px;
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  color: white;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${props => props.shouldPulse ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  min-width: 280px;
  max-width: 320px;
  max-height: 350px;
  overflow-y: auto;
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin-top: 8px;
  background: white;
  position: absolute;
  left: 0;
  right: auto;
  transform: translateX(-85%);

  @media (max-width: 768px) {
    min-width: 260px;
    max-width: 280px;
    max-height: 300px;
    transform: translateX(-80%);
  }

  @media (max-width: 480px) {
    min-width: 240px;
    max-width: 260px;
    transform: translateX(-75%);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ef4444;
    border-radius: 3px;
  }
`;

const NotificationHeader = styled.div`
  padding: 12px 16px;
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  color: white;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
`;

const NotificationItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  background: ${props => props.isUnread ? 'rgba(239, 68, 68, 0.05)' : 'white'};
  cursor: pointer;
  position: relative;

  &:hover {
    background: rgba(239, 68, 68, 0.08);
    transform: translateX(2px);
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 12px 12px;
  }
`;

const NotificationContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const NotificationIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'expertise': return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
      case 'car': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'report': return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      default: return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  flex-shrink: 0;
`;

const NotificationText = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.div`
  font-size: 13px;
  color: #1f2937;
  line-height: 1.4;
  margin-bottom: 4px;
  font-weight: ${props => props.isUnread ? '500' : '400'};
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 15px;
`;

const EmptyState = styled.div`
  padding: 30px 16px;
  text-align: center;
  color: #6b7280;
`;

const MarkAllButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const CustomDropdown = styled(Dropdown)`
  .custom-dropdown-toggle::after {
    display: none !important;
  }
  
  .custom-dropdown-toggle:focus {
    box-shadow: none !important;
    outline: none !important;
  }
`;

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState([]);

  // Initialize local notifications from context
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      setLocalNotifications(notifications.map(notif => ({
        ...notif,
        isRead: notif.isRead !== undefined ? notif.isRead : false
      })));
    } else {
      // Initialiser avec un tableau vide si pas de notifications
      setLocalNotifications([]);
    }
  }, [notifications]);

  // Memoize unread notifications count
  const unreadCount = useMemo(() => 
    localNotifications.filter(notif => !notif.isRead).length, 
    [localNotifications]
  );

  // Memoize recent notifications (last 10)
  const recentNotifications = useMemo(() => 
    localNotifications.slice(-10).reverse(), 
    [localNotifications]
  );

  // Toggle dropdown handler
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'expertise': return <FaUser />;
      case 'car': return <FaCar />;
      case 'report': return <FaFileAlt />;
      default: return <FaBell />;
    }
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const notifDate = new Date(date);
    const diffInMinutes = Math.floor((now - notifDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}j`;
  };

  // Handle notification click - mark as read locally
  const handleNotificationClick = useCallback((notification) => {
    if (!notification.isRead) {
      // Update local state first for immediate UI feedback
      setLocalNotifications(prev => 
        prev.map(notif => 
          notif.id === notification.id 
            ? { ...notif, isRead: true }
            : notif
        )
      );

      // Call context function
      if (markAsRead && typeof markAsRead === 'function') {
        markAsRead(notification.id).catch(error => {
          console.error('Failed to mark as read in backend:', error);
          // Revert local state if backend fails
          setLocalNotifications(prev => 
            prev.map(notif => 
              notif.id === notification.id 
                ? { ...notif, isRead: false }
                : notif
            )
          );
        });
      }
    }
  }, [markAsRead]);

  // Handle mark all as read - mark all locally
  const handleMarkAllAsRead = useCallback(() => {
    const unreadNotifications = localNotifications.filter(notif => !notif.isRead);
    
    if (unreadNotifications.length === 0) return;

    // Update all notifications to read locally for immediate UI feedback
    setLocalNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );

    // Call context function
    if (markAllAsRead && typeof markAllAsRead === 'function') {
      markAllAsRead().catch(error => {
        console.error('Failed to mark all as read in backend:', error);
        // Revert local state if backend fails
        setLocalNotifications(prev => 
          prev.map(notif => ({ 
            ...notif, 
            isRead: notif.isRead || unreadNotifications.some(unread => unread.id === notif.id) 
          }))
        );
      });
    }
  }, [markAllAsRead, localNotifications]);

  return (
    <CustomDropdown show={isDropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle 
        as="div" 
        bsPrefix="custom-dropdown-toggle"
        style={{ 
          cursor: 'pointer',
          outline: 'none',
          border: 'none',
          background: 'transparent'
        }}
      >
        <NotificationContainer>
          <FaBell size={20} color={unreadCount > 0 ? '#ef4444' : '#6b7280'} />
          {unreadCount > 0 && (
            <NotificationBadge shouldPulse={unreadCount > 0}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </NotificationBadge>
          )}
        </NotificationContainer>
      </Dropdown.Toggle>

      <StyledDropdownMenu>
        <NotificationHeader>
          <div>
            <FaBell className="me-2" />
            Notifications
          </div>
          {unreadCount > 0 && (
            <MarkAllButton onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
              Tout marquer comme lu
            </MarkAllButton>
          )}
        </NotificationHeader>

        {recentNotifications.length === 0 ? (
          <EmptyState>
            <FaBell size={32} color="#d1d5db" />
            <div style={{ marginTop: '12px', fontSize: '14px' }}>
              Aucune notification
            </div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              Vous êtes à jour !
            </div>
          </EmptyState>
        ) : (
          recentNotifications.map((notification, index) => (
            <NotificationItem
              key={notification.id || index}
              isUnread={!notification.isRead}
              onClick={() => handleNotificationClick(notification)}
            >
              <NotificationContent>
                <NotificationIcon type={notification.type}>
                  {getNotificationIcon(notification.type)}
                </NotificationIcon>
                <NotificationText>
                  <NotificationMessage isUnread={!notification.isRead}>
                    {notification.message}
                  </NotificationMessage>
                  <NotificationTime>
                    <FaClock size={10} />
                    {formatTimeAgo(notification.createdAt || notification.timestamp)}
                  </NotificationTime>
                </NotificationText>
              </NotificationContent>
              {!notification.isRead && <UnreadIndicator />}
            </NotificationItem>
          ))
        )}
      </StyledDropdownMenu>
    </CustomDropdown>
  );
};

export default React.memo(NotificationDropdown); 