export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (!GA_ID) return
  window.gtag("config", GA_ID, {
    page_path: url,
  })
}

type GtagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (!GA_ID) return
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}
