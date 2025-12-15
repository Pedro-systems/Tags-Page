/**
 * Componente SaveButton
 * 
 * Botão para salvar as alterações feitas nas tags.
 * Exibe feedback visual durante o salvamento.
 */

'use client';

interface SaveButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasChanges: boolean;
  changesCount: number;
}

export default function SaveButton({ 
  onClick, 
  isLoading, 
  hasChanges, 
  changesCount 
}: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      {hasChanges && (
        <span className="text-sm text-gray-600">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs mr-2">
            {changesCount}
          </span>
          {changesCount === 1 ? 'pending change' : 'pending changes'}
        </span>
      )}
      
      <button
        onClick={onClick}
        disabled={isLoading || !hasChanges}
        className={`
          inline-flex items-center justify-center gap-2
          px-6 py-3 rounded-lg font-semibold text-white
          transition-all duration-200 shadow-lg
          ${hasChanges && !isLoading
            ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
          }
          ${isLoading ? 'opacity-75' : ''}
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Saving...
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Changes
          </>
        )}
      </button>
    </div>
  );
}
