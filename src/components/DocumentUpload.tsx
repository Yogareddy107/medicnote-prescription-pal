
import React, { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadedFile {
  file: File;
  preview?: string;
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [recordType, setRecordType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['image/*', 'application/pdf', 'text/*'];
      return validTypes.some(type => 
        type.endsWith('*') ? file.type.startsWith(type.slice(0, -1)) : file.type === type
      );
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFiles = async () => {
    if (!title || !recordType || files.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select at least one file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      for (const { file } of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('health-documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('health-documents')
          .getPublicUrl(fileName);

        // Create health record entry
        const { error: recordError } = await supabase
          .from('health_records')
          .insert({
            patient_id: user.id,
            record_type: recordType,
            title: title,
            file_url: urlData.publicUrl,
            content: {
              original_filename: file.name,
              file_size: file.size,
              file_type: file.type
            }
          });

        if (recordError) throw recordError;
      }

      toast({
        title: "Success",
        description: "Documents uploaded successfully",
      });

      // Reset form
      setTitle('');
      setRecordType('');
      setFiles([]);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload documents",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Health Documents</CardTitle>
        <CardDescription>
          Upload lab reports, X-rays, or other medical documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="record-type">Document Type</Label>
          <Select value={recordType} onValueChange={setRecordType}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab_report">Lab Report</SelectItem>
              <SelectItem value="xray">X-Ray</SelectItem>
              <SelectItem value="mri">MRI</SelectItem>
              <SelectItem value="ct_scan">CT Scan</SelectItem>
              <SelectItem value="blood_test">Blood Test</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop files here, or click to select
          </p>
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.doc,.docx"
            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
            className="hidden"
            id="file-upload"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Select Files
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files</Label>
            <div className="grid gap-2">
              {files.map((fileObj, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {fileObj.preview ? (
                      <img
                        src={fileObj.preview}
                        alt="Preview"
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    <span className="text-sm">{fileObj.file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(fileObj.file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={uploadFiles}
          disabled={uploading || !title || !recordType || files.length === 0}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Documents'}
        </Button>
      </CardContent>
    </Card>
  );
}
