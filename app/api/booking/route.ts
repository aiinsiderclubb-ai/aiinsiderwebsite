import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Your email for receiving booking notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@aiinsider.club';
const FROM_EMAIL = process.env.FROM_EMAIL || 'AI Insider <bookings@aiinsider.club>';

export interface BookingData {
  name: string;
  email: string;
  company?: string;
  date: string;
  time: string;
  timezone: string;
  message?: string;
}

// Beautiful HTML email template for the client
function getClientEmailHTML(booking: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <div style="display: inline-block; background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">
                <span style="color: #ffffff; font-weight: bold; font-size: 18px;">AI Insider</span>
              </div>
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
                ✨ Booking Confirmed!
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #b4b4c8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Hi <strong style="color: #ffffff;">${booking.name}</strong>,
              </p>
              <p style="color: #b4b4c8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Your intro call has been successfully scheduled. We're excited to discuss how AI can transform your business!
              </p>
              
              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 20px; font-weight: 600;">
                      📅 Meeting Details
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <span style="color: #888; font-size: 14px;">Date</span>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right;">
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${booking.date}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <span style="color: #888; font-size: 14px;">Time</span>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right;">
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${booking.time}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <span style="color: #888; font-size: 14px;">Timezone</span>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: right;">
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${booking.timezone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <span style="color: #888; font-size: 14px;">Duration</span>
                        </td>
                        <td style="padding: 10px 0; text-align: right;">
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600;">30 minutes</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- What to expect -->
              <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 15px; font-weight: 600;">
                What to expect:
              </h3>
              <ul style="color: #b4b4c8; font-size: 14px; line-height: 2; margin: 0 0 30px; padding-left: 20px;">
                <li>💬 Q&A - Get answers to all your questions</li>
                <li>🎯 Customized recommendations for your business</li>
                <li>📈 Product growth discussion</li>
                <li>🚀 Essential guidance on AI implementation</li>
              </ul>
              
              <p style="color: #b4b4c8; font-size: 14px; line-height: 1.6; margin: 0;">
                A calendar invite with the video call link will be sent shortly.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0 0 10px;">
                Questions? Reply to this email or contact us at hello@aiinsider.club
              </p>
              <p style="color: #444; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} AI Insider. Based in Switzerland, working globally.
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
}

// Email template for admin notification
function getAdminEmailHTML(booking: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(139,92,246,0.1) 100%); border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(139,92,246,0.15) 100%); border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
                🎯 New Booking!
              </h1>
              <p style="color: #22d3ee; font-size: 16px; margin: 10px 0 0;">
                Someone just booked an intro call
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Client Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #22d3ee; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
                      👤 Client Information
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Name:</span>
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600; margin-left: 10px;">${booking.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Email:</span>
                          <a href="mailto:${booking.email}" style="color: #22d3ee; font-size: 14px; margin-left: 10px;">${booking.email}</a>
                        </td>
                      </tr>
                      ${booking.company ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Company:</span>
                          <span style="color: #ffffff; font-size: 14px; margin-left: 10px;">${booking.company}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #8b5cf6; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
                      📅 Meeting Details
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Date:</span>
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600; margin-left: 10px;">${booking.date}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Time:</span>
                          <span style="color: #ffffff; font-size: 14px; font-weight: 600; margin-left: 10px;">${booking.time}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888; font-size: 13px;">Timezone:</span>
                          <span style="color: #ffffff; font-size: 14px; margin-left: 10px;">${booking.timezone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              ${booking.message ? `
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #f59e0b; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
                      💬 Message
                    </h3>
                    <p style="color: #b4b4c8; font-size: 14px; line-height: 1.6; margin: 0;">${booking.message}</p>
                  </td>
                </tr>
              </table>
              ` : ''}
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Booked at ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' })} (CET)
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
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, date, time, timezone, message } = body as BookingData;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, date and time are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const bookingData: BookingData = {
      name,
      email,
      company,
      date,
      time,
      timezone: timezone || 'Central European Time (CET)',
      message,
    };

    // Send confirmation email to client
    const clientEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `✨ Booking Confirmed - ${date} at ${time}`,
      html: getClientEmailHTML(bookingData),
    });

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎯 New Booking: ${name} - ${date} at ${time}`,
      html: getAdminEmailHTML(bookingData),
    });

    console.log('📧 Emails sent:', { client: clientEmailResult, admin: adminEmailResult });

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed! Check your email for confirmation.',
      bookingId: Date.now().toString(),
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again.' },
      { status: 500 }
    );
  }
}

