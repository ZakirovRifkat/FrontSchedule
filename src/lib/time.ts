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

export const fromHumanDate = (string: string) => {
    const match = string.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    if (!match) {
        throw new Error('Invalid date')
    }

    const date = new Date()
    date.setFullYear(
        parseInt(match[3], 10),
        parseInt(match[2], 10),
        parseInt(match[1], 10)
    )

    return date
}
