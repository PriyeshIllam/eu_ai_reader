import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ChatInput({ onSend, disabled, placeholder }) {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
        }
    }, [message]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    
    return (
        <form 
            onSubmit={handleSubmit}
            className="relative"
        >
            {/* Glowing border effect when focused */}
            <div className={cn(
                "absolute -inset-1 rounded-3xl transition-opacity duration-300",
                "bg-gradient-to-r from-[#003399] via-[#F0B429] to-[#003399]",
                isFocused ? "opacity-30 blur-sm" : "opacity-0"
            )} />
            
            <div className={cn(
                "relative flex items-end gap-3 p-2 rounded-2xl border bg-slate-700/50",
                "shadow-xl shadow-black/20",
                "transition-all duration-300",
                isFocused ? "border-[#F0B429]/40 shadow-amber-500/20" : "border-slate-600/50"
            )}>
                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder || "Describe your AI project or ask a question..."}
                    disabled={disabled}
                    className={cn(
                        "flex-1 min-h-[52px] max-h-[150px] resize-none border-0",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                        "placeholder:text-slate-400 text-white",
                        "bg-transparent px-4 py-3 text-[15px] leading-relaxed"
                    )}
                    rows={1}
                    aria-label="Message input"
                />
                
                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className={cn(
                        "h-12 w-12 rounded-xl flex-shrink-0",
                        "bg-gradient-to-br from-[#003399] to-[#0055cc]",
                        "hover:from-[#002277] hover:to-[#003399]",
                        "shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
                        "transition-all duration-300 hover:scale-105",
                        "disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
                    )}
                    aria-label="Send message"
                >
                    {disabled ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
                <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#F0B429]" />
                    Press <kbd className="px-2 py-1 rounded-md bg-slate-700 text-slate-300 font-mono text-[10px] shadow-sm">Enter</kbd> to send
                    <span className="text-slate-600">•</span>
                    <kbd className="px-2 py-1 rounded-md bg-slate-700 text-slate-300 font-mono text-[10px] shadow-sm">Shift + Enter</kbd> for new line
                </p>
            </div>
        </form>
    );
}