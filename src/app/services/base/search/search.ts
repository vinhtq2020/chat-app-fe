export interface Filter {
    limit?: number
    q?: string
    page?: number
    sort?: string
}

export interface BaseSearchService<T,F> {
    search(filter: F, userAgent: string, ip: string, deviceId: string): Promise<T[]>
}