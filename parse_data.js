const fs = require('fs');

const raw = `Id de usuario,Fecha,Canal de adquisición,Edad,Ubicación,Dispositivo,Etapa del funnel,Acción clave,Tiempo de sesión (min),Uso de guía de tallas,Gasto total (MXN),Método de pago,CPA (MXN),Retenido 30 días
Usr109,2026-09-01,Influencer,20,Cdmx,Android,Descubrimiento,Ver reel,3.4,No,0.0,N/a,137.75,No
Usr114,2026-09-01,Tiktok,31,Cdmx,Ios,Descubrimiento,Ver reel,0.9,No,0.0,N/a,33.73,No
Usr147,2026-09-01,Instagram,26,Mty,Ios,Descubrimiento,Ver reel,2.9,No,0.0,N/a,45.5,No
Usr074,2026-09-02,Instagram,27,Mty,Ios,Descubrimiento,Ver reel,3.2,No,0.0,N/a,45.48,No
Usr059,2026-09-02,Instagram,26,Cdmx,Android,Descubrimiento,Ver reel,3.1,No,0.0,N/a,41.0,No
Usr026,2026-09-02,Seo/sem,22,Cdmx,Ios,Descubrimiento,Visita al sitio,2.6,No,0.0,N/a,23.37,No
Usr021,2026-09-02,Instagram,24,Puebla,Ios,Descubrimiento,Ver reel,2.6,No,0.0,N/a,41.95,No
Usr044,2026-09-03,Email,34,Gdl,Ios,Descubrimiento,Visita al sitio,2.1,No,0.0,N/a,4.86,No
Usr018,2026-09-03,Instagram,23,Cdmx,Ios,Descubrimiento,Ver reel,1.6,No,0.0,N/a,40.77,No
Usr052,2026-09-04,Tiktok,28,Qro,Android,Descubrimiento,Ver reel,2.3,No,0.0,N/a,29.95,No
Usr078,2026-09-04,Instagram,33,Mty,Ios,Descubrimiento,Ver reel,3.4,No,0.0,N/a,48.51,No
Usr073,2026-09-04,Tiktok,20,Mty,Ios,Descubrimiento,Ver reel,1.6,No,0.0,N/a,31.49,No
Usr125,2026-09-05,Instagram,26,Cdmx,Ios,Consideración,Guardar en clóset,3.6,Sí,0.0,N/a,48.42,No
Usr075,2026-09-06,Seo/sem,35,Qro,Android,Descubrimiento,Visita al sitio,2.7,No,0.0,N/a,20.18,No
Usr063,2026-09-07,Tiktok,28,Mty,Ios,Consideración,Usar guía de tallas,4.2,Sí,0.0,N/a,30.2,No
Usr111,2026-09-07,Instagram,24,Cdmx,Ios,Descubrimiento,Ver reel,1.7,No,0.0,N/a,41.87,No
Usr047,2026-09-07,Influencer,21,Cdmx,Android,Descubrimiento,Ver reel,1.9,No,0.0,N/a,142.23,No
Usr130,2026-09-07,Influencer,21,Qro,Ios,Consideración,Guardar en clóset,5.6,No,0.0,N/a,142.8,No
Usr091,2026-09-08,Instagram,28,Cdmx,Ios,Descubrimiento,Ver reel,2.2,No,0.0,N/a,53.76,No
Usr121,2026-09-08,Influencer,23,Cdmx,Ios,Consideración,Añadir al carrito,4.3,Sí,0.0,N/a,178.63,No
Usr065,2026-09-08,Instagram,32,Cdmx,Android,Consideración,Usar guía de tallas,5.9,Sí,0.0,N/a,49.53,No
Usr006,2026-09-08,Tiktok,31,Mty,Android,Consideración,Guardar en clóset,4.6,No,0.0,N/a,29.52,No
Usr116,2026-09-08,Instagram,26,Mty,Android,Descubrimiento,Ver reel,1.3,No,0.0,N/a,47.35,No
Usr132,2026-09-08,Instagram,29,Mty,Ios,Descubrimiento,Ver reel,2.7,No,0.0,N/a,48.74,No
Usr056,2026-09-09,Tiktok,26,Cdmx,Ios,Descubrimiento,Ver reel,1.6,No,0.0,N/a,28.39,No
Usr112,2026-09-09,Instagram,31,Puebla,Android,Descubrimiento,Ver reel,1.4,No,0.0,N/a,41.2,No
Usr049,2026-09-09,Email,20,Qro,Ios,Consideración,Guardar en clóset,7.0,Sí,0.0,N/a,4.6,No
Usr131,2026-09-09,Tiktok,31,Qro,Ios,Consideración,Usar guía de tallas,5.4,Sí,0.0,N/a,33.13,No
Usr085,2026-09-10,Instagram,21,Cdmx,Ios,Descubrimiento,Ver reel,3.8,No,0.0,N/a,46.06,No
Usr011,2026-09-11,Tiktok,20,Gdl,Ios,Consideración,Guardar en clóset,6.7,No,0.0,N/a,34.48,No
Usr118,2026-09-11,Instagram,25,Cdmx,Ios,Descubrimiento,Ver reel,3.2,No,0.0,N/a,42.95,No
Usr012,2026-09-11,Tiktok,33,Gdl,Ios,Consideración,Guardar en clóset,7.0,Sí,0.0,N/a,32.17,No
Usr029,2026-09-12,Tiktok,28,Cdmx,Ios,Descubrimiento,Ver reel,2.1,No,0.0,N/a,28.47,No
Usr133,2026-09-12,Tiktok,33,Cdmx,Ios,Descubrimiento,Ver reel,1.2,No,0.0,N/a,32.99,No
Usr068,2026-09-14,Instagram,26,Puebla,Ios,Descubrimiento,Ver reel,3.4,No,0.0,N/a,52.34,No
Usr092,2026-09-14,Email,29,Cdmx,Ios,Descubrimiento,Visita al sitio,2.4,No,0.0,N/a,5.16,No
Usr054,2026-09-14,Instagram,25,Cdmx,Ios,Consideración,Usar guía de tallas,4.2,Sí,0.0,N/a,44.57,No
Usr087,2026-09-14,Tiktok,26,Cdmx,Ios,Descubrimiento,Ver reel,1.6,No,0.0,N/a,35.1,No
Usr090,2026-09-15,Tiktok,22,Puebla,Ios,Consideración,Guardar en clóset,7.7,No,0.0,N/a,35.16,No
Usr107,2026-09-15,Seo/sem,31,Cdmx,Ios,Descubrimiento,Visita al sitio,3.4,No,0.0,N/a,20.01,No
Usr038,2026-09-15,Instagram,21,Cdmx,Android,Consideración,Añadir al carrito,6.9,Sí,0.0,N/a,48.87,No
Usr004,2026-09-15,Influencer,25,Cdmx,Android,Conversión,Compra exitosa,12.4,Sí,5209.67,Spei,149.03,No
Usr096,2026-09-16,Seo/sem,25,Qro,Ios,Consideración,Añadir al carrito,3.6,No,0.0,N/a,23.26,No
Usr037,2026-09-16,Seo/sem,27,Gdl,Ios,Consideración,Usar guía de tallas,3.7,Sí,0.0,N/a,18.76,No
Usr069,2026-09-17,Influencer,28,Mty,Android,Conversión,Compra exitosa,12.2,Sí,5581.85,Apple pay,145.32,No
Usr120,2026-09-17,Tiktok,35,Mty,Ios,Descubrimiento,Ver reel,0.9,No,0.0,N/a,29.27,No
Usr081,2026-09-18,Instagram,26,Puebla,Ios,Consideración,Guardar en clóset,5.3,No,0.0,N/a,52.76,No
Usr098,2026-09-18,Tiktok,29,Gdl,Ios,Descubrimiento,Ver reel,1.5,No,0.0,N/a,28.38,No
Usr051,2026-09-18,Instagram,20,Qro,Ios,Descubrimiento,Ver reel,3.6,No,0.0,N/a,48.75,No
Usr009,2026-09-19,Instagram,27,Qro,Ios,Consideración,Usar guía de tallas,7.6,Sí,0.0,N/a,53.08,No
Usr060,2026-09-20,Email,29,Cdmx,Ios,Descubrimiento,Visita al sitio,2.7,No,0.0,N/a,5.56,No
Usr095,2026-09-21,Influencer,32,Cdmx,Ios,Conversión,Compra exitosa,12.4,No,6276.71,Apple pay,162.3,No
Usr007,2026-09-21,Tiktok,28,Gdl,Ios,Conversión,Compra exitosa,13.4,Sí,3341.68,Tarjeta,28.02,No
Usr048,2026-09-21,Tiktok,29,Cdmx,Android,Descubrimiento,Ver reel,1.3,No,0.0,N/a,31.67,No
Usr027,2026-09-21,Instagram,35,Cdmx,Ios,Consideración,Añadir al carrito,3.0,No,0.0,N/a,41.24,No
Usr144,2026-09-22,Instagram,29,Cdmx,Ios,Consideración,Añadir al carrito,4.7,No,0.0,N/a,45.88,No
Usr030,2026-09-22,Seo/sem,29,Gdl,Ios,Consideración,Guardar en clóset,5.3,Sí,0.0,N/a,22.43,No
Usr019,2026-09-22,Instagram,34,Cdmx,Ios,Consideración,Guardar en clóset,7.6,No,0.0,N/a,42.88,No
Usr093,2026-09-23,Seo/sem,34,Qro,Android,Consideración,Guardar en clóset,6.3,Sí,0.0,N/a,21.48,No
Usr138,2026-09-23,Seo/sem,22,Qro,Ios,Descubrimiento,Visita al sitio,2.2,No,0.0,N/a,23.77,No
Usr010,2026-09-23,Instagram,32,Mty,Android,Fidelización,Recompra,10.0,Sí,1634.15,Spei,41.65,Sí
Usr113,2026-09-24,Seo/sem,31,Cdmx,Ios,Descubrimiento,Visita al sitio,1.6,No,0.0,N/a,23.39,No
Usr117,2026-09-24,Influencer,23,Gdl,Ios,Conversión,Compra exitosa,10.6,Sí,5826.58,Apple pay,136.64,No
Usr013,2026-09-24,Tiktok,24,Cdmx,Android,Descubrimiento,Ver reel,1.3,No,0.0,N/a,31.72,No
Usr017,2026-09-24,Influencer,20,Cdmx,Ios,Consideración,Guardar en clóset,7.3,No,0.0,N/a,160.18,No
Usr022,2026-09-24,Email,35,Mty,Ios,Descubrimiento,Visita al sitio,2.9,No,0.0,N/a,5.06,No
Usr101,2026-09-24,Seo/sem,23,Cdmx,Ios,Descubrimiento,Visita al sitio,1.5,No,0.0,N/a,20.45,No
Usr139,2026-09-24,Tiktok,31,Cdmx,Ios,Consideración,Guardar en clóset,4.1,Sí,0.0,N/a,33.44,No
Usr053,2026-09-25,Tiktok,30,Cdmx,Android,Descubrimiento,Ver reel,0.7,No,0.0,N/a,33.05,No
Usr103,2026-09-25,Tiktok,25,Gdl,Android,Descubrimiento,Ver reel,1.8,No,0.0,N/a,34.2,No
Usr032,2026-09-25,Tiktok,25,Cdmx,Ios,Descubrimiento,Ver reel,1.0,No,0.0,N/a,29.14,No
Usr110,2026-09-25,Tiktok,27,Cdmx,Android,Consideración,Añadir al carrito,5.0,No,0.0,N/a,33.5,No
Usr102,2026-09-26,Email,29,Cdmx,Ios,Descubrimiento,Visita al sitio,3.7,No,0.0,N/a,4.81,No
Usr057,2026-09-26,Tiktok,32,Cdmx,Android,Descubrimiento,Ver reel,0.9,No,0.0,N/a,27.12,No
Usr082,2026-09-26,Tiktok,34,Cdmx,Ios,Descubrimiento,Ver reel,1.7,No,0.0,N/a,27.24,No
Usr145,2026-09-27,Influencer,24,Cdmx,Ios,Fidelización,Recompra,13.2,Sí,4278.27,Apple pay,153.96,Sí
Usr034,2026-09-27,Instagram,22,Gdl,Android,Consideración,Guardar en clóset,5.8,No,0.0,N/a,44.12,No
Usr061,2026-09-28,Instagram,22,Mty,Ios,Fidelización,Recompra,12.6,Sí,3236.94,Apple pay,44.48,No
Usr129,2026-09-28,Seo/sem,32,Mty,Android,Consideración,Guardar en clóset,4.3,No,0.0,N/a,22.8,No
Usr036,2026-09-28,Seo/sem,33,Puebla,Ios,Descubrimiento,Visita al sitio,1.4,No,0.0,N/a,21.8,No
Usr080,2026-09-29,Influencer,22,Qro,Ios,Fidelización,Recompra,10.3,Sí,4316.92,Apple pay,172.57,No
Usr003,2026-09-29,Tiktok,24,Cdmx,Ios,Descubrimiento,Ver reel,1.0,No,0.0,N/a,28.06,No
Usr106,2026-09-29,Influencer,30,Mty,Android,Conversión,Compra exitosa,13.3,Sí,3532.99,Apple pay,159.94,No
Usr024,2026-09-30,Tiktok,20,Cdmx,Android,Consideración,Usar guía de tallas,6.0,Sí,0.0,N/a,35.1,No
Usr088,2026-10-01,Email,34,Mty,Ios,Descubrimiento,Visita al sitio,3.7,No,0.0,N/a,5.5,No
Usr028,2026-10-03,Seo/sem,21,Cdmx,Ios,Consideración,Usar guía de tallas,3.2,Sí,0.0,N/a,20.51,No
Usr124,2026-10-03,Influencer,22,Cdmx,Ios,Conversión,Compra exitosa,5.8,Sí,4236.05,Apple pay,142.48,No
Usr135,2026-10-03,Instagram,20,Mty,Ios,Consideración,Usar guía de tallas,4.5,Sí,0.0,N/a,44.4,No
Usr134,2026-10-04,Instagram,22,Cdmx,Ios,Consideración,Usar guía de tallas,7.7,Sí,0.0,N/a,48.15,No
Usr084,2026-10-04,Tiktok,21,Mty,Android,Descubrimiento,Ver reel,0.6,No,0.0,N/a,33.59,No
Usr148,2026-10-05,Tiktok,34,Gdl,Ios,Descubrimiento,Ver reel,0.6,No,0.0,N/a,29.36,No
Usr146,2026-10-05,Instagram,33,Gdl,Android,Consideración,Guardar en clóset,6.9,Sí,0.0,N/a,47.2,No
Usr067,2026-10-05,Influencer,29,Gdl,Android,Conversión,Compra exitosa,10.0,Sí,4804.48,Apple pay,138.38,No
Usr122,2026-10-05,Influencer,33,Mty,Ios,Conversión,Compra exitosa,11.9,Sí,5270.69,Apple pay,171.86,No
Usr123,2026-10-05,Instagram,34,Mty,Ios,Fidelización,Recompra,6.4,No,2392.01,Apple pay,41.74,Sí
Usr141,2026-10-05,Tiktok,26,Cdmx,Ios,Consideración,Añadir al carrito,6.3,No,0.0,N/a,34.86,No
Usr070,2026-10-06,Tiktok,23,Mty,Android,Descubrimiento,Ver reel,1.5,No,0.0,N/a,34.64,No
Usr086,2026-10-06,Influencer,35,Qro,Android,Fidelización,Recompra,14.4,Sí,5616.73,Tarjeta,144.95,Sí
Usr015,2026-10-06,Instagram,22,Cdmx,Ios,Fidelización,Recompra,5.3,Sí,2094.7,Tarjeta,48.17,No
Usr149,2026-10-07,Instagram,28,Qro,Android,Consideración,Añadir al carrito,7.2,No,0.0,N/a,53.25,No
Usr045,2026-10-07,Tiktok,30,Cdmx,Ios,Descubrimiento,Ver reel,1.7,No,0.0,N/a,34.46,No
Usr140,2026-10-07,Influencer,29,Cdmx,Ios,Consideración,Guardar en clóset,6.5,No,0.0,N/a,145.35,No
Usr025,2026-10-08,Seo/sem,35,Cdmx,Ios,Descubrimiento,Visita al sitio,1.9,No,0.0,N/a,22.35,No
Usr127,2026-10-09,Influencer,23,Cdmx,Ios,Conversión,Compra exitosa,8.2,Sí,6157.93,Spei,159.28,No
Usr001,2026-10-09,Influencer,32,Cdmx,Ios,Consideración,Añadir al carrito,3.1,No,0.0,N/a,145.48,No
Usr008,2026-10-09,Instagram,24,Cdmx,Android,Fidelización,Recompra,13.0,No,2201.42,Spei,47.64,Sí
Usr050,2026-10-09,Email,27,Cdmx,Ios,Consideración,Añadir al carrito,7.9,No,0.0,N/a,5.22,No
Usr016,2026-10-10,Tiktok,31,Mty,Ios,Descubrimiento,Ver reel,2.0,No,0.0,N/a,30.76,No
Usr143,2026-10-10,Tiktok,24,Cdmx,Ios,Descubrimiento,Ver reel,1.2,No,0.0,N/a,29.15,No
Usr094,2026-10-10,Instagram,33,Cdmx,Ios,Descubrimiento,Ver reel,1.7,No,0.0,N/a,44.38,No
Usr072,2026-10-10,Tiktok,23,Cdmx,Ios,Descubrimiento,Ver reel,2.5,No,0.0,N/a,27.38,No
Usr128,2026-10-11,Tiktok,35,Cdmx,Ios,Descubrimiento,Ver reel,1.9,No,0.0,N/a,30.85,No
Usr105,2026-10-11,Tiktok,25,Mty,Ios,Conversión,Compra exitosa,12.9,Sí,2335.16,Tarjeta,28.96,No
Usr035,2026-10-12,Tiktok,27,Cdmx,Ios,Descubrimiento,Ver reel,1.7,No,0.0,N/a,35.5,No
Usr077,2026-10-12,Instagram,35,Cdmx,Ios,Fidelización,Recompra,7.3,No,2799.29,Spei,42.75,Sí
Usr126,2026-10-12,Tiktok,27,Qro,Ios,Descubrimiento,Ver reel,0.9,No,0.0,N/a,29.08,No
Usr005,2026-10-13,Tiktok,22,Cdmx,Ios,Consideración,Guardar en clóset,3.3,No,0.0,N/a,28.68,No
Usr031,2026-10-14,Seo/sem,34,Gdl,Ios,Fidelización,Recompra,14.9,Sí,2292.48,Spei,23.3,Sí
Usr083,2026-10-14,Instagram,31,Mty,Ios,Conversión,Compra exitosa,7.2,Sí,2573.95,Apple pay,42.58,No
Usr142,2026-10-14,Tiktok,29,Cdmx,Ios,Descubrimiento,Ver reel,2.3,No,0.0,N/a,32.22,No
Usr041,2026-10-14,Instagram,25,Cdmx,Android,Descubrimiento,Ver reel,3.7,No,0.0,N/a,44.09,No
Usr064,2026-10-14,Email,27,Cdmx,Android,Conversión,Compra exitosa,13.1,Sí,2601.71,Apple pay,5.93,No
Usr023,2026-10-14,Seo/sem,26,Cdmx,Android,Consideración,Guardar en clóset,6.6,No,0.0,N/a,20.45,No
Usr115,2026-10-14,Instagram,24,Cdmx,Ios,Descubrimiento,Ver reel,3.0,No,0.0,N/a,41.59,No
Usr104,2026-10-15,Tiktok,34,Mty,Ios,Consideración,Guardar en clóset,5.4,No,0.0,N/a,27.69,No
Usr108,2026-10-15,Seo/sem,24,Cdmx,Ios,Consideración,Usar guía de tallas,5.8,Sí,0.0,N/a,22.95,No
Usr097,2026-10-15,Tiktok,29,Qro,Ios,Consideración,Usar guía de tallas,6.3,Sí,0.0,N/a,29.4,No
Usr150,2026-10-17,Email,31,Cdmx,Android,Conversión,Compra exitosa,12.1,Sí,2894.94,Spei,5.78,No
Usr062,2026-10-17,Instagram,21,Cdmx,Ios,Conversión,Compra exitosa,6.6,No,3243.69,Apple pay,48.85,No
Usr066,2026-10-17,Influencer,31,Gdl,Android,Consideración,Guardar en clóset,6.7,Sí,0.0,N/a,172.16,No
Usr099,2026-10-17,Instagram,25,Gdl,Ios,Conversión,Compra exitosa,10.1,Sí,2074.08,Spei,51.54,No
Usr039,2026-10-17,Tiktok,35,Cdmx,Ios,Consideración,Guardar en clóset,6.2,No,0.0,N/a,35.83,No
Usr089,2026-10-18,Instagram,25,Cdmx,Android,Descubrimiento,Ver reel,3.3,No,0.0,N/a,51.03,No
Usr136,2026-10-18,Email,27,Gdl,Ios,Fidelización,Recompra,8.4,Sí,3364.06,Apple pay,5.31,No
Usr033,2026-10-19,Instagram,29,Cdmx,Android,Descubrimiento,Ver reel,1.9,No,0.0,N/a,49.79,No
Usr055,2026-10-20,Instagram,35,Cdmx,Ios,Descubrimiento,Ver reel,2.7,No,0.0,N/a,50.06,No
Usr071,2026-10-20,Tiktok,32,Cdmx,Android,Consideración,Guardar en clóset,7.4,No,0.0,N/a,30.11,No
Usr040,2026-10-21,Tiktok,34,Gdl,Ios,Consideración,Guardar en clóset,6.8,Sí,0.0,N/a,35.72,No
Usr046,2026-10-21,Tiktok,29,Gdl,Ios,Descubrimiento,Ver reel,1.5,No,0.0,N/a,27.2,No
Usr119,2026-10-21,Instagram,32,Cdmx,Ios,Consideración,Guardar en clóset,4.4,No,0.0,N/a,50.9,No
Usr043,2026-10-22,Tiktok,21,Qro,Android,Descubrimiento,Ver reel,0.8,No,0.0,N/a,30.84,No
Usr002,2026-10-22,Influencer,33,Cdmx,Android,Conversión,Compra exitosa,7.2,Sí,5541.5,Spei,170.77,No
Usr020,2026-10-23,Instagram,32,Cdmx,Android,Fidelización,Recompra,6.5,Sí,3387.23,Apple pay,44.19,Sí
Usr014,2026-10-23,Email,34,Cdmx,Ios,Descubrimiento,Visita al sitio,4.0,No,0.0,N/a,5.1,No
Usr100,2026-10-23,Instagram,20,Cdmx,Ios,Conversión,Compra exitosa,7.3,Sí,1562.27,Spei,46.03,No
Usr058,2026-10-23,Instagram,29,Gdl,Android,Conversión,Compra exitosa,9.7,No,1871.05,Tarjeta,45.48,No
Usr076,2026-10-24,Tiktok,33,Cdmx,Ios,Consideración,Añadir al carrito,6.8,No,0.0,N/a,33.99,No
Usr079,2026-10-24,Tiktok,31,Cdmx,Ios,Descubrimiento,Ver reel,2.3,No,0.0,N/a,28.18,No
Usr137,2026-10-25,Tiktok,34,Cdmx,Ios,Consideración,Guardar en clóset,3.6,Sí,0.0,N/a,32.55,No
Usr042,2026-10-25,Instagram,26,Gdl,Android,Consideración,Guardar en clóset,5.5,Sí,0.0,N/a,49.76,No`;

const lines = raw.trim().split('\n');
const rows = lines.slice(1).map(l => {
  const parts = l.split(',');
  return {
    id: parts[0],
    fecha: parts[1],
    canal: parts[2],
    edad: parseInt(parts[3]),
    ubicacion: parts[4],
    dispositivo: parts[5],
    etapa: parts[6],
    accion: parts[7],
    tiempo: parseFloat(parts[8]),
    guia: parts[9],
    gasto: parseFloat(parts[10]),
    pago: parts[11],
    cpa: parseFloat(parts[12]),
    retenido: parts[13]
  };
});

fs.writeFileSync('public/elcoro/dashboard_data.json', JSON.stringify(rows, null, 2));
console.log('Successfully wrote', rows.length, 'records to public/elcoro/dashboard_data.json');
