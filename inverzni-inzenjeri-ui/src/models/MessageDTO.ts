export interface MessageDTO {
    to: number;
    from: number;
    content: string;
    messageRole: string;
    seen: boolean;
    id: number;
    name: string;
    event: number;
}
