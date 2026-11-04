# Plan de lanzamiento de la web Spa Line

Basado en la revisión con la lista "Website Review Checklist — Product Catalog + WhatsApp Orders" (3 nov 2026).
Las tandas están ordenadas por lo que se puede hacer sin esperar a nadie primero, y después por lo que necesita datos o cuentas de la empresa.

Estado: ✅ hecho · ⏳ preparado, falta un dato de la empresa · 👤 lo hace la empresa (cuentas y trámites)

---

## Tanda 1 — Código, rendimiento y WhatsApp ✅

Todo esto ya está en el repositorio.

| Punto | Qué se hizo | Archivos |
|---|---|---|
| Una sola fuente de datos (12.1, 12.2, 3.3, 3.15) | Productos, precios, WhatsApp, horario, pagos y envíos salen de un solo archivo | `spaline/datos.js` |
| Código separado del HTML (CSP sin `unsafe-inline` en scripts) | La lógica pasó a un archivo aparte | `spaline/app.js` |
| Funciona sin JavaScript (3.4, 12.8) | Lista estática con los 27 productos, precio y enlace `wa.me` propio. Test, portafolio y carrito se ocultan si no hay JS | `index.html` (bloque `GEN:NOSCRIPT`) |
| Mensaje de WhatsApp (3.7, 3.8, 3.10) | Precio unitario ("$11.15 c/u"), total con moneda, enlace a la web cuando haya dominio; máximo 15 productos distintos y 20 unidades por producto | `app.js` |
| Enlaces externos (3.5) | `target="_blank" rel="noopener noreferrer"` en WhatsApp, Instagram y TikTok | `index.html` |
| Evento de analítica (3.13) | `whatsapp_click` al enviar el pedido; se activa al configurar Plausible o Umami | `app.js`, `datos.js` → `analitica` |
| Imágenes (7.1–7.7) | Miniaturas `-sm` de 480 px para tarjetas y escenas; logo de 200/360 px (antes 620 px y 95 KB); modelo de 368 → 118 KB (WebP + JPG); `fetchpriority` en la imagen principal; imagen rota se oculta en su caja; borrada `almendras-nueva.webp` sin uso | `spaline/img/` |
| Fuentes (7.16) | Quitada IBM Plex Mono (de 4 a 3 familias) y añadido `preconnect` | `index.html` |
| Vista previa al compartir (9.1–9.3) | Open Graph, `twitter:card` e imagen de 1200×630 con el logo y los productos | `index.html`, `img/compartir.jpg` |
| SEO (9.11, 9.12, 9.13) | JSON-LD de tienda y de los 27 productos con precio; favicon, `apple-touch-icon`, manifiesto | `index.html`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` |
| Seguridad y caché (4.5–4.10, 7.8–7.10) | CSP estricta, HSTS, nosniff, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; HTML y datos sin caché larga, imágenes 1 día | `spaline/_headers` |
| Página 404 (8.17) | Con la voz de la marca y enlaces al catálogo y a WhatsApp | `spaline/404.html` |
| Móvil (10.3, 10.4, 10.9) | Áreas táctiles de 44 px en menú, pestañas, cantidad, "Ver ficha", cerrar y selector de fragancia; texto mínimo de 12 px; enlace `tel:` | `index.html` |
| Confianza (11.3) | Nota visible: "Precio y disponibilidad se confirman por WhatsApp"; bloque "Antes de pedir" | `index.html` (bloques `GEN:NOTA`, `GEN:INFO`) |
| Agotados (11.5) | `"disponible": false` en `datos.js` lo marca como "Agotado" | `datos.js`, `app.js` |
| Mantenimiento (8.14, 12.3, 12.4) | README para el dueño, `.gitignore`, generador con modo `--check` | `README.md`, `.gitignore`, `herramientas/generar.py` |

## Tanda 2 — Visual: quitar lo que suena a plantilla ✅

| Punto | Qué se hizo |
|---|---|
| Degradados (13.1) | Quitados los 8: barra de progreso, cajas de Vanilla Dream, test y gira, y brillos detrás de los productos. Ahora son colores planos de cada fragancia |
| Radios (13.4, 13.11) | Un solo radio de 8 px en tarjetas, paneles y fotos; píldora solo en pestañas y botones |
| Animaciones (13.10, 13.13) | Quitadas las apariciones al hacer scroll en las 8 secciones y las elevaciones al pasar el ratón. Quedan solo el cambio de fragancia y la selección (0,15–0,25 s) |
| Emoji como icono (13.6) | "🛍" del carrito cambiado por un icono de bolsa en línea |
| Fotos a sangre (13.15) | Vanilla Dream con la foto llegando al borde izquierdo y el texto a la derecha; la gira con la foto llegando al borde derecho. En el móvil, la foto va arriba a todo el ancho |

## Remates de las tandas 1 y 2 ✅

| Punto | Qué se hizo |
|---|---|
| Anclas por fragancia (9.9) | `#mandarina-coco`, `#cherry-berry`, `#mora-yogurt`, `#almendras-dulces`, `#blueberry-orange`, `#orquidea-salvaje`, `#almendras-linea-pro`, `#vanilla-dream`. Abren esa fragancia en la tienda, también sin JavaScript; al cambiar de pestaña la dirección se actualiza para poder compartirla |
| Precarga de la imagen principal (7.5) | `preload` del logo (claro u oscuro según el tema) y de la primera foto de producto, con `imagesrcset` para no descargarla dos veces |
| Imágenes por tamaño de pantalla (7.2) | `srcset` 1x/2x en la escena principal y las fragancias; foto de la modelo en 600 y 900 px; Vanilla Dream en 640 y 1080 px |
| Pendiente de una foto mejor | La foto de la gira mide solo 503 px de ancho y se ve algo borrosa en pantallas grandes. Una de al menos 1200 px lo resuelve |

## Tanda 3 — Datos de la empresa (parte hecha ✅, parte pendiente ⏳)

**Hecho (3 nov 2026):**
- Pagos: Pago Móvil, Zelle, transferencia bancaria, Binance; en bolívares a tasa BCV del día.
- Entrega: delivery en Caracas por 3 USD; envíos nacionales por Zoom, que paga el cliente; sin pedido mínimo.
- Atención: lunes a viernes de 9:00 a. m. a 5:00 p. m.; lo que llega fuera de horario se responde el siguiente día hábil. Aparece en "Antes de pedir", el carrito, el pie de página y la ficha de Google.
- Umami elegido como analítica: falta crear la cuenta y pegar el id del sitio en `datos.js`.

**Pendiente:**
- Precio de la Leche de Almendras Línea Profesional, o quitarla de la tienda.
- Dominio (el preferido entre `spaline.com.ve` y `spalineve.com`) → `sitio.url`.
- Retiro en persona: si existe, añadirlo a `sitio.entrega`.
- "Nuestra marca": año, ciudad, dónde se fabrica y una foto real.
- Actualizar el horario del perfil de WhatsApp Business (dice 8:00–3:00) para que coincida con la web (9:00–5:00).

### Tabla original de la tanda 3

El código ya está preparado: basta con rellenar `spaline/datos.js` y ejecutar `python3 herramientas/generar.py`.

| Dato que falta | Dónde va en `datos.js` | Qué activa |
|---|---|---|
| Formas de pago (Pago Móvil, Zelle, efectivo…) | `sitio.pagos` | Bloque "Antes de pedir" (11.4) |
| Tasa de cambio ("Pagos en Bs a tasa BCV del día") | `sitio.tasa` | Nota de precios (11.2) |
| Delivery, envíos nacionales, retiro y zona | `sitio.entrega`, `sitio.zona` | "Antes de pedir" (11.1, 11.4) |
| Días de atención | `sitio.dias`, `sitio.horarioSchema` (p. ej. `Mo-Fr 08:00-15:00`) | Pie, carrito y ficha de Google (9.12) |
| Precio de Leche de Almendras Línea Pro, o quitarla | `precio` de `almendras-pro-*` | Tienda completa (11.5) |
| Dominio | `sitio.url` | Canonical, `og:url`, imagen de WhatsApp absoluta, `sitemap.xml`, `robots.txt` (9.4, 9.10, 9.11) |
| Analítica (opcional) | `sitio.analitica` | Script, CSP y evento `whatsapp_click` (3.13, 9.17) |
| "Sobre nosotros" con dato concreto: año de inicio, ciudad, foto real del equipo o la fábrica | Texto en `index.html` (sección `#marca`) | 11.8, 13.18 |
| Reseñas reales (capturas de WhatsApp sin nombres) | Nueva sección | 11.10 |

## Tanda 4 — Publicar y cuentas 👤

Pasos en el README, apartado "Publicar".

1. **Dominio** a nombre de Jordan Cosmetics con renovación automática (8.6–8.11). Si es `.com.ve`, confirmar cómo se renueva con NIC.ve.
2. **Cloudflare Pages o Netlify** a nombre de la empresa, conectado al repositorio, con directorio de salida `spaline` (8.1–8.3).
3. **DNS** en Cloudflare: `www` redirige al dominio principal; DNSSEC activado. Si no se envía correo desde el dominio, añadir `v=spf1 -all` y DMARC `p=reject`.
4. **Repositorio:** pasar `jasu0906/Copia-apps` a una cuenta u organización de la empresa, o hacerlo privado (2.8).
5. **Verificación en dos pasos** en todas las cuentas, con los códigos de recuperación guardados por la empresa (8.13).
6. **Google Business Profile y Search Console:** enlazar la web y enviar el sitemap (9.14–9.16).
7. **Monitor de caída:** UptimeRobot gratis, cada 5 minutos, con avisos al correo de la empresa (8.16).
8. **Enlace en perfiles:** el mismo dominio en la biografía de Instagram, TikTok y WhatsApp Business (9.18).

## Tanda 5 — Pruebas antes de anunciar la web

Se hacen sobre la web publicada (sección 14 de la lista).

**Prueba previa en local (4 nov 2026)** con navegador automático en Android (Pixel 5), iPhone 13, pantalla de 360 px y escritorio:
- ✅ Sin desbordes horizontales, sin errores en la consola, sin imágenes rotas ni archivos que fallen.
- ✅ Los 30 enlaces de WhatsApp van al +58 414-6448843. Sin JavaScript se ven los productos con sus precios (24 con precio y 3 de la Línea Pro sin precio todavía).
- ✅ Al recorrer la página con Tab, el foco se ve en todos los enlaces y botones.
- ✅ Corregido: los enlaces de WhatsApp, Llamar, Instagram y TikTok del pie de página y de "Antes de pedir" medían 19–22 px de alto en el móvil; ahora tienen un área táctil de 44 px sin que cambie el diseño.

Estas comprobaciones se repiten igualmente sobre la web publicada:

- [ ] Android con datos móviles: productos visibles en menos de 4 s.
- [ ] iPhone Safari: botón "Mi pedido", menú y textos sin desbordarse.
- [ ] Tres pedidos de prueba desde un teléfono sin el número guardado. Abren WhatsApp con el mensaje correcto.
- [ ] Pegar el enlace de la web en un chat: sale imagen, título y descripción.
- [ ] PageSpeed Insights (móvil): rendimiento ≥ 90, LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- [ ] securityheaders.com y SSL Labs: nota A.
- [ ] `/.env`, `/.git/config`, `/admin` responden 404.
- [ ] Cambiar un precio, publicar y verlo en un teléfono que ya visitó la web, sin forzar la recarga.
- [ ] Navegador sin JavaScript: se ven los productos y los enlaces de WhatsApp funcionan.
- [ ] Recorrer la página con Tab: el foco se ve en cada enlace y botón.
- [ ] Escribir una dirección que no existe: sale la página 404 de Spa Line.
- [ ] Leer todos los textos en voz alta y corregir lo que suene a plantilla.

## Pendiente fuera de la web

- Etiquetas con errores de impresión:
  - crema Leche de Almendras: "PADA MANOS" (debe decir "PARA");
  - rocío Leche de Almendras: "ENOLIENTE" (debe decir "EMOLIENTE");
  - crema Vanilla Dream: "Montoca de Ceceo" (debe decir "Manteca de Cacao").
- Lista de precios: códigos repetidos entre cremas y body mist de la Línea Profesional, y entre scrub cream y cremas de 240 ml.
