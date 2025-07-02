export async function loadScript(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Erro ao carregar script em: ${path}`);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const script = doc.querySelector('script');

  if (!script) throw new Error(`Script não encontrado em ${path}`);
  return script.textContent || '';
}

export function injectScript(scriptText: string, componentName: string): void {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    ${scriptText}
    document.dispatchEvent(new CustomEvent('component:executed', {detail: '${componentName}'}))
  `.trim()
  document.body.appendChild(script);
}

export function waitForComponentExecution(componentName: string): Promise<void> {
  return new Promise((resolve) => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if(detail === componentName){
        document.removeEventListener('component:executed', handler)
        resolve();
      }
    }
    document.addEventListener('component:executed', handler)
  })
}