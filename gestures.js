import {settleCardGesture, motionEnabled} from './motion.js?v=10';

// Pointer events cover touch, Pencil and mouse while native vertical scrolling stays available.
export function attachCardGestures(root, {canRate, onRate}) {
 let drag = null, settling = null, frame = null, suppressClick = false, clickTimer;
 const transform = ({x, y, rotation}) => `translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`;
 const clear = card => {
  card.classList.remove('is-dragging', 'is-settling');
  for (const property of ['transform', 'opacity', '--swipe-known', '--swipe-again']) card.style.removeProperty(property);
 };
 const paint = gesture => {
  frame = null;
  if (!gesture.card.isConnected) return;
  const amount = Math.min(1, Math.abs(gesture.x) / gesture.threshold);
  gesture.card.style.setProperty('--swipe-known', gesture.x > 0 ? amount : 0);
  gesture.card.style.setProperty('--swipe-again', gesture.x < 0 ? amount : 0);
  if (motionEnabled()) gesture.card.style.transform = transform(gesture);
 };
 const releaseCapture = gesture => {
  if (gesture.card.hasPointerCapture(gesture.pointer)) gesture.card.releasePointerCapture(gesture.pointer);
 };
 const stop = async (accepted = false) => {
  const gesture = drag;
  if (!gesture) return;
  drag = null;
  if (frame) { cancelAnimationFrame(frame); frame = null; }
  releaseCapture(gesture);
  if (!gesture.locked) { clear(gesture.card); return; }
  gesture.card.classList.remove('is-dragging');
  gesture.card.classList.add('is-settling');
  settling = gesture;
  const completed = await settleCardGesture(gesture.card, gesture, accepted);
  if (settling !== gesture) return;
  settling = null;
  const valid = completed && gesture.card.isConnected && canRate(gesture.card);
  clear(gesture.card);
  if (accepted && valid) onRate(gesture.x > 0, gesture.card);
 };
 root.addEventListener('pointerdown', event => {
  if (!event.isPrimary) { stop(); return; }
  if (event.button !== 0 || drag) return;
  const card = event.target.closest('.flash-card');
  if (!card || card.closest('.motion-ghost') || !canRate(card)) return;
  if (event.target.closest('button:not([data-action="toggle-flash"]),a,input,select')) return;
  if (getSelection()?.toString()) return;
  if (settling) { settling.card.getAnimations().forEach(animation => animation.cancel());clear(settling.card);settling = null; }
  card.getAnimations().forEach(animation => animation.cancel());
  clear(card);
  drag = {card, pointer: event.pointerId, startX: event.clientX, startY: event.clientY, x: 0, y: 0, rotation: 0, locked: false, threshold: Math.min(130, card.offsetWidth * .24)};
 });
 root.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.pointer) return;
  const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
  if (!drag.locked) {
   if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * .85) { stop(); return; }
   if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
   drag.locked = true;
   drag.card.setPointerCapture(event.pointerId);
   drag.card.classList.add('is-dragging');
   suppressClick = true;
   clearTimeout(clickTimer);
  }
  event.preventDefault();
  const limit = drag.card.offsetWidth * .65;
  drag.x = Math.sign(dx) * Math.min(Math.abs(dx), limit);
  drag.y = Math.max(-16, Math.min(16, dy * .08));
  drag.rotation = Math.max(-8, Math.min(8, dx / drag.card.offsetWidth * 12));
  if (!frame) { const gesture = drag; frame = requestAnimationFrame(() => paint(gesture)); }
 }, {passive: false});
 root.addEventListener('pointerup', event => {
  if (!drag || event.pointerId !== drag.pointer) return;
  if (drag.locked) paint(drag);
  const accepted = drag.locked && Math.abs(drag.x) >= drag.threshold;
  stop(accepted);
  clickTimer = setTimeout(() => { suppressClick = false; }, 350);
 });
 for (const type of ['pointercancel', 'lostpointercapture']) root.addEventListener(type, event => {
  // Touch starts with implicit capture on a child button; transferring it to the card is expected.
  if (drag && event.pointerId === drag.pointer && (type === 'pointercancel' || event.target === drag.card)) {
   stop();clickTimer = setTimeout(() => { suppressClick = false; }, 350);
  }
 });
 root.addEventListener('click', event => {
  if (!suppressClick) return;
  suppressClick = false;
  event.preventDefault();event.stopPropagation();
 }, true);
 return () => {
  if (drag) stop();
  if (settling) { settling.card.getAnimations().forEach(animation => animation.cancel());clear(settling.card);settling = null; }
 };
}
