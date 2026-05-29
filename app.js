/* ============================================================
   TGEEA Galaxy — app.js
   D3 v7 force-directed graph
   Features: drag (mouse + touch), zoom, highlight, search,
             category filter, legend toggle (mobile)
   ============================================================ */

(function () {
  "use strict";

  /* ──────────────────────────────────────────
     DATA
  ────────────────────────────────────────── */
  const categories = {
    "性別認同": { color: "#b57bee" },
    "教育推廣": { color: "#5ec4ff" },
    "性別暴力": { color: "#ff6b8a" },
    "身體自主": { color: "#f9a45c" },
    "家庭多元": { color: "#52d9a4" },
    "法律政策": { color: "#ffd166" },
    "社會文化": { color: "#a8dadc" },
  };

  const nodes = [
    // 核心 hub
    { id: "性別平等教育",    cat: "教育推廣", size: 28, hub: true,  desc: "TGEEA 核心使命，推動各級學校與社會的性別平等教育。" },
    { id: "全面性教育(CSE)", cat: "教育推廣", size: 24, hub: true,  desc: "Comprehensive Sexuality Education，聯合國框架下的全面性別與性教育。" },
    // 性別認同
    { id: "多元性別",        cat: "性別認同", size: 20, desc: "涵蓋 LGBTQ+ 等各種性別認同與性傾向。" },
    { id: "跨性別",          cat: "性別認同", size: 17, desc: "跨性別者的權利、處境與社會支持。" },
    { id: "性別特質",        cat: "性別認同", size: 15, desc: "對性別氣質與特質的理解，打破二元框架。" },
    { id: "性別刻板印象",    cat: "性別認同", size: 16, desc: "社會對不同性別的固化期待與其影響。" },
    { id: "性別表達",        cat: "性別認同", size: 14, desc: "個人透過外觀、行為表達性別的方式。" },
    { id: "同志議題",        cat: "性別認同", size: 16, desc: "同性戀者的生活處境、校園氛圍與社會接納。" },
    // 教育推廣
    { id: "種子講師培訓",    cat: "教育推廣", size: 18, desc: "培育性平教育推廣者，讓知識在各社群中擴散。" },
    { id: "教材開發",        cat: "教育推廣", size: 17, desc: "設計繪本、桌遊等多元教具，讓性平教育有趣且易懂。" },
    { id: "校園性平",        cat: "教育推廣", size: 18, desc: "校園中的友善環境、教師研習與學生支持。" },
    { id: "情感教育(SEL)",   cat: "教育推廣", size: 15, desc: "社會情感學習，培養健康的人際關係能力。" },
    { id: "桌遊教育",        cat: "教育推廣", size: 14, desc: "透過桌上遊戲媒材討論性平議題，如《魔法學園》。" },
    { id: "國際交流",        cat: "教育推廣", size: 14, desc: "與國際組織合作，引介全球性平教育經驗。" },
    // 性別暴力
    { id: "性騷擾防治",      cat: "性別暴力", size: 19, desc: "職場、校園與公共空間的性騷擾預防與申訴機制。" },
    { id: "數位性別暴力",    cat: "性別暴力", size: 17, desc: "網路霸凌、非自願性影像散布等數位時代的暴力型態。" },
    { id: "校園霸凌",        cat: "性別暴力", size: 16, desc: "與性別相關的校園霸凌事件及防治策略。" },
    { id: "親密關係暴力",    cat: "性別暴力", size: 15, desc: "交往或婚姻中的身體、精神、經濟暴力。" },
    { id: "兒少性剝削",      cat: "性別暴力", size: 14, desc: "針對兒童少年的性剝削防治教育。" },
    // 身體自主
    { id: "身體自主權",      cat: "身體自主", size: 18, desc: "個人對自己身體的決定權，包含性同意。" },
    { id: "性與生殖健康",    cat: "身體自主", size: 17, desc: "性健康知識、避孕、生育選擇等議題。" },
    { id: "人工生殖議題",    cat: "身體自主", size: 14, desc: "誰有權利生育？人工生殖法與多元家庭的想像。" },
    { id: "愛滋去污名",      cat: "身體自主", size: 14, desc: "HIV/AIDS 的去污名化教育與倡議。" },
    // 家庭多元
    { id: "多元家庭",        cat: "家庭多元", size: 19, desc: "超越傳統核心家庭，包括單親、同志、收養等家庭型態。" },
    { id: "婚姻平權",        cat: "家庭多元", size: 17, desc: "同性婚姻合法化倡議與婚後家庭生活。" },
    { id: "親子教養",        cat: "家庭多元", size: 15, desc: "以性平視角養育孩子，避免複製性別刻板印象。" },
    { id: "收養議題",        cat: "家庭多元", size: 13, desc: "多元家庭的收養權利與兒童最佳利益。" },
    // 法律政策
    { id: "性平法立法",      cat: "法律政策", size: 18, desc: "性別平等教育法的推動、修訂與落實監督。" },
    { id: "政策倡議",        cat: "法律政策", size: 17, desc: "向中央與地方政府倡議，推動有利性平的政策。" },
    { id: "人權公約",        cat: "法律政策", size: 15, desc: "CEDAW、兒童權利公約等國際人權框架的落實。" },
    { id: "反性別運動",      cat: "法律政策", size: 14, desc: "理解並回應社會中的保守派反對性平教育運動。" },
    // 社會文化
    { id: "習俗文化與性別",  cat: "社會文化", size: 16, desc: "台灣傳統習俗中的性別角色與現代轉化。" },
    { id: "職場性別平等",    cat: "社會文化", size: 15, desc: "薪資平等、晉升機會與友善職場環境。" },
    { id: "媒體再現",        cat: "社會文化", size: 14, desc: "媒體如何建構性別形象，影響社會認知。" },
    { id: "交織性",          cat: "社會文化", size: 16, desc: "性別與階級、族裔、障礙等身份的交叉影響。" },
  ];

  const links = [
    { source: "性別平等教育",    target: "全面性教育(CSE)", weight: 5 },
    { source: "性別平等教育",    target: "種子講師培訓",    weight: 4 },
    { source: "性別平等教育",    target: "校園性平",        weight: 4 },
    { source: "性別平等教育",    target: "性平法立法",      weight: 4 },
    { source: "性別平等教育",    target: "教材開發",        weight: 3 },
    { source: "全面性教育(CSE)", target: "身體自主權",      weight: 4 },
    { source: "全面性教育(CSE)", target: "情感教育(SEL)",   weight: 4 },
    { source: "全面性教育(CSE)", target: "性與生殖健康",    weight: 4 },
    { source: "全面性教育(CSE)", target: "國際交流",        weight: 3 },
    { source: "全面性教育(CSE)", target: "人權公約",        weight: 3 },
    { source: "多元性別",        target: "跨性別",          weight: 4 },
    { source: "多元性別",        target: "性別特質",        weight: 3 },
    { source: "多元性別",        target: "同志議題",        weight: 4 },
    { source: "多元性別",        target: "婚姻平權",        weight: 3 },
    { source: "性別刻板印象",    target: "性別特質",        weight: 4 },
    { source: "性別刻板印象",    target: "性別表達",        weight: 3 },
    { source: "性別刻板印象",    target: "媒體再現",        weight: 3 },
    { source: "性別刻板印象",    target: "親子教養",        weight: 3 },
    { source: "跨性別",          target: "校園霸凌",        weight: 2 },
    { source: "同志議題",        target: "校園性平",        weight: 3 },
    { source: "同志議題",        target: "婚姻平權",        weight: 4 },
    { source: "種子講師培訓",    target: "教材開發",        weight: 3 },
    { source: "種子講師培訓",    target: "桌遊教育",        weight: 3 },
    { source: "校園性平",        target: "校園霸凌",        weight: 4 },
    { source: "校園性平",        target: "情感教育(SEL)",   weight: 3 },
    { source: "教材開發",        target: "桌遊教育",        weight: 4 },
    { source: "情感教育(SEL)",   target: "親密關係暴力",    weight: 3 },
    { source: "國際交流",        target: "人權公約",        weight: 3 },
    { source: "性騷擾防治",      target: "數位性別暴力",    weight: 3 },
    { source: "性騷擾防治",      target: "職場性別平等",    weight: 3 },
    { source: "性騷擾防治",      target: "親密關係暴力",    weight: 3 },
    { source: "數位性別暴力",    target: "校園霸凌",        weight: 4 },
    { source: "數位性別暴力",    target: "兒少性剝削",      weight: 3 },
    { source: "校園霸凌",        target: "情感教育(SEL)",   weight: 2 },
    { source: "兒少性剝削",      target: "身體自主權",      weight: 3 },
    { source: "身體自主權",      target: "性與生殖健康",    weight: 4 },
    { source: "身體自主權",      target: "人工生殖議題",    weight: 3 },
    { source: "性與生殖健康",    target: "愛滋去污名",      weight: 3 },
    { source: "人工生殖議題",    target: "多元家庭",        weight: 4 },
    { source: "愛滋去污名",      target: "多元性別",        weight: 2 },
    { source: "多元家庭",        target: "婚姻平權",        weight: 4 },
    { source: "多元家庭",        target: "親子教養",        weight: 4 },
    { source: "多元家庭",        target: "收養議題",        weight: 4 },
    { source: "婚姻平權",        target: "性平法立法",      weight: 3 },
    { source: "親子教養",        target: "情感教育(SEL)",   weight: 2 },
    { source: "性平法立法",      target: "政策倡議",        weight: 4 },
    { source: "性平法立法",      target: "反性別運動",      weight: 3 },
    { source: "政策倡議",        target: "人權公約",        weight: 3 },
    { source: "政策倡議",        target: "交織性",          weight: 2 },
    { source: "習俗文化與性別",  target: "性別刻板印象",    weight: 3 },
    { source: "習俗文化與性別",  target: "多元家庭",        weight: 2 },
    { source: "職場性別平等",    target: "交織性",          weight: 3 },
    { source: "媒體再現",        target: "性別刻板印象",    weight: 3 },
    { source: "交織性",          target: "多元性別",        weight: 3 },
    { source: "交織性",          target: "性別平等教育",    weight: 2 },
  ];

  /* ──────────────────────────────────────────
     SETUP
  ────────────────────────────────────────── */
  let width  = window.innerWidth;
  let height = window.innerHeight;
  const isMobile = () => window.innerWidth < 600;

  const svg = d3.select("#main-svg");
  const g   = svg.append("g");

  // Defs: glow filter
  const defs   = svg.append("defs");
  const filter = defs.append("filter").attr("id", "glow");
  filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // Background stars
  const starG = svg.insert("g", "g").attr("class", "stars");
  function drawStars() {
    starG.selectAll("circle").remove();
    d3.range(220).forEach(() => {
      starG.append("circle")
        .attr("cx", Math.random() * width)
        .attr("cy", Math.random() * height)
        .attr("r",  Math.random() * 1.2)
        .attr("fill", `rgba(255,255,255,${(Math.random() * 0.45 + 0.08).toFixed(2)})`);
    });
  }
  drawStars();

  /* ──────────────────────────────────────────
     ZOOM  (mouse wheel + touch pinch)
  ────────────────────────────────────────── */
  const zoom = d3.zoom()
    .scaleExtent([0.25, 5])
    .on("zoom", e => g.attr("transform", e.transform));

  svg.call(zoom);

  // Tap on background → reset highlight
  svg.on("click", e => {
    if (e.target === svg.node() || e.target.tagName === "svg") resetHighlight();
  });

  /* ──────────────────────────────────────────
     SIMULATION
  ────────────────────────────────────────── */
  const simulation = d3.forceSimulation(nodes)
    .force("link",      d3.forceLink(links).id(d => d.id)
                          .distance(d => 110 - d.weight * 9)
                          .strength(0.4))
    .force("charge",    d3.forceManyBody().strength(d => -d.size * 20))
    .force("center",    d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.size + 16));

  /* ──────────────────────────────────────────
     DRAW LINKS
  ────────────────────────────────────────── */
  const linkEl = g.append("g").attr("class", "links")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", d => {
      const srcId = typeof d.source === "object" ? d.source.id : d.source;
      const cat   = nodes.find(n => n.id === srcId)?.cat;
      return categories[cat]?.color || "#555";
    })
    .attr("stroke-width", d => d.weight * 0.5 + 0.5);

  /* ──────────────────────────────────────────
     DRAW NODES
  ────────────────────────────────────────── */
  const nodeEl = g.append("g").attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", d => "node" + (d.hub ? " hub" : ""))
    // Drag (D3's built-in handler works for both mouse and touch via pointer events)
    .call(
      d3.drag()
        .on("start", (e, d) => {
          if (!e.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end",  (e, d) => {
          if (!e.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
    )
    .on("click",     (e, d) => { e.stopPropagation(); highlightNode(d); })
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseout",  hideTooltip)
    // Touch: show tooltip on touchstart (no hover on mobile)
    .on("touchstart", (e, d) => {
      e.stopPropagation();
      showTooltip(e.touches[0] || e, d);
    }, { passive: true })
    .on("touchend", (e, d) => {
      e.stopPropagation();
      highlightNode(d);
      // Hide tooltip after short delay on touch
      setTimeout(hideTooltip, 1800);
    });

  // Glow ring for hubs
  nodeEl.filter(d => d.hub)
    .append("circle")
    .attr("r", d => d.size + 8)
    .attr("fill", "none")
    .attr("stroke", d => categories[d.cat]?.color || "#fff")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-width", 2)
    .attr("filter", "url(#glow)");

  // Main circle
  nodeEl.append("circle")
    .attr("r",            d => d.size)
    .attr("fill",         d => categories[d.cat]?.color || "#888")
    .attr("fill-opacity", d => d.hub ? 0.88 : 0.72)
    .attr("filter",       d => d.hub ? "url(#glow)" : null)
    .attr("stroke",       d => categories[d.cat]?.color || "#888")
    .attr("stroke-opacity", 0.45)
    .attr("stroke-width", 1.5);

  // Label
  nodeEl.append("text")
    .attr("dy", d => d.size + 14)
    .text(d => d.id);

  /* ──────────────────────────────────────────
     TICK
  ────────────────────────────────────────── */
  simulation.on("tick", () => {
    linkEl
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    nodeEl.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  /* ──────────────────────────────────────────
     LEGEND  (with mobile toggle)
  ────────────────────────────────────────── */
  const activeCategories = new Set(Object.keys(categories));
  const legendEl         = document.getElementById("legend");
  const toggleBtn        = document.getElementById("legend-toggle");

  // Build legend items
  Object.entries(categories).forEach(([cat, info]) => {
    const item = document.createElement("div");
    item.className    = "legend-item active";
    item.dataset.cat  = cat;
    item.innerHTML    = `<div class="legend-dot" style="background:${info.color}"></div>${cat}`;
    item.addEventListener("click", () => toggleCategory(cat, item));
    legendEl.appendChild(item);
  });

  // Mobile: expand/collapse legend
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    if (expanded) {
      legendEl.setAttribute("hidden", "");
    } else {
      legendEl.removeAttribute("hidden");
    }
  });

  // On desktop always show legend (remove hidden if present)
  function syncLegendVisibility() {
    if (!isMobile()) legendEl.removeAttribute("hidden");
  }
  syncLegendVisibility();

  function toggleCategory(cat, el) {
    if (activeCategories.has(cat)) {
      activeCategories.delete(cat);
      el.classList.remove("active");
      el.classList.add("dimmed");
    } else {
      activeCategories.add(cat);
      el.classList.add("active");
      el.classList.remove("dimmed");
    }
    applyCategoryFilter();
  }

  function applyCategoryFilter() {
    nodeEl.classed("dimmed", d => !activeCategories.has(d.cat));
    linkEl.classed("dimmed", d => {
      const sn = nodes.find(n => n.id === (d.source.id || d.source));
      const tn = nodes.find(n => n.id === (d.target.id || d.target));
      return !activeCategories.has(sn?.cat) || !activeCategories.has(tn?.cat);
    });
  }

  /* ──────────────────────────────────────────
     HIGHLIGHT
  ────────────────────────────────────────── */
  let highlighted = null;

  function highlightNode(d) {
    if (highlighted === d.id) { resetHighlight(); return; }
    highlighted = d.id;
    document.getElementById("reset-btn").style.display = "block";

    const connectedIds = new Set([d.id]);
    links.forEach(l => {
      const sid = l.source.id || l.source;
      const tid = l.target.id || l.target;
      if (sid === d.id) connectedIds.add(tid);
      if (tid === d.id) connectedIds.add(sid);
    });

    nodeEl.classed("dimmed", n => !connectedIds.has(n.id));
    linkEl
      .classed("highlighted", l =>
        (l.source.id || l.source) === d.id ||
        (l.target.id || l.target) === d.id)
      .classed("dimmed", l =>
        (l.source.id || l.source) !== d.id &&
        (l.target.id || l.target) !== d.id);
  }

  function resetHighlight() {
    highlighted = null;
    document.getElementById("reset-btn").style.display = "none";
    nodeEl.classed("dimmed", false);
    linkEl.classed("highlighted", false).classed("dimmed", false);
    applyCategoryFilter();
  }

  function resetView() {
    resetHighlight();
    svg.transition().duration(600)
       .call(zoom.transform, d3.zoomIdentity);
  }

  // Expose for inline onclick in HTML
  window.galaxyApp = { resetView };
  document.getElementById("reset-btn").addEventListener("click", resetView);

  /* ──────────────────────────────────────────
     TOOLTIP
  ────────────────────────────────────────── */
  const tip = document.getElementById("tooltip");

  function connCount(d) {
    return links.filter(l =>
      (l.source.id || l.source) === d.id ||
      (l.target.id || l.target) === d.id
    ).length;
  }

  function showTooltip(e, d) {
    tip.innerHTML = `
      <div class="tip-title">${d.id}</div>
      <div class="tip-cat" style="color:${categories[d.cat]?.color}">${d.cat}</div>
      <div class="tip-desc">${d.desc}</div>
      <div class="tip-links">🔗 與 ${connCount(d)} 個議題相連</div>
    `;
    tip.style.opacity = "1";
    if (!isMobile()) moveTooltip(e);
    // Mobile: CSS positions it as bottom sheet; no x/y needed
  }

  function moveTooltip(e) {
    if (isMobile()) return;
    const x = (e.clientX || 0) + 18;
    const y = (e.clientY || 0) - 10;
    tip.style.left = Math.min(x, window.innerWidth  - 250) + "px";
    tip.style.top  = Math.min(y, window.innerHeight - 150) + "px";
  }

  function hideTooltip() { tip.style.opacity = "0"; }

  /* ──────────────────────────────────────────
     SEARCH
  ────────────────────────────────────────── */
  document.getElementById("search").addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();
    if (!q) { resetHighlight(); return; }

    const match = nodes.find(n => n.id.toLowerCase().includes(q));
    if (!match) return;

    highlightNode(match);

    // Pan + zoom toward the matched node
    const nx = match.x || width / 2;
    const ny = match.y || height / 2;
    const scale = isMobile() ? 2 : 1.6;
    svg.transition().duration(500).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2 - nx * scale, height / 2 - ny * scale)
        .scale(scale)
    );
  });

  /* ──────────────────────────────────────────
     RESIZE
  ────────────────────────────────────────── */
  window.addEventListener("resize", () => {
    width  = window.innerWidth;
    height = window.innerHeight;
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
    simulation.alpha(0.3).restart();
    drawStars();
    syncLegendVisibility();
  });

})();
