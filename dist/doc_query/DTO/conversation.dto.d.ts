export interface conversation {
    doc_id: string;
    owner_id: number;
    role: "AI" | "HUMAN";
    Message: string;
}
