import settings from './settings.json';

export function imageURL(path) {
  return `${settings.img_base_url}${path}`;
}

export async function fetchApi (url, options = {}){
  const response = await fetch(url, {...options});
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

const HTML_ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"'"]/g, character => HTML_ESCAPES[character]);
}
