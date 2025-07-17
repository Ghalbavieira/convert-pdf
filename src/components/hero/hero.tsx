"use client"
import { AlertCircle, CheckCircle, Download, FileText, Loader2, Shield, Upload, X, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { apiService, fileUtils } from "@/lib/api";

interface ConversionResult {
  type: 'summary' | 'file';
  data?: string;
  downloadUrl?: string;
  fileName?: string;
}

interface ConversionOption {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export default function Hero() {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<'excel' | 'word' | 'powerpoint' | 'summary'>('excel');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversionOptions: ConversionOption[] = [
    { id: 'excel', icon: Download, title: 'PDF → Excel', desc: 'Analise dados' },
    { id: 'word', icon: FileText, title: 'PDF → Word', desc: 'Edite facilmente' },
    { id: 'powerpoint', icon: Zap, title: 'PDF → PowerPoint', desc: 'Apresentações' },
    { id: 'summary', icon: Shield, title: 'Resumo IA', desc: 'Resumos inteligentes' }
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validation = fileUtils.validateFile(file);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }
    setSelectedFile(file);
    setError(null);
    setConversionResult(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);
    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      if (conversionType === 'summary') {
        const result = await apiService.generateSummary(selectedFile);
        if (!result.summary || !result.summary.trim()) throw new Error('Resumo inválido ou não encontrado');
        setConversionResult({
          type: 'summary',
          data: result.summary
        });
      } else {
        const blob = await apiService.convertFile(selectedFile, conversionType);
        const downloadUrl = URL.createObjectURL(blob);
        setConversionResult({
          type: 'file',
          downloadUrl,
          fileName: `converted_${selectedFile.name.replace('.pdf', '')}.${fileUtils.getFileExtension(conversionType)}`
        });
      }
      clearInterval(progressInterval);
      setUploadProgress(100);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao processar arquivo';
      setError(message);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDownload = () => {
    if (!conversionResult?.downloadUrl) return;
    const link = document.createElement('a');
    link.href = conversionResult.downloadUrl;
    link.download = conversionResult.fileName || 'converted_file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setConversionResult(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Converta PDFs em segundos
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A ferramenta mais completa para converter, editar e manipular PDFs.
          Suporte para Excel, Word, PowerPoint e muito mais.
        </p>

        <div className="max-w-2xl mx-auto">
          {!selectedFile && !conversionResult && (
            <div
              className={`border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Arraste seus PDFs aqui
              </h3>
              <p className="text-gray-500 mb-6">ou clique para selecionar arquivos</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
                Selecionar Arquivos
              </button>
              <p className="text-sm text-gray-400 mt-4">
                Suporte para arquivos até 100MB • Seguro e privado
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {selectedFile && !conversionResult && (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-red-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-500">
                      {fileUtils.formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetUpload}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Escolha o tipo de conversão:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {conversionOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setConversionType(option.id as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        conversionType === option.id
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option.icon className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm font-medium text-gray-500">{option.title}</div>
                      <div className="text-xs text-gray-700">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {conversionType === 'summary' ? 'Gerando resumo...' : 'Convertendo...'}
                    </span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {conversionType === 'summary' ? 'Gerando resumo...' : 'Convertendo...'}
                  </>
                ) : (
                  conversionType === 'summary' 
                    ? 'Gerar Resumo IA' 
                    : `Converter para ${conversionOptions.find(opt => opt.id === conversionType)?.title.split(' → ')[1]}`
                )}
              </button>
            </div>
          )}

          {conversionResult && (
            <div className="bg-white border-2 border-green-200 rounded-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {conversionResult.type === 'summary' ? 'Resumo Gerado!' : 'Conversão Concluída!'}
              </h3>
              
              {conversionResult.type === 'summary' ? (
                <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold text-gray-800 mb-2">Resumo do Documento:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{conversionResult.data}</p>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Seu arquivo foi convertido com sucesso!
                  </p>
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold flex items-center mx-auto"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Baixar Arquivo
                  </button>
                </div>
              )}
              
              <button
                onClick={resetUpload}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Processar Outro Arquivo
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          {conversionOptions.map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <action.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800">{action.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
