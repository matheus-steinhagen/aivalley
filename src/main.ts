
import { router } from './bridge/router'
import { updateHead } from './headUpdater'
import { loadLayout } from './layoutLoader'
import { loadTemplate } from './templateLoader'
import { loadScript, injectScript, waitForComponentExecution } from './scriptHelper'

function getCurrentPath(): string{
    return window.location.pathname
}

window.addEventListener('DOMContentLoaded', async () => {
    const path = getCurrentPath()
	const route = router[path]
	
	if (!route){
		throw new Error(`Rota '${path}' não encontrada.`)
	}

	updateHead({
		title: route.title,
		description: route.description,
		keywords: route.keywords
	})

    const layoutHTML = await loadLayout(route.layout)
	const app = document.querySelector<HTMLDivElement>('#app')
	if(app) app.innerHTML = layoutHTML

    const componentElements = document.querySelectorAll<HTMLElement>('[data-component]')
    const scriptPromises: Promise<void>[] = []

    // para cada recrutador de componente
    for(const el of componentElements){
        const componentName = el.dataset.component
        if(!componentName){
            console.error('Componente sem nome em data-component.')
            continue
        }

        const componentPath = `/components/${componentName}.html`
        const template = await loadTemplate(componentPath)
        const script = await loadScript(componentPath)
        
        const clone = template.content.cloneNode(true) as DocumentFragment
        el.innerHTML = ''
        el.appendChild(clone)

        injectScript(script, componentName)
        const scriptExecution = waitForComponentExecution(componentName)
        scriptPromises.push(scriptExecution)
    }
    await Promise.all(scriptPromises)
    document.dispatchEvent(new CustomEvent('scripts:ready'))
})