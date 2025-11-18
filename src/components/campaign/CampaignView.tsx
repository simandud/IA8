'use client';

import React from 'react';
import { Campaign } from '@/types';
import { Card } from '@/components/ui/Card';
import { Target, TrendingUp, DollarSign, Users, Megaphone, BarChart, Calendar } from 'lucide-react';

interface CampaignViewProps {
  campaign: Campaign;
}

export const CampaignView: React.FC<CampaignViewProps> = ({ campaign }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <h1 className="text-3xl font-bold mb-2">{campaign.productService}</h1>
        <p className="text-xl">{campaign.creativeBrief?.tagline}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {campaign.creativeBrief?.campaignTheme}
          </span>
        </div>
      </Card>

      {/* Target Audience */}
      <Card title="Audiencia Objetivo" className="border-l-4 border-primary-500">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-2"><strong>Edad:</strong> {campaign.targetAudience?.age}</p>
            <p className="text-gray-600 mb-2"><strong>Género:</strong> {campaign.targetAudience?.gender}</p>
            <p className="text-gray-600 mb-2"><strong>Ubicación:</strong> {campaign.targetAudience?.location}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2"><strong>Poder Adquisitivo:</strong> {campaign.targetAudience?.purchasingPower}</p>
            <p className="text-gray-600 mb-2"><strong>Comportamiento:</strong> {campaign.targetAudience?.behavior}</p>
          </div>
        </div>
        {campaign.targetAudience?.interests && campaign.targetAudience.interests.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Intereses:</p>
            <div className="flex flex-wrap gap-2">
              {campaign.targetAudience.interests.map((interest, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* SWOT Analysis */}
      <Card title="Análisis FODA">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <TrendingUp size={20} /> Fortalezas
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {campaign.swotAnalysis?.strengths?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">Debilidades</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {campaign.swotAnalysis?.weaknesses?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Oportunidades</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {campaign.swotAnalysis?.opportunities?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2">Amenazas</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {campaign.swotAnalysis?.threats?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Objectives & KPIs */}
      <Card title="Objetivos y KPIs" className="border-l-4 border-secondary-500">
        <div className="mb-4">
          <p className="text-lg"><strong>Objetivo Principal:</strong></p>
          <p className="text-gray-700 mt-1">{campaign.objectives?.primary}</p>
        </div>
        {campaign.objectives?.kpis && campaign.objectives.kpis.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <BarChart size={20} /> Indicadores Clave de Rendimiento:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {campaign.objectives.kpis.map((kpi, idx) => (
                <div key={idx} className="p-3 bg-secondary-50 rounded-lg">
                  <p className="text-gray-800">{kpi}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Creative Brief */}
      <Card title="Brief Creativo" className="bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-purple-800">Mensaje Central:</p>
            <p className="text-gray-700">{campaign.creativeBrief?.coreMessage}</p>
          </div>
          <div>
            <p className="font-semibold text-purple-800">Voz de Marca:</p>
            <p className="text-gray-700">{campaign.creativeBrief?.brandVoice}</p>
          </div>
          {campaign.creativeBrief?.creativeAssets && (
            <div>
              <p className="font-semibold text-purple-800 mb-2">Activos Creativos Necesarios:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {campaign.creativeBrief.creativeAssets.map((asset, idx) => (
                  <li key={idx}>{asset}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Media Strategy */}
      <Card title="Estrategia de Medios" className="border-l-4 border-green-500">
        <div className="mb-4">
          <p className="font-semibold flex items-center gap-2 mb-2">
            <Megaphone size={20} /> Plataformas:
          </p>
          <div className="flex flex-wrap gap-2">
            {campaign.mediaStrategy?.platforms?.map((platform, idx) => (
              <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                {platform}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold mb-2">Plan de Contenido:</p>
          <div className="space-y-2">
            {campaign.mediaStrategy?.contentPlan && Object.entries(campaign.mediaStrategy.contentPlan).map(([platform, plan]) => (
              <div key={platform} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">{platform}:</p>
                <p className="text-gray-600 text-sm">{plan}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Budget */}
      <Card title="Presupuesto" className="border-l-4 border-yellow-500">
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <DollarSign size={32} />
            ${campaign.budget?.total?.toLocaleString() || 'N/A'} USD
          </p>
          <p className="text-gray-600">Presupuesto Total</p>
        </div>
        {campaign.budget?.breakdown && (
          <div className="mt-4">
            <p className="font-semibold mb-3">Desglose:</p>
            <div className="space-y-2">
              {Object.entries(campaign.budget.breakdown).map(([item, amount]) => (
                <div key={item} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">{item}</span>
                  <span className="font-bold text-gray-900">${(amount as number).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {campaign.budget?.roiProjections && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-800 mb-1">Proyección de ROI:</p>
            <p className="text-gray-700">{campaign.budget.roiProjections}</p>
          </div>
        )}
      </Card>

      {/* Timeline */}
      {campaign.objectives?.timeline && (
        <Card title="Cronograma" className="border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} />
            <p className="text-gray-600">
              <strong>Lanzamiento:</strong> {campaign.objectives.timeline.launch} -
              <strong> Finalización:</strong> {campaign.objectives.timeline.completion}
            </p>
          </div>
          {campaign.objectives.timeline.milestones && (
            <div className="space-y-2">
              {campaign.objectives.timeline.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{milestone}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Execution Strategy */}
      <Card title="Estrategia de Ejecución">
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-800 mb-1">Lanzamiento:</p>
            <p className="text-gray-700">{campaign.execution?.launchStrategy}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Optimización:</p>
            <p className="text-gray-700">{campaign.execution?.optimization}</p>
          </div>
          {campaign.execution?.influencerStrategy && (
            <div>
              <p className="font-semibold text-gray-800 mb-1">Estrategia de Influencers:</p>
              <p className="text-gray-700">{campaign.execution.influencerStrategy}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
