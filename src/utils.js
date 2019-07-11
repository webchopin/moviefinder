import * as settings from './settings.json';

export function imageURL(path) {
  return `${settings.img_base_url}${path}`;
}

export async function fetchApi (url, options = {}){
  const response = await fetch(url, {...options});
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
}
