import { useState } from "react";
import "./App.css";

function App() {
  const [rawText, setRawText] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState(null);

  const PLATFORM_STYLES = {
    linkedin: { background: "#eef6fb", borderColor: "#0a66c2" },
    twitter: { background: "#e8f5fe", borderColor: "#1da1f2" },
    instagram: { background: "#fff0f6", borderColor: "#c32aa3" },
    facebook: { background: "#eef3fb", borderColor: "#1877f2" }
  };

  // CLEAN & SAFE JSON EXTRACTOR
  const extractJSON = (text) => {
    if (!text) return [];

    // Remove Markdown JSON fences
    text = text.replace(/```json/gi, "")
               .replace(/```/g, "")
               .trim();

    try {
      return JSON.parse(text);
    } catch (err) {
      console.log("JSON parse failed:", err, "text was:", text);
      return [];
    }
  };

  // CALL GEMINI API
async function contactAI() {
  setLoading(true);
  setPosts([]);

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert social media content writer.
Your task is to generate UNIQUE posts for each platform requested by the user.

User Input:
${rawText}

Platforms selected: ${platforms.join(", ")}

Follow these STRICT platform rules:

1. LinkedIn:
   - Professional tone
   - 5–8 lines
   - Insightful + value-driven
   - 2–4 hashtags at end

2. Twitter:
   - Max 280 characters
   - Short, punchy, bold
   - 1–2 relevant hashtags
   - No long sentences

3. Instagram:
   - Casual, friendly, emoji-rich
   - Short 2–3 lines caption
   - Add 4–8 trending hashtags

4. Facebook:
   - Conversational & community-focused
   - Easy language
   - 2–3 emojis max

RETURN STRICT JSON ONLY.
NO markdown, NO code blocks, NO explanation.

JSON FORMAT:
[
  { "platform":"LinkedIn", "content":"..." },
  { "platform":"Twitter", "content":"..." }
]

Generate ONLY for the platforms selected by the user.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Gemini output location
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const parsed = extractJSON(text);
    setPosts(parsed);
  } catch (err) {
    console.error("API Error:", err);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="app-container " >
      <header className="app-header">
        <h1 style={{ display: "flex", justifyContent: "center", width: "100%" }}>AI Social Post Generator</h1>
        
      </header>

      <div className="layout">
        <div className="left-panel">

          {/* INPUT */}
          <label className="label" style={{marginLeft:"200px"}}>Describe your project</label>
          <textarea
            className="input-textarea"
            placeholder="ASK HOW TO WRITE A SOCIAL POST FOR DIFFERENT PLATFORMS"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={6}
          />

          <div style={{display:'flex', gap:10, marginTop:8}}>
            <button className="fill-sample" onClick={()=> setRawText('Name: NXT Photo\nTech: Next.js, Vercel\nFeatures: Fast image uploads; filters; sharing; auth\nLink: https://example.com')}>
              Fill sample
            </button>
            <div style={{color:'var(--muted)', alignSelf:'center'}}>{platforms.length} selected</div>
          </div>

          {/* PLATFORM SELECT */}
          <div className="platforms">
        {[
          { id: "linkedin", label: "LinkedIn" },
          { id: "twitter", label: "Twitter" },
          { id: "instagram", label: "Instagram" },
          { id: "facebook", label: "Facebook" }
        ].map((p) => (
          <label key={p.id} className="platform-label">
            <input
              type="checkbox"
              value={p.id}
              checked={platforms.includes(p.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPlatforms([...platforms, p.id]);
                } else {
                  setPlatforms(platforms.filter((x) => x !== p.id));
                }
              }}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </div>

          <div className="action-row">
            <button
              className="generate-btn"
              onClick={contactAI}
              disabled={loading || !rawText.trim() || platforms.length === 0}
            >
              {loading ? "Generating..." : "Generate with Gemini AI"}
            </button>
          </div>
        </div>

        <div className="right-panel">
          <h2>Preview</h2>
          <div className="results">
            {posts.map((p, index) => {
              const style = PLATFORM_STYLES[p.platform.toLowerCase()] || {};
              return (
                <article
                  key={index}
                  className="platform-card"
                  data-platform={p.platform}
                  style={{ ["--card-border"]: style.borderColor || "#ccc", ["--card-bg"]: style.background || "#fafafa" }}
                >
                  <div className="card-head">
                    <h3 className="card-title" style={{color:"black"}}>{p.platform} <span style={{fontSize:12, color:'var(--muted)', marginLeft:8}}>• {p.platform==='Twitter' ? '280 char' : 'Post'}</span></h3>
                  </div>
                  <div className="card-body">
                    <p>{p.content}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="copy-btn"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(p.content);
                          setCopiedPlatform(p.platform);
                          setTimeout(()=>setCopiedPlatform(null), 1400);
                        } catch (err) {
                          const ta = document.createElement("textarea");
                          ta.value = p.content;
                          document.body.appendChild(ta);
                          ta.select();
                          document.execCommand("copy");
                          document.body.removeChild(ta);
                          setCopiedPlatform(p.platform);
                          setTimeout(()=>setCopiedPlatform(null), 1400);
                        }
                      }}
                    >
                      Copy
                    </button>
                    {copiedPlatform === p.platform && <span style={{color:'#5eead4', marginLeft:10}}>Copied!</span>}
                  </div>
                </article>
              );
            })}
            {posts.length===0 && <div style={{color:'var(--muted)', padding:12}}>No generated posts yet — select platforms and click generate.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
