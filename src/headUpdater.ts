import type { MetaData } from './type'

export function updateHead(meta: MetaData) {
  document.title = meta.title

  const setMeta = (name: string, content: string | undefined) => {
    if (!content) return
    let tag = document.querySelector(`meta[name="${name}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', name)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  setMeta('description', meta.description)
  setMeta('keywords', meta.keywords)
}