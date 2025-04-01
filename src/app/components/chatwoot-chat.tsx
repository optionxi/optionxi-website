'use client'
import { useEffect } from 'react'

export default function ChatwootWidget(): JSX.Element | null {
  useEffect(() => {
    // Only run on client side
    const script = document.createElement('script')
    script.innerHTML = `
      (function(d,t) {
        var BASE_URL="https://chat.optionxi.com";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.chatwootSDK.run({
            websiteToken: 'pMN7mCgC46b7TjDbecSJLW3m',
            baseUrl: BASE_URL
          })
        }
      })(document,"script");
    `
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  
  return null
}