# Componentes de la landing (spaline/index.html)

Medido del HTML actual. Los tokens están en `tokens.json` (claro) y `tokens-dark.json` (oscuro).
Contraste comprobado con `.claude/skills/replica-design/contrast.py`.
**Estado (1 nov 2026): todos los problemas de abajo están corregidos en spaline/index.html**, salvo cambiar los botones de capas a radio (se quedan como grupo con aria-pressed). contrast.py: 0 fallos en claro y oscuro.

## Botón principal (`.btn`)
- variantes   primario (único). Se usa como enlace ("Ver la rutina") y como botón ("Agregar el kit")
- medidas     padding 14×22, radio pill, Manrope 15/700
- estados     default, focus-visible (anillo 3px `focus`, separación 3px). Faltan: hover, active, disabled, cargando
- tokens      fondo `accent`, texto `on-accent` (13.5:1 claro, 15.2:1 oscuro)
- problema    el anillo de foco `focus` #9FC7C4 tiene 1.60:1 sobre el fondo claro (mínimo 3:1)

## Pestañas Mañana / Noche (`.tabs`, `.tab`)
- medidas     contenedor pill con borde, pestaña padding 10×20, Manrope 14/700
- estados     seleccionada (fondo `accent`), focus-visible. Falta hover
- a11y        tiene role="tablist"/"tab" y aria-selected, pero:
  - falta role="tabpanel" en `#list` y aria-controls / aria-labelledby
  - no se puede cambiar con las flechas ← → (lo esperado en pestañas)
  - las pestañas no seleccionadas siguen en el orden de tabulación (debería ser tabindex="-1")

## Chip de ingrediente (`.chip`)
- medidas     IBM Plex Mono 12, padding 4×10, borde 1px `border`, radio pill
- estado      solo lectura (no interactivo)
- nota        su borde es decorativo, así que no necesita 3:1

## Botón de capa de piel (`.layer-btn`)
- medidas     padding 16, radio 16, fondo `surface`, borde 1px `border`
- estados     aria-pressed true (borde `text`) / false
- problemas
  - sin estilo de focus-visible propio (solo el del navegador)
  - borde `border` 1.44:1 sobre `surface`, y `surface` contra `bg` solo 1.09:1: el botón casi no se distingue del fondo
  - aria-pressed en un grupo donde solo uno está activo: encaja mejor como pestañas o radio

## Tarjeta de producto (`.card`)
- medidas     padding 18, radio 18, fondo `surface`, punto de color 36px, título 16, texto 14 `text-muted`, precio mono 13
- estado      solo lectura
- nota        se genera con innerHTML desde JS: si un día los datos vienen de fuera, hay que escapar el texto

## Paso de la rutina (`.step`) + frasco fijo (`.stage`, `.bottle`)
- comportamiento  el frasco cambia de color, nombre y giro según el paso que está a mitad de pantalla
- estados     activo (opacidad 1) / inactivo (opacidad .35)
- problemas
  - los pasos inactivos se leen a 2.07:1 (título) y 1.59:1 (texto) en modo claro: no se pueden leer bien
  - el texto pequeño del frasco (10px, opacidad .75) baja a 3.67–3.99:1 en modo oscuro, y 10px es demasiado pequeño
  - el frasco tiene aria-hidden: correcto, porque la misma información está en el texto

## Capas de piel (`.lv`)
- fondos fijos `layer-1..3` (no cambian en modo oscuro), texto `on-layer` 6.5–11.5:1. Bien

## Encabezado (`.hero`)
- título display Gloock clamp(48–112px); la palabra destacada es solo contorno (relleno transparente, trazo 1.2px)
- nota        legible en tamaño grande, pero el trazo fino pierde lectura en móviles pequeños

## Movimiento
- barra de progreso, gotas flotantes, revelado al hacer scroll, frasco girando
- respeta prefers-reduced-motion (desactiva animaciones y transiciones). Bien
