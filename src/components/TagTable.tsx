/**
 * Componente TagTable
 * 
 * Exibe a tabela de tags com funcionalidade de aprovação/rejeição.
 * Cada linha possui um dropdown para selecionar a ação desejada.
 */

'use client';

import { useState } from 'react';
import type { TagMappingWithChanges, ActionOption } from '@/types/database';

interface TagTableProps {
  tags: TagMappingWithChanges[];
  onActionChange: (id: number, action: ActionOption) => void;
}

export default function TagTable({ tags, onActionChange }: TagTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Old Tag
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              New Tag
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Frequency
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              AI Suggestion
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              AI New Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              AI Reasoning
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tags.map((tag, index) => (
            <TagRow
              key={tag.id}
              tag={tag}
              index={index}
              onActionChange={onActionChange}
            />
          ))}
        </tbody>
      </table>
      
      {tags.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No records found in Tag_Mapping table.
        </div>
      )}
    </div>
  );
}

// Componente para cada linha da tabela
interface TagRowProps {
  tag: TagMappingWithChanges;
  index: number;
  onActionChange: (id: number, action: ActionOption) => void;
}

function TagRow({ tag, index, onActionChange }: TagRowProps) {
  const [currentAction, setCurrentAction] = useState<ActionOption>(
    (tag.Action as ActionOption) || ''
  );

  // Determina a cor de fundo baseado na ação selecionada
  const getRowClass = () => {
    if (tag.hasChanges) {
      if (currentAction === 'Approved') {
        return 'bg-green-50 border-l-4 border-l-green-500';
      }
      if (currentAction === 'Reject') {
        return 'bg-red-50 border-l-4 border-l-red-500';
      }
    }
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  };

  // Determina o estilo do dropdown baseado na ação
  const getSelectClass = () => {
    const baseClass = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm py-2 px-3 transition-colors duration-200';
    
    if (currentAction === 'Approved') {
      return `${baseClass} bg-green-100 border-green-400 text-green-800 font-medium`;
    }
    if (currentAction === 'Reject') {
      return `${baseClass} bg-red-100 border-red-400 text-red-800 font-medium`;
    }
    return `${baseClass} bg-white border-gray-300`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAction = e.target.value as ActionOption;
    setCurrentAction(newAction);
    onActionChange(tag.id, newAction);
  };

  return (
    <tr className={`${getRowClass()} transition-colors duration-200 hover:bg-gray-100`}>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium max-w-xs truncate" title={tag.Old_Tag || ''}>
        {tag.Old_Tag || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={tag.New_Tag || ''}>
        {tag.New_Tag || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {tag.Frequency ?? 0}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={tag.AI_Suggestion || ''}>
        {tag.AI_Suggestion || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={tag.AI_New_Name || ''}>
        <span className="inline-flex items-center px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs">
          {tag.AI_New_Name || '-'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
        <div className="line-clamp-2" title={tag.AI_Reasoning || ''}>
          {tag.AI_Reasoning || '-'}
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        <select
          value={currentAction}
          onChange={handleChange}
          className={getSelectClass()}
          aria-label={`Action for tag ${tag.Old_Tag}`}
        >
          <option value="">Select...</option>
          <option value="Approved">✓ Approved</option>
          <option value="Reject">✗ Reject</option>
        </select>
      </td>
    </tr>
  );
}
