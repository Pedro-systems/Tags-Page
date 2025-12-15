/**
 * Componente LoadingSpinner
 * 
 * Exibe um indicador de carregamento enquanto os dados são buscados.
 */

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="mt-6 text-gray-600 font-medium">Loading tags...</p>
    </div>
  );
}
