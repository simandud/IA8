'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Megaphone, LogOut, Search, Filter } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function SolicitudesPage() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests');
      const data = await response.json();

      if (data.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Error al cargar solicitudes');
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((r: any) => r.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((r: any) =>
        r.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.clientInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.clientInfo.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
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
              className="py-4 px-2 border-b-2 border-primary-600 font-medium text-primary-600"
            >
              Solicitudes
            </button>
            <button
              onClick={() => router.push('/crm/campanas')}
              className="py-4 px-2 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Campañas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Solicitudes de Campaña</h2>
          <div className="text-sm text-gray-600">
            Total: {filteredRequests.length} solicitudes
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Buscar por nombre, email o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="in_review">En Revisión</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completado</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <div className="text-center py-12 text-gray-500">
                <p>No se encontraron solicitudes</p>
              </div>
            </Card>
          ) : (
            filteredRequests.map((request: any) => (
              <Card
                key={request._id}
                className="hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/crm/solicitudes/${request._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {request.clientInfo.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'completed' ? 'bg-green-200 text-green-800' :
                        request.status === 'in_progress' || request.status === 'in_review' ? 'bg-blue-200 text-blue-800' :
                        request.status === 'rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {request.status === 'completed' ? 'Completado' :
                         request.status === 'in_progress' ? 'En Progreso' :
                         request.status === 'in_review' ? 'En Revisión' :
                         request.status === 'rejected' ? 'Rechazado' :
                         'Pendiente'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>Email:</strong> {request.clientInfo.email}
                      </div>
                      <div>
                        <strong>Teléfono:</strong> {request.clientInfo.phone}
                      </div>
                      {request.clientInfo.company && (
                        <div>
                          <strong>Empresa:</strong> {request.clientInfo.company}
                        </div>
                      )}
                    </div>
                    {request.campaignId && (
                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Producto:</strong> {request.campaignId.productService}
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span>Creado: {new Date(request.createdAt).toLocaleDateString('es-EC')}</span>
                      <span>Actualizado: {new Date(request.updatedAt).toLocaleDateString('es-EC')}</span>
                      {request.workflow && (
                        <span>
                          Progreso: {request.workflow.filter((s: any) => s.status === 'completed').length}/{request.workflow.length} pasos
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/crm/solicitudes/${request._id}`);
                      }}
                    >
                      Ver Detalles
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
