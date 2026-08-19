# JigsawDesigner 网站 SEO 审计与执行计划

> 审计日期：2026-08-16
> 范围：`jigsaw-designer-website`、Apple 原生应用源码、公开 App Store 页面和一次核心英文 SERP 意图抽样。
> 不在本轮范围：部署、Search Console/Bing Webmaster 后台操作、付费关键词数据库、App Store 元数据修改。

## 1. 执行摘要

JigsawDesigner 的 SEO 机会不是继续堆叠一个泛化品牌首页，而是围绕一个清晰差异建立主题集群：它是 Apple 平台上的原生拼图 SVG 生成与矢量编辑应用，生成结果可以继续编辑，而不是网页内的免费在线生成器。

当前线上站点最重要的问题是“产品事实、索引信号和搜索意图”没有对齐：

- 线上首页仍宣称 PDF/PNG 导出，但当前应用成品导出仅为 SVG。
- 线上 `hreflang` 仍使用旧的 `zh`、`pt`，没有区分 `zh-Hans`、`zh-Hant` 和 `pt-BR`。
- 首页信息架构过薄，搜索引擎看不到生成器、刀模、激光切割 SVG、模板和矢量编辑之间的主题关系。
- 线上 OG 图片路径陈旧，首页没有结构化数据，帮助页的元数据与 URL 规则不统一。
- 旧页面中存在固定价格、Paddle、PDF/PNG、过度兼容性和制造就绪等无法由当前产品事实支持的表述。
- 当前核心 SERP 同时出现在线工具、制作教程、论坛、Etsy 商品与 Reddit 讨论；抽样的主要竞争页面有约千字的任务型正文、步骤、FAQ 和相关内容链接。仅靠品牌页很难进入这类非品牌搜索结果。

因此优先顺序应为：先纠正事实和技术索引基础，再上线 3 个首要语言的高意图主题页，最后根据 Search Console 的真实查询数据扩展语言和内容。不要一次性把长尾页面机械翻译成 30 多种语言。

## 2. 已确认的产品事实

| 事实 | 当前证据 | 网站可使用的表述 | 不应使用的表述 |
| --- | --- | --- | --- |
| 当前版本 | App Store 已公开显示 1.6.0；Xcode 主目标为 1.6.0、build 36 | `JigsawDesigner 1.6.0` | 未核验时宣称审核状态或未来版本 |
| 平台 | iPhone、iPad、Mac | `Available on iPhone, iPad and Mac` | Android、Windows、网页内直接运行 |
| 产品形态 | Apple 原生应用 | `Native app for Apple devices` | `Free online generator`、浏览器工具 |
| 导出 | 当前成品导出为 SVG | `Export editable SVG` | PDF/PNG/DXF 导出 |
| 生成流程 | SVG 边界和卡槽模板进入原生 C++ 引擎，结果回到文档树继续编辑 | `Generate and refine editable puzzle cutlines` | 固定 3 秒、绝对零错误、每片必然唯一 |
| 绘图/编辑 | Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon、Bezier | `Vector drawing and point editing tools` | 未实现的 AI 自动矢量化或实时协作 |
| 模板 | 3 个内置起点，可创建并持久化自定义卡槽模板 | `Built-in and custom slot templates` | 无限模板库或未经证实的行业标准模板 |
| 订阅 | 月度/年度订阅；5 次免费生成；Premium 解锁无限生成和 SVG 导出 | 描述权益，价格引导到用户所在 App Store | 硬编码全球价格、lifetime、Paddle 支付 |
| 项目与云端 | 本地优先，可选 CloudKit；存在公开发布与只读分享 | `Local projects with optional iCloud features` | 实时多人编辑、可写共享权限 |
| 语言 | 源码有 40 个 `.lproj`；公开 App Store 当前显示 English + 38 More | 不对外硬写数量，使用 `available in multiple languages` | 在渠道不一致解决前宣称准确数量 |

产品页面必须同时说清限制：JigsawDesigner 提供可编辑 SVG 几何，但不会替代下游软件中的单位、比例、描边、kerf、材料、功率、速度和设备安全检查，也不保证与任意激光机、Cricut、CAD 软件或材料兼容。

## 3. 目标受众与搜索意图

### 3.1 首要受众

1. 需要拼图切割线 SVG 的激光切割/创客用户。
2. 需要可编辑拼图刀模的矢量设计师和拼图制作者。
3. 希望在 iPhone、iPad、Mac 间完成生成和编辑的 Apple 用户。
4. 已安装应用、正在寻找操作说明、故障排查和版本变化的用户。

### 3.2 SERP 意图抽样结论

对 `jigsaw puzzle svg generator laser cut` 的一次 Google 结果抽样中，主要结果类型包括：

- 在线 SVG/PDF/DXF/PNG 生成器；
- 激光切割制作教程；
- Glowforge/Reddit 等社区讨论；
- Etsy 模板商品；
- 带 HowTo/FAQ 结构的长篇任务页。

这说明用户不是只想了解“某个品牌是什么”，而是要完成任务。JigsawDesigner 的落地页必须在首屏立即回答：是否网页工具、支持什么平台、输入与输出是什么、生成后能否编辑、下载位置在哪里。不要用“免费在线生成器”的流量承诺换取错误点击。

### 3.3 差异化定位

核心定位：

> Generate puzzle cutlines from a vector boundary, edit the resulting SVG, and continue the workflow on iPhone, iPad, or Mac.

与在线生成器区分的要点：

- 原生 Apple 应用，不依赖浏览器会话；
- 生成结果回到 SVG 文档树继续编辑；
- 有路径、锚点、分组、图层、变换和自定义卡槽模板工作流；
- 输出聚焦 SVG，并明确下游生产验证责任。

## 4. 信息架构与关键词映射

### 4.1 全语言基础层

以下页面覆盖 33 个网站 locale，用于品牌、支持与信任：

| 路径 | 搜索任务 | 主要目标 |
| --- | --- | --- |
| `/[locale]` | 品牌 + 产品类别 | 解释产品、平台、SVG 工作流并引导 App Store |
| `/[locale]/help` | 产品帮助中心 | 汇总操作入口并向细分帮助页分发内部链接 |
| `/[locale]/support` | 联系与问题解决 | 提供文档、联系渠道和问题分类 |
| `/[locale]/privacy` | 隐私与数据处理 | 准确说明应用、CloudKit、Cloudflare、必要语言 Cookie 和 GA4 |

### 4.2 首要语言高意图层

首期只为 `en`、`zh-Hans`、`zh-Hant` 建立完整主题页，避免低质量规模化翻译：

| 路径 | 主搜索意图 | 页面边界 |
| --- | --- | --- |
| `/pricing` | 订阅与权益比较 | 不硬编码 storefront 价格，跳转 App Store 查看当前价格 |
| `/jigsaw-puzzle-generator` | 拼图生成器 | 从边界、参数、生成到继续编辑的完整流程 |
| `/jigsaw-dieline-generator` | 拼图刀模/切割线生成 | 强调矢量几何、路径和下游交付，不与生成器页重复 |
| `/laser-cut-jigsaw-puzzle-svg` | 激光切割 SVG | 设计阶段、SVG preflight、下游设备验证 |
| `/custom-jigsaw-puzzle-template` | 自定义拼图模板 | 3 个内置模板、自定义 open-path 卡槽、导入/导出模板 |
| `/svg-puzzle-editor` | SVG 拼图编辑器 | 生成后的点编辑、图层、分组与变换 |
| `/how-to-make-a-laser-cut-jigsaw-puzzle` | 制作步骤 | 明确 JigsawDesigner 负责设计，设备软件负责生产参数 |
| `/changelog/1-6-0` | 版本更新与品牌新鲜度 | 只写已发布且能由版本代码/商店页支持的变化 |

### 4.3 帮助中心细分层

以下 8 个页面回答已有用户和长尾问题，并向对应产品页回链：

- `/help/getting-started`
- `/help/jigsaw-generation`
- `/help/svg-import-export`
- `/help/vector-editing`
- `/help/templates`
- `/help/project-library`
- `/help/keyboard-shortcuts`
- `/help/troubleshooting`

帮助页不能只是营销页的同义改写。营销页回答“为什么这个工作流适合我”，帮助页回答“在应用里具体怎么做、遇到什么限制”。

### 4.4 暂缓页面

在完成真实设备/软件验证前，不建立声称兼容的品牌集成页，例如 `LightBurn compatible`、`Glowforge ready`、`Cricut ready` 或 `CAD ready`。如未来实际测试通过，应以测试设备、软件版本、导入设置、限制和示例文件为证据发布集成指南。

## 5. On-page SEO 标准

每个可索引页面必须满足：

- 一个清晰且唯一的 H1；title 和 description 与页面搜索任务一一对应。
- 首屏在 1 至 2 段内回答产品形态、平台、输入、输出和主要限制。
- H2/H3 形成可扫描的任务结构，避免把关键词机械重复进标题。
- 有真实 1.6.0 截图、描述性 alt、必要时图注；装饰图片使用空 alt。
- CTA 清楚说明跳转到 App Store，不暗示网页内立即生成。
- 有 2 至 4 个上下文相关内部链接，形成首页、主题页、帮助页、版本页之间的闭环。
- FAQ 必须在页面上可见且答案与产品事实一致；不期待 FAQ rich result，因为 Google 对其展示资格已非常有限。
- 不使用 `meta keywords`，不添加隐藏文本，不为不同 locale 复制未经审核的英文正文。

### 防止关键词互相蚕食

- `generator` 页负责完整生成流程。
- `dieline` 页负责矢量切割线概念与编辑交付。
- `laser-cut SVG` 页负责 preflight 和下游验证。
- `custom template` 页负责卡槽轮廓和复用。
- `SVG editor` 页负责生成后的矢量编辑能力。
- `how-to` 页负责顺序化制作过程。

## 6. 技术 SEO 计划

### 6.1 Canonical host 与重定向

- 唯一站点源为 `https://jigsawdesigner.com`。
- `/` 使用 308 重定向到 `/en`，不根据 IP 或浏览器语言改变目标。
- `/zh[/...]` 使用 301 重定向到 `/zh-Hans[/...]`。
- `/pt[/...]` 使用 301 重定向到 `/pt-BR[/...]`。
- 所有重定向保留 query string。
- 在 Cloudflare edge 配置完整的 `www` 到 apex 301；应用 middleware 只能覆盖普通文档路由，不能替代整站边缘规则。

### 6.2 Locale、canonical 与 hreflang

- 使用显式 locale 前缀，页面 `<html lang>` 使用正确 BCP-47 值。
- `ar`、`he` 设置 `dir="rtl"`；字体栈必须包含稳定的 CJK、Arabic、Hebrew 系统 fallback。
- 每个可索引页面 canonical 指向自身完整 locale URL。
- `hreflang` 只列出该路由真实存在的语言版本，并包含 `x-default -> /en/...`。
- 不自动回退到英文页面并返回 200；不可用的 locale/route 必须是真实 404。
- 不同时从 HTML metadata 和 HTTP `Link` header 生成两套 hreflang。

### 6.3 索引控制与 sitemap

- 可索引：基础层和首要语言高意图层。
- `/terms`、`/refund-policy` 仅提供 3 个首要语言版本，使用 `noindex,follow`，不进入 sitemap。
- `robots.txt` 允许抓取并声明唯一 sitemap；删除静态与动态 robots 冲突。
- 当前路由策略下，预期 sitemap 为 180 个 URL：`4 × 33` 个基础 URL，加 `16 × 3` 个首要语言 URL。
- 每个 sitemap URL 在部署前必须返回 200、具有自引用 canonical，且不经过重定向。

### 6.4 Metadata 与结构化数据

- 所有公开页统一生成 canonical、hreflang、robots、Open Graph 和 Twitter metadata。
- OG 图片使用存在的、版本化的 1200×630 资源；后续为高价值主题页生成独立分享图。
- 首页使用真实的 `SoftwareApplication` 数据，不添加未核验价格、评分或兼容性。
- 文章/帮助页使用与可见内容一致的 `Article`、`TechArticle` 或 `HowTo`；面包屑使用 `BreadcrumbList`。
- 不伪造 `Review`、`AggregateRating`、`Offer`、`Product` 库存或价格。

### 6.5 性能、隐私与交付

- 使用版本化 WebP 截图，长缓存；旧 PNG/JPG 使用较短缓存，避免陈旧内容长期不可更新。
- YouTube 使用点击后才加载的 `youtube-nocookie.com` facade，减少首屏第三方负载。
- GA4 通过标准 Google tag 在全站直接加载；locale 由 URL 决定，用户主动切换语言后才保存必要的语言偏好 Cookie。
- 客户端 `NextIntlClientProvider` 只发送客户端组件需要的消息命名空间，避免把完整 Help 字典序列化到所有页面。
- 维持基础安全头，并先以 `Content-Security-Policy-Report-Only` 观察 Next hydration、GA4 和 YouTube 实际依赖，再决定是否改为强制 CSP。
- 部署后以真实用户数据判断 Core Web Vitals；本地 Lighthouse 只能作为实验室基线，不能代替 CrUX/RUM。

## 7. 内容与信任策略

### 7.1 内容证据标准

每项能力声明至少满足一个条件：

- 能在当前 1.6.0 应用中直接复现；
- 能由源码、StoreKit 配置或公开 App Store 页面支持；
- 对设备/软件兼容性的说法有实际测试记录。

涉及速度、精度、兼容性、制造就绪、商业用途和法律授权的绝对说法必须有测试或法律依据，否则改为有限、可验证的描述。

### 7.2 新内容节奏

上线基础主题集群后，根据 Search Console 查询逐步新增：

1. “SVG scale/units preflight” 实操指南。
2. “Dieline vs cutline vs puzzle template” 术语解释。
3. 使用真实测试文件的下游软件导入指南。
4. 版本更新和问题修复案例。
5. 可下载的示例 SVG，仅在许可证、输出质量和隐私审核完成后提供。

每篇新增内容必须绑定一个主意图和一个转化动作，避免为了更新频率发布泛化短文。

### 7.3 站外与 ASO 协同

- 让 App Store 描述、网站和帮助文档使用同一组可验证事实。
- 当前 App Store 文案仍有 `perfectly interlocking`、`ready for any laser/CAD`、极短固定速度等过强表述；这属于单独的 ASO/合规清理任务，不在本轮网站修改范围。
- 在有实测内容后，优先从激光切割、SVG、Apple 设计工具社区获取自然引用；不要批量购买目录链接。
- 可为 App Store CTA 建立 Apple campaign link，结合网站事件测量，但需要先确定 provider/campaign 参数和归因口径。

## 8. 30/60/90 天执行路线

### 0 至 7 天：索引与事实门禁

- 完成产品事实纠偏、locale 迁移、canonical/hreflang、robots、sitemap、真实 404 和 `noindex`。
- 完成首页、基础页和 3 个首要语言主题集群。
- 完成构建、全路由抓取、结构化数据、移动端导航、RTL 和同意流验证。
- 在 Cloudflare 配置 `www -> apex`，部署后提交 sitemap。
- 建立 Search Console Domain Property、Bing Webmaster 与 GA4 基线；没有这些数据前不承诺流量提升百分比。

### 8 至 30 天：收录和 CTR 校准

- 检查 sitemap 发现/索引、重复页面、错误 canonical、hreflang 和 404。
- 以实际 impressions 调整 title/description，不因无展示页面盲目改标题。
- 按页面观察 App Store 点击、视频播放、帮助入口和语言切换。
- 修复 Core Web Vitals 和移动端可用性问题，优先处理 LCP、INP、CLS。

### 31 至 60 天：基于查询扩展内容

- 将有 impression 但排名 8 至 30 的查询映射到现有页，补充真正缺失的小节和示例。
- 只在出现持续需求时扩展下一批 locale；先做母语审校和本地 SERP 验证。
- 发布 2 至 4 篇有截图、参数、限制和示例文件的任务型指南。
- 建立版本页到功能页、帮助页到产品页的双向内部链接。

### 61 至 90 天：权威与转化

- 发布经过实测的下游软件导入案例。
- 向相关 maker/laser/SVG 社区提交真正有用的教程或案例，不做垃圾外链。
- 对高 impression、低 CTR 页面测试标题/描述；对高访问、低 App Store 点击页面测试首屏定位和 CTA。
- 根据 App Store campaign 与网站事件形成从查询到商店点击的可解释漏斗。

## 9. 测量框架

### 9.1 基线指标

- Google/Bing：已发现 URL、有效索引 URL、排除原因、抓取错误。
- 查询：品牌/非品牌 impressions、clicks、CTR、average position。
- 页面：自然搜索入口、参与度、App Store CTA 点击率。
- 技术：LCP、INP、CLS、移动端可用性、404/5xx、重定向链。
- 国际化：每个 locale 的有效索引量、查询和转化，不用总量掩盖低质量翻译。

### 9.2 事件建议

- `app_store_click`：`page_id`、`locale`、`placement`。
- `video_play`：`page_id`、`locale`、`video_id`。
- `help_article_open`：来源页、目标帮助页、locale。
- `language_switch`：from/to locale，不记录用户输入或个人数据。

### 9.3 判断规则

- 先看收录，再看排名；未收录页面不通过继续堆内容解决。
- 先看搜索意图，再看关键词密度；错误意图的流量不是成功。
- 以 App Store 点击和后续 campaign 数据衡量商业价值，不把 pageview 当作最终目标。
- 所有百分比目标在建立 28 天基线后设定；本计划不凭空承诺流量增幅。

## 10. 上线验收清单

### 构建与路由

- `npx tsc --noEmit --pretty false` 通过。
- `npm run lint` 通过。
- `npm run build` 通过。
- `/ -> /en` 为 308；`/zh -> /zh-Hans`、`/pt -> /pt-BR` 为 301，并保留 query。
- `/en/jigsaw-puzzle-generator` 返回 200；`/fr/jigsaw-puzzle-generator` 返回真实 404。
- `/en/terms` 返回 200 + `noindex,follow`；`/fr/terms` 返回 404。

### 索引信号

- sitemap 恰好列出预期 180 个有效 URL，无 terms/refund、重定向 URL 或 404。
- 每个可索引 URL 有唯一 title、description、自引用 canonical 和正确 hreflang 集合。
- 旧 `/zh`、`/pt` 不再出现在 canonical、hreflang、sitemap 或内部链接中。
- 结构化数据与可见正文一致，无虚构价格、评分、兼容性或导出格式。

### 体验与合规

- iPhone 宽度下导航、语言切换和 CTA 可用；键盘可访问。
- `ar`、`he` 的方向与文字布局正确；中文不依赖缺字 fallback。
- 每个页面只加载一次 GA4，`app_store_click` 事件正常，且隐私页描述与实现一致。
- 页面首屏不加载 YouTube iframe；版本化图片尺寸明确、无明显 CLS。

## 11. 仍需业务确认的事项

这些问题不阻塞技术基础，但会影响后续优先级：

1. 首要商业市场是美国、中文市场，还是已有 App Store 下载最多的地区？
2. 核心转化只衡量 App Store 点击，还是可以使用 Apple campaign link 追踪安装/订阅？
3. 是否愿意提供真实激光切割设备、软件版本和材料测试，用于制作兼容性案例？
4. 网站法律页由谁最终审核；CloudKit 公开分享和 GA4 的数据描述是否需要律师复核？
5. 下一批需要人工审校的语言由 Search Console 需求决定，还是已有市场优先级？

在这些答案和至少 28 天 Search Console 基线出现前，不建议继续增加大量语言页面或承诺具体自然流量增长。
