import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, File, FileText, Image as ImageIcon, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDprStore } from '../store/useDprStore';

export default function UploadDPR() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { uploadFiles } = useDprStore();

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      status: 'pending'
    }));
    
    setFiles([...files, ...fileArray]);
    simulateUpload([...files, ...fileArray]);
  };

  const simulateUpload = (currentFiles) => {
    setIsUploading(true);
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 4;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setFiles(currentFiles.map(f => ({ ...f, status: 'complete' })));
      }
    }, 150);
  };

  const getFileIcon = (type, name) => {
    if (name.endsWith('.pdf')) return <FileText className="text-red-500" size={24} />;
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return <File className="text-green-500" size={24} />;
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <FileText className="text-blue-500" size={24} />;
    if (type.includes('image')) return <ImageIcon className="text-purple-500" size={24} />;
    return <File className="text-gray-500" size={24} />;
  };

  const triggerAnalysisPipeline = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate pipeline processing
    let step = 0;
    const interval = setInterval(() => {
      step += 10;
      setUploadProgress(step);
      if (step >= 100) {
        clearInterval(interval);
        uploadFiles(files);
        navigate('/'); // Redirect to dashboard heavily loaded with AI analysis
      }
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Initialize Review Pipeline</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Upload your Detailed Project Reports. Our AI pipeline will perform smart parsing, multi-dimensional scoring, and risk forecasting automatically.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <form 
          className={`flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out ${
            dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-secondary/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className={`w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 ${dragActive ? 'scale-110 shadow-lg shadow-primary/20' : ''}`}>
              <UploadCloud className="text-primary" size={40} />
            </div>
            <p className="mb-2 text-xl font-semibold">
              <span className="text-primary">Click to browse</span> or drag files here
            </p>
            <p className="text-xs text-muted-foreground mb-6 max-w-sm">
              Supports structural parsing for PDF, DOCX, XLSX, and scanned image sets via advanced OCR.
            </p>
            <button 
              type="button"
              className="bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
              onClick={() => document.getElementById('file-upload').click()}
            >
              Select Documents
            </button>
          </div>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            multiple 
            onChange={handleChange} 
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
        </form>
      </div>

      {files.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Staged Items</h3>
          </div>
          
          <div className="space-y-3">
            {files.map((file, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="flex items-center p-4 border border-border rounded-lg bg-background hover:bg-secondary/40 transition-colors"
              >
                <div className="mr-4 p-2 bg-secondary rounded-lg">
                  {getFileIcon(file.type, file.name)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{file.size}</p>
                </div>

                <div className="ml-4 flex-shrink-0 flex items-center">
                  {file.status === 'pending' || file.status === 'uploading' ? (
                    <div className="flex items-center gap-3">
                       <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
                       <div className="w-24 bg-secondary rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1.5 text-xs text-green-500 font-bold bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20">
                      <CheckCircle size={14} /> EXTRACTED
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {!isUploading && files.every(f => f.status === 'complete') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-border flex justify-between items-center"
            >
              <p className="text-sm text-muted-foreground">Extraction complete. Ready for Deep Pipeline Analysis.</p>
              <button 
                 onClick={triggerAnalysisPipeline}
                 className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5 group"
              >
                Start AI Analysis Pipeline
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {isUploading && files.every(f => f.status === 'complete') && (
            <div className="mt-8 pt-6 border-t border-border">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <RefreshCw size={16} className="animate-spin" />
                    Executing NLP Context Engine & Predictive Models...
                 </span>
                 <span className="text-sm font-bold text-primary">{uploadProgress}%</span>
               </div>
               <div className="w-full bg-secondary rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
               </div>
               <p className="text-xs text-muted-foreground mt-2 italic">Stage: Processing Multi-Dimensional Scoring logic...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
