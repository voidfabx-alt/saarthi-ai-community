import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Settings, Info, ChevronLeft, ChevronRight, Send, 
  Globe, Loader2, Copy, Check, Brain, MessageSquare,
  Code, GraduationCap, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const modes = [
  { id: 'general', label: 'General', icon: MessageSquare },
  { id: 'coding', label: 'Coding', icon: Code },
  { id: 'study', label: 'Study', icon: GraduationCap },
  { id: 'telugu', label: 'Telugu', icon: Globe },
  { id: 'hindi', label: 'Hindi', icon: Globe },
];

const starterPrompts = [
  "Explain quantum computing in simple terms",
  "Write a poem about monsoon in India",
  "Help me learn Hindi greetings",
  "What's the history of Diwali?",
];

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMode, setSelectedMode] = useState('general');
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    let conversation = activeConversation;
    if (!conversation) {
      conversation = {
        id: Date.now().toString(),
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        messages: [],
      };
      setConversations([conversation, ...conversations]);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
    };

    setActiveConversation(updatedConversation);
    setConversations(convs => 
      convs.map(c => c.id === updatedConversation.id ? updatedConversation : c)
    );
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(userMessage.content, selectedMode),
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
      };

      setActiveConversation(finalConversation);
      setConversations(convs => 
        convs.map(c => c.id === finalConversation.id ? finalConversation : c)
      );
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (query: string, mode: string): string => {
    const responses: Record<string, string> = {
      general: `नमस्ते! I'd be happy to help you with "${query}". 

As Vyuha AI, I'm designed to understand and respond in multiple Indian languages. Here's what I can tell you:

This is a demo response showcasing our multilingual capabilities. In the full version, I can:
- Explain complex topics in simple terms
- Help you learn Indian languages
- Provide cultural context and information
- Assist with coding and technical queries

Is there anything specific you'd like to know more about?`,
      coding: `Here's a coding solution for your query about "${query}":

\`\`\`python
# Example Python code
def hello_india():
    print("नमस्ते India! 🇮🇳")
    return "Welcome to Vyuha AI"

# Run the function
hello_india()
\`\`\`

I can help you with various programming languages and explain concepts in Hindi, Telugu, or English!`,
      hindi: `नमस्ते! आपने पूछा: "${query}"

मैं Vyuha AI हूं और मैं हिंदी में आपकी मदद कर सकता हूं। यह एक डेमो रिस्पॉन्स है जो दिखाता है कि मैं कैसे हिंदी में बातचीत कर सकता हूं।

क्या मैं आपकी कुछ और मदद कर सकता हूं?`,
      telugu: `నమస్కారం! మీరు అడిగారు: "${query}"

నేను Vyuha AI ని మరియు నేను తెలుగులో మీకు సహాయం చేయగలను. ఇది మా బహుభాషా సామర్థ్యాలను ప్రదర్శించే డెమో ప్రతిస్పందన.

నేను మీకు మరేదైనా సహాయం చేయగలనా?`,
      study: `Great question about "${query}"! 📚

Here's a structured explanation:

**Key Concepts:**
1. First important point
2. Second important point  
3. Third important point

**Example:**
Think of it like... [analogy in Indian context]

**Practice Question:**
Can you explain this back to me in your own words?

Need help in Hindi or Telugu? Just ask!`,
    };

    return responses[mode] || responses.general;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-background pt-16">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-r border-border bg-sidebar flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-sidebar-border">
              <Button 
                onClick={createNewConversation}
                className="w-full justify-start gap-2"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>

            {/* Mode Selector */}
            <div className="p-4 border-b border-sidebar-border">
              <p className="text-xs font-medium text-muted-foreground mb-3">MODE</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        selectedMode === mode.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto p-2">
              <p className="text-xs font-medium text-muted-foreground px-2 mb-2">RECENT</p>
              {conversations.length === 0 ? (
                <p className="text-sm text-muted-foreground px-2">No conversations yet</p>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversation(conv)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1",
                      activeConversation?.id === conv.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{conv.title}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Bottom Links */}
            <div className="p-4 border-t border-sidebar-border space-y-1">
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <Info className="w-4 h-4" />
                About
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-muted border border-border rounded-r-lg flex items-center justify-center hover:bg-accent transition-colors"
        style={{ left: sidebarOpen ? 280 : 0 }}
      >
        {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header with Credits */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Vyuha AI" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-semibold">Vyuha AI</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {modes.find(m => m.id === selectedMode)?.label}
            </span>
          </div>
          {/* Credits display only in chat page */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{user?.credits || 0} credits</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-6 shadow-large overflow-hidden">
                  <img src={logo} alt="Vyuha AI" className="w-16 h-16 object-contain" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Vyuha AI</h2>
                <p className="text-muted-foreground mb-8">
                  India's multilingual AI assistant. Ask me anything in English, Hindi, Telugu, or more!
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {starterPrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setInput(prompt)}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-soft text-left transition-all group"
                    >
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {prompt}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-6">
              {activeConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4 relative group",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-accent border border-primary/20 rounded-tl-sm"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-accent border border-primary/20 rounded-2xl rounded-tl-sm p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 p-2 rounded-2xl border border-border bg-card shadow-soft">
              <button
                onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  webSearchEnabled
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                <Globe className="w-3.5 h-3.5" />
                Web
              </button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask Vyuha anything..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Vyuha AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;