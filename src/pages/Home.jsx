import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { Shield, ExternalLink } from 'lucide-react';

const EU_SHIELD_IMAGE = new URL('../assets/logo.png', import.meta.url).href;

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Subtle Background */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Soft radial glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-700/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-600/15 rounded-full blur-[100px]" />
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 flex flex-col h-screen">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        {/* Logo with image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#F0B429]/30 rounded-xl blur-lg" />
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#F0B429]/30 bg-[#003399]/50 p-1">
                                <img 
                                    src={EU_SHIELD_IMAGE} 
                                    alt="EU AI Act" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                AI Act Navigator
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0B429]/20 text-[#F0B429] font-medium">
                                    EU 2024
                                </span>
                            </h1>
                            <p className="text-sm text-slate-400">
                                Regulation Classification & Compliance
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Official Regulation
                        </a>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-sm font-medium text-emerald-400">Active</span>
                        </div>
                    </div>
                </header>
                
                {/* Chat Container */}
                <main className="flex-1 overflow-hidden">
                    <div className="h-full max-w-5xl mx-auto px-4 py-6">
                        <div className="h-full bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-700/50 overflow-hidden">
                            <ChatInterface />
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="px-4 py-4 text-center border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                    <p className="text-sm text-slate-400">
                        <Shield className="w-4 h-4 inline-block mr-1 text-[#F0B429]" />
                        This tool provides general guidance only. For legal compliance, consult qualified legal professionals.
                    </p>
                </footer>
            </div>
        </div>
    );
}