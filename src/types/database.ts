/**
 * Tipos TypeScript para o banco de dados Supabase
 * 
 * Este arquivo define a estrutura da tabela Tag_Mapping
 * e tipos auxiliares para a aplicação.
 */

// Tipo base para um registro da tabela Tag_Mapping
export interface TagMapping {
  id: number;
  created_at: string;
  Old_Tag: string | null;
  New_Tag: string | null;
  Action: string | null;
  Frequency: number | null;
  AI_Suggestion: string | null;
  AI_New_Name: string | null;
  AI_Reasoning: string | null;
  Notes: string | null;
}

// Tipo para inserção de novos registros
export interface TagMappingInsert {
  Old_Tag?: string | null;
  New_Tag?: string | null;
  Action?: string | null;
  Frequency?: number | null;
  AI_Suggestion?: string | null;
  AI_New_Name?: string | null;
  AI_Reasoning?: string | null;
  Notes?: string | null;
}

// Tipo para atualização de registros
export interface TagMappingUpdate {
  id: number;
  Action?: string | null;
  Notes?: string | null;
}

// Opções disponíveis para o campo Action
export type ActionOption = 'Approved' | 'Reject' | '';

// Tipo para a estrutura do banco de dados (usado pelo cliente Supabase)
export interface Database {
  public: {
    Tables: {
      Tag_Mapping: {
        Row: TagMapping;
        Insert: TagMappingInsert;
        Update: Partial<TagMapping>;
      };
    };
  };
}

// Tipo para o estado de um registro com modificações pendentes
export interface TagMappingWithChanges extends TagMapping {
  hasChanges?: boolean;
  originalAction?: string | null;
  originalNotes?: string | null;
}
