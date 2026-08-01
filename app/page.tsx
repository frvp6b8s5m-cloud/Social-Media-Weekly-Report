const accounts = [
  { platform: "YouTube", name: "ReelShort", posts: 18, views: 3118841, watch: 127084.81, revenue: 4653.79, rpm: 1.4922 },
  { platform: "YouTube", name: "ReelShort Latinoamérica", posts: 12, views: 1323028, watch: 49477.38, revenue: 1220.045, rpm: 0.9222 },
  { platform: "YouTube", name: "Donut Highlights", posts: 4, views: 79734, watch: 4164.35, revenue: 68.193, rpm: 0.8553 },
  { platform: "YouTube", name: "ReelShort App - Polski", posts: 6, views: 13471, watch: 659.67, revenue: 41.561, rpm: 3.0852 },
  { platform: "YouTube", name: "ReelShort APP - FR", posts: 3, views: 63351, watch: 2575.82, revenue: 36.011, rpm: 0.5684 },
  { platform: "YouTube", name: "ReelShort - DE", posts: 9, views: 11324, watch: 635.49, revenue: 28.164, rpm: 2.4871 },
  { platform: "YouTube", name: "ReelShort APP Moments", posts: 4, views: 151446, watch: 738.2, revenue: 19.357, rpm: 0.1278 },
  { platform: "YouTube", name: "ReelShort App - Italiano", posts: 5, views: 6844, watch: 365.05, revenue: 14.105, rpm: 2.0609 },
  { platform: "Facebook", name: "ReelShort TV", posts: null, views: 32800427, watch: null, revenue: 915.5984, rpm: 0.0279 },
  { platform: "Facebook", name: "ReelShort Thai", posts: null, views: 685, watch: null, revenue: null, rpm: null },
  { platform: "Facebook", name: "ReelShort Indonesia", posts: null, views: 1495, watch: null, revenue: null, rpm: null },
];

const topContents = [
  { title: "My X Ray Vision Sees Right Through You [EP1-10]", account: "ReelShort", views: 118034, revenue: 294.753, rpm: 2.497 },
  { title: "Un secreto que él nunca debió descubrir…", account: "ReelShort Latinoamérica", views: 92164, revenue: 180.759, rpm: 1.961 },
  { title: "One summer night with her best friend’s brother…", account: "ReelShort", views: 34928, revenue: 172.359, rpm: 4.935 },
  { title: "Not the Bride He Wanted [EP1-13]", account: "ReelShort", views: 34223, revenue: 150.397, rpm: 4.395 },
  { title: "He married the wrong sister…", account: "ReelShort", views: 21720, revenue: 141.086, rpm: 6.496 },
];

const referralAccounts = [
  { name: "自营（主账号）", activations: 2663, payers: 70, orders: 87, revenue: 914.65 },
  { name: "自营-2（主账号）", activations: 645, payers: 46, orders: 68, revenue: 504.33 },
  { name: "自营-3（主账号）", activations: 362, payers: 24, orders: 36, revenue: 235.64 },
  { name: "自营-君泽-01（主账号）", activations: 799, payers: 36, orders: 44, revenue: 227.56 },
  { name: "自营-5（主账号）", activations: 1091, payers: 21, orders: 30, revenue: 169.7 },
];

const regions = [
  ["中国", 32], ["美国", 21], ["越南", 7], ["孟加拉国", 3], ["印度", 1],
] as const;

const metaTitles = [
  ["Brides in Smoke", "42,144"],
  ["Fated to Find You", "138,897"],
  ["The Next ReelStar", "187,333"],
  ["Fiance's Betrayal, Dante's Inferno", "7,904"],
  ["Apártense, Llegó El Magnate", "4,851"],
] as const;

const protectedTitles = [
  ["That Eight-Year-Old Girl Is an Archmage?!", "07月12日"],
  ["The Baby He Never Knew", "07月11日"],
  ["After the Goddess of Fate left, My Ex's Mafia Empire Crumbled", "07月11日"],
  ["After I Cheated 99 Times, My Husband Went Crazy with Regret", "07月11日"],
  ["The AC Went Out That Summer", "07月10日"],
] as const;

function money(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function compact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString("en-US");
}

function MetricCard({ label, value, note, accent }: { label: string; value: string; note: string; accent?: boolean }) {
  return (
    <article className={`metric-card ${accent ? "accent" : ""}`}>
      <div className="metric-head"><span>{label}</span><span className="baseline">首周基线</span></div>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="ReelShort周报首页">
          <span className="brand-mark">RS</span>
          <span><b>ReelShort</b><small>Social Intelligence</small></span>
        </a>
        <nav aria-label="周报章节">
          <a href="#overview">01 管理摘要</a>
          <a href="#ads">02 广告变现</a>
          <a href="#referral">03 链接引流</a>
          <a href="#rights">04 版权保护</a>
          <a href="#actions">05 趋势与行动</a>
        </nav>
        <span className="confidential">内部管理周报 · 待审查</span>
      </header>

      <section className="hero section" id="overview">
        <div className="hero-copy">
          <span className="eyebrow">OVERSEAS SOCIAL WEEKLY</span>
          <h1>海外社媒经营周报</h1>
          <div className="report-meta">
            <label>报告周期
              <select aria-label="报告周期"><option>2026 W28 · 07月06日—07月12日</option></select>
            </label>
            <span>首次快照</span><span>数据更新：07月17日 20:07</span><span>币种：USD</span>
          </div>
          <span className="section-label">EXECUTIVE READOUT</span>
          <h2>可统计范围收入 {money(9495.6844)}，广告变现贡献 73.7%</h2>
          <p className="hero-summary">YouTube频道 ReelShort 贡献YouTube收入的76.5%，ReelShort Latinoamérica 贡献20.1%；自营引流产生{money(2498.86)}付费金额，但点击字段为0，暂不能评价点击效率。</p>
        </div>
        <div className="share-card">
          <div className="donut" style={{ "--share": "73.7%" } as React.CSSProperties}><span><b>74%</b><small>广告收入占比</small></span></div>
          <div><strong>{money(6996.8244)}</strong><span>广告变现</span></div>
          <div><strong>{money(2498.86)}</strong><span>链接引流</span></div>
        </div>
      </section>

      <section className="metrics-grid section compact-section">
        <MetricCard label="总收入（可统计范围）" value={money(9495.6844)} note="首期真实数据快照" accent />
        <MetricCard label="广告收入" value={money(6996.8244)} note="YouTube + Facebook英语主页" />
        <MetricCard label="链接引流收入" value={money(2498.86)} note="机构字段含“自营”的付费金额" />
        <MetricCard label="平台播放量" value="37.57M" note="YouTube 4.77M + Facebook 32.80M；平台播放口径不同，仅作规模汇总" />
      </section>

      <section className="section snapshot-note">
        <b>收入口径</b>
        <p>Facebook广告收入采用Content Monetization {money(915.5984)}；订阅收入{money(149.45)}未计入广告收入。泰语、印尼语主页未提供收入字段，因此总收入属于“可统计范围”，不能把缺失项按0处理。</p>
      </section>

      <section className="section signal-grid">
        <div className="signal positive"><span>↗ 关键表现</span><ol><li><b>ReelShort</b>贡献YouTube收入76.5%，是本周核心收入支柱</li><li><b>ReelShort Latinoamérica</b>贡献YouTube收入20.1%，形成第二增长极</li><li><b>Meta版权</b>匹配16.30万，后台记录屏蔽率100%</li></ol></div>
        <div className="signal risk"><span>! 主要风险</span><ol><li><b>ReelShort APP Moments</b>151K播放仅产生{money(19.357)}，RPM为$0.128</li><li><b>引流点击为0</b>但激活6,324，漏斗上游口径需要核查</li><li><b>Facebook收入不完整</b>，ReelShort Thai及ReelShort Indonesia暂不能评价变现</li></ol></div>
      </section>

      <section className="section section-block" id="ads">
        <div className="section-title"><span>02 / MONETIZATION</span><h2>广告变现</h2><p>11个官方账号的规模、效率与收入贡献</p></div>
        <div className="platform-grid">
          <article className="platform-card youtube"><div><span>YouTube · 8个频道</span><strong>{money(6081.226)}</strong><small>占可统计广告收入86.9%</small></div><div className="platform-stats"><span>播放 <b>4.77M</b></span><span>观看时长 <b>185.7K h</b></span><span>RPM <b>$1.275</b></span><span>发布 <b>61条</b></span></div></article>
          <article className="platform-card facebook"><div><span>Facebook · 3个主页</span><strong>{money(915.5984)}</strong><small>仅英语主页提供变现字段</small></div><div className="platform-stats"><span>播放 <b>32.80M</b></span><span>触达 <b>16.83M</b></span><span>互动 <b>461.0K</b></span><span>链接点击 <b>11.7K</b></span></div></article>
        </div>

        <div className="table-card">
          <div className="card-heading"><div><span>ACCOUNT MATRIX</span><h3>频道/主页表现矩阵</h3></div><small>收入按高至低；“未提供”不等于0</small></div>
          <div className="table-wrap"><table><thead><tr><th>频道/主页</th><th>发布量</th><th>播放量</th><th>观看时长</th><th>广告收入</th><th>RPM</th></tr></thead><tbody>
            {accounts.map((row) => <tr key={`${row.platform}-${row.name}`} className={row.name === "ReelShort APP Moments" ? "warning-row" : ""}><td><span className={`platform-dot ${row.platform.toLowerCase()}`}></span><b>{row.name}</b><small>{row.platform}</small></td><td>{row.posts ?? "未提供"}</td><td>{compact(row.views)}</td><td>{row.watch == null ? "未提供" : `${compact(row.watch)} h`}</td><td>{row.revenue == null ? <span className="missing">未提供</span> : money(row.revenue)}</td><td>{row.rpm == null ? <span className="missing">不可计算</span> : `$${row.rpm.toFixed(3)}`}</td></tr>)}
          </tbody></table></div>
        </div>

        <div className="content-layout">
          <div className="table-card">
            <div className="card-heading"><div><span>TOP CONTENT</span><h3>YouTube内容收入 Top 5</h3></div><small>按广告收入排序</small></div>
            <div className="table-wrap"><table><thead><tr><th>#</th><th>内容</th><th>账号</th><th>播放</th><th>收入</th><th>RPM</th></tr></thead><tbody>{topContents.map((item, index) => <tr key={item.title}><td>{String(index + 1).padStart(2, "0")}</td><td className="title-cell">{item.title}</td><td>{item.account}</td><td>{compact(item.views)}</td><td>{money(item.revenue)}</td><td>${item.rpm.toFixed(3)}</td></tr>)}</tbody></table></div>
          </div>
          <aside className="insight-card dark"><span>待验证假设</span><h3>高播放不必然带来高收入</h3><p>ReelShort APP Moments播放151K，但RPM仅$0.128。需要进一步检查广告适配、受众地区、内容长度及受限变现状态，当前数据只能证明异常，不能直接证明原因。</p><div><b>验证动作</b><small>按视频核对变现状态、流量地区与广告展示率</small></div></aside>
        </div>
      </section>

      <section className="section section-block" id="referral">
        <div className="section-title"><span>03 / ACQUISITION</span><h2>链接引流</h2><p>仅统计分销文件中“机构”字段带有“自营”的账号</p></div>
        <div className="notice"><b>归因限制</b><span>当前链接不能区分Facebook与YouTube；原始文件也没有剧目字段，因此本期只呈现社媒整体、机构级结果，不推断平台或剧目贡献。</span></div>
        <div className="funnel">
          <div><small>点击</small><strong>0*</strong><span>原始字段为0</span></div><i>→</i><div><small>激活用户</small><strong>6,324</strong><span>激活率不可计算</span></div><i>→</i><div><small>付费人数</small><strong>228</strong><span>付费转化率 3.61%</span></div><i>→</i><div><small>订单</small><strong>309</strong><span>人均1.36单</span></div><i>→</i><div className="funnel-result"><small>付费金额</small><strong>{money(2498.86)}</strong><span>ARPPU {money(10.9599)}</span></div>
        </div>
        <div className="content-layout">
          <div className="table-card"><div className="card-heading"><div><span>SELF-OPERATED ACCOUNTS</span><h3>自营机构收入 Top 5</h3></div><small>不展示个人账号及邮箱</small></div><div className="table-wrap"><table><thead><tr><th>#</th><th>机构</th><th>激活</th><th>付费人数</th><th>订单</th><th>付费金额</th></tr></thead><tbody>{referralAccounts.map((item, index) => <tr key={item.name}><td>{String(index + 1).padStart(2, "0")}</td><td><b>{item.name}</b></td><td>{item.activations.toLocaleString()}</td><td>{item.payers}</td><td>{item.orders}</td><td>{money(item.revenue)}</td></tr>)}</tbody></table></div></div>
          <aside className="insight-card"><span>CONCENTRATION</span><h3>Top 5贡献82.1%</h3><p>前五个自营机构合计贡献{money(2051.88)}。由于点击数据为0，单次点击收入与点击→激活转化率本周均标为“不可计算”。</p><div><b>数据核查</b><small>确认导出后台是否未记录点击，或点击口径是否在另一张表</small></div></aside>
        </div>
      </section>

      <section className="section section-block" id="rights">
        <div className="section-title"><span>04 / RIGHTS PROTECTION</span><h2>版权保护</h2><p>上线前保护登记 + Meta Rights Manager手工分析</p></div>
        <div className="notice strategy"><b>策略说明</b><span>YouTube CID锁全集；Meta只锁付费集，以保护付费内容并避免阻断分销机构及达人对免费集的正常推广。Meta指标不能代表YouTube版权匹配情况。</span></div>
        <div className="rights-grid">
          <article className="rights-card"><span>YouTube CID · 全集</span><strong>24部</strong><small>本周完成保护登记</small><ul>{protectedTitles.map(([title, date]) => <li key={title}><span>{title}</span><b>{date}</b></li>)}</ul><p>另19部已登记 · 无YouTube CMS，不展示匹配与屏蔽数据</p></article>
          <article className="rights-card"><span>Facebook RM · 付费集</span><strong>24部</strong><small>本周完成保护登记</small><ul>{protectedTitles.map(([title, date]) => <li key={title}><span>{title}</span><b>{date}</b></li>)}</ul><p>另19部已登记 · 仅展示上线时间与完成记录</p></article>
        </div>
        <div className="meta-panel">
          <div className="meta-kpis"><div><small>匹配视频</small><strong>16.30万</strong><span>后台估算</span></div><div><small>屏蔽视频</small><strong>16.30万</strong><span>后台估算</span></div><div><small>屏蔽率</small><strong>100%</strong><span>按手工登记值</span></div><div><small>平台占比</small><strong>FB 100%</strong><span>Instagram 0%</span></div></div>
          <div className="meta-details"><div><span className="mini-label">地区排行</span>{regions.map(([name, value], index) => <div className="bar-row" key={name}><b>{index + 1}. {name}</b><span><i style={{ width: `${value / 32 * 100}%` }}></i></span><strong>{value}%</strong></div>)}</div><div><span className="mini-label">匹配视频数量最多的剧目 Top 5</span><ol className="rights-top">{metaTitles.map(([title, value]) => <li key={title}><span>{title}</span><b>{value}</b></li>)}</ol><small className="manual-order">按版权登记表中的手工排名顺序展示</small></div></div>
        </div>
      </section>

      <section className="section section-block" id="actions">
        <div className="section-title"><span>05 / OUTLOOK</span><h2>趋势基线与下周行动</h2><p>首期真实快照，趋势将在累计第二周数据后生成</p></div>
        <div className="baseline-panel"><div><span>W28 BASELINE</span><strong>{money(9495.6844)}</strong><p>广告 {money(6996.8244)} · 引流 {money(2498.86)}</p></div><p>本期没有可比的上周真实快照，因此不展示虚构环比或四周趋势。下一期开始自动生成周环比；累计四期后展示最近四周走势。</p></div>
        <div className="actions-card">
          <div className="card-heading"><div><span>RECOMMENDED ACTIONS · 待主管确认</span><h3>下周建议动作</h3></div><small>业务补充文件未提供已确定行动，以下均为数据建议</small></div>
          <div className="action-row"><span className="priority high">P0</span><div><b>核查 ReelShort APP Moments 低RPM原因</b><p>逐条检查广告适配、内容长度、受众地区与变现限制</p></div><span>负责人：待确认</span><span>建议下周完成</span></div>
          <div className="action-row"><span className="priority high">P0</span><div><b>补齐或解释引流点击口径</b><p>定位“点击为0、激活6,324”的数据断点，恢复完整漏斗</p></div><span>负责人：待确认</span><span>建议下周完成</span></div>
          <div className="action-row"><span className="priority">P1</span><div><b>测试高RPM低规模语种</b><p>针对波兰语、德语、意大利语做小规模内容复用测试</p></div><span>负责人：待确认</span><span>测试后再决定加量</span></div>
        </div>
      </section>

      <footer><b>ReelShort Social Intelligence</b><span>统计周期：2026年07月06日—07月12日 · 内部经营资料 · 待审查版本</span></footer>
    </main>
  );
}
