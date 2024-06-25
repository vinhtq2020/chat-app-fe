export interface Contact {
    id: string
    name: string
} 

export interface Message {
    id: string
    content: string
    attachments?: Attatchment[]
    authorId: string
    receiverId: string
}

export interface Attatchment {
    id: string;
    messageId: string;
    type: 'link' | 'video' | 'audio'
    content: URL
}

export interface ChatService {
    getContacts(): Promise<Contact[]>
}