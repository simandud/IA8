'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
  Megaphone,
  LogOut,
  BarChart3
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/requests');
      const data = await response.json();

      if (data.success) {
        const requests = data.requests;
        setRecentRequests(requests.slice(0, 5));

        setStats({
          totalRequests: requests.length,
          pendingRequests: requests.filter((r: any) => r.status === 'pending').length,
          inProgressRequests: requests.filter((r: any) => r.status === 'in_progress' || r.status === 'in_review').length,
          completedRequests: requests.filter((r: any) => r.status === 'completed').length,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error al cargar datos');
    }
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
              className="py-4 px-2 border-b-2 border-primary-600 font-medium text-primary-600"
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
              className="py-4 px-2 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Campañas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="text-blue-600" size={32} />}
            title="Total Solicitudes"
            value={stats.totalRequests}
            color="blue"
          />
          <StatCard
            icon={<Clock className="text-yellow-600" size={32} />}
            title="Pendientes"
            value={stats.pendingRequests}
            color="yellow"
          />
          <StatCard
            icon={<TrendingUp className="text-purple-600" size={32} />}
            title="En Progreso"
            value={stats.inProgressRequests}
            color="purple"
          />
          <StatCard
            icon={<CheckCircle className="text-green-600" size={32} />}
            title="Completadas"
            value={stats.completedRequests}
            color="green"
          />
        </div>

        {/* Recent Requests */}
        <Card title="Solicitudes Recientes">
          {recentRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
              <p>No hay solicitudes aún</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request: any) => (
                <div
                  key={request._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/crm/solicitudes/${request._id}`)}
                >
                  <div>
                    <h4 className="font-bold text-gray-900">{request.clientInfo.name}</h4>
                    <p className="text-sm text-gray-600">{request.clientInfo.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(request.createdAt).toLocaleString('es-EC')}
                    </p>
                  </div>
                  <div>
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
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: number; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
    green: 'bg-green-50 border-green-200',
  };

  return (
    <Card className={`${colorClasses[color as keyof typeof colorClasses]} border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
    </Card>
  );
}
