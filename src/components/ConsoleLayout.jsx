import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import {
    LayoutDashboard,
    UserCircle,
    Settings,
    LogOut,
    Menu,
    X,
    MessageSquare,
    Bell,
    ChevronDown
} from 'lucide-react';

const ConsoleLayout = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
            }
        });
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const navItems = [
        { name: t('common.history'), icon: <LayoutDashboard size={20} />, path: '/console/dashboard' },
        { name: t('common.profile'), icon: <UserCircle size={20} />, path: '/console/profile' },
        { name: t('common.settings'), icon: <Settings size={20} />, path: '/console/settings' },
    ];

    if (!user) return null;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out z-30`}
            >
                <div className="h-16 flex items-center px-4 border-b border-slate-100 overflow-hidden">
                    {isSidebarOpen ? (
                        <div className="h-8 flex items-center">
                            <img src="/logo-transparent.png" alt="Note Buddy" className="h-full w-auto" />
                        </div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <img src="/icon-transparent.png" alt="Note Buddy" className="w-8 h-8 rounded-lg" />
                        </div>
                    )}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/console' || item.path === '/console/dashboard'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-50 text-primary font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`
                            }
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {isSidebarOpen && <span className="text-sm whitespace-nowrap">{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-400"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
                    <div className="flex-1 min-w-0 pr-4">
                        <h2 className="text-xl font-semibold text-slate-800 truncate">
                            {navItems.find(item => window.location.pathname === item.path || (item.path === '/console/dashboard' && window.location.pathname === '/console'))?.name || t('common.history')}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <LanguageSelector />

                        <button className="text-slate-400 hover:text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1 pl-3 rounded-full hover:bg-slate-50 transition-colors"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-slate-700 leading-tight">
                                        {user.email.split('@')[0]}
                                    </p>
                                    <p className="text-xs text-slate-400">{t('common.admin')}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 text-primary rounded-full flex items-center justify-center">
                                    <UserCircle size={24} />
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                                    <button
                                        onClick={() => { navigate('/console/profile'); setIsProfileOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <UserCircle size={18} /> {t('common.profile')}
                                    </button>
                                    <button
                                        onClick={() => { navigate('/console/settings'); setIsProfileOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <Settings size={18} /> {t('common.settings')}
                                    </button>
                                    <hr className="my-2 border-slate-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={18} /> {t('common.signOut')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-auto p-8">
                    <Outlet context={{ user }} />
                </main>
            </div>
        </div>
    );
};

export default ConsoleLayout;
