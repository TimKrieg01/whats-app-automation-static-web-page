import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Clock, Calendar, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const jwt = session?.access_token;
                const apiUrl = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

                // Attempting to fetch from backend, fallback to dummy data if configured/failing
                try {
                    const response = await axios.get(`${apiUrl}/conversation-records`, {
                        headers: { Authorization: `Bearer ${jwt}` }
                    });
                    if (Array.isArray(response.data)) {
                        setRecords(response.data);
                    } else if (response.data && Array.isArray(response.data.records)) {
                        setRecords(response.data.records);
                    } else {
                        throw new Error('Unexpected API response format');
                    }
                } catch (apiErr) {
                    console.log('Backend not available, using dummy data');
                    // Dummy data generation
                    const dummyRecords = Array.from({ length: 1 }).map((_, i) => ({
                        id: i,
                        date: '2026-01-18',
                        time: `${10 + Math.floor(i / 3)}:${(i * 10) % 60 || '00'}`,
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conversation update #${i + 1} regarding the automation flow.`
                    }));
                    setRecords(dummyRecords);
                }
            } catch (err) {
                setError(t('dashboard.error'));
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [user, t]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin text-primary mx-auto mb-4" size={40} />
                    <p className="text-slate-500 font-medium">{t('dashboard.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-600">
                <AlertCircle size={24} />
                <p className="font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('dashboard.title')}</h1>
                <p className="text-slate-500">{t('dashboard.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 custom-scrollbar">
                {Array.isArray(records) && records.map((record) => (
                    <div
                        key={record.id}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full">
                                <MessageCircle size={14} /> {t('dashboard.record')} #{record.id + 1}
                            </div>
                            <div className="flex flex-col items-end text-xs text-slate-400">
                                <div className="flex items-center gap-1"><Calendar size={12} /> {record.date}</div>
                                <div className="flex items-center gap-1"><Clock size={12} /> {record.time}</div>
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            {record.content}
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-50">
                            <button className="text-primary text-xs font-bold hover:underline">{t('dashboard.viewLogs')} →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
