const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dashboard.render.com/web/srv-d1qp7rjipnbc73ekkckg';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    convertToExcel: '/convert/excel',
    convertToWord: '/convert/word',
    convertToPowerPoint: '/convert/powerpoint',
    generateSummary: '/convert/summary',
  },
};

type ConversionType = 'excel' | 'word' | 'powerpoint';

interface SummaryResponse {
  summary: string;
  filename: string;
  extracted_at: string;
}

export const apiService = {
  async convertFile(file: File, conversionType: ConversionType): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    const endpointMap: Record<ConversionType, string> = {
      excel: apiConfig.endpoints.convertToExcel,
      word: apiConfig.endpoints.convertToWord,
      powerpoint: apiConfig.endpoints.convertToPowerPoint,
    };

    const endpoint = endpointMap[conversionType];

    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na conversão: ${response.status}`);
    }

    return await response.blob();
  },

  async generateSummary(file: File): Promise<SummaryResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.generateSummary}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao gerar resumo: ${response.status}`);
    }
    return await response.json();
  },

  async downloadFile(fileUrl: string, fileName: string): Promise<void> {
    if (!fileUrl) throw new Error('URL inválida');
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Erro ao baixar arquivo: ${response.status}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export const fileUtils = {
  validateFile(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!file.type.includes('pdf')) errors.push('Apenas arquivos PDF são aceitos');
    if (file.size > 100 * 1024 * 1024) errors.push('Arquivo muito grande. Limite de 100MB');
    if (file.name.length > 255) errors.push('Nome do arquivo muito longo');
    return { isValid: errors.length === 0, errors };
  },

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  getFileExtension(conversionType: ConversionType | 'summary'): string {
    const extensions: Record<string, string> = {
      excel: 'xlsx',
      word: 'docx',
      powerpoint: 'pptx',
      summary: 'txt',
    };
    return extensions[conversionType] || 'pdf';
  },
};
