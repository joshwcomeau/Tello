export const range = n => Array(n).fill().map((_, i) => i);

export const debounce = (callback, wait, context = this) => {
  let timeout = null
  let callbackArgs = null

  const later = () => callback.apply(context, callbackArgs)

  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
};

export const stripHTMLFromString = string => {
  // Rather than try and use a regex, we'll just rely on the browser's engine.
  // NOTE: This is probably not safe to use on untrusted
  const placeholderDiv = document.createElement("div");
  placeholderDiv.innerHTML = string;

  return placeholderDiv.textContent || placeholderDiv.innerText || "";
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
