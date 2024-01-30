import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Решение
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const ProgressInstance = createApp(TheTopProgressBar).mount(container || addDefaultContainer());

  const Progress = {
    start: ProgressInstance.start,
    finish: ProgressInstance.finish,
    fail: ProgressInstance.fail,
    install(app) {
      app.provide(PROGRESS_KEY, Progress);
    },
  };

  if (router) {
    router.beforeEach((to, from, next) => {
      Progress.start(to.fullPath);
      next();
    });

    router.afterEach((to, from, err) => {
      Progress.finish(to.fullPath);
    });

    router.onError((to, from, err) => {
      if (err) {
        Progress.fail(to.fullPath);
      }
    });
  }

  return Progress;
}
