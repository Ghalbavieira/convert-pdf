import { Check, X } from "lucide-react";
import { useState } from "react";

export default function Princing() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
    const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: 'para sempre',
      features: [
        '3 conversões por dia',
        'PDF → Excel básico',
        'Arquivos até 10MB',
        'Suporte por email'
      ],
      limits: ['Sem ferramentas avançadas', 'Sem API', 'Sem suporte prioritário'],
      color: 'border-gray-200',
      button: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 9,90',
      period: 'por mês',
      features: [
        '50 conversões por mês',
        'PDF → Excel, Word, PowerPoint',
        'Arquivos até 50MB',
        'Dividir e unir PDFs',
        'Suporte prioritário'
      ],
      limits: ['Sem IA', 'Sem API'],
      color: 'border-blue-200',
      button: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'R$ 19,90',
      period: 'por mês',
      features: [
        '200 conversões por mês',
        'Todas as conversões',
        'Arquivos até 100MB',
        'Ferramentas de IA',
        'OCR avançado',
        'Batch processing'
      ],
      limits: ['Sem API empresarial'],
      color: 'border-purple-200',
      button: 'bg-purple-600 text-white hover:bg-purple-700'
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      price: 'R$ 49,90',
      period: 'por mês',
      features: [
        'Conversões ilimitadas',
        'API REST completa',
        'Webhooks',
        'Integrações (Zapier, Drive)',
        'Suporte 24/7',
        'Dashboard avançado',
        'White-label'
      ],
      limits: [],
      color: 'border-green-200',
      button: 'bg-green-600 text-white hover:bg-green-700'
    }
  ];

    return(
        <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Planos para Cada Necessidade
            </h3>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para você ou sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${plan.color} ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limits.map((limit, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{limit}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-lg font-semibold ${plan.button}`}>
                  {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}