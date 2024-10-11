import { useEffect } from 'react';

export function loadTawkTo() {
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  
  // Dynamically create the script tag and insert it into the DOM
  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = 'https://embed.tawk.to/66e84b7cea492f34bc14a016/1i7tmdnnm';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  
  const s0 = document.getElementsByTagName('script')[0];
  s0.parentNode.insertBefore(s1, s0);
}

export function openTawkChat() {
  if (window.Tawk_API) {
    window.Tawk_API.maximize(); // Opens the chat widget
  }
}
