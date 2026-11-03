/* Datos de la tienda Spa Line. Es el ÚNICO archivo que hay que tocar para cambiar precios,
   productos, número de WhatsApp, horario, pagos o envíos. Después ejecuta:
   python3 herramientas/generar.py   (actualiza la versión sin JavaScript, el SEO y el sitemap).
   Guía completa en README.md. */
window.SPALINE = {
  "sitio": {
    "nombre": "Spa Line",
    "empresa": "Jordan Cosmetics",
    "url": "",
    "whatsapp": "584146448843",
    "whatsappVisible": "+58 414-6448843",
    "horario": "8:00 a. m. – 3:00 p. m.",
    "dias": "",
    "horarioSchema": "",
    "instagram": "https://www.instagram.com/spalineve/",
    "tiktok": "https://www.tiktok.com/@spalineve",
    "usuario": "@spalineve",
    "moneda": "USD",
    "listaPrecios": "lista minorista de octubre de 2026",
    "tasa": "",
    "pagos": [],
    "entrega": [],
    "zona": "",
    "analitica": {
      "proveedor": "",
      "dominio": "",
      "id": "",
      "script": ""
    }
  },
  "tipos": {
    "gel": {
      "etiqueta": "Gel exfoliante",
      "nombre": "Gel de baño exfoliante",
      "descripcion": "Hidratante y removedor de células muertas. Gránulos no abrasivos."
    },
    "scrub": {
      "etiqueta": "Scrub cream",
      "nombre": "Exfoliante en crema sin enjuagar",
      "descripcion": "Exfolia en seco y cuida la piel."
    },
    "crema": {
      "etiqueta": "Crema corporal",
      "nombre": "Crema hidratante para manos y cuerpo",
      "descripcion": "Hidratante y emoliente de rápida absorción."
    },
    "mist": {
      "etiqueta": "Body mist",
      "nombre": "Rocío corporal",
      "descripcion": "Refrescante, hidratante y reafirmante."
    },
    "aceite": {
      "etiqueta": "Aceite de baño",
      "nombre": "Aceite de baño espumoso",
      "descripcion": "Con aceite de coco, manteca de cacao y ácido hialurónico."
    }
  },
  "lineas": [
    {
      "id": "f1",
      "nombre": "Mandarina Coco",
      "grupo": "Nueva Línea",
      "productos": [
        {
          "clave": "mandarina-gel",
          "tipo": "gel",
          "tamano": "200 ml",
          "precio": 7.99
        },
        {
          "clave": "mandarina-crema",
          "tipo": "crema",
          "tamano": "240 ml",
          "precio": 5.31
        },
        {
          "clave": "mandarina-rocio",
          "tipo": "mist",
          "tamano": "150 ml",
          "precio": 5.42
        },
        {
          "clave": "mandarina-scrub",
          "tipo": "scrub",
          "tamano": "300 ml",
          "precio": 6.99
        }
      ]
    },
    {
      "id": "f2",
      "nombre": "Cherry Berry",
      "grupo": "Nueva Línea",
      "productos": [
        {
          "clave": "cherry-gel",
          "tipo": "gel",
          "tamano": "200 ml",
          "precio": 7.99
        },
        {
          "clave": "cherry-crema",
          "tipo": "crema",
          "tamano": "240 ml",
          "precio": 5.31
        },
        {
          "clave": "cherry-rocio",
          "tipo": "mist",
          "tamano": "150 ml",
          "precio": 5.42
        },
        {
          "clave": "cherry-scrub",
          "tipo": "scrub",
          "tamano": "300 ml",
          "precio": 6.99
        }
      ]
    },
    {
      "id": "f3",
      "nombre": "Mora Yogurt",
      "grupo": "Nueva Línea",
      "productos": [
        {
          "clave": "mora-gel",
          "tipo": "gel",
          "tamano": "200 ml",
          "precio": 7.99
        },
        {
          "clave": "mora-crema",
          "tipo": "crema",
          "tamano": "240 ml",
          "precio": 5.31
        },
        {
          "clave": "mora-rocio",
          "tipo": "mist",
          "tamano": "150 ml",
          "precio": 5.42
        },
        {
          "clave": "mora-scrub",
          "tipo": "scrub",
          "tamano": "300 ml",
          "precio": 6.99
        }
      ]
    },
    {
      "id": "f8",
      "nombre": "Leche de Almendras Dulces",
      "grupo": "Nueva Línea",
      "productos": [
        {
          "clave": "almendras-gel",
          "tipo": "gel",
          "tamano": "200 ml",
          "descripcion": "Para el cuerpo.",
          "foto": true,
          "precio": 12.61
        },
        {
          "clave": "almendras-crema",
          "tipo": "crema",
          "tamano": "240 ml",
          "descripcion": "Para manos y cuerpo.",
          "foto": true,
          "precio": 9.21
        },
        {
          "clave": "almendras-rocio",
          "tipo": "mist",
          "tamano": "150 ml",
          "nombre": "Rocío corporal",
          "descripcion": "Hidratante y emoliente.",
          "foto": true,
          "precio": 8.98
        }
      ]
    },
    {
      "id": "f4",
      "nombre": "Blueberry Orange",
      "grupo": "Línea Profesional",
      "productos": [
        {
          "clave": "blueberry-gel",
          "tipo": "gel",
          "tamano": "250 ml",
          "nombre": "Gel de baño exfoliante hidratante",
          "descripcion": "Para el cuerpo.",
          "precio": 7.3
        },
        {
          "clave": "blueberry-crema",
          "tipo": "crema",
          "tamano": "250 ml",
          "descripcion": "Para manos y cuerpo.",
          "precio": 3.91
        },
        {
          "clave": "blueberry-mist",
          "tipo": "mist",
          "tamano": "",
          "nombre": "Body mist",
          "descripcion": "Refresca y perfuma.",
          "precio": 4.03
        }
      ]
    },
    {
      "id": "f5",
      "nombre": "Orquídea Salvaje",
      "grupo": "Línea Profesional",
      "productos": [
        {
          "clave": "orquidea-gel",
          "tipo": "gel",
          "tamano": "250 ml",
          "nombre": "Gel exfoliante para manos y cuerpo",
          "descripcion": "Toque de seda.",
          "precio": 7.3
        },
        {
          "clave": "orquidea-crema",
          "tipo": "crema",
          "tamano": "250 ml",
          "nombre": "Crema para manos y cuerpo",
          "descripcion": "Toque de seda.",
          "precio": 3.91
        },
        {
          "clave": "orquidea-mist",
          "tipo": "mist",
          "tamano": "",
          "nombre": "Body mist",
          "descripcion": "Aroma floral.",
          "precio": 4.03
        }
      ]
    },
    {
      "id": "f6",
      "nombre": "Leche de Almendras Dulces",
      "grupo": "Línea Profesional",
      "productos": [
        {
          "clave": "almendras-pro-gel",
          "tipo": "gel",
          "tamano": "250 ml",
          "descripcion": "Para el cuerpo.",
          "imagen": "almendras-grupo",
          "precio": null
        },
        {
          "clave": "almendras-pro-crema",
          "tipo": "crema",
          "tamano": "250 ml",
          "descripcion": "Para manos y cuerpo.",
          "imagen": "almendras-grupo",
          "precio": null
        },
        {
          "clave": "almendras-pro-mist",
          "tipo": "mist",
          "tamano": "",
          "nombre": "Body mist",
          "descripcion": "Aroma cálido y reconfortante.",
          "imagen": "almendras-grupo",
          "precio": null
        }
      ]
    },
    {
      "id": "f7",
      "nombre": "Vanilla Dream",
      "grupo": "Nuevo lanzamiento · Spa Line 83",
      "nuevo": true,
      "productos": [
        {
          "clave": "vanilla-crema",
          "tipo": "crema",
          "tamano": "250 ml",
          "nombre": "Crema corporal ultra humectante",
          "descripcion": "Con aceite de coco, manteca de cacao y ácido hialurónico.",
          "foto": true,
          "precio": 11.15
        },
        {
          "clave": "vanilla-aceite",
          "tipo": "aceite",
          "tamano": "150 ml",
          "foto": true,
          "precio": 13.59
        },
        {
          "clave": "vanilla-rocio",
          "tipo": "mist",
          "tamano": "150 ml",
          "nombre": "Rocío corporal",
          "descripcion": "Hidratante y emoliente.",
          "foto": true,
          "precio": 9.46
        }
      ]
    }
  ],
  "beneficios": {
    "f1": {
      "etiqueta": "momento de playita",
      "lista": [
        {
          "titulo": "Revitaliza y energiza",
          "texto": "la mandarina aporta vitamina C y antioxidantes que iluminan la piel y promueven su regeneración natural."
        },
        {
          "titulo": "Hidrata profundamente",
          "texto": "el coco nutre y suaviza, ayudando a mantener la humedad natural de la piel."
        },
        {
          "titulo": "Suaviza y mejora la textura",
          "texto": "juntos ayudan a mantener una piel más lisa, flexible y con aspecto saludable."
        }
      ]
    },
    "f2": {
      "etiqueta": "momento de paz",
      "lista": [
        {
          "titulo": "Ilumina y revitaliza",
          "texto": "las cerezas aportan vitamina C y antioxidantes que ayudan a darle un aspecto más fresco y radiante a la piel."
        },
        {
          "titulo": "Suaviza y tonifica",
          "texto": "las berries nutren profundamente, mejorando la textura y elasticidad de la piel."
        },
        {
          "titulo": "Aroma dulce y vibrante",
          "texto": "su fragancia frutal despierta los sentidos y deja una sensación de energía y alegría."
        }
      ]
    },
    "f3": {
      "etiqueta": "regálate un momento",
      "lista": [
        {
          "titulo": "Nutre y suaviza",
          "texto": "la mora aporta vitaminas y antioxidantes que ayudan a mantener la piel tersa y radiante."
        },
        {
          "titulo": "Hidrata y equilibra",
          "texto": "el yogurt contribuye a mantener la humedad natural y suaviza la textura de la piel."
        },
        {
          "titulo": "Aroma dulce y envolvente",
          "texto": "su fragancia combina lo frutal y cremoso, dejando una sensación de confort y frescura durante todo el día."
        }
      ]
    },
    "f4": {
      "etiqueta": "Línea Profesional",
      "lista": [
        {
          "titulo": "Protege y rejuvenece",
          "texto": "los arándanos son ricos en antioxidantes que combaten los radicales libres y previenen el envejecimiento prematuro."
        },
        {
          "titulo": "Aporta luminosidad natural",
          "texto": "la naranja revitaliza y unifica el tono de la piel gracias a su alto contenido de vitamina C."
        },
        {
          "titulo": "Refresca y revitaliza",
          "texto": "su mezcla frutal despierta los sentidos y deja la piel con una sensación fresca, suave y llena de vida."
        }
      ]
    },
    "f5": {
      "etiqueta": "Línea Profesional",
      "lista": [
        {
          "titulo": "Revitaliza y embellece",
          "texto": "la orquídea salvaje ayuda a mantener la firmeza y el brillo natural de la piel."
        },
        {
          "titulo": "Hidrata y protege",
          "texto": "sus extractos naturales retienen la humedad y crean una barrera protectora contra agresores externos."
        },
        {
          "titulo": "Aporta elegancia y frescura",
          "texto": "su delicado aroma floral envuelve la piel en una sensación de sofisticación y bienestar."
        }
      ]
    },
    "f7": {
      "etiqueta": "Nuevo lanzamiento · Spa Line 83",
      "lista": [
        {
          "titulo": "Con aceite de coco, manteca de cacao y ácido hialurónico",
          "texto": "en la crema corporal ultra humectante y en el aceite de baño espumoso."
        },
        {
          "titulo": "Aceite de baño espumoso",
          "texto": "para el baño, 150 ml."
        },
        {
          "titulo": "Rocío corporal",
          "texto": "hidratante y emoliente, 150 ml."
        }
      ]
    },
    "f6": {
      "etiqueta": "Línea Profesional",
      "lista": [
        {
          "titulo": "Nutre y aporta elasticidad",
          "texto": "el aceite y la leche de almendras dulces brindan sustancias altamente nutritivas que mantienen la piel flexible, suave y saludable."
        },
        {
          "titulo": "Tonifica y protege",
          "texto": "el aloe vera, la glicerina y la vitamina E reafirman la piel y actúan como un escudo antioxidante frente a las agresiones externas."
        },
        {
          "titulo": "Aroma cálido y reconfortante",
          "texto": "su delicada fragancia a almendras dulces envuelve los sentidos, dejando una sensación de calma, suavidad y bienestar."
        }
      ]
    },
    "f8": {
      "etiqueta": "Nueva Línea",
      "lista": [
        {
          "titulo": "Nutre y aporta elasticidad",
          "texto": "el aceite y la leche de almendras dulces brindan sustancias altamente nutritivas que mantienen la piel flexible, suave y saludable."
        },
        {
          "titulo": "Tonifica y protege",
          "texto": "el aloe vera, la glicerina y la vitamina E reafirman la piel y actúan como un escudo antioxidante frente a las agresiones externas."
        },
        {
          "titulo": "Aroma cálido y reconfortante",
          "texto": "su delicada fragancia a almendras dulces envuelve los sentidos, dejando una sensación de calma, suavidad y bienestar."
        }
      ]
    }
  }
};
