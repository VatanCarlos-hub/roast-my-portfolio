export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { portfolio } = req.body;
  if (!portfolio) return res.status(400).json({ error: 'No portfolio provided' });

  try {
    const prompt = `You are a brutal but hilarious crypto roast comedian. Roast this crypto portfolio in exactly 2-3 savage, witty sentences. Be specific to the coins mentioned. Portfolio: ${portfolio}`;
    
    const response = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
      { headers: { 'Accept': 'text/plain' } }
    );
    
    const roast = await response.text();
    res.json({ roast: roast.trim() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
