
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, User, Bot, Info } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Mock health tips for demo
const healthTips = [
  "Stay hydrated by drinking at least 8 glasses of water daily.",
  "Aim for 7-9 hours of quality sleep each night for optimal health.",
  "Include a variety of colorful vegetables in your diet for essential nutrients.",
  "Regular physical activity can help reduce the risk of chronic diseases.",
  "Practice mindfulness or meditation to reduce stress levels.",
  "Limit processed foods and added sugars in your diet.",
  "Take short breaks during work to reduce eye strain and mental fatigue.",
  "Regular check-ups with your doctor can help detect health issues early.",
  "Remember to maintain good posture when sitting for long periods.",
  "Consider adding omega-3 rich foods like fish, flaxseeds, and walnuts to your diet."
];

const getRandomHealthTip = (): string => {
  return healthTips[Math.floor(Math.random() * healthTips.length)];
};

// Mock AI responses
const getAIResponse = (query: string): string => {
  query = query.toLowerCase();
  
  if (query.includes("diabetes") || query.includes("blood sugar")) {
    return "Diabetes management involves monitoring blood glucose levels, maintaining a balanced diet low in simple carbohydrates, regular physical activity, and taking prescribed medications. Regular check-ups with your healthcare provider are essential.";
  } else if (query.includes("exercise") || query.includes("workout")) {
    return "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities at least twice a week. Always start gradually if you're new to exercise.";
  } else if (query.includes("diet") || query.includes("nutrition") || query.includes("food")) {
    return "A balanced diet should include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive salt. Consider consulting with a nutritionist for personalized dietary advice.";
  } else if (query.includes("sleep") || query.includes("insomnia")) {
    return "Good sleep hygiene includes maintaining a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals close to bedtime. Adults typically need 7-9 hours of quality sleep per night.";
  } else if (query.includes("stress") || query.includes("anxiety")) {
    return "Stress management techniques include deep breathing exercises, meditation, physical activity, adequate sleep, and maintaining social connections. If stress is significantly affecting your daily life, consider speaking with a mental health professional.";
  } else if (query.includes("headache") || query.includes("migraine")) {
    return "Headaches can be caused by dehydration, stress, lack of sleep, or underlying health conditions. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe or frequent, consult a healthcare provider.";
  } else if (query.includes("vitamin") || query.includes("supplement")) {
    return "While a balanced diet should provide most needed nutrients, some people may benefit from supplements. Vitamin D, B12, and omega-3 are common supplements. Always consult with a healthcare provider before starting any new supplement.";
  } else if (query.includes("covid") || query.includes("coronavirus")) {
    return "COVID-19 preventive measures include vaccination, hand hygiene, wearing masks in crowded indoor settings, and staying home when sick. If you experience symptoms, consider testing and follow local health guidelines.";
  } else if (query.includes("heart") || query.includes("cardiovascular")) {
    return "Heart health can be maintained through regular exercise, a diet low in saturated fats and sodium, not smoking, limiting alcohol, and managing stress. Regular blood pressure and cholesterol checks are important preventive measures.";
  } else {
    return "I'm happy to provide general health information, but for specific medical advice, please consult with a healthcare professional. Is there a particular health topic you'd like to learn more about?";
  }
};

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your health assistant. Ask me any health-related questions or type 'tip' for a random health tip.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: input.toLowerCase() === "tip" 
          ? getRandomHealthTip() 
          : getAIResponse(input),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  return (
    <section id="chat" className="section bg-gradient-to-b from-mediai-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
          Health Assistant Chatbot
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get instant answers to your health questions and personalized health tips.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-mediai-100">
          {/* Chat header */}
          <div className="bg-mediai-600 text-white p-4">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <h3 className="font-semibold">Health Assistant</h3>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-mediai-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "bot" && (
                      <Bot className="w-5 h-5 mr-2 mt-0.5 text-mediai-600 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <User className="w-5 h-5 ml-2 mt-0.5 text-white/80 shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Ask a health question or type 'tip'..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="rounded-full border-mediai-200 focus-visible:ring-mediai-500"
              />
              <Button
                size="icon"
                className="ml-2 bg-mediai-600 hover:bg-mediai-700 rounded-full h-10 w-10"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-3 flex items-start text-xs text-gray-500">
              <Info className="w-4 h-4 mr-1 shrink-0" />
              <span>
                For medical emergencies, please contact emergency services immediately. 
                This chatbot provides general information only and is not a substitute for professional medical advice.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
