# Componentes de la landing de Spa Line (spaline/index.html)

Tokens en `tokens.json` (claro) y `tokens-dark.json` (oscuro). Paleta sacada de las publicaciones de @spalineve:
magenta/ciruela de marca, verde Mandarina Coco, turquesa Cherry Berry, lila Mora Yogurt.
Contraste: `python3 .claude/skills/replica-design/contrast.py replica/design/tokens.json` → 0 fallos AA (claro y oscuro).

Fuentes abiertas (Google Fonts): Baloo 2 (títulos, redondeada como los rótulos de la marca), Dancing Script
(nombres de fragancia, como la letra manuscrita de las etiquetas), Manrope (texto), IBM Plex Mono (etiquetas,
como el "MANDARINA COCO / momento de playita" de las publicaciones). El logotipo real no está en la página:
"SPA LINE" es texto provisional hasta tener el archivo del logo.

## Botón (`.btn`)
- variantes   primario (fondo `accent`, texto `on-accent`), fantasma (`.ghost`: borde `border-control`)
- estados     default, hover (sube 1px + sombra), active, focus-visible (anillo 3px `focus`)
- uso         "Conoce las fragancias", enlaces a Instagram

## Frasco fijo + fragancias (`.stage`, `.bottle`, `.step`)
- el frasco cambia de color, nombre y giro según la fragancia que está a mitad de pantalla
- etiqueta blanca: "SPA LINE", nombre en script, frase de la fragancia (12px mono)
- paso activo: barra lateral del color de la fragancia; inactivos: título en `text-muted` (legible)
- móvil: el frasco ocupa el 44% superior y el texto del paso queda debajo, sin taparse

## Pestañas de fragancia (`.tabs`, `.tab`)
- role tablist/tab/tabpanel, aria-controls, flechas ← →, Inicio/Fin, tabindex itinerante
- seleccionada: fondo `accent`; hover: fondo `bg`

## Tarjeta de producto (`.card`)
- borde superior del color de la fragancia, tipo en `*-ink`, nombre, descripción y tamaño de la etiqueta
- datos: gel de baño exfoliante 200 ml · exfoliante en crema sin enjuagar 300 ml · crema hidratante
  manos y cuerpo 240 ml · rocío corporal hidratante y emoliente 150 ml (leídos en las fotos; confirmar
  que el tamaño es igual en las tres fragancias)

## Bloque "De gira" (`.tour .box`)
- superficie redondeada con degradado de las tres fragancias como adorno

## Movimiento
- barra de progreso en degradado, gotas flotantes, revelado al hacer scroll, frasco girando
- respeta prefers-reduced-motion

## Actualización: catálogo oficial (nov 2026)
- Logo oficial (morado sobre claro, blanco en modo oscuro) y fotos de estudio con fondo transparente
  extraídas del catálogo PDF de la marca → `spaline/img/*.webp`.
- Tienda con 6 fragancias: Nueva Línea (Mandarina Coco, Cherry Berry, Mora Yogurt; 4 productos) y
  Línea Profesional (Blueberry Orange, Orquídea Salvaje, Leche de Almendras Dulces; 3 productos).
- Textos de marca, beneficios, propiedades e ingredientes tomados del catálogo, sin cambios de sentido.
- Leche de Almendras Dulces: solo hay foto de grupo; los tamaños de los body mist de la Línea
  Profesional no aparecen en el catálogo.
