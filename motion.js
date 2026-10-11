const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const active = new Set();
const running = new WeakMap();
const observed = new Set();
const ease = 'cubic-bezier(.22,.8,.24,1)';

export const motionEnabled = () => document.documentElement.dataset.motion !== 'off' && !reduced.matches;

function animate(element, frames, options, key = 'main') {
  let slots = running.get(element);
  if (!slots) running.set(element, slots = new Map());
  slots.get(key)?.cancel();
  if (!motionEnabled()) return null;
  const animation = element.animate(frames, {duration: 240, easing: ease, ...options});
  slots.set(key, animation);
  active.add(animation);
  animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  return animation;
}

export function finishMotion() {
  for (const animation of active) animation.finish();
}
reduced.addEventListener('change', () => { if (reduced.matches) finishMotion(); });

export function enter(element, {x = 0, y = 6, duration = 220} = {}) {
  if (!element) return;
  animate(element, [{opacity: .25, transform: `translate(${x}px,${y}px)`}, {opacity: 1, transform: 'translate(0,0)'}], {duration}, 'enter');
}

export function syncSelection(group, selected, animated = true) {
  if (!group || !selected || !group.offsetWidth) return;
  let marker = group.querySelector(':scope > .selection-marker');
  if (!marker) {
    marker = document.createElement('span');
    marker.className = 'selection-marker';
    marker.setAttribute('aria-hidden', 'true');
    group.prepend(marker);
  }
  const target = {x: selected.offsetLeft, y: selected.offsetTop, w: selected.offsetWidth, h: selected.offsetHeight};
  const first = !marker.dataset.ready;
  const box = marker.getBoundingClientRect(), parent = group.getBoundingClientRect();
  const current = {x: box.left - parent.left - group.clientLeft, y: box.top - parent.top - group.clientTop, w: box.width, h: box.height};
  running.get(marker)?.get('selection')?.cancel();
  Object.assign(marker.style, {width: `${target.w}px`, height: `${target.h}px`, transform: `translate(${target.x}px,${target.y}px)`});
  marker.dataset.ready = 'true';
  if (!first && animated && (Math.abs(current.x-target.x) > .5 || Math.abs(current.y-target.y) > .5 || Math.abs(current.w-target.w) > .5)) {
    const overX = target.x + (target.x-current.x)*.025;
    const overY = target.y + (target.y-current.y)*.025;
    animate(marker, [
      {transform: `translate(${current.x}px,${current.y}px)`, width: `${current.w}px`, height: `${current.h}px`, offset: 0},
      {transform: `translate(${overX}px,${overY}px)`, width: `${target.w}px`, height: `${target.h}px`, offset: .78},
      {transform: `translate(${target.x}px,${target.y}px)`, width: `${target.w}px`, height: `${target.h}px`, offset: 1}
    ], {duration: 360}, 'selection');
  }
}

const resize = new ResizeObserver(entries => {
  for (const {target} of entries) {
    if (!target.isConnected) { resize.unobserve(target); observed.delete(target); continue; }
    syncSelection(target, target.querySelector('.active'), false);
  }
});

export function syncSelections(root = document, animated = true) {
  for (const group of observed) {
    if (!group.isConnected) { resize.unobserve(group); observed.delete(group); }
  }
  root.querySelectorAll('.side-nav,.bottom-nav,.segmented').forEach(group => {
    if (!observed.has(group)) { observed.add(group); resize.observe(group); }
    syncSelection(group, group.querySelector('.active'), animated);
  });
}

export function disclose(panel, open, immediate = false) {
  if (!panel) return;
  // A new answer can open while its card is still entering. Let the region grow with it.
  const region = panel.closest('.motion-region');
  if (region?.style.height) {
    region._token = (region._token || 0) + 1;
    running.get(region)?.get('height')?.cancel();
    region.style.removeProperty('height');
    region.style.removeProperty('overflow');
  }
  const previous = panel._disclosure;
  const height = panel.hidden ? 0 : panel.getBoundingClientRect().height;
  const opacity = panel.hidden ? 0 : Number(getComputedStyle(panel).opacity);
  previous?.cancel();
  panel.hidden = false;
  panel.style.height = 'auto';
  const target = open ? panel.getBoundingClientRect().height : 0;
  const finish = () => {
    panel.hidden = !open;
    panel.style.removeProperty('height');
    panel.style.removeProperty('overflow');
    panel.style.removeProperty('opacity');
  };
  if (immediate || !motionEnabled()) { finish(); return; }
  panel.style.height = `${height}px`;
  panel.style.overflow = 'hidden';
  const animation = animate(panel, [{height: `${height}px`, opacity}, {height: `${target}px`, opacity: open ? 1 : 0}], {duration: open ? 280 : 210}, 'disclosure');
  panel._disclosure = animation;
  animation.finished.then(() => { if (panel._disclosure === animation) finish(); }, () => {});
}

// Only the changing region is replaced. The navigation, search and study header stay mounted.
export function replaceRegion(region, html, {direction = 0, animated = true} = {}) {
  if (!region) return;
  const token = region._token = (region._token || 0) + 1;
  const height = region.getBoundingClientRect().height;
  const old = direction ? region.querySelector(':scope > .region-content')?.cloneNode(true) : null;
  region.getAnimations().forEach(animation => animation.cancel());
  region.style.removeProperty('height');
  region.style.removeProperty('overflow');
  region.innerHTML = `<div class="region-content">${html}</div>`;
  if (!animated || !motionEnabled()) return;
  const content = region.firstElementChild;
  const targetHeight = region.getBoundingClientRect().height;
  if (old && direction) {
    old.classList.add('motion-ghost');
    old.setAttribute('aria-hidden', 'true');
    old.inert = true;
    old.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    region.append(old);
    const leave = animate(old, [{opacity: 1, transform: 'translateX(0)'}, {opacity: 0, transform: `translateX(${-direction*22}px)`}], {duration: 160});
    leave.finished.then(() => old.remove(), () => old.remove());
  }
  enter(content, {x: direction*20, y: direction ? 0 : 5, duration: direction ? 240 : 180});
  // Avoid a long animated scroll surface when a filter removes dozens of rows.
  const difference = Math.abs(targetHeight-height);
  if (difference > 1 && difference < 600 && height) {
    region.style.height = `${height}px`;
    region.style.overflow = 'hidden';
    const size = animate(region, [{height: `${height}px`}, {height: `${targetHeight}px`}], {duration: 240}, 'height');
    size.finished.then(() => {
      if (region._token === token) { region.style.removeProperty('height'); region.style.removeProperty('overflow'); }
    }, () => {});
  }
}
