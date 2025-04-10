import { UAParser } from 'ua-parser-js'

export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
    const parser = new UAParser(userAgent)
    const device = parser.getDevice()

    if (device.type === 'tablet') return 'tablet'
    if (device.type === 'mobile') return 'mobile'
    return 'desktop'
}
