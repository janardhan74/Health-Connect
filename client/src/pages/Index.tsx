
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HealthFeatures from "@/components/HealthFeatures";
import UploadSection from "@/components/UploadSection";
import AnalysisResults from "@/components/AnalysisResults";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HealthFeatures />
      <UploadSection />
      <AnalysisResults />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
