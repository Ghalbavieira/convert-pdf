import { Check } from "lucide-react";

export default function Features() {
    return(
        <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Poderosas
            </h3>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para trabalhar com PDFs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Conversões Avançadas',
                description: 'PDF para Word, Excel, PowerPoint, CSV, JSON e muito mais',
                features: ['Alta precisão', 'Preserva formatação', 'Batch processing']
              },
              {
                title: 'Ferramentas de IA',
                description: 'Resumos inteligentes, extração de dados e OCR avançado',
                features: ['Resumir documentos', 'Extrair informações', 'Reconhecimento de texto']
              },
              {
                title: 'Manipulação de PDF',
                description: 'Dividir, unir, comprimir e proteger seus documentos',
                features: ['Dividir por páginas', 'Unir múltiplos PDFs', 'Compressão inteligente']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}