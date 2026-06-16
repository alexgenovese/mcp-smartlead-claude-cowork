const BASE_URL = "https://server.smartlead.ai/api/v1";

function buildUrl(path, params = {}) {
  const apiKey = process.env.SMARTLEAD_API_KEY;
  if (!apiKey) {
    throw new Error("SMARTLEAD_API_KEY environment variable is required");
  }
  const clean = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  clean.api_key = apiKey;
  const qs = new URLSearchParams(clean).toString();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}?${qs}`;
}

export async function get(path, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url);
  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`SmartLead API error ${response.status}: ${err}`);
  }
  return response.json();
}

export async function post(path, body = {}, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`SmartLead API error ${response.status}: ${err}`);
  }
  return response.json();
}

export async function patch(path, body = {}, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`SmartLead API error ${response.status}: ${err}`);
  }
  return response.json();
}

export async function del(path, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`SmartLead API error ${response.status}: ${err}`);
  }
  return response.json();
}
