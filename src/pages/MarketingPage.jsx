import React from 'react';
import { MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const MarketingPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="container flex items-center justify-between h-16">
                    <div className="flex items-center h-10 flex-shrink-0">
                        <img src="/logo-transparent.png" alt="Note Buddy" className="h-full w-auto" />
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <LanguageSelector />
                        <Link to="/login" className="btn btn-outline whitespace-nowrap">{t('common.signIn')}</Link>
                        <button className="btn btn-primary whitespace-nowrap">{t('common.getStarted')}</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="container text-center max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">
                        {t('marketing.hero.title')} <br />
                        <span className="text-primary">{t('marketing.hero.subtitle')}</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        {t('marketing.hero.description')}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="btn btn-primary py-4 px-8 text-lg">
                            {t('marketing.buttons.trial')} <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline py-4 px-8 text-lg">
                            {t('marketing.buttons.demo')}
                        </button>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('marketing.features.fast.title')}</h3>
                            <p className="text-slate-600">{t('marketing.features.fast.description')}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('marketing.features.secure.title')}</h3>
                            <p className="text-slate-600">{t('marketing.features.secure.description')}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('marketing.features.routing.title')}</h3>
                            <p className="text-slate-600">{t('marketing.features.routing.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">500k+</div>
                            <div className="text-slate-400">{t('marketing.stats.messages')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">1,200+</div>
                            <div className="text-slate-400">{t('marketing.stats.businesses')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-slate-400">{t('marketing.stats.uptime')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-slate-400">{t('marketing.stats.support')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t bg-white">
                <div className="container text-center text-slate-500">
                    <p>© 2026 {t('marketing.footer.rights')}</p>
                </div>
            </footer>
        </div>
    );
};

export default MarketingPage;
