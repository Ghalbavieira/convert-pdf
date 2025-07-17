'use client'

import React, { useState } from 'react';
import { Upload, FileText, Download, Zap, Shield, Users, Star, Check, X } from 'lucide-react';
import Hero from '@/components/hero/hero';
import Princing from '@/components/princing/princing';
import Footer from '@/components/footer/footer';
import Features from '@/components/features';

export default function Home() {

  const [dragOver, setDragOver] = useState(false);

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
      
      <Hero />

      <Features />
      
      
      <Princing />

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
      
      <Footer />
    </div>
  );
};

