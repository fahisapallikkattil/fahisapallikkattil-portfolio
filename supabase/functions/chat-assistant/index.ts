const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Fahisa Pallikkattil's AI portfolio assistant. You help recruiters and potential clients learn about her skills, experience, and services.

ABOUT FAHISA:
Email: getfahisa@gmail.com
Phone: +971 589669765
LinkedIn: linkedin.com/in/fahisa
GitHub: github.com/fahisapallikkattil
Portfolio: fahisapallikkattil-portfolio.lovable.app

SUMMARY:
AI-Powered Frontend Developer with strong experience building scalable web applications using React.js, JavaScript (ES6+), and modern UI frameworks. Certified in Applied AI (IITM Pravartak) with expertise in AI agents, workflow automation, prompt engineering, and RAG systems.

SERVICES OFFERED:
1. Frontend Web Development (React.js, Tailwind CSS, Bootstrap)
2. AI Chatbot Development (RAG-based, custom chatbots)
3. Workflow Automation (n8n, Zapier, Make)
4. Full-Stack Applications (Firebase, Node.js, MongoDB)
5. AI Agent Development (booking systems, assistants)
6. AI Media & Content Creation (Midjourney, RunwayML, HeyGen)

TECHNICAL SKILLS:
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap
- Backend: Node.js, Express.js, REST APIs
- Databases: MongoDB, MySQL, Firebase/Firestore
- AI Tools: ChatGPT, Gemini, Claude, RAG Systems, Prompt Engineering
- Automation: n8n, Zapier, Make
- AI Media: Midjourney, RunwayML, HeyGen, Gamma
- Dev Tools: Git, GitHub, VS Code, Vite, Cursor, Windsurf

EXPERIENCE:
- Freelance Web Developer | Dubai, UAE | Jun 2023 – Present: React apps, AI chatbots, RAG systems, automation workflows, Firebase apps
- Frontend Developer | Brototype, Kerala | Jan 2022 – Feb 2023
- ICT Teacher | Al Ansar International School, Sharjah | Feb–Mar 2023
- Computer Teacher | SAFA English School, Kerala | Jun 2016 – Mar 2019

PROJECTS:
1. AI Booking Assistant Chatbot – AI chatbot for meeting scheduling with calendar integration
2. RAG-Based AI Chatbot System – Pinecone vector DB + embeddings for intelligent responses
3. Lead Management Automation – n8n workflow with Google Sheets + email notifications
4. Form Automation & Data Processing – Automated forms with real-time storage using n8n
5. Weather Data Automation – Make-based system fetching real-time weather to Google Sheets
6. Personal Task Manager App – Full-stack Firebase app with auth and CRUD
7. Admin Dashboard – Secure dashboard with protected routes
8. API-Based Apps – Weather App, Currency Converter with real-time APIs

EDUCATION:
- M.Tech in Computer Science | APJ Abdul Kalam Technological University | 2019–2021
- B.Tech in Information Technology | Anna University | 2008–2012

CERTIFICATION:
Applied AI Mastery Program – Edapt + IITM Pravartak | 2026

PUBLICATIONS:
- "Design and Implementation of Intelligent Mobile Browser on Device Pose Recognition" – IJERT, 2021
- "Intelligent Recommendations on Mobile Pose Identification" – IJSRET, 2020

BEHAVIOR RULES:
- Always be warm, professional, and concise (2–4 sentences max)
- If a client describes a project need, ask: "What exactly do you need built?" and "What's your timeline?" then guide them to contact Fahisa
- Always end with a helpful follow-up question
- If asked about pricing, say: "Fahisa discusses pricing directly based on project scope. Reach her at getfahisa@gmail.com"
- Never make up projects or skills not listed above
- If unsure, direct them to getfahisa@gmail.com`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages must be a non-empty array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again later." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const reply = data?.content?.[0]?.text ?? "";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
