import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CertificateUpload = ({ 
  onUpload,
  existingFiles = [],
  className = "" 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(existingFiles);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = async (files) => {
    const validFiles = [];
    const errors = [];

    Array.from(files)?.forEach(file => {
      if (!allowedTypes?.includes(file?.type)) {
        errors?.push(`${file?.name}: Unsupported file type`);
        return;
      }

      if (file?.size > maxFileSize) {
        errors?.push(`${file?.name}: File too large (max 10MB)`);
        return;
      }

      validFiles?.push(file);
    });

    if (errors?.length > 0) {
      alert(`Upload errors:\n${errors?.join('\n')}`);
    }

    if (validFiles?.length > 0) {
      setUploading(true);
      
      try {
        const newFiles = await Promise.all(
          validFiles?.map(async (file) => {
            // Simulate file upload
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
              id: Date.now() + Math.random(),
              name: file?.name,
              size: file?.size,
              type: file?.type,
              url: URL.createObjectURL(file),
              uploadedAt: new Date()?.toISOString(),
              status: 'uploaded'
            };
          })
        );

        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);
        onUpload(updatedFiles);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles?.filter(file => file?.id !== fileId);
    setUploadedFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('image')) return 'Image';
    if (fileType?.includes('word') || fileType?.includes('document')) return 'FileText';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const isImageFile = (fileType) => {
    return fileType?.includes('image');
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Certificate Upload
            </h3>
            <p className="text-sm text-text-secondary">
              Upload official certificates and documentation
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Upload" size={16} />
            <span>{uploadedFiles?.length} files</span>
          </div>
        </div>
      </div>
      {/* Upload Area */}
      <div className="p-4">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-border/60'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />

          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon 
                name={uploading ? "Loader2" : "Upload"} 
                size={24} 
                className={`text-text-secondary ${uploading ? 'animate-spin' : ''}`} 
              />
            </div>
            
            <div>
              <p className="text-sm font-medium text-foreground">
                {uploading ? 'Uploading files...' : 'Drop files here or click to browse'}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Supports PDF, JPG, PNG, WEBP, DOC, DOCX (max 10MB each)
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              disabled={uploading}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>
          </div>
        </div>

        {/* File List */}
        {uploadedFiles?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Files" size={16} className="mr-2" />
              Uploaded Files ({uploadedFiles?.length})
            </h4>
            
            <div className="space-y-3">
              {uploadedFiles?.map((file) => (
                <div
                  key={file?.id}
                  className="flex items-center space-x-3 p-3 bg-muted rounded-lg border border-border"
                >
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {isImageFile(file?.type) ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-border">
                        <Image
                          src={file?.url}
                          alt={file?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                        <Icon name={getFileIcon(file?.type)} size={20} className="text-text-secondary" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>{formatFileSize(file?.size)}</span>
                      <span>•</span>
                      <span>
                        {new Date(file.uploadedAt)?.toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {isImageFile(file?.type) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => window.open(file?.url, '_blank')}
                      />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = file?.url;
                        link.download = file?.name;
                        link?.click();
                      }}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => removeFile(file?.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Info" size={16} className="mr-2" />
            Upload Guidelines
          </h4>
          <ul className="text-xs text-text-secondary space-y-1">
            <li>• Ensure all certificates are clearly visible and readable</li>
            <li>• Include official lab seals and signatures</li>
            <li>• File names should be descriptive (e.g., "Quality_Certificate_Batch_001.pdf")</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• Supported formats: PDF, JPG, PNG, WEBP, DOC, DOCX</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificateUpload;