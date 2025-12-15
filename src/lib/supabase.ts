/**
 * Configuração do cliente Supabase
 * 
 * Este arquivo configura a conexão com o Supabase usando as variáveis de ambiente.
 * As credenciais devem ser configuradas no arquivo .env.local
 */

import { createClient } from '@supabase/supabase-js';

// Obtém as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validação das variáveis de ambiente
if (!supabaseUrl) {
  throw new Error(
    'Variável NEXT_PUBLIC_SUPABASE_URL não encontrada. ' +
    'Configure-a no arquivo .env.local'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Variável NEXT_PUBLIC_SUPABASE_ANON_KEY não encontrada. ' +
    'Configure-a no arquivo .env.local'
  );
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
