
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileImage, 
  FileText, 
  FileScan,
  Loader2
} from "lucide-react";

type FileType = "report" | "xray" | "mri" | "scan";

type UploadedFile = {
  id: string;
  name: string;
  type: FileType;
  preview?: string;
  file: File;
};

const fileTypeIcons = {
  report: <FileText className="w-6 h-6 text-blue-600" />,
  xray: <FileImage className="w-6 h-6 text-purple-600" />,
  mri: <FileImage className="w-6 h-6 text-indigo-600" />,
  scan: <FileScan className="w-6 h-6 text-teal-600" />
};

const UploadSection = () => {
  const [activeTab, setActiveTab] = useState<FileType>("report");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles = Array.from(uploadedFiles).map(file => {
      const id = crypto.randomUUID();
      const newFile: UploadedFile = {
        id,
        name: file.name,
        type: activeTab,
        file,
      };

      // Create preview for image files
      if (file.type.startsWith('image/')) {
        newFile.preview = URL.createObjectURL(file);
      }

      return newFile;
    });

    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => {
        const id = crypto.randomUUID();
        const newFile: UploadedFile = {
          id,
          name: file.name,
          type: activeTab,
          file,
        };

        // Create preview for image files
        if (file.type.startsWith('image/')) {
          newFile.preview = URL.createObjectURL(file);
        }

        return newFile;
      });

      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const startAnalysis = () => {
    if (files.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      // Here you would typically navigate to results or show results
      // For demo purposes, we'll use href to navigate to the results section
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  return (
    <section id="upload" className="section bg-gradient-to-b from-white to-mediai-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
          Upload Your Medical Documents
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our AI can analyze various medical documents and images to provide
          insights about your health condition.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Tab selection */}
        <div className="flex bg-mediai-50">
          {(["report", "xray", "mri", "scan"] as FileType[]).map((type) => (
            <button
              key={type}
              className={`flex-1 py-4 px-2 text-center font-medium transition-colors ${
                activeTab === type
                  ? "text-mediai-700 border-b-2 border-mediai-600"
                  : "text-gray-500 hover:text-mediai-600"
              }`}
              onClick={() => setActiveTab(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Upload area */}
        <div 
          className={`p-8 text-center ${
            isDragging ? "bg-mediai-50" : "bg-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="border-2 border-dashed border-mediai-200 rounded-xl p-12">
            <div className="mb-6">
              <Upload className="w-16 h-16 mx-auto text-mediai-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Drag and drop your {activeTab} files
              </h3>
              <p className="text-gray-500">
                or click to browse from your device
              </p>
            </div>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleFileUpload}
              accept={activeTab === 'report' ? ".pdf,.doc,.docx,.txt" : ".jpg,.jpeg,.png,.dicom"}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="text-mediai-600 border-mediai-300" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>
        
        {/* File list */}
        {files.length > 0 && (
          <div className="px-8 pb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Uploaded Files</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    {file.preview ? (
                      <img 
                        src={file.preview} 
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-mediai-100 rounded">
                        {fileTypeIcons[file.type]}
                      </div>
                    )}
                    <span className="ml-3 text-sm text-gray-700 truncate max-w-xs">
                      {file.name}
                    </span>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeFile(file.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                className="bg-mediai-600 hover:bg-mediai-700 px-8"
                onClick={startAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Documents"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
