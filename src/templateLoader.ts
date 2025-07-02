export async function loadTemplate(path: string): Promise<HTMLTemplateElement> {
    const response = await fetch(path)

    if(!response.ok){
        throw new Error(`Erro ao carregar template em: ${path}`)
    }

    const htmlText = await response.text()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlText.trim()

    const template = tempDiv.querySelector('template')
    if(!(template instanceof HTMLTemplateElement)){
        throw new Error(`Template inválido ou não encontrado em ${path}`)
    }

    return template
}