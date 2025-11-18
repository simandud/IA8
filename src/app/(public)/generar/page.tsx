'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Sparkles, ArrowLeft, Megaphone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function GeneratePage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    productService: '',
    targetLocation: 'Cuenca, Ecuador',
    budget: '',
    additionalInfo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productService.trim()) {
      toast.error('Por favor describe tu producto o servicio');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('¡Campaña generada exitosamente!');
        router.push(`/solicitud/${data.campaign._id}`);
      } else {
        toast.error(data.error || 'Error al generar la campaña');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <Megaphone className="text-primary-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">MarketingIA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Genera tu Campaña con IA
          </h1>
          <p className="text-lg text-gray-600">
            Completa el formulario y nuestra IA creará una estrategia completa de marketing para tu negocio
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Producto o Servicio <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Ejemplo: Restaurante de comida típica cuencana, especializado en hornado y mote pillo..."
                value={formData.productService}
                onChange={(e) => setFormData({ ...formData, productService: e.target.value })}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Describe tu producto o servicio con el mayor detalle posible
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ubicación Objetivo
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Cuenca, Ecuador"
                value={formData.targetLocation}
                onChange={(e) => setFormData({ ...formData, targetLocation: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Especifica la zona geográfica (barrio, ciudad, región)
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Presupuesto Mensual (USD)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ejemplo: $500 - $2000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Si no estás seguro, déjalo en blanco y la IA sugerirá un presupuesto
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Información Adicional
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Cualquier información adicional que consideres relevante..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">¿Qué incluye tu campaña?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Análisis completo de audiencia objetivo</li>
                <li>✓ Estrategia FODA (Fortalezas, Oportunidades, Debilidades, Amenazas)</li>
                <li>✓ Brief creativo con tagline y mensaje central</li>
                <li>✓ Plan de medios y contenido por plataforma</li>
                <li>✓ Presupuesto desglosado y proyección de ROI</li>
                <li>✓ Calendario de ejecución y KPIs</li>
                <li>✓ Estrategia de lanzamiento y optimización</li>
              </ul>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isGenerating}
            >
              {!isGenerating && <Sparkles className="mr-2" size={20} />}
              {isGenerating ? 'Generando tu campaña...' : 'Generar Campaña con IA'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
