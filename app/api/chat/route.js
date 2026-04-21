import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Ambil pesan dan history (catatan)
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // 1. KITA FILTER: Gemini hanya mau history yang isinya User -> Model
    // Kita buang pesan pertama kalau itu bukan dari User
    const validHistory = (history || [])
      .filter(msg => msg.role === 'user' || msg.role === 'bot')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

    // 2. Jika history dimulai dengan 'model', kita buang pesan pertamanya 
    // supaya Gemini tidak pusing (karena dia mau User dulu yang mulai)
    if (validHistory.length > 0 && validHistory[0].role === 'model') {
      validHistory.shift(); 
    }

    const systemPrompt = "Kamu asisten Salamah Farm yang ramah dan ahli hewan qurban.";

    // 3. Mulai Chat dengan History yang sudah rapi
    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(systemPrompt + "\n\nUser: " + message);
    const response = await result.response;
    
    // Kirim balik jawabannya (Pastikan namanya 'text' atau 'reply')
    return NextResponse.json({ text: response.text() });

  } catch (error) {
    console.error("Error AI:", error); // Biar kita bisa lihat error aslinya di terminal
    return NextResponse.json({ text: "Aduh, robotnya lagi pusing!" });
  }
}