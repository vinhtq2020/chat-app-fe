export interface Error422Message {
    code?: string
    param?: string
    message: string
    field: string
}

export class ResponseError extends Error {
    status: number;
    body: any;
    constructor(message: string | null, status: number, body: any) {
        super(message ?? "")
        this.body = body
        this.status = status
    }
}
