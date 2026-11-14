'use strict';

function showStudyDirectory(trigger) {
  const directory = document.getElementById('study-lesson-directory');
  if (!directory || directory.open) return;
  directory.showModal();
  directory.querySelector('[aria-current="step"]')?.scrollIntoView({ block: 'nearest' });
  directory.querySelector('[data-study-close]').focus({ preventScroll: true });
  const controller = new AbortController();
  directory.addEventListener('click', event => {
    if (event.target.closest('a[href]')) directory.close();
  }, { signal: controller.signal });
  directory.addEventListener('close', () => {
    controller.abort();
    if (trigger.isConnected) trigger.focus({ preventScroll: true });
  }, { once: true });
}
