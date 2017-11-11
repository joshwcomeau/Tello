import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

export const range = n =>
  Array(n)
    .fill()
    .map((_, i) => i);

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const clamp = (val, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val));

export const debounce = (callback, wait, timeoutId = null) => (...args) => {
  window.clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    callback.apply(null, args);
  }, wait);
};

// TODO: Modernize!
/* eslint-disable */
export function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;

  return function() {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
/* eslint-enable */

export const stripHTMLFromString = string => {
  // Rather than try and use a regex, we'll just rely on the browser's engine.
  // NOTE: This is probably not safe to use on untrusted
  const placeholderDiv = document.createElement('div');
  placeholderDiv.innerHTML = string;

  return placeholderDiv.textContent || placeholderDiv.innerText || '';
};

export const truncateStringByWordCount = (string, maxWords) => {
  const wordArray = string.split(/\s/g);

  // Maybe no truncation is necessary, if the string is below the limit?
  if (wordArray.length <= maxWords) {
    return string;
  }

  const truncatedString = wordArray.slice(0, maxWords).join(' ');

  // Attach an ellipsis at the end, since it needed truncation
  return `${truncatedString}…`;
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const convertArrayToMap = list =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) =>
  arr1.concat(arr2.filter(item => arr1.indexOf(item) === -1));

export const isBetween = ({ date, startDate, endDate }) =>
  isAfter(date, startDate) && isBefore(date, endDate);

export const findRight = (arr, predicate) =>
  arr
    .slice()
    .reverse()
    .find(predicate);

export function requestAnimationFramePromise() {
  return new Promise(resolve => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

export const deleteCookie = key => {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
