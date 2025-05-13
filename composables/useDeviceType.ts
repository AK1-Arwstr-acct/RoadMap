export function useDeviceType() {
    const deviceType = useState<'mobile' | 'tablet' | 'desktop'>('device-type', () => {
        if (process.server) {
            const headers = useRequestHeaders(['user-agent'])
            const userAgent = headers['user-agent'] || ''
            return getDeviceType(userAgent)
        }

        if (process.client) {
            const userAgent = navigator.userAgent
            return getDeviceType(userAgent)
        }

        return 'desktop' // default fallback
    })

    return deviceType
}
