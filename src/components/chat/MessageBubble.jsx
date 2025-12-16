import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import { User, Loader2 } from 'lucide-react';

const EU_SHIELD_IMAGE = new URL('../../assets/logo.png', import.meta.url).href;

export default function MessageBubble({ message, isLoading = false }) {
    const isUser = message.role === 'user';
    const isAssistant = message.role === 'assistant';
    
    return (
        <div 
            className={cn(
                "flex gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {isAssistant && (
                <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#003399] to-[#0055cc] flex items-center justify-center shadow-lg shadow-blue-500/30 p-1.5 border-2 border-[#F0B429]/30">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                        <img src={EU_SHIELD_IMAGE} alt="EU AI" className="w-full h-full object-contain" />
                    )}
                </div>
            )}
            
            <div 
                className={cn(
                    "max-w-[75%] rounded-3xl px-6 py-4 transition-all duration-200",
                    isUser 
                        ? "bg-gradient-to-br from-[#003399] to-[#0044aa] text-white shadow-xl shadow-blue-900/20" 
                        : "bg-slate-700/50 border border-slate-600/50 text-slate-100 shadow-sm"
                )}
            >
                {isUser ? (
                    <p className="text-[15px] leading-relaxed font-medium">{message.content}</p>
                ) : (
                    <ReactMarkdown 
                        className="text-[15px] prose prose-slate max-w-none prose-p:leading-relaxed prose-p:my-2 prose-headings:font-semibold prose-h3:text-base prose-ul:my-2 prose-li:my-0.5 prose-strong:text-slate-900"
                        components={{
                            p: ({ children }) => <p className="my-2 leading-relaxed text-slate-200">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            ul: ({ children }) => <ul className="my-2 ml-4 space-y-1 list-disc marker:text-[#F0B429]">{children}</ul>,
                            ol: ({ children }) => <ol className="my-2 ml-4 space-y-1 list-decimal marker:text-[#F0B429]">{children}</ol>,
                            li: ({ children }) => <li className="text-slate-200">{children}</li>,
                            h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-4 mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold text-white mt-3 mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold text-white mt-3 mb-1">{children}</h3>,
                            a: ({ children, href }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#F0B429] hover:text-[#ffc942] underline underline-offset-2">
                                    {children}
                                </a>
                            ),
                            code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded bg-slate-600 text-slate-100 text-sm font-mono">
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
            
            {isUser && (
                <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-500/20 border border-slate-600/30">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
}