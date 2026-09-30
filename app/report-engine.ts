export type Platform = "YouTube" | "TikTok" | "Instagram" | "Facebook";

export type Row = {
  platform: Platform;
  channel: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers: number;
  revenue: number;
};

const num = (v: unknown) => {
  const n = Number(String(v ?? "").replace(/[$,% ,]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function parseCsv(text: string, fallbackPlatform: Platform): Row[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const cells = (line: string) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ""));
  const headers = cells(lines[0]).map(h => h.toLowerCase());
  const find = (...names: string[]) => headers.findIndex(h => names.some(n => h.includes(n)));
  const get = (row: string[], names: string[]) => row[find(...names)] ?? "";
  return lines.slice(1).map(line => {
    const row = cells(line);
    const rawPlatform = get(row, ["platform", "平台"]).toLowerCase();
    const platform: Platform = rawPlatform.includes("tiktok") ? "TikTok" : rawPlatform.includes("instagram") ? "Instagram" : rawPlatform.includes("facebook", "meta") ? "Facebook" : fallbackPlatform;
    return {
      platform,
      channel: get(row, ["channel", "account", "page", "账号", "频道"]) || "Unknown channel",
      title: get(row, ["title", "video", "content", "post", "内容", "标题"]) || "Untitled content",
      views: num(get(row, ["views", "view", "播放"])),
      likes: num(get(row, ["likes", "like", "点赞", "reactions"])),
      comments: num(get(row, ["comments", "comment", "评论"])),
      shares: num(get(row, ["shares", "share", "分享"])),
      followers: num(get(row, ["followers", "subscribers", "fans", "粉丝", "订阅"])),
      revenue: num(get(row, ["revenue", "earnings", "income", "收入", "收益"])),
    };
  }).filter(r => r.channel !== "Unknown channel" || r.views || r.revenue);
}

export function summarize(rows: Row[]) {
  const total = (key: keyof Row) => rows.reduce((sum, row) => sum + Number(row[key] || 0), 0);
  const platforms = (["YouTube", "TikTok", "Instagram", "Facebook"] as Platform[]).map(platform => {
    const items = rows.filter(r => r.platform === platform);
    return {
      platform,
      posts: items.length,
      views: items.reduce((s, r) => s + r.views, 0),
      likes: items.reduce((s, r) => s + r.likes, 0),
      comments: items.reduce((s, r) => s + r.comments, 0),
      shares: items.reduce((s, r) => s + r.shares, 0),
      revenue: items.reduce((s, r) => s + r.revenue, 0),
      followers: Math.max(0, ...items.map(r => r.followers)),
    };
  }).filter(p => p.posts);

  const topContent = [...rows].sort((a,b) => b.views - a.views).slice(0, 10);
  return {
    posts: rows.length,
    views: total("views"),
    likes: total("likes"),
    comments: total("comments"),
    shares: total("shares"),
    revenue: total("revenue"),
    platforms,
    topContent,
  };
}

export function buildEmailHtml(title: string, summary: ReturnType<typeof summarize>) {
  const platformRows = summary.platforms.map(p => `<tr><td><b>${p.platform}</b></td><td>${p.posts.toLocaleString()}</td><td>${p.views.toLocaleString()}</td><td>${p.likes.toLocaleString()}</td><td>$${p.revenue.toFixed(2)}</td></tr>`).join("");
  const contentRows = summary.topContent.slice(0, 5).map((c,i) => `<tr><td>${i+1}</td><td>${escapeHtml(c.title)}</td><td>${escapeHtml(c.channel)}</td><td>${c.views.toLocaleString()}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#f3f5f1;font-family:Arial,sans-serif;color:#18211d"><div style="max-width:760px;margin:0 auto;padding:32px 18px"><div style="background:#18211d;color:#fff;padding:28px;border-radius:16px"><div style="font-size:11px;letter-spacing:2px;color:#c7f85b">SOCIAL INTELLIGENCE</div><h1 style="margin:10px 0 4px;font-size:30px">${escapeHtml(title)}</h1><p style="color:#aab4ae">Weekly performance summary</p></div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0"><div style="background:#fff;padding:18px;border-radius:12px"><small>VIEWS</small><h2>${summary.views.toLocaleString()}</h2></div><div style="background:#fff;padding:18px;border-radius:12px"><small>REVENUE</small><h2>$${summary.revenue.toFixed(2)}</h2></div><div style="background:#fff;padding:18px;border-radius:12px"><small>ENGAGEMENT</small><h2>${(summary.likes+summary.comments+summary.shares).toLocaleString()}</h2></div><div style="background:#fff;padding:18px;border-radius:12px"><small>CONTENT</small><h2>${summary.posts.toLocaleString()}</h2></div></div><div style="background:#fff;padding:22px;border-radius:12px;margin:14px 0"><h2>Platform performance</h2><table style="width:100%;border-collapse:collapse"><tr><th align="left">Platform</th><th align="left">Posts</th><th align="left">Views</th><th align="left">Likes</th><th align="left">Revenue</th></tr>${platformRows}</table></div><div style="background:#fff;padding:22px;border-radius:12px"><h2>Top content by views</h2><table style="width:100%;border-collapse:collapse"><tr><th align="left">#</th><th align="left">Content</th><th align="left">Channel</th><th align="left">Views</th></tr>${contentRows}</table></div></div></body></html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c]!));
}
