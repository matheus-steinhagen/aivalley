export type RouteConfig = {
  layout: string
	title: string
	description?: string
	keywords?: string
}

export type MetaData = {
  title: string
  description?: string
  keywords?: string
}

export type Post = {
    id: number
    title: string
    author: string
    date: string
    content: string
}