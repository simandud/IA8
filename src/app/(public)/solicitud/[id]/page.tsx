'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CampaignView } from '@/components/campaign/CampaignView';
import { ArrowLeft, Megaphone, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Campaign } from '@/types';

export default function SolicitudPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    fetchCampaign();
  }, [params.id]);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setCampaign(data.campaign);
      } else {
        toast.error('No se pudo cargar la campaña');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar la campaña');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestImplementation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: params.id,
          clientInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('¡Solicitud enviada exitosamente! Nos contactaremos contigo pronto.');
        setShowRequestForm(false);
        // Optionally redirect or show success message
      } else {
        toast.error(data.error || 'Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando campaña...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaña no encontrada</h2>
          <Button onClick={() => router.push('/generar')}>
            Generar Nueva Campaña
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft size={16} className="mr-2" />
                Inicio
              </Button>
              <div className="flex items-center gap-2">
                <Megaphone className="text-primary-600" size={32} />
                <h1 className="text-2xl font-bold text-gray-900">Tu Campaña Generada</h1>
              </div>
            </div>
            <Button
              onClick={() => setShowRequestForm(true)}
              size="lg"
            >
              <Send className="mr-2" size={20} />
              Solicitar Implementación
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CampaignView campaign={campaign} />

        {/* CTA Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">¿Te gusta esta campaña?</h2>
            <p className="text-xl mb-6 opacity-90">
              Nuestro equipo puede implementarla completamente por ti
            </p>
            <Button
              onClick={() => setShowRequestForm(true)}
              variant="outline"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              <Send className="mr-2" size={20} />
              Solicitar Implementación Ahora
            </Button>
          </Card>
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Solicitar Implementación
            </h2>
            <p className="text-gray-600 mb-6">
              Completa tus datos y nuestro equipo se contactará contigo para iniciar tu campaña
            </p>

            <form onSubmit={handleRequestImplementation} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tu nombre"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0999999999"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Empresa (Opcional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nombre de tu empresa"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  isLoading={isSubmitting}
                >
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
