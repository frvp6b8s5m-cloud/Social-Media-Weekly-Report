import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the first real weekly snapshot", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>ReelShort 海外社媒经营周报<\/title>/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /property="og:image" content="https:\/\/reelshort-social-weekly\.zhuj2898\.chatgpt\.site\/og\.png"/);
  assert.match(html, /2026 W28/);
  assert.match(html, /\$9,495\.68/);
  assert.match(html, /\$6,996\.82/);
  assert.match(html, /37\.57M/);
  assert.match(html, /YouTube 4\.77M \+ Facebook 32\.80M/);
  assert.doesNotMatch(html, /口径不同，不合并/);
  assert.match(html, /频道\/主页/);
  assert.match(html, /ReelShort APP Moments/);
  assert.match(html, /ReelShort Thai/);
  assert.match(html, /ReelShort Indonesia/);
  assert.doesNotMatch(html, /英语频道[123]/);
  assert.doesNotMatch(html, /平台 \/ 账号/);
  assert.match(html, /首次快照/);
  assert.doesNotMatch(html, /演示数据/);
  assert.doesNotMatch(html, /2026 W27/);
});

test("preserves attribution and missing-data boundaries", async () => {
  const html = await (await render()).text();
  assert.match(html, /泰语、印尼语主页未提供收入字段/);
  assert.match(html, /不能把缺失项按0处理/);
  assert.match(html, /原始文件也没有剧目字段/);
  assert.match(html, /激活率不可计算/);
  assert.match(html, /单次点击收入与点击→激活转化率本周均标为“不可计算”/);
});

test("keeps YouTube registration separate from Meta matching analytics", async () => {
  const html = await (await render()).text();
  assert.match(html, /无YouTube CMS，不展示匹配与屏蔽数据/);
  assert.match(html, /Meta指标不能代表YouTube版权匹配情况/);
  assert.match(html, /16\.30万/);
  assert.match(html, /FB 100%/);
  assert.match(html, /Instagram 0%/);
  assert.match(html, /按版权登记表中的手工排名顺序展示/);
  assert.doesNotMatch(html, /按时完成率/);
});
