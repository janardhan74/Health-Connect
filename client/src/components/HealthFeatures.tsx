
import React from "react";
import { 
  ActivitySquare, 
  Brain, 
  FileText, 
  HeartPulse, 
  Microscope, 
  ShieldCheck 
} from "lucide-react";

const featureItems = [
  {
    icon: <Microscope className="w-10 h-10 text-mediai-600" />,
    title: "AI Disease Detection",
    description: "Our advanced AI analyzes medical reports and images to detect potential health issues with high accuracy."
  },
  {
    icon: <FileText className="w-10 h-10 text-mediai-600" />,
    title: "Comprehensive Reports",
    description: "Receive detailed analysis of your medical documents with explanations in simple, understandable language."
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-mediai-600" />,
    title: "Health Monitoring",
    description: "Track your health metrics over time and receive personalized recommendations for improvement."
  },
  {
    icon: <Brain className="w-10 h-10 text-mediai-600" />,
    title: "Intelligent Chatbot",
    description: "Get instant answers to your health questions and receive daily health tips from our AI assistant."
  },
  {
    icon: <ActivitySquare className="w-10 h-10 text-mediai-600" />,
    title: "Treatment Insights",
    description: "Learn about potential treatment options and recovery methods based on your specific condition."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-mediai-600" />,
    title: "Privacy Focused",
    description: "Your health data is encrypted and secured with the highest privacy standards and never shared with third parties."
  }
];

const HealthFeatures = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
          Comprehensive Health Features
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Medi AI combines cutting-edge technology with medical expertise to provide
          you with accurate analysis and actionable health insights.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureItems.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="blue-glass-card inline-flex rounded-full p-3 mb-5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthFeatures;
