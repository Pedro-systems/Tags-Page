/**
 * Página principal - Revisão de Tags
 * 
 * Esta página exibe todos os registros da tabela Tag_Mapping
 * e permite que a gestora aprove ou rejeite cada mudança proposta.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { TagMappingWithChanges, ActionOption, TagMappingUpdate } from '@/types/database';
import Header from '@/components/Header';
import TagTable from '@/components/TagTable';
import SaveButton from '@/components/SaveButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

// Estado inicial da aplicação
interface AppState {
  tags: TagMappingWithChanges[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  toast: { message: string; type: 'success' | 'error' } | null;
}

export default function HomePage() {
  const [state, setState] = useState<AppState>({
    tags: [],
    isLoading: true,
    isSaving: false,
    error: null,
    toast: null,
  });

  // Mapa para rastrear alterações pendentes
  const [pendingChanges, setPendingChanges] = useState<Map<number, ActionOption>>(new Map());

  /**
   * Busca todos os registros da tabela Tag_Mapping
   */
  const fetchTags = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase
        .from('Tag_Mapping')
        .select('*')
        .order('Frequency', { ascending: false });

      if (error) {
        throw new Error(`Error fetching tags: ${error.message}`);
      }

      // Adiciona propriedades de controle de alterações
      const tagsWithChanges: TagMappingWithChanges[] = (data || []).map((tag) => {
        const tagData = tag as TagMappingWithChanges;
        return {
          ...tagData,
          hasChanges: false,
          originalAction: tagData.Action,
        };
      });

      setState(prev => ({
        ...prev,
        tags: tagsWithChanges,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  // Carrega os dados ao montar o componente
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  /**
   * Atualiza a ação de uma tag específica
   */
  const handleActionChange = (id: number, action: ActionOption) => {
    // Atualiza o mapa de alterações pendentes
    const newChanges = new Map(pendingChanges);
    
    // Encontra a tag para verificar se a ação é diferente da original
    const tag = state.tags.find(t => t.id === id);
    
    if (tag) {
      if (action !== tag.originalAction) {
        newChanges.set(id, action);
      } else {
        newChanges.delete(id);
      }
    }
    
    setPendingChanges(newChanges);

    // Atualiza o estado visual das tags
    setState(prev => ({
      ...prev,
      tags: prev.tags.map(tag =>
        tag.id === id
          ? {
              ...tag,
              Action: action,
              hasChanges: action !== tag.originalAction,
            }
          : tag
      ),
    }));
  };

  /**
   * Salva todas as alterações pendentes no Supabase
   */
  const handleSave = async () => {
    if (pendingChanges.size === 0) return;

    setState(prev => ({ ...prev, isSaving: true }));

    try {
      // Prepara as atualizações para enviar ao Supabase
      const updates: TagMappingUpdate[] = Array.from(pendingChanges.entries()).map(
        ([id, action]) => ({
          id,
          Action: action || null,
        })
      );

      // Executa as atualizações em batch
      const promises = updates.map(update =>
        supabase
          .from('Tag_Mapping')
          .update({ Action: update.Action })
          .eq('id', update.id)
      );

      const results = await Promise.all(promises);

      // Verifica se houve algum erro
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`Error saving ${errors.length} record(s)`);
      }

      // Atualiza o estado após salvar com sucesso
      setState(prev => ({
        ...prev,
        isSaving: false,
        tags: prev.tags.map(tag => ({
          ...tag,
          hasChanges: false,
          originalAction: pendingChanges.has(tag.id)
            ? pendingChanges.get(tag.id) || null
            : tag.originalAction,
        })),
        toast: {
          message: `${pendingChanges.size} change(s) saved successfully!`,
          type: 'success',
        },
      }));

      // Limpa as alterações pendentes
      setPendingChanges(new Map());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error saving';
      setState(prev => ({
        ...prev,
        isSaving: false,
        toast: {
          message: errorMessage,
          type: 'error',
        },
      }));
    }
  };

  /**
   * Fecha o toast de notificação
   */
  const handleCloseToast = () => {
    setState(prev => ({ ...prev, toast: null }));
  };

  // Renderização de erro
  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Error loading data
            </h2>
            <p className="text-red-600 mb-4">{state.error}</p>
            <button
              onClick={fetchTags}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Tags"
            value={state.tags.length}
            icon="📊"
            color="blue"
          />
          <StatCard
            title="Approved"
            value={state.tags.filter(t => t.Action === 'Approved').length}
            icon="✓"
            color="green"
          />
          <StatCard
            title="Rejected"
            value={state.tags.filter(t => t.Action === 'Reject').length}
            icon="✗"
            color="red"
          />
        </div>

        {/* Tabela de tags */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tag Mapping
              </h2>
              <SaveButton
                onClick={handleSave}
                isLoading={state.isSaving}
                hasChanges={pendingChanges.size > 0}
                changesCount={pendingChanges.size}
              />
            </div>
          </div>

          {state.isLoading ? (
            <LoadingSpinner />
          ) : (
            <TagTable tags={state.tags} onActionChange={handleActionChange} />
          )}
        </div>

        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-100 border-l-4 border-green-500 rounded"></span>
            <span>Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-100 border-l-4 border-red-500 rounded"></span>
            <span>Rejected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border border-gray-200 rounded"></span>
            <span>No change</span>
          </div>
        </div>
      </main>

      {/* Toast de notificação */}
      {state.toast && (
        <Toast
          message={state.toast.message}
          type={state.toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}

// Componente para os cards de estatísticas
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'red';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
