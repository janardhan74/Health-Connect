
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-mediai-50 to-blue-50 pt-16">
      {/* Abstract background elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-mediai-200 rounded-full filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-mediai-300 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="heading-gradient">Advanced AI-Powered</span>
            <br />
            <span className="text-gray-800">Medical Analysis & Health Insights</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Upload your medical reports, X-rays, MRIs, or scan results and let our 
            sophisticated AI analyze them to provide accurate insights, 
            disease detection, and personalized health recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="btn-primary text-lg px-8 py-6"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Analyze Your Reports
            </Button>
            <Button 
              variant="outline" 
              className="btn-secondary text-lg px-8 py-6"
              onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Health Tips
            </Button>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          <ArrowDown className="w-10 h-10 text-mediai-600" />
        </div>
      </div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyOTcwZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
    </div>
  );
};

export default Hero;
