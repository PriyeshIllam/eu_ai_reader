import React from 'react';
import { Button } from "@/components/ui/button";
import { 
    ShieldQuestion, 
    Scale, 
    FileCheck, 
    AlertTriangle, 
    Building2,
    Sparkles,
    FileText,
    Users,
    ChevronRight
} from 'lucide-react';
import { cn } from "@/lib/utils";

const spotlightQuestions = [
    {
        id: 1,
        question: "What risk category does my AI system fall under?",
        icon: ShieldQuestion,
        category: "Classification",
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: 2,
        question: "What are the compliance requirements for high-risk AI?",
        icon: Scale,
        category: "Compliance",
        color: "from-emerald-500 to-teal-600"
    },
    {
        id: 3,
        question: "Do I need to register my AI system in the EU database?",
        icon: FileCheck,
        category: "Registration",
        color: "from-violet-500 to-purple-600"
    },
    {
        id: 4,
        question: "What AI practices are prohibited under the EU AI Act?",
        icon: AlertTriangle,
        category: "Prohibited",
        color: "from-red-500 to-rose-600"
    },
    {
        id: 5,
        question: "What transparency obligations apply to my AI system?",
        icon: FileText,
        category: "Transparency",
        color: "from-amber-500 to-orange-600"
    },
    {
        id: 6,
        question: "How does the AI Act affect my organization as a provider?",
        icon: Building2,
        category: "Providers",
        color: "from-cyan-500 to-blue-600"
    },
    {
        id: 7,
        question: "What are the requirements for AI systems interacting with people?",
        icon: Users,
        category: "Interaction",
        color: "from-pink-500 to-rose-600"
    },
    {
        id: 8,
        question: "When does the EU AI Act come into effect for different requirements?",
        icon: Sparkles,
        category: "Timeline",
        color: "from-[#F0B429] to-amber-600"
    }
];

export default function SpotlightQuestions({ onSelectQuestion, disabled }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                <div className="flex items-center gap-2 px-4">
                    <Sparkles className="w-4 h-4 text-[#F0B429]" />
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Popular Questions
                    </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {spotlightQuestions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Button
                            key={item.id}
                            variant="outline"
                            onClick={() => onSelectQuestion(item.question)}
                            disabled={disabled}
                            className={cn(
                                "h-auto p-0 justify-start text-left group overflow-hidden",
                                "bg-slate-700/30 hover:bg-slate-700/50",
                                "border-slate-600/50 hover:border-[#F0B429]/40",
                                "transition-all duration-300 ease-out rounded-2xl",
                                "hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "animate-in fade-in slide-in-from-bottom-3"
                            )}
                            style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
                        >
                            <div className="flex items-center gap-3 w-full p-4 sm:p-5">
                                {/* Icon with gradient background */}
                                <div className={cn(
                                    "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center",
                                    "bg-gradient-to-br shadow-lg transition-all duration-300",
                                    item.color,
                                    "group-hover:scale-110 group-hover:shadow-xl"
                                )}>
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest",
                                        "bg-gradient-to-r bg-clip-text text-transparent",
                                        item.color
                                    )}>
                                        {item.category}
                                    </span>
                                    <p className="text-[13px] sm:text-sm font-medium text-slate-300 mt-1 leading-relaxed group-hover:text-white transition-colors line-clamp-none whitespace-normal break-words">
                                        {item.question}
                                    </p>
                                </div>
                                
                                {/* Arrow indicator */}
                                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#F0B429] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 hidden sm:block" />
                            </div>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}