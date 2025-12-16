import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RotateCcw } from 'lucide-react';
import MessageBubble from './MessageBubble';
import SpotlightQuestions from './SpotlightQuestions';
import ChatInput from './ChatInput';
import WelcomeHeader from './WelcomeHeader';
import { cn } from "@/lib/utils";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatWithGPT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: updatedMessages }),
});


      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.content || "Sorry, I couldn't generate a response.",
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I encountered an error. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header with Reset */}
      {hasMessages && (
        <div className="flex justify-end px-4 py-3 border-b border-slate-700/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-slate-400 hover:text-white gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Conversation
          </Button>
        </div>
      )}

      {/* Chat Area */}
      <ScrollArea 
        ref={scrollAreaRef}
        className={cn(
          "flex-1 px-4 sm:px-6",
          hasMessages ? "py-6" : "py-8"
        )}
      >
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center min-h-full">
            <WelcomeHeader />
            <div className="w-full max-w-2xl">
              <SpotlightQuestions 
                onSelectQuestion={sendMessage}
                disabled={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}

            {isLoading && (
              <MessageBubble 
                message={{ role: 'assistant', content: '' }}
                isLoading={true}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className={cn(
        "px-4 sm:px-6 pb-6 pt-4",
        "bg-gradient-to-t from-slate-900/50 via-slate-900/30 to-transparent"
      )}>
        <ChatInput 
          onSend={sendMessage}
          disabled={isLoading}
          placeholder={hasMessages 
            ? "Ask a follow-up question..." 
            : "Describe your AI project or ask a question..."
          }
        />
      </div>
    </div>
  );
}
