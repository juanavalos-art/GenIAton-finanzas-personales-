---
name: cashcoach-api-pattern
description: Patrón estándar para crear API routes en CashCoach. Usa este skill SIEMPRE que necesites crear o modificar un API route en app/api/. Aplica para cualquier endpoint nuevo, refactor de endpoint existente, o cuando necesites agregar lógica de backend. Garantiza la separación en 3 capas (route → service → provider) y el manejo de errores consistente.
---

# Patrón de API Routes — CashCoach

## Estructura de 3 capas

Cada endpoint sigue esta cadena:

```
app/api/[recurso]/route.ts  →  services/[recurso].service.ts  →  providers/[provider].provider.ts
```

### 1. API Route (`app/api/[recurso]/route.ts`)

Solo hace 3 cosas: parsear request, llamar service, devolver response.

```typescript
import { NextResponse } from 'next/server';
import { miFuncion } from '@/services/recurso.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resultado = await miFuncion(body.campo1, body.campo2);
    return NextResponse.json(resultado);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
```

**Reglas:**
- CERO lógica de negocio aquí
- Solo parsea, llama, y responde
- Siempre try/catch con mensaje claro
- Siempre tipado en el body con una interfaz si es necesario

### 2. Service (`services/[recurso].service.ts`)

Toda la lógica de negocio vive aquí.

```typescript
import { MiTipo } from '@/domain/types';
import { crearEnDB, obtenerDeDB } from '@/providers/supabase.provider';

export async function miFuncion(campo1: string, campo2: number): Promise<MiTipo> {
  // Validaciones
  if (!campo1) throw new Error('El campo1 es requerido');
  
  // Transformaciones
  const datosProcesados = { campo1: campo1.trim(), campo2 };
  
  // Llamada al provider
  const resultado = await crearEnDB(datosProcesados);
  return resultado;
}
```

**Reglas:**
- Aquí sí va la lógica: validaciones, cálculos, transformaciones
- Puede llamar a múltiples providers
- Siempre funciones async con tipos de retorno explícitos
- Nombres descriptivos en español-inglés (verbo en español + sustantivo)

### 3. Provider (`providers/[provider].provider.ts`)

Solo interactúa con el servicio externo.

```typescript
import { supabase } from './supabase.provider';
import { MiTipo } from '@/domain/types';

export async function crearEnDB(datos: Partial<MiTipo>): Promise<MiTipo> {
  const { data, error } = await supabase
    .from('mi_tabla')
    .insert(datos)
    .select()
    .single();

  if (error) throw new Error(`Error al crear: ${error.message}`);
  return data;
}
```

**Reglas:**
- CERO lógica de negocio
- Solo la llamada al servicio externo y manejo de su error
- Un provider por servicio externo (supabase, deepseek)
- Siempre tipar retorno con tipos del domain

## Checklist rápido para crear un endpoint nuevo

1. ¿Existe el tipo en `domain/types.ts`? Si no, créalo primero.
2. Crea las funciones del provider que necesitas.
3. Crea el service con la lógica.
4. Crea el API route que solo conecta request → service → response.
