import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Phone, Shield, CreditCard, Key, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handlePasswordReset = async () => {
        setLoading(true);
        setMessage(null);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/console/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage(t('profile.security.success'));
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('profile.title')}</h1>
                <p className="text-slate-500">{t('profile.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Shield className="text-primary" size={20} /> {t('profile.personalInfo.title')}
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-1 min-w-0">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('profile.personalInfo.email')}</label>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail size={18} className="text-primary/60 flex-shrink-0" />
                                    <span className="font-medium break-all">{user.email}</span>
                                </div>
                            </div>
                            <div className="space-y-1 min-w-0">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('profile.personalInfo.phone')}</label>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Phone size={18} className="text-primary/60 flex-shrink-0" />
                                    <span className="font-medium">+49 123 4567890</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Key size={18} className="text-primary" /> {t('profile.security.title')}
                            </h4>
                            <p className="text-sm text-slate-500 mb-4">{t('profile.security.description')}</p>

                            {message && (
                                <div className="mb-4 bg-green-50 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium">
                                    <CheckCircle size={18} /> {message}
                                </div>
                            )}
                            {error && (
                                <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium">
                                    <AlertCircle size={18} /> {error}
                                </div>
                            )}

                            <button
                                onClick={handlePasswordReset}
                                disabled={loading}
                                className="btn btn-outline"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : t('profile.security.button')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Status */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl p-8 text-white">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <CreditCard size={20} className="text-blue-400" /> {t('profile.subscription.title')}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('profile.subscription.plan')}</span>
                                <span className="text-2xl font-bold">Business Pro</span>
                            </div>

                            <div className="flex items-center gap-2 text-green-400 font-bold text-sm bg-green-400/10 px-3 py-1 rounded-full w-fit">
                                <CheckCircle size={14} /> {t('profile.subscription.active')}
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-800">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">{t('profile.subscription.billing')}</span>
                                    <span className="font-medium">Feb 18, 2026</span>
                                </div>
                                <button className="w-full btn btn-primary mt-4 bg-blue-600 hover:bg-blue-700">{t('profile.subscription.manage')}</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-6">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('profile.role')}</span>
                        <div className="flex items-center gap-3 text-slate-800">
                            <div className="w-8 h-8 bg-blue-50 text-primary rounded-lg flex items-center justify-center">
                                <Shield size={16} />
                            </div>
                            <span className="font-bold">{t('profile.adminRole')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
