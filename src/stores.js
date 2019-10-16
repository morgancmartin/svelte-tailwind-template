import { readable, writable, derived } from 'svelte/store';

function createReadable(init) {
  const { subscribe, set, update } = readable(init);

  return {
    subscribe,
  };
};

function createWritable(init, methods) {
  const { subscribe, set, update } = writable(init);

  return Object.assign({
    subscribe,
    set,
    update
  }, ((methods && methods(set, update, init)) || {}));
};

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
