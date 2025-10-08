import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showQuoteButton?: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour 👋, je suis TRADLOG Assistant, votre conseiller digital. Je peux vous renseigner sur nos produits, services logistiques, ou vous aider à obtenir un devis. Que souhaitez-vous savoir ?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const MAX_MESSAGE_LENGTH = 1000;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectQuoteRequest = (message: string): boolean => {
    const quoteKeywords = [
      'devis', 'prix', 'tarif', 'coût', 'combien', 'livraison', 'transport',
      'ciment', 'acier', 'granulats', 'sable', 'blocs', 'commande', 'acheter'
    ];
    return quoteKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    // Client-side validation
    if (inputMessage.length > MAX_MESSAGE_LENGTH) {
      setError(`Message trop long (maximum ${MAX_MESSAGE_LENGTH} caractères)`);
      return;
    }
    
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      const showQuoteButton = detectQuoteRequest(currentMessage);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        showQuoteButton,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur chatbot:', error);
      
      let errorContent = "Désolé, je rencontre un problème technique. Vous pouvez nous contacter directement au +225 07 00 08 08 33 ou sur WhatsApp.";
      
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorContent = "Vous envoyez trop de messages. Veuillez patienter une minute avant de réessayer.";
        } else if (error.message.includes('403')) {
          errorContent = "Accès refusé. Veuillez actualiser la page et réessayer.";
        } else if (error.message.includes('400')) {
          errorContent = "Message invalide. Veuillez vérifier votre message et réessayer.";
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Problème de connexion avec l\'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-primary/20">
        <CardHeader className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Assistant TRADLOG
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/80">
            Logistique • Transport • Matériaux
          </p>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(500px-120px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.showQuoteButton && (
                      <div className="mt-3 pt-3 border-t border-muted-foreground/20">
                        <Button
                          onClick={scrollToContact}
                          variant="secondary"
                          size="sm"
                          className="w-full"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Demander un devis
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs">Assistant TRADLOG écrit...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t border-border">
            {error && (
              <div className="mb-2 p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  if (error) setError(null);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                disabled={isLoading}
                className="flex-1"
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading || inputMessage.length > MAX_MESSAGE_LENGTH}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Messages confidentiels • TRADLOG Côte d'Ivoire
              </p>
              <span className="text-xs text-muted-foreground">
                {inputMessage.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;