/**
 * Componente Header
 * 
 * Cabeçalho da aplicação com título e informações.
 */

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              GHL Tag Review
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review and approve proposed tag changes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Connected to Supabase
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
