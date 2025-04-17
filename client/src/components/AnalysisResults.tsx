
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardCheck, 
  FileWarning, 
  AlertCircle, 
  ThumbsUp, 
  Pill, 
  CalendarClock
} from "lucide-react";

// Mock data for demo purposes
const mockAnalysisResult = {
  condition: "Type 2 Diabetes",
  confidence: 92,
  severity: "Moderate",
  riskLevel: "Medium",
  description: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.",
  keyIndicators: [
    "Elevated blood glucose levels (245 mg/dL)",
    "Elevated HbA1c (7.8%)",
    "Normal blood pressure",
    "Slightly elevated cholesterol"
  ],
  recommendations: [
    {
      title: "Medication",
      description: "Metformin (500mg twice daily) to help control blood sugar levels.",
      icon: <Pill className="w-5 h-5 text-mediai-600" />
    },
    {
      title: "Diet Changes",
      description: "Reduce carbohydrate intake, focus on low-glycemic foods, increase fiber intake.",
      icon: <ClipboardCheck className="w-5 h-5 text-mediai-600" />
    },
    {
      title: "Regular Monitoring",
      description: "Check blood glucose levels daily, schedule follow-up appointment in 3 months.",
      icon: <CalendarClock className="w-5 h-5 text-mediai-600" />
    }
  ],
  warningSigns: [
    "Extreme thirst or hunger",
    "Frequent urination",
    "Unexplained weight loss",
    "Tingling in hands or feet"
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "mild":
      return "text-green-500";
    case "moderate":
      return "text-amber-500";
    case "severe":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "low":
      return "bg-green-500";
    case "medium":
      return "bg-amber-500";
    case "high":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const AnalysisResults = () => {
  const { condition, confidence, severity, riskLevel, description, keyIndicators, recommendations, warningSigns } = mockAnalysisResult;
  
  return (
    <section id="results" className="section bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
          Analysis Results
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Based on the documents you provided, our AI has detected the following health condition.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-mediai-600 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{condition}</h3>
                <div className="flex items-center">
                  <span className={`font-medium ${getSeverityColor(severity)}`}>
                    {severity} Severity
                  </span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">
                    {confidence}% Confidence
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <span className="text-sm mr-3">Risk Level:</span>
                <span className={`px-3 py-1 rounded-full text-white font-medium ${getRiskColor(riskLevel)}`}>
                  {riskLevel}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-2">Condition Overview</h4>
            <p className="text-gray-700 mb-6">{description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <FileWarning className="w-5 h-5 mr-2 text-mediai-600" />
                Key Indicators Detected
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                {keyIndicators.map((indicator, index) => (
                  <li key={index}>{indicator}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2 text-mediai-600" />
                Recommended Actions
              </h4>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-mediai-50/50 p-4 rounded-lg border border-mediai-100">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3">{rec.icon}</div>
                      <div>
                        <h5 className="font-medium text-gray-800">{rec.title}</h5>
                        <p className="text-gray-600 text-sm">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                Warning Signs to Watch For
              </h4>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <ul className="text-gray-700 space-y-1">
                  {warningSigns.map((sign, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-mediai-600 hover:bg-mediai-700">
                Download Detailed Report
              </Button>
              <Button variant="outline" className="border-mediai-200 text-mediai-700">
                Share With Doctor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
