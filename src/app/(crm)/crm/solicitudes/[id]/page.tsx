'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CampaignView } from '@/components/campaign/CampaignView';
import { WorkflowProgress } from '@/components/workflow/WorkflowProgress';
import { Megaphone, LogOut, ArrowLeft, Save, CheckCircle, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CampaignRequest, WorkflowStep } from '@/types';

export default function SolicitudDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [request, setRequest] = useState<CampaignRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  useEffect(() => {
    fetchRequest();
  }, [params.id]);

  const fetchRequest = async () => {
    try {
      const response = await fetch(`/api/requests/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setRequest(data.request);
        setNotes(data.request.notes || '');
      } else {
        toast.error('No se pudo cargar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (newStatus: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/requests/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Estado actualizado');
        fetchRequest();
      } else {
        toast.error('Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar estado');
    } finally {
      setIsSaving(false);
    }
  };

  const updateWorkflowStep = async (stepId: string, newStatus: string, feedback?: string) => {
    if (!request) return;

    setIsSaving(true);
    try {
      const updatedWorkflow = request.workflow.map(step => {
        if (step.id === stepId) {
          return {
            ...step,
            status: newStatus as any,
            completedAt: newStatus === 'completed' ? new Date() : step.completedAt,
            feedback: feedback || step.feedback,
          };
        }
        return step;
      });

      const response = await fetch(`/api/requests/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflow: updatedWorkflow,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Paso actualizado');
        setSelectedStep(null);
        fetchRequest();
      } else {
        toast.error('Error al actualizar paso');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar paso');
    } finally {
      setIsSaving(false);
    }
  };

  const saveNotes = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/requests/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Notas guardadas');
      } else {
        toast.error('Error al guardar notas');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar notas');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando solicitud...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitud no encontrada</h2>
          <Button onClick={() => router.push('/crm/solicitudes')}>
            Volver a Solicitudes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/crm/solicitudes')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft size={16} className="mr-2" />
                Volver
              </Button>
              <div className="flex items-center gap-2">
                <Megaphone className="text-primary-600" size={32} />
                <h1 className="text-2xl font-bold text-gray-900">Detalle de Solicitud</h1>
              </div>
            </div>
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
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Client Info & Workflow */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Info */}
            <Card title="Información del Cliente">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-lg font-bold text-gray-900">{request.clientInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{request.clientInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-gray-900">{request.clientInfo.phone}</p>
                </div>
                {request.clientInfo.company && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Empresa</p>
                    <p className="text-gray-900">{request.clientInfo.company}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Status Control */}
            <Card title="Control de Estado">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Estado Actual</p>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    onClick={() => updateRequestStatus('in_review')}
                    size="sm"
                    variant="secondary"
                    disabled={isSaving}
                  >
                    Marcar En Revisión
                  </Button>
                  <Button
                    onClick={() => updateRequestStatus('in_progress')}
                    size="sm"
                    disabled={isSaving}
                  >
                    Marcar En Progreso
                  </Button>
                  <Button
                    onClick={() => updateRequestStatus('completed')}
                    size="sm"
                    variant="primary"
                    disabled={isSaving}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Marcar Completado
                  </Button>
                  <Button
                    onClick={() => updateRequestStatus('rejected')}
                    size="sm"
                    variant="danger"
                    disabled={isSaving}
                  >
                    <XCircle size={16} className="mr-2" />
                    Rechazar
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card title="Notas Internas">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Agregar notas internas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button
                onClick={saveNotes}
                size="sm"
                className="mt-2 w-full"
                isLoading={isSaving}
              >
                <Save size={16} className="mr-2" />
                Guardar Notas
              </Button>
            </Card>
          </div>

          {/* Right Column - Campaign & Workflow */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workflow */}
            <Card title="Proceso de Trabajo">
              <WorkflowProgress
                steps={request.workflow}
                editable={true}
                onStepClick={(step) => setSelectedStep(step)}
              />
            </Card>

            {/* Campaign Details */}
            {request.campaign && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Detalles de la Campaña</h3>
                <CampaignView campaign={request.campaign} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Edit Modal */}
      {selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedStep.name}
            </h2>
            <p className="text-gray-600 mb-6">{selectedStep.description}</p>

            <div className="space-y-3">
              <Button
                onClick={() => updateWorkflowStep(selectedStep.id, 'in_progress')}
                className="w-full"
                disabled={isSaving}
              >
                Marcar En Progreso
              </Button>
              <Button
                onClick={() => updateWorkflowStep(selectedStep.id, 'completed')}
                className="w-full"
                variant="primary"
                disabled={isSaving}
              >
                <CheckCircle size={16} className="mr-2" />
                Marcar Completado
              </Button>
              <Button
                onClick={() => updateWorkflowStep(selectedStep.id, 'rejected')}
                className="w-full"
                variant="danger"
                disabled={isSaving}
              >
                <XCircle size={16} className="mr-2" />
                Rechazar
              </Button>
              <Button
                onClick={() => setSelectedStep(null)}
                className="w-full"
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
