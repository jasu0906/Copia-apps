#!/usr/bin/env python3
"""Genera las partes de la web Spa Line que salen de spaline/datos.js.

Uso (desde la carpeta del proyecto):
    python3 herramientas/generar.py            # actualiza los archivos
    python3 herramientas/generar.py --check    # solo comprueba que están al día (sale con 1 si no)

Qué actualiza:
  - spaline/index.html: bloques entre <!-- GEN:... --> (SEO, versión sin JavaScript,
    nota de precios, "Antes de pedir" y pie de página)
  - spaline/robots.txt, spaline/sitemap.xml (si hay dominio en sitio.url)
  - spaline/_headers (seguridad y caché; incluye la analítica si está configurada)
  - spaline/site.webmanifest

Solo usa la biblioteca estándar de Python 3.8+.
"""
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote

RAIZ = Path(__file__).resolve().parent.parent
WEB = RAIZ / "spaline"


def leer_datos():
    txt = (WEB / "datos.js").read_text(encoding="utf-8")
    m = re.search(r"window\.SPALINE\s*=\s*(\{.*\})\s*;?\s*$", txt, re.S)
    if not m:
        sys.exit("datos.js: no encuentro 'window.SPALINE = {...};'")
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError as e:
        sys.exit(f"datos.js tiene un error de formato en la línea {e.lineno}: {e.msg}. "
                 "Revisa comas y comillas (debe ser JSON válido).")


def e(s):
    return html.escape(str(s), quote=True)


def precio(v):
    return f"${v:.2f}"


def productos(d):
    T = d["tipos"]
    for L in d["lineas"]:
        for p in L["productos"]:
            t = T[p["tipo"]]
            yield L, p, p.get("nombre") or t["nombre"], p.get("descripcion") or t["descripcion"]


def url_abs(d, ruta):
    base = d["sitio"]["url"].rstrip("/")
    return f"{base}/{ruta}" if base else ruta


def bloque_head(d):
    S = d["sitio"]
    out = []
    if S["url"]:
        out.append(f'<link rel="canonical" href="{e(S["url"].rstrip("/") + "/")}">')
        out.append(f'<meta property="og:url" content="{e(S["url"].rstrip("/") + "/")}">')
    out.append(f'<meta property="og:image" content="{e(url_abs(d, "img/compartir.jpg"))}">')
    out.append('<meta property="og:image:width" content="1200">')
    out.append('<meta property="og:image:height" content="630">')
    out.append('<meta property="og:image:alt" content="Productos Spa Line de la Nueva Línea junto al logo">')
    an = S.get("analitica") or {}
    if an.get("proveedor") == "plausible" and an.get("dominio"):
        out.append(f'<script defer data-domain="{e(an["dominio"])}" src="https://plausible.io/js/script.js"></script>')
    elif an.get("proveedor") == "umami" and an.get("id"):
        src = an.get("script") or "https://cloud.umami.is/script.js"
        out.append(f'<script defer src="{e(src)}" data-website-id="{e(an["id"])}"></script>')
    tienda = {
        "@context": "https://schema.org", "@type": "Store", "name": S["nombre"],
        "telephone": S["whatsappVisible"], "image": url_abs(d, "img/compartir.jpg"),
        "sameAs": [S["instagram"], S["tiktok"]],
        "address": {"@type": "PostalAddress", "addressCountry": "VE"},
    }
    if S["url"]:
        tienda["url"] = S["url"]
    if S.get("horarioSchema"):
        tienda["openingHours"] = S["horarioSchema"]
    lista = {"@context": "https://schema.org", "@type": "ItemList", "itemListElement": []}
    for i, (L, p, nombre, desc) in enumerate(productos(d), 1):
        item = {"@type": "Product", "name": f"{nombre} {L['nombre']}", "brand": {"@type": "Brand", "name": S["nombre"]},
                "description": desc, "image": url_abs(d, f"img/{p.get('imagen') or p['clave']}.webp")}
        if isinstance(p.get("precio"), (int, float)):
            item["offers"] = {"@type": "Offer", "price": f"{p['precio']:.2f}", "priceCurrency": S["moneda"],
                              "availability": "https://schema.org/" + ("InStock" if p.get("disponible", True) else "OutOfStock")}
        lista["itemListElement"].append({"@type": "ListItem", "position": i, "item": item})
    for obj in (tienda, lista):
        out.append('<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace("</", "<\\/") + "</script>")
    return "\n".join(out)


def wa(d, texto):
    return f'https://wa.me/{d["sitio"]["whatsapp"]}?text={quote(texto, safe="")}'


def bloque_noscript(d):
    """Lista estática de todos los productos con su enlace de WhatsApp: funciona sin JavaScript."""
    S = d["sitio"]
    partes = ['<noscript>', '<div class="nojs">']
    for L in d["lineas"]:
        items = []
        for p in L["productos"]:
            t = d["tipos"][p["tipo"]]
            nombre = p.get("nombre") or t["nombre"]
            tam = f' ({p["tamano"]})' if p.get("tamano") else ""
            pr = p.get("precio")
            pr_txt = precio(pr) if isinstance(pr, (int, float)) else "Precio por confirmar"
            if p.get("disponible") is False:
                accion = "<span>Agotado</span>"
            else:
                msg = f"¡Hola {S['nombre']}! Quiero pedir: 1 × {nombre} {L['nombre']}{tam}" + (f" – {pr_txt}" if isinstance(pr, (int, float)) else "")
                accion = f'<a href="{e(wa(d, msg))}" target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>'
            items.append(f'<li><strong>{e(nombre)}</strong><span>{e(p.get("tamano", ""))} · {e(pr_txt)}</span>{accion}</li>')
        partes.append(f'<section><h3>{e(L["nombre"])}</h3><p class="eyebrow">{e(L["grupo"])}</p><ul>{"".join(items)}</ul></section>')
    partes += ['</div>', '</noscript>']
    return "\n".join(partes)


def bloque_nota(d):
    S = d["sitio"]
    txt = f'Precios en {"dólares (USD)" if S["moneda"] == "USD" else S["moneda"]}, {S["listaPrecios"]}.'
    if S.get("tasa"):
        txt += " " + S["tasa"].rstrip(".") + "."
    txt += " Precio y disponibilidad se confirman por WhatsApp."
    return f'<p class="shop-note">{e(txt)}</p>'


def bloque_info(d):
    S = d["sitio"]
    def lista(xs):
        return "<ul>" + "".join(f"<li>{e(x)}</li>" for x in xs) + "</ul>"
    pago = lista(S["pagos"]) if S.get("pagos") else "<p>Te indicamos las formas de pago por WhatsApp.</p>"
    if S.get("tasa"):
        pago += f'<p>{e(S["tasa"])}</p>'
    entrega = lista(S["entrega"]) if S.get("entrega") else "<p>Coordinamos el envío o la entrega por WhatsApp.</p>"
    if S.get("zona"):
        entrega += f'<p>{e(S["zona"])}</p>'
    horario = e((S["dias"] + ", " if S.get("dias") else "") + S["horario"])
    return f'''<section class="wrap info" id="antes" aria-labelledby="antes-title">
  <div class="box">
    <h2 id="antes-title">Antes de pedir</h2>
    <div><h3>Pago</h3>{pago}</div>
    <div><h3>Entrega</h3>{entrega}</div>
    <div><h3>Atención</h3><p>{horario}</p><p><a href="https://wa.me/{e(S["whatsapp"])}" target="_blank" rel="noopener noreferrer">WhatsApp {e(S["whatsappVisible"])}</a> · <a href="tel:+{e(S["whatsapp"])}">Llamar</a></p></div>
    <div><h3>Precios</h3><p>Precios en {e(S["moneda"])}, {e(S["listaPrecios"])}. Precio y disponibilidad se confirman por WhatsApp.</p></div>
  </div>
</section>'''


def bloque_footer(d):
    S = d["sitio"]
    horario = e((S["dias"] + ", " if S.get("dias") else "") + S["horario"])
    return (f'<footer class="wrap"><span>© {e(S["nombre"])} · Venezuela</span>'
            f'<span>WhatsApp <a href="https://wa.me/{e(S["whatsapp"])}" target="_blank" rel="noopener noreferrer">{e(S["whatsappVisible"])}</a>'
            f' · <a href="tel:+{e(S["whatsapp"])}">Llamar</a> · {horario}</span>'
            f'<span><a href="{e(S["instagram"])}" target="_blank" rel="noopener noreferrer">Instagram</a> · '
            f'<a href="{e(S["tiktok"])}" target="_blank" rel="noopener noreferrer">TikTok</a> · {e(S["usuario"])}</span></footer>')


def reemplazar(html_txt, nombre, contenido):
    patron = re.compile(rf"(<!-- GEN:{nombre} -->\n).*?(<!-- /GEN:{nombre} -->)", re.S)
    if not patron.search(html_txt):
        sys.exit(f"index.html: falta el marcador <!-- GEN:{nombre} -->")
    return patron.sub(lambda m: m.group(1) + contenido + "\n" + m.group(2), html_txt)


def headers(d):
    an = (d["sitio"].get("analitica") or {})
    extra = ""
    if an.get("proveedor") == "plausible":
        extra = "https://plausible.io"
    elif an.get("proveedor") == "umami":
        src = an.get("script") or "https://cloud.umami.is/script.js"
        extra = re.match(r"https://[^/]+", src).group(0)
    csp = ("default-src 'self'; img-src 'self' data:; "
           f"script-src 'self'{(' ' + extra) if extra else ''}; "
           "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; "
           f"connect-src 'self'{(' ' + extra) if extra else ''}; manifest-src 'self'; "
           "frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'")
    return f"""# Cabeceras para Cloudflare Pages o Netlify (generado por herramientas/generar.py; no editar a mano)
/*
  Content-Security-Policy: {csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

/
  Cache-Control: no-cache
/index.html
  Cache-Control: no-cache
/datos.js
  Cache-Control: no-cache
/app.js
  Cache-Control: no-cache
/img/*
  Cache-Control: public, max-age=86400
"""


def main():
    check = "--check" in sys.argv
    d = leer_datos()
    S = d["sitio"]
    archivos = {}
    idx = (WEB / "index.html").read_text(encoding="utf-8")
    nuevo = idx
    for nombre, f in (("HEAD", bloque_head), ("NOSCRIPT", bloque_noscript), ("NOTA", bloque_nota),
                      ("INFO", bloque_info), ("FOOTER", bloque_footer)):
        nuevo = reemplazar(nuevo, nombre, f(d))
    archivos[WEB / "index.html"] = nuevo
    archivos[WEB / "_headers"] = headers(d)
    archivos[WEB / "site.webmanifest"] = json.dumps({
        "name": S["nombre"], "short_name": S["nombre"], "lang": "es", "start_url": "./", "display": "browser",
        "background_color": "#FBF4F8", "theme_color": "#8B1A6B",
        "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"}]}, ensure_ascii=False, indent=2) + "\n"
    if S["url"]:
        base = S["url"].rstrip("/")
        archivos[WEB / "robots.txt"] = f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n"
        archivos[WEB / "sitemap.xml"] = ('<?xml version="1.0" encoding="UTF-8"?>\n'
                                         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                         f"  <url><loc>{e(base)}/</loc></url>\n</urlset>\n")
    else:
        archivos[WEB / "robots.txt"] = "User-agent: *\nAllow: /\n# Añade el dominio en datos.js (sitio.url) y vuelve a generar para incluir el sitemap.\n"

    cambios = [p for p, txt in archivos.items() if not p.exists() or p.read_text(encoding="utf-8") != txt]
    if check:
        if cambios:
            print("Desactualizado:", ", ".join(str(p.relative_to(RAIZ)) for p in cambios))
            sys.exit(1)
        print("Todo al día.")
        return
    for p in cambios:
        p.write_text(archivos[p], encoding="utf-8")
    n = sum(len(L["productos"]) for L in d["lineas"])
    sin_precio = [p["clave"] for _, p, _, _ in productos(d) if not isinstance(p.get("precio"), (int, float))]
    print(f"{n} productos. Actualizados: {', '.join(str(p.relative_to(RAIZ)) for p in cambios) or 'nada'}")
    if sin_precio:
        print("Sin precio:", ", ".join(sin_precio))
    if not S["url"]:
        print("Aviso: sitio.url está vacío; sin canonical, og:url ni sitemap (la imagen para compartir necesita el dominio).")


if __name__ == "__main__":
    main()
