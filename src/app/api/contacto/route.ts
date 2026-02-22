// src/app/api/contacto/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    // 1. Validación de seguridad en el backend
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Parámetros de conexión incompletos.' },
        { status: 400 }
      );
    }

    // 2. Configuración del Transmisor SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 3. Diseño HTML de Alta Fidelidad y Copywriting Humano
    const htmlEmailTemplate = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Mensaje de Contacto</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
          <tr>
            <td align="center">
              
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0D0C0B; border: 1px solid #3A3530; border-radius: 8px; overflow: hidden; margin: 0 auto;">
                
                <tr>
                  <td style="background-color: #E05A3D; height: 6px; width: 100%;"></td>
                </tr>

                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h1 style="color: #F2EBE5; font-size: 26px; margin: 0 0 10px 0; font-weight: 300; letter-spacing: -0.5px;">Nueva Conexión Estratégica</h1>
                    <p style="color: #8A7E73; font-size: 16px; margin: 0; line-height: 1.6;">
                      Hola Elian, <br>
                      Has recibido un nuevo mensaje directo desde tu portafolio ejecutivo. Alguien está interesado en conectar contigo.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 40px 20px 40px;">
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <p style="margin: 0 0 5px 0; color: #8A7E73; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Remitente</p>
                          <p style="margin: 0; color: #F2EBE5; font-size: 18px;">${nombre}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 30px;">
                          <p style="margin: 0 0 5px 0; color: #8A7E73; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Correo de Contacto</p>
                          <p style="margin: 0;">
                            <a href="mailto:${email}" style="color: #E05A3D; text-decoration: none; font-size: 16px;">${email}</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <p style="margin: 0 0 10px 0; color: #8A7E73; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Mensaje / Propuesta</p>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #151311; border-left: 3px solid #E05A3D; border-radius: 0 4px 4px 0;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; color: #F2EBE5; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${mensaje}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 10px 40px 40px 40px;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="background-color: #E05A3D; border-radius: 4px;">
                          <a href="mailto:${email}" style="display: inline-block; padding: 16px 32px; color: #0D0C0B; font-weight: bold; font-size: 14px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                            Responder a ${nombre}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #151311; padding: 25px; text-align: center; border-top: 1px solid #3A3530;">
                    <p style="margin: 0; color: #8A7E73; font-size: 12px; font-family: 'Courier New', Courier, monospace;">
                      Transmitido de forma segura desde Helvion System<br>
                      <a href="https://elian.is-a.dev" style="color: #8A7E73; text-decoration: none;">elian.is-a.dev</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 4. Estructura del paquete de datos
    const mailOptions = {
      from: `"${nombre} (Vía Helvion)" <${process.env.SMTP_USER}>`,
      replyTo: email, 
      to: process.env.CONTACT_EMAIL,
      subject: `Nueva Propuesta Comercial de: ${nombre}`,
      text: `Tienes un nuevo mensaje de ${nombre} (${email}). Mensaje: ${mensaje}`, // Fallback en texto plano
      html: htmlEmailTemplate, // Inyección del diseño HTML
    };

    // 5. Ejecución del envío
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Transmisión exitosa' }, { status: 200 });

  } catch (error) {
    console.error('Error en el nodo SMTP:', error);
    return NextResponse.json(
      { error: 'Fallo en la arquitectura de red SMTP.' },
      { status: 500 }
    );
  }
}