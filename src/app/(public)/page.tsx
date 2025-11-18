'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sparkles, Target, TrendingUp, Zap, Users, BarChart3, Megaphone } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Megaphone className="text-primary-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">MarketingIA</h1>
            </div>
            <Button
              onClick={() => router.push('/crm/dashboard')}
              variant="outline"
              size="sm"
            >
              Acceso CRM
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full">
              <Sparkles size={20} />
              <span className="font-medium">Inteligencia Artificial para Marketing</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Genera Campañas de Marketing
            <br />
            <span className="text-primary-600">Con un Solo Clic</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crea estrategias de marketing completas y profesionales para tu negocio en Cuenca, Ecuador.
            Desde el análisis de mercado hasta la ejecución, todo en minutos.
          </p>

          <Button
            onClick={() => router.push('/generar')}
            size="lg"
            className="animate-slide-up"
          >
            <Sparkles className="mr-2" size={20} />
            Generar Mi Campaña Gratis
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            No se requiere tarjeta de crédito • Resultados instantáneos
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Todo lo que Necesitas para tu Campaña
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Target className="text-primary-600" size={40} />}
            title="Análisis de Audiencia"
            description="Identifica a tu público objetivo en Cuenca con precisión. Datos demográficos, intereses y comportamientos."
          />
          <FeatureCard
            icon={<TrendingUp className="text-secondary-600" size={40} />}
            title="Estrategia FODA"
            description="Análisis completo de Fortalezas, Oportunidades, Debilidades y Amenazas para tu negocio."
          />
          <FeatureCard
            icon={<Zap className="text-yellow-600" size={40} />}
            title="Ideas Creativas"
            description="Conceptos creativos, taglines y temas de campaña adaptados al mercado ecuatoriano."
          />
          <FeatureCard
            icon={<Users className="text-green-600" size={40} />}
            title="Plan de Medios"
            description="Estrategia multi-canal: redes sociales, Google Ads, radio local y más."
          />
          <FeatureCard
            icon={<BarChart3 className="text-purple-600" size={40} />}
            title="KPIs y Métricas"
            description="Objetivos medibles y KPIs específicos para rastrear el éxito de tu campaña."
          />
          <FeatureCard
            icon={<Megaphone className="text-red-600" size={40} />}
            title="Ejecución Completa"
            description="Plan de lanzamiento, optimización y estrategia de retención de clientes."
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cómo Funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Describe tu Producto"
              description="Ingresa información básica sobre tu producto o servicio y tu audiencia objetivo."
            />
            <StepCard
              number="2"
              title="IA Genera tu Campaña"
              description="Nuestra inteligencia artificial crea una estrategia completa en segundos."
            />
            <StepCard
              number="3"
              title="Solicita Implementación"
              description="Con un clic, solicita que nuestro equipo ejecute toda la campaña por ti."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Empieza Ahora
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Miles de negocios en Cuenca ya están usando MarketingIA
          </p>
          <Button
            onClick={() => router.push('/generar')}
            variant="outline"
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            <Sparkles className="mr-2" size={20} />
            Generar Mi Primera Campaña
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 MarketingIA - Cuenca, Ecuador. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
