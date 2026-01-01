import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { systemPrompts, Industry, CONVERSION_MESSAGE } from '@/app/lib/chatPrompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, industry, messageCount } = body as {
      messages: ChatMessage[];
      industry: Industry;
      messageCount: number;
    };

    if (!industry || !systemPrompts[industry]) {
      return NextResponse.json(
        { error: 'Invalid industry selected' },
        { status: 400 }
      );
    }

    // Build conversation with system prompt
    const systemMessage: ChatMessage = {
      role: 'system',
      content: systemPrompts[industry] + `

ДОПОЛНИТЕЛЬНЫЕ ПРАВИЛА:
- Отвечай на языке пользователя (русский/английский)
- Держи ответы краткими (2-4 предложения обычно)
- Используй эмодзи умеренно
- Не повторяй одни и те же фразы
- Будь естественным и человечным
- НИКОГДА не говори что ты ChatGPT, GPT, AI от OpenAI или демо-версия
- Ты — реальный AI-ассистент этого бизнеса`,
    };

    const conversationMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conversationMessages,
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    let response = completion.choices[0]?.message?.content || 'Извини, не смог обработать запрос.';

    // Add conversion prompt after 4-6 messages (only once)
    const shouldShowConversion = messageCount >= 4 && messageCount <= 6 && messageCount === 5;
    
    return NextResponse.json({
      message: response,
      showConversion: shouldShowConversion,
      conversionMessage: shouldShowConversion ? CONVERSION_MESSAGE : null,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

