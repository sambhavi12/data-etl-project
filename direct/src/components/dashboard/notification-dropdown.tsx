
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'info' | 'payment';
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 'n-1',
        title: 'Funds Released',
        message: 'Escrow payment of $850.00 released for Task #t-101.',
        time: '2 mins ago',
        type: 'payment',
        read: false
    },
    {
        id: 'n-2',
        title: 'Verification Complete',
        message: 'AI Agent "Judge-01" passed your submission for "Market Analysis".',
        time: '1 hour ago',
        type: 'success',
        read: false
    },
    {
        id: 'n-3',
        title: 'Compliance Alert',
        message: 'Task #t-104 was flagged for potential PII violation.',
        time: '3 hours ago',
        type: 'warning',
        read: true
    },
    {
        id: 'n-4',
        title: 'System Update',
        message: 'The AI model has been upgraded to GPT-4o-Mini.',
        time: '1 day ago',
        type: 'info',
        read: true
    }
];

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
            case 'payment': return <DollarSign size={16} className="text-yellow-500" />;
            default: return <Bell size={16} className="text-blue-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative p-2 rounded-full hover:bg-zinc-800 transition-colors"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
                <Bell size={20} color="#a1a1aa" />
                {unreadCount > 0 && (
                    <div style={{
                        position: 'absolute', top: '2px', right: '2px',
                        width: '10px', height: '10px',
                        background: '#eab308', borderRadius: '50%',
                        border: '2px solid #09090b'
                    }} />
                )}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '320px',
                    background: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                style={{ fontSize: '0.75rem', color: '#71717a', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.map((n) => (
                            <div key={n.id} style={{
                                padding: '1rem',
                                borderBottom: '1px solid #27272a',
                                display: 'flex',
                                gap: '0.75rem',
                                background: n.read ? 'transparent' : 'rgba(39, 39, 42, 0.4)',
                                cursor: 'default'
                            }}>
                                <div style={{
                                    minWidth: '32px', height: '32px',
                                    background: '#27272a', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {getIcon(n.type)}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: '#e4e4e7', fontWeight: n.read ? 400 : 500, lineHeight: 1.4, marginBottom: '0.25rem' }}>
                                        {n.title}
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: '#a1a1aa', lineHeight: 1.3 }}>
                                        {n.message}
                                    </p>
                                    <p style={{ fontSize: '0.7rem', color: '#52525b', marginTop: '0.5rem' }}>
                                        {n.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid #27272a' }}>
                        <button style={{ fontSize: '0.8rem', color: '#3b82f6', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                            View all activity
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
