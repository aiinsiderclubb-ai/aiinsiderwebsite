import { NextRequest, NextResponse } from 'next/server';

export interface LeadData {
  name: string;
  business: string;
  contact: string;
  industry: string;
  source: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, contact, industry } = body as Partial<LeadData>;

    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact are required' },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      name: name || '',
      business: business || '',
      contact: contact || '',
      industry: industry || 'unknown',
      source: 'AI Chat Widget',
      timestamp: new Date().toISOString(),
    };

    // Log the lead (in production, send to CRM, email, database, etc.)
    console.log('🎯 New Lead Captured:', leadData);

    // Here you would typically:
    // - Send to a CRM (HubSpot, Salesforce, etc.)
    // - Store in database
    // - Send notification email
    // - Send to webhook

    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: Date.now().toString(),
    });
  } catch (error) {
    console.error('Lead API Error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}

