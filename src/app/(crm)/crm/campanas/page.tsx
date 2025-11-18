'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Megaphone, LogOut, Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function CampanasPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    filterCampaigns();
  }, [campaigns, searchTerm]);

  const fetchCampaigns = async () => {
    try {
      // Note: You would need to create an API endpoint to list all campaigns
      // For now, we'll use an empty array
      // const response = await fetch('/api/campaigns');
      // const data = await response.json();
      // if (data.success) {
      //   setCampaigns(data.campaigns);
      // }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Error al cargar campañas');
    }
  };

  const filterCampaigns = () => {
    let filtered = campaigns;

    if (searchTerm) {
      filtered = filtered.filter((c: any) =>
        c.productService.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Megaphone className="text-primary-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Panel CRM</h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                size="sm"
              >
                Ver Sitio Público
              </Button>
              <Button
                onClick={() => router.push('/crm/login')}
                variant="outline"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => router.push('/crm/dashboard')}
              className="py-4 px-2 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/crm/solicitudes')}
              className="py-4 px-2 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Solicitudes
            </button>
            <button
              onClick={() => router.push('/crm/campanas')}
              className="py-4 px-2 border-b-2 border-primary-600 font-medium text-primary-600"
            >
              Campañas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Campañas Generadas</h2>
          <div className="text-sm text-gray-600">
            Total: {filteredCampaigns.length} campañas
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Buscar campañas por producto o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.length === 0 ? (
            <Card>
              <div className="text-center py-12 text-gray-500">
                <Megaphone size={48} className="mx-auto mb-4 opacity-50" />
                <p>No hay campañas generadas aún</p>
                <Button
                  onClick={() => router.push('/generar')}
                  className="mt-4"
                >
                  Generar Primera Campaña
                </Button>
              </div>
            </Card>
          ) : (
            filteredCampaigns.map((campaign: any) => (
              <Card
                key={campaign._id}
                className="hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/solicitud/${campaign._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {campaign.productService}
                    </h3>
                    {campaign.creativeBrief?.tagline && (
                      <p className="text-gray-600 mb-2">"{campaign.creativeBrief.tagline}"</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Creada: {new Date(campaign.createdAt).toLocaleDateString('es-EC')}</span>
                      {campaign.budget?.total && (
                        <span>Presupuesto: ${campaign.budget.total.toLocaleString()}</span>
                      )}
                      {campaign.targetAudience?.location && (
                        <span>Ubicación: {campaign.targetAudience.location}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/solicitud/${campaign._id}`);
                      }}
                    >
                      Ver Campaña
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
