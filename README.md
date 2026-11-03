# Web de Spa Line

Catálogo de Spa Line con pedido por WhatsApp. Es una web estática: no tiene servidor, base de datos, pagos ni contraseñas. El cliente arma su pedido y lo envía por WhatsApp al +58 414-6448843.

## Qué hay en cada carpeta

| Carpeta o archivo | Para qué sirve |
|---|---|
| `spaline/` | **La web.** Es la carpeta que se publica. |
| `spaline/datos.js` | **Productos, precios, WhatsApp, horario, pagos y envíos.** Es el único archivo que hay que tocar para el día a día. |
| `spaline/index.html` | La página (diseño y textos fijos). |
| `spaline/app.js` | El funcionamiento de la tienda, el carrito y el test. Normalmente no se toca. |
| `spaline/img/` | Fotos y logos. |
| `herramientas/generar.py` | Actualiza la página después de cambiar `datos.js`. |
| `PLAN.md` | Plan de trabajo por tandas y lo que queda pendiente. |
| `replica/`, `.claude/` | Notas de diseño y herramientas usadas para construir la web. No se publican. |

## Cambiar un precio

1. Abre `spaline/datos.js` y busca el producto (por ejemplo `"clave": "vanilla-crema"`).
2. Cambia el número de `"precio"`. Usa punto para los decimales: `11.15`, no `11,15`. Si todavía no tiene precio, pon `null`.
3. Si es una lista de precios nueva, cambia también `"listaPrecios"` (por ejemplo `"lista minorista de enero de 2027"`).
4. Ejecuta `python3 herramientas/generar.py`.
5. Guarda y publica (ver "Publicar").

## Marcar un producto como agotado

Añade `"disponible": false,` dentro de ese producto en `datos.js`. Se muestra como "Agotado" y no se puede agregar al pedido. Para volver a venderlo, borra esa línea.

## Añadir un producto o una fragancia

1. Guarda la foto en `spaline/img/` en formato `.webp`, con el nombre de la clave (por ejemplo `img/coco-gel.webp`), de unos 900 px de alto. Crea también una versión pequeña de unos 480 px de alto con `-sm` al final (`img/coco-gel-sm.webp`).
2. En `datos.js`, copia un producto parecido dentro de su línea y cambia `clave`, `tipo` (`gel`, `crema`, `mist`, `scrub` o `aceite`), `tamano` y `precio`.
3. Para una fragancia nueva, copia una línea completa y dale un `id` nuevo (por ejemplo `"f9"`). Su color se define en `index.html` con `--f9` y `--f9-ink`; pide ayuda para este paso.
4. Ejecuta `python3 herramientas/generar.py`.

## Cambiar el WhatsApp, el horario, el pago o el envío

Todo está al principio de `datos.js`, en `"sitio"`:

- `"whatsapp"`: número completo sin `+`, espacios ni guiones (`584146448843`).
- `"whatsappVisible"`: cómo se muestra (`+58 414-6448843`).
- `"horario"` y `"dias"`: por ejemplo `"8:00 a. m. – 3:00 p. m."` y `"lunes a viernes"`.
- `"pagos"`: lista, por ejemplo `["Pago Móvil", "Zelle", "Efectivo"]`.
- `"tasa"`: por ejemplo `"Pagos en bolívares a tasa BCV del día"`.
- `"entrega"` y `"zona"`: por ejemplo `["Delivery en Caracas", "Envíos nacionales por MRW"]`.
- `"url"`: el dominio cuando exista (`"https://spaline.com.ve"`). Sin él no salen el canonical, el sitemap ni la imagen al compartir en WhatsApp.

Después ejecuta `python3 herramientas/generar.py`.

## Ver la web en tu computadora

Abre `spaline/index.html` en el navegador con doble clic. Para probarla tal como se publicará (con rutas desde la raíz):

```
cd spaline
python3 -m http.server 8000
```

Luego abre http://localhost:8000.

## Publicar

La web se publica gratis en **Cloudflare Pages** (recomendado) o **Netlify**, conectados a este repositorio de GitHub:

1. Crea la cuenta a nombre de la empresa, no a nombre del desarrollador.
2. "Create project" → "Connect to Git" → elige este repositorio.
3. Configuración: sin comando de build; **directorio de salida: `spaline`**.
4. Cada vez que se guarda un cambio en la rama `master`, la web se actualiza sola en uno o dos minutos.
5. Conecta el dominio propio desde el panel ("Custom domains").

El archivo `spaline/_headers` ya trae la seguridad (HTTPS estricto, política de contenido) y la caché. Lo usan Cloudflare Pages y Netlify sin configurar nada más.

Antes de guardar puedes comprobar que todo está al día con `python3 herramientas/generar.py --check`.

## Cuentas de la web

Todas deben estar a nombre de la empresa, con verificación en dos pasos activada:

| Cuenta | Para qué |
|---|---|
| Registrador del dominio | El nombre de la web (por ejemplo `.com.ve`). |
| DNS | Normalmente en Cloudflare, gratis. |
| Alojamiento | Cloudflare Pages o Netlify. |
| GitHub | Este repositorio con el código y las fotos. |
| Analítica | Plausible o Umami (opcional). |
| Google Business Profile | Ficha en Google Maps. |
| WhatsApp Business | +58 414-6448843 (Jordan Cosmetics). |

## Analítica (opcional)

En `datos.js`, dentro de `"analitica"`:

- **Plausible:** `"proveedor": "plausible", "dominio": "spaline.com.ve"`.
- **Umami:** `"proveedor": "umami", "id": "<id del sitio>"`.

Ejecuta `generar.py`. Cada envío de pedido registra el evento `whatsapp_click` con los productos.
