const pad = (value: number) => String(value).padStart(2, '0')

export const formatDate = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
    )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+03:00`

export const toHumanDate = (zonedDate: string) => {
    const date = new Date(Date.parse(zonedDate))
    return `${pad(date.getDate())}.${pad(
        date.getMonth() + 1
    )}.${date.getFullYear()}`
}

export const fromServerDate = (dateString: string) =>
    new Date(Date.parse(dateString))
