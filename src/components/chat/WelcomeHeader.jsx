import React from 'react';
import { Sparkles, Shield, Scale, FileCheck } from 'lucide-react';

const EU_SHIELD_IMAGE = new URL('../../assets/logo.png', import.meta.url).href;

export default function WelcomeHeader() {
    return (
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Image with Glow Effect */}
            <div className="relative inline-block mb-8">
                {/* Animated glow rings */}
                <div className="absolute inset-0 animate-pulse">
                    <div className="absolute inset-[-20px] rounded-full bg-[#F0B429]/20 blur-2xl" />
                    <div className="absolute inset-[-10px] rounded-full bg-[#003399]/30 blur-xl" />
                </div>
                
                {/* Main image container */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                    <img 
                        src={EU_SHIELD_IMAGE} 
                        alt="EU AI Act Shield" 
                        className="w-full h-full object-contain drop-shadow-2xl animate-in zoom-in duration-500"
                    />
                </div>
                
                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-[#F0B429] animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0ms' }} />
                <div className="absolute top-1/4 -left-4 w-2 h-2 rounded-full bg-[#003399] animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '150ms' }} />
                <div className="absolute -bottom-1 right-1/4 w-2.5 h-2.5 rounded-full bg-[#F0B429] animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '300ms' }} />
            </div>
            
            {/* Title with gradient */}
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-[#F0B429] via-[#ffc942] to-[#F0B429] bg-clip-text text-transparent">
                    EU AI Act
                </span>
                <br />
                <span className="text-white">Classification Assistant</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6">
                Navigate the complexities of AI regulation with confidence. 
                Get instant guidance on compliance requirements for your AI systems.
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600/50">
                    <Shield className="w-4 h-4 text-[#F0B429]" />
                    <span className="text-sm font-medium text-slate-300">Risk Classification</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600/50">
                    <Scale className="w-4 h-4 text-[#F0B429]" />
                    <span className="text-sm font-medium text-slate-300">Compliance Check</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600/50">
                    <FileCheck className="w-4 h-4 text-[#F0B429]" />
                    <span className="text-sm font-medium text-slate-300">Requirements Guide</span>
                </div>
            </div>
            
            {/* AI badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F0B429]/20 via-amber-500/10 to-[#F0B429]/20 border border-[#F0B429]/30 shadow-lg shadow-amber-500/10">
                <Sparkles className="w-4 h-4 text-[#F0B429]" />
                <span className="text-sm font-semibold text-[#F0B429]">
                    AI-Powered • Real-time Guidance • Latest 2024 Regulations
                </span>
            </div>
        </div>
    );
}