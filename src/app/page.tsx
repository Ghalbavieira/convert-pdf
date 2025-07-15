import React, { useState } from 'react';
import { Upload, FileText, Download, Zap, Shield, Users, Star, Check, X } from 'lucide-react';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [dragOver, setDragOver] = useState(false);

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

  const handleDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file upload logic here
  };


    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PDF Converter Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Funcionalidades</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">Preços</a>
              <a href="#api" className="text-gray-700 hover:text-blue-600">API</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">Entrar</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Converta PDFs em segundos
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A ferramenta mais completa para converter, editar e manipular PDFs. 
            Suporte para Excel, Word, PowerPoint e muito mais.
          </p>
          
          {/* Upload Area */}
          <div className="max-w-2xl mx-auto">
            <div
              className={`border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
                dragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
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
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: FileText, title: 'PDF → Word', desc: 'Edite facilmente' },
              { icon: Download, title: 'PDF → Excel', desc: 'Analise dados' },
              { icon: Zap, title: 'PDF → PowerPoint', desc: 'Apresentações' },
              { icon: Shield, title: 'Ferramentas IA', desc: 'Resumos e mais' }
            ].map((action, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <action.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800">{action.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Experimente grátis agora e veja como é fácil converter seus PDFs
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100">
            Começar Gratuitamente
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="font-bold text-lg">PDF Converter Pro</span>
              </div>
              <p className="text-gray-400">
                A ferramenta mais completa para conversão e manipulação de PDFs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PDF Converter Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

