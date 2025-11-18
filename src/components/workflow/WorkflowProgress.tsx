'use client';

import React from 'react';
import { WorkflowStep } from '@/types';
import { CheckCircle, Circle, Clock, XCircle } from 'lucide-react';

interface WorkflowProgressProps {
  steps: WorkflowStep[];
  onStepClick?: (step: WorkflowStep) => void;
  editable?: boolean;
}

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({
  steps,
  onStepClick,
  editable = false
}) => {
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={32} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={32} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={32} />;
      default:
        return <Circle className="text-gray-400" size={32} />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in_progress':
        return 'border-blue-500 bg-blue-50';
      case 'rejected':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-12 w-0.5 h-12 bg-gray-300" />
          )}

          <div
            className={`flex items-start gap-4 p-4 border-2 rounded-lg transition-all ${getStepColor(step.status)} ${
              editable ? 'cursor-pointer hover:shadow-md' : ''
            }`}
            onClick={() => editable && onStepClick && onStepClick(step)}
          >
            <div className="flex-shrink-0">
              {getStepIcon(step.status)}
            </div>

            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-800">{step.name}</h4>
              <p className="text-gray-600 text-sm mt-1">{step.description}</p>

              {step.assignedTo && (
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Asignado a:</strong> {step.assignedTo}
                </p>
              )}

              {step.feedback && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <strong>Feedback:</strong> {step.feedback}
                </div>
              )}

              {step.completedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Completado: {new Date(step.completedAt).toLocaleString('es-EC')}
                </p>
              )}
            </div>

            <div className="flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                step.status === 'completed' ? 'bg-green-200 text-green-800' :
                step.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                step.status === 'rejected' ? 'bg-red-200 text-red-800' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step.status === 'completed' ? 'Completado' :
                 step.status === 'in_progress' ? 'En Progreso' :
                 step.status === 'rejected' ? 'Rechazado' :
                 'Pendiente'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
