export async function loadLayout(layoutTitle: string): Promise<string> {
    const response = await fetch(`/layouts/${layoutTitle}.html`)

    if(!response.ok){
        throw new Error(`<p>Erro ao carregar o layout ${layoutTitle}</p>`)
    }

    return await response.text()
}