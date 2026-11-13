'use strict';

const { topics, edges, aliases, source } = window.grade7Knowledge;
const $ = id => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const chapterFiles = ['index.html', 'chapter-2.html', 'chapter-3.html'];
const stageNames = { primary: '小学', junior: '初中', senior: '高中' };
const volumeNames = ['必修第一册', '必修第二册', '选择性必修第一册', '选择性必修第二册', '选择性必修第三册'];
const firstTopics = ['cnm_012', 'cnm_006', 'cnm_012', 'cnm_029'];
const examples = {
  cnm_005: [['−3 在哪里？', '从 0 向左走 3 格。每格是 1。']],
  cnm_006: [['−3 ↔ 3', '两点在 0 的两边，离 0 一样远。']],
  cnm_012: [
    ['3 − (−2)', '先找 −2 的相反数。'],
    ['3 + 2 = 5', '−2 的相反数是 2，把减法改成加法。']
  ],
  cnm_019: [['(−2)² = 4，−2² = −4', '括号里的 −2 整体平方。没有括号时，只给 2 平方。']],
  cnm_029: [
    ['x = −2，求 x²', '把 x 换成 −2，整个负数放进括号。'],
    ['x² = (−2)² = 4', '两次相乘都是 −2，所以结果为正。']
  ],
  cnm_221: [
    ['x² + 6x + 5 = 0', '先把 5 移到右边，得到 x² + 6x = −5。'],
    ['x² + 6x + 9 = −5 + 9', '一次项系数 6 的一半是 3。等式两边都加 3²，也就是 9。'],
    ['(x + 3)² = 4', '用完全平方公式把左边写成一个平方。'],
    ['x + 3 = 2 或 −2', '直接开平方，两种可能都要算。得到 x = −1 或 −5。']
  ]
};
const entries = Object.entries(topics);
const upstream = new Map();
const downstream = new Map();
edges.forEach((edge, i) => {
  const [before, after, kind, reason, local] = edge;
  const relation = { before, after, kind, reason, local, i };
  if (!upstream.has(after)) upstream.set(after, []);
  if (!downstream.has(before)) downstream.set(before, []);
  upstream.get(after).push(relation);
  downstream.get(before).push(relation);
});

function stage(topic) {
  return topic.grade < 7 ? 'primary' : topic.grade < 10 ? 'junior' : 'senior';
}
function gradeLabel(topic) {
  return topic.grade >= 10 ? '高中 · ' + volumeNames[topic.grade - 10]
    : '一二三四五六七八九'[topic.grade - 1] + '年级' + topic.term + '册';
}
function topicName(id) {
  return topics[id].short || topics[id].name;
}
function topicId(value) {
  if (Object.prototype.hasOwnProperty.call(topics, value)) return value;
  return Object.prototype.hasOwnProperty.call(aliases, value) ? aliases[value] : '';
}
function normalize(value) {
  return String(value).normalize('NFKC').toLowerCase().replace(/\s+/g, '');
}
function svg(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}
function clamp(value, low, high) {
  return Math.min(high, Math.max(low, value));
}

const params = new URLSearchParams(location.search);
const from = /^[1-3]$/.test(params.get('from') || '') ? Number(params.get('from')) : 0;
const fromLesson = params.get('lesson') || '';
const priorTopic = entries.find(([, t]) => t.lesson?.[0] === from && 'L' + t.lesson[1] === fromLesson)?.[0];
if (from) {
  $('back').href = chapterFiles[from - 1] + (priorTopic ? '#/' + fromLesson : '#/');
  $('back').textContent = priorTopic ? '← 回刚才的课' : '← 回第' + '一二三'[from - 1] + '章目录';
  $('back').hidden = false;
}
const firstTopic = topicId(params.get('target') || '') || priorTopic || firstTopics[from];
const countText = `${entries.length.toLocaleString('zh-CN')} 个数学知识点`;
$('catalog-count').textContent = countText;
$('source-count').textContent = `${countText} · ${edges.length.toLocaleString('zh-CN')} 条关系（含本站补充）`;
$('upstream-source').href += '/tree/' + source;
$('upstream-source').title = '数据快照 ' + source.slice(0, 7);

let selected = '';
let depth = '1';
let exampleStep = 0;
let activeEdge = null;
let bounds = null;
let edgeElements = new Map();
let nodeElements = new Map();
const viewport = $('viewport');
const board = $('board');
const scene = $('scene');
const view = { x: 0, y: 0, scale: 1 };
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function localGraph(id, maxDepth) {
  const found = new Set([id]);
  let layer = [id];
  for (let level = 0; level < maxDepth && layer.length; level++) {
    const next = [];
    for (const key of layer) {
      for (const relation of upstream.get(key) || []) {
        if (!found.has(relation.before)) {
          found.add(relation.before);
          next.push(relation.before);
        }
      }
    }
    layer = next;
  }
  const after = downstream.get(id) || [];
  const relations = [];
  for (const key of found) {
    for (const relation of upstream.get(key) || []) {
      if (found.has(relation.before)) relations.push(relation);
    }
  }
  return { ids: [...found, ...after.map(edge => edge.after)], relations: [...relations, ...after] };
}

const measure = document.createElement('canvas').getContext('2d');
measure.font = '730 16px Inter, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif';
function labelSize(id) {
  const text = topicName(id);
  const max = 159;
  const lines = [];
  let line = '';
  for (const char of text) {
    if (line && measure.measureText(line + char).width > max) {
      lines.push(line);
      line = '';
    }
    line += char;
  }
  if (line) lines.push(line);
  const width = Math.max(125, Math.ceil(Math.max(...lines.map(l => measure.measureText(l).width))) + 28);
  return { lines, width, height: 36 + lines.length * 20 };
}

function drawNode(id, layout, accessible) {
  const topic = topics[id];
  const group = svg('g', {
    class: 'topic-node ' + stage(topic) + (id === selected ? ' current' : ''),
    transform: `translate(${layout.x},${layout.y})`,
    role: 'button', tabindex: accessible ? 0 : -1,
    'aria-label': `${topicName(id)}，${gradeLabel(topic)}${id === selected ? '，当前知识点' : ''}`,
    'data-topic': id
  });
  if (id === selected) group.setAttribute('aria-current', 'true');
  group.appendChild(svg('rect', {
    x: -layout.width / 2, y: -layout.height / 2, width: layout.width, height: layout.height, rx: 10
  }));
  const text = svg('text', { 'text-anchor': 'middle', 'font-size': 16 });
  layout.lines.forEach((line, i) => {
    const span = svg('tspan', { x: 0, y: -layout.height / 2 + 20 + i * 20 });
    span.textContent = line;
    text.appendChild(span);
  });
  const label = svg('tspan', { x: 0, y: layout.height / 2 - 10, class: 'node-meta' });
  label.textContent = topic.grade >= 10 ? stageNames.senior : gradeLabel(topic).replace(/年级(.+)册$/, '年级');
  text.appendChild(label);
  group.appendChild(text);
  const title = svg('title');
  title.textContent = topic.name + ' · ' + gradeLabel(topic);
  group.appendChild(title);
  return group;
}

function edgePath(points) {
  if (points.length < 2) return '';
  const first = points[0];
  const last = points[points.length - 1];
  const result = [`M ${first.x} ${first.y}`];
  for (let i = 1; i < points.length - 1; i++) {
    const { x, y } = points[i];
    const next = points[i + 1];
    result.push(`Q ${x} ${y} ${(x + next.x) / 2} ${(y + next.y) / 2}`);
  }
  result.push(`L ${last.x} ${last.y}`);
  return result.join(' ');
}
function drawEdge(edge, points) {
  const optional = edge.kind === 's';
  const group = svg('g', { class: 'edge-visual', 'data-edge': edge.i });
  const path = edgePath(points);
  group.appendChild(svg('path', {
    class: 'edge-stroke' + (optional ? ' soft' : ''), d: path,
    'marker-end': `url(#head-${optional ? 'soft' : 'hard'})`
  }));
  group.appendChild(svg('path', { class: 'edge-hit', d: path }));
  return group;
}

function paintView() {
  scene.setAttribute('transform', `translate(${view.x},${view.y}) scale(${view.scale})`);
  $('zoom-level').textContent = Math.round(view.scale * 100) + '%';
  $('zoom-out').disabled = view.scale <= 0.09;
  $('zoom-in').disabled = view.scale >= 3;
}
function centerPoint(point, scale) {
  view.scale = scale;
  view.x = viewport.clientWidth / 2 - point.x * scale;
  view.y = viewport.clientHeight / 2 - point.y * scale;
  paintView();
}
function fitScale() {
  return Math.min(1.3, (viewport.clientWidth - 28) / bounds.width, (viewport.clientHeight - 42) / bounds.height);
}
function fitGraph(keepTextReadable = false) {
  if (!bounds) return;
  const scale = fitScale();
  if (keepTextReadable && scale < 0.8) centerPoint(bounds.focus, 0.88);
  else centerPoint({ x: bounds.width / 2, y: bounds.height / 2 }, clamp(scale, 0.085, 3));
}
function zoom(factor, x = viewport.clientWidth / 2, y = viewport.clientHeight / 2) {
  const next = clamp(view.scale * factor, 0.085, 3);
  const ratio = next / view.scale;
  view.x = x - (x - view.x) * ratio;
  view.y = y - (y - view.y) * ratio;
  view.scale = next;
  paintView();
}

function renderGraph() {
  if (!window.dagre) {
    $('visible-count').textContent = '图谱布局没有载入，请刷新页面。';
    return;
  }
  const limit = depth === 'all' ? Infinity : Number(depth);
  const { ids, relations } = localGraph(selected, limit);
  const graph = new window.dagre.graphlib.Graph();
  graph.setGraph({
    rankdir: 'TB', marginx: 10, marginy: 10,
    nodesep: 22, ranksep: ids.length > 22 ? 43 : 59, edgesep: 10,
    ranker: 'tight-tree'
  });
  graph.setDefaultEdgeLabel(() => ({}));
  for (const id of ids) graph.setNode(id, labelSize(id));
  for (const edge of relations) graph.setEdge(edge.before, edge.after, { weight: edge.kind === 'h' ? 2 : 1 });
  window.dagre.layout(graph);

  const linkFragment = document.createDocumentFragment();
  const nodeFragment = document.createDocumentFragment();
  edgeElements = new Map();
  nodeElements = new Map();
  for (const edge of relations) {
    const group = drawEdge(edge, graph.edge(edge.before, edge.after).points);
    linkFragment.appendChild(group);
    edgeElements.set(edge.i, { edge, group });
  }
  for (const id of ids) {
    const group = drawNode(id, graph.node(id), ids.length <= 32 || id === selected);
    nodeFragment.appendChild(group);
    nodeElements.set(id, group);
  }
  $('edges').replaceChildren(linkFragment);
  $('nodes').replaceChildren(nodeFragment);
  const { width, height } = graph.graph();
  bounds = { width, height, focus: graph.node(selected) };
  clearEdge();
  fitGraph(true);
  const dense = fitScale() < .8;
  const layers = depth === 'all' ? '全部上游' : '往前 ' + depth + ' 层';
  $('visible-count').textContent = `${ids.length} 个知识点 · ${relations.length} 条关系 · ${layers}${dense ? ' · 已定位当前点，拖动或点适合屏幕看全图' : ''}`;
  if (!reducedMotion.matches && typeof $('nodes').animate === 'function') {
    $('nodes').animate([{ opacity: .55 }, { opacity: 1 }], { duration: 155 });
  }
}

function clearEdge() {
  activeEdge = null;
  $('edge-detail').hidden = true;
  for (const { group, edge } of edgeElements.values()) {
    group.classList.remove('active', 'muted');
    group.firstChild.setAttribute('marker-end', `url(#head-${edge.kind === 's' ? 'soft' : 'hard'})`);
  }
  for (const node of nodeElements.values()) node.classList.remove('neighbor');
}
function revealEdge(edge, scroll = false) {
  if (activeEdge === edge.i) {
    clearEdge();
    return;
  }
  activeEdge = edge.i;
  for (const { group, edge: other } of edgeElements.values()) {
    const isActive = other.i === edge.i;
    group.classList.toggle('active', isActive);
    group.classList.toggle('muted', !isActive);
    group.firstChild.setAttribute('marker-end', `url(#head-${isActive ? 'active' : other.kind === 's' ? 'soft' : 'hard'})`);
  }
  for (const [id, group] of nodeElements) group.classList.toggle('neighbor', id === edge.before || id === edge.after);
  $('edge-title').textContent = `${topicName(edge.before)} → ${topicName(edge.after)}`;
  $('edge-reason').textContent = edge.reason || '这两个知识点在学习顺序上有关联。';
  $('edge-source').textContent = `${edge.kind === 's' ? '学过有帮助' : '先打基础'} · ${edge.local ? '本站课程补充' : '原图谱说明'}`;
  $('edge-detail').hidden = false;
  if (scroll) $('edge-detail').scrollIntoView({ block: 'nearest' });
}
function renderRelations() {
  const list = $('relations');
  list.replaceChildren();
  for (const edge of [...(upstream.get(selected) || []), ...(downstream.get(selected) || [])]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.textContent = `${topicName(edge.before)} → ${topicName(edge.after)}`;
    button.onclick = () => revealEdge(edge, true);
    list.appendChild(button);
  }
  list.closest('details').hidden = list.childElementCount === 0;
}
function renderExample() {
  const steps = examples[selected];
  $('example').hidden = !steps;
  if (!steps) return;
  const [formula, explanation] = steps[exampleStep];
  $('example-formula').textContent = formula;
  $('example-explanation').textContent = explanation;
  const next = $('example-next');
  next.hidden = steps.length < 2;
  next.textContent = exampleStep === steps.length - 1 ? '从头看' : '下一步';
  $('example-step').textContent = steps.length > 1 ? `${exampleStep + 1} / ${steps.length}` : '';
}
function updatePractice() {
  const badge = $('practice-status');
  try {
    const data = JSON.parse(localStorage.getItem('g7_diag_v1') || '{}').tp?.[selected];
    badge.hidden = !(data?.weak || data?.ok);
    badge.dataset.state = data?.weak ? 'weak' : 'ok';
    badge.textContent = data?.weak ? '答错后待巩固' : '实际答对过';
  } catch (_) {
    badge.hidden = true;
  }
}
function renderTopic(id) {
  selected = id;
  exampleStep = 0;
  const topic = topics[id];
  $('chapter-label').textContent = gradeLabel(topic) + ' · ' + topic.domain;
  $('topic-title').textContent = topicName(id);
  $('summary').textContent = topic.summary;
  const lesson = $('lesson');
  const check = $('check');
  lesson.hidden = !topic.lesson;
  if (topic.lesson) {
    const [chapter, index] = topic.lesson;
    lesson.href = chapterFiles[chapter - 1] + '#/L' + index;
    check.href = chapterFiles[chapter - 1] + '#/check/' + id;
  } else if (topic.localPractice) {
    check.href = 'chapter-3.html#/check/' + id;
  }
  check.hidden = !topic.lesson && !topic.localPractice;
  renderGraph();
  renderExample();
  renderRelations();
  updatePractice();
}
function chooseTopic(id, focus = false) {
  if (id !== selected) {
    location.hash = id;
    renderTopic(id);
  } else {
    fitGraph(true);
  }
  if (focus) nodeElements.get(id)?.focus({ preventScroll: true });
}
window.addEventListener('hashchange', () => {
  const id = topicId(location.hash.slice(1)) || firstTopic;
  if (id !== selected) renderTopic(id);
});
window.addEventListener('pageshow', updatePractice);
window.addEventListener('storage', event => { if (event.key === 'g7_diag_v1') updatePractice(); });
$('example-next').onclick = () => {
  exampleStep = (exampleStep + 1) % examples[selected].length;
  renderExample();
};
$('depth').addEventListener('click', event => {
  const button = event.target.closest('[data-depth]');
  if (!button || button.dataset.depth === depth) return;
  depth = button.dataset.depth;
  for (const control of $('depth').children) control.setAttribute('aria-pressed', String(control === button));
  renderGraph();
});
$('zoom-out').onclick = () => zoom(1 / 1.25);
$('zoom-in').onclick = () => zoom(1.25);
$('fit').onclick = () => fitGraph();
$('clear-edge').onclick = clearEdge;

function updateFullscreen() {
  const active = document.fullscreenElement === board || board.classList.contains('expanded');
  const button = $('fullscreen');
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', active ? '退出全屏' : '全屏');
  button.title = active ? '退出全屏' : '全屏';
}
function expandedMode(active) {
  board.classList.toggle('expanded', active);
  document.body.classList.toggle('graph-expanded', active);
  updateFullscreen();
}
$('fullscreen').onclick = async () => {
  if (document.fullscreenElement === board) {
    await document.exitFullscreen();
  } else if (board.classList.contains('expanded')) {
    expandedMode(false);
  } else if (board.requestFullscreen) {
    try { await board.requestFullscreen(); } catch (_) { expandedMode(true); }
  } else {
    expandedMode(true);
  }
};
document.addEventListener('fullscreenchange', updateFullscreen);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && board.classList.contains('expanded')) expandedMode(false);
});
new ResizeObserver(() => fitGraph(true)).observe(viewport);

const pointers = new Map();
let gesture = null;
let ignoreClickUntil = 0;
function position(event) {
  const rect = viewport.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}
function pinch(points) {
  const [a, b] = points;
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
}
viewport.addEventListener('pointerdown', event => {
  if (event.button !== 0 || pointers.size >= 2) return;
  const point = position(event);
  pointers.set(event.pointerId, point);
  if (pointers.size === 1) {
    gesture = { start: point, view: { ...view }, moved: false };
  } else {
    gesture = { start: pinch([...pointers.values()]), view: { ...view }, moved: true };
    for (const id of pointers.keys()) viewport.setPointerCapture(id);
  }
});
viewport.addEventListener('pointermove', event => {
  if (!pointers.has(event.pointerId) || !gesture) return;
  const point = position(event);
  pointers.set(event.pointerId, point);
  const { start, view: startView } = gesture;
  if (pointers.size === 2) {
    const now = pinch([...pointers.values()]);
    view.scale = clamp(startView.scale * now.distance / Math.max(start.distance, 1), .085, 3);
    const ratio = view.scale / startView.scale;
    view.x = now.x - (start.x - startView.x) * ratio;
    view.y = now.y - (start.y - startView.y) * ratio;
  } else {
    const dx = point.x - start.x;
    const dy = point.y - start.y;
    if (!gesture.moved && Math.hypot(dx, dy) < 6) return;
    if (!gesture.moved) viewport.setPointerCapture(event.pointerId);
    gesture.moved = true;
    view.x = startView.x + dx;
    view.y = startView.y + dy;
  }
  viewport.classList.add('dragging');
  paintView();
});
function finishPointer(event) {
  if (!pointers.delete(event.pointerId)) return;
  if (pointers.size === 1) {
    gesture = { start: [...pointers.values()][0], view: { ...view }, moved: true };
    return;
  }
  if (gesture?.moved) ignoreClickUntil = performance.now() + 260;
  gesture = null;
  viewport.classList.remove('dragging');
}
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) viewport.addEventListener(type, finishPointer);
viewport.addEventListener('pointerleave', event => {
  if (!viewport.hasPointerCapture(event.pointerId)) finishPointer(event);
});
viewport.addEventListener('wheel', event => {
  if (!event.ctrlKey && !event.metaKey) return;
  event.preventDefault();
  const { x, y } = position(event);
  zoom(Math.exp(-event.deltaY * 0.005), x, y);
}, { passive: false });
viewport.addEventListener('click', event => {
  if (performance.now() < ignoreClickUntil) return;
  const node = event.target.closest('[data-topic]');
  const arrow = event.target.closest('[data-edge]');
  if (node) chooseTopic(node.dataset.topic, true);
  else if (arrow) revealEdge(edgeElements.get(Number(arrow.dataset.edge)).edge);
  else clearEdge();
});
viewport.addEventListener('keydown', event => {
  const node = event.target.closest('[data-topic]');
  if (node && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    chooseTopic(node.dataset.topic, true);
    return;
  }
  if (event.target !== viewport && !node) return;
  const shifts = { ArrowLeft: [32, 0], ArrowRight: [-32, 0], ArrowUp: [0, 32], ArrowDown: [0, -32] };
  if (shifts[event.key]) {
    const [x, y] = shifts[event.key];
    view.x += x;
    view.y += y;
    paintView();
  } else if (event.key === '+' || event.key === '=') zoom(1.25);
  else if (event.key === '-') zoom(1 / 1.25);
  else if (event.key === '0') fitGraph();
  else return;
  event.preventDefault();
});

const catalog = $('catalog-dialog');
const search = $('search');
const pageSize = 24;
let filter = 'all';
let resultLimit = pageSize;
const searchIndex = entries.map(([id, topic]) => ({
  id, stage: stage(topic), name: normalize(topic.name + ' ' + (topic.short || '')),
  keywords: normalize(topic.chapter + ' ' + topic.domain + ' ' + id)
}));
function browseCatalog() {
  const query = normalize(search.value);
  const hits = searchIndex.filter(row => (filter === 'all' || row.stage === filter)
    && (!query || row.name.includes(query) || row.keywords.includes(query)));
  if (query) hits.sort((a, b) => Number(b.name.includes(query)) - Number(a.name.includes(query)));
  const shown = hits.slice(0, resultLimit);
  const fragment = document.createDocumentFragment();
  for (const { id } of shown) {
    const topic = topics[id];
    const result = document.createElement('button');
    result.type = 'button';
    result.className = 'result';
    result.dataset.topic = id;
    if (id === selected) result.setAttribute('aria-current', 'true');
    const title = document.createElement('strong');
    title.textContent = topicName(id);
    const meta = document.createElement('small');
    meta.textContent = gradeLabel(topic) + ' · ' + topic.chapter.replace(/^\S+\s*/, '');
    result.append(title, meta);
    fragment.appendChild(result);
  }
  $('results').replaceChildren(fragment);
  $('result-count').textContent = hits.length
    ? `找到 ${hits.length} 个，显示 ${shown.length} 个`
    : '没有找到这个知识点。试试更短的关键词。';
  $('more').hidden = hits.length <= resultLimit;
  $('shortcuts').hidden = Boolean(query) || filter !== 'all';
}
$('directory').onclick = () => {
  search.value = '';
  filter = 'all';
  resultLimit = pageSize;
  for (const button of $('filters').children) button.setAttribute('aria-pressed', String(button.dataset.stage === 'all'));
  browseCatalog();
  catalog.showModal();
  search.focus({ preventScroll: true });
};
$('close-directory').onclick = () => catalog.close();
catalog.addEventListener('click', event => {
  const topic = event.target.closest('[data-topic]');
  if (topic) {
    catalog.close();
    chooseTopic(topic.dataset.topic, true);
  } else if (event.target === catalog) {
    catalog.close();
  }
});
search.addEventListener('input', () => { resultLimit = pageSize; browseCatalog(); });
search.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.isComposing) {
    const result = $('results').firstElementChild;
    if (result) result.click();
  }
});
$('filters').addEventListener('click', event => {
  const button = event.target.closest('[data-stage]');
  if (!button) return;
  filter = button.dataset.stage;
  resultLimit = pageSize;
  for (const control of $('filters').children) control.setAttribute('aria-pressed', String(control === button));
  browseCatalog();
});
$('more').onclick = () => { resultLimit += pageSize; browseCatalog(); };

renderTopic(topicId(location.hash.slice(1)) || firstTopic);
