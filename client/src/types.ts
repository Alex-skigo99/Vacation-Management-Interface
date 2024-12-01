export type User = {
    id: number;
    name: string;
    role: string;
};

export type VacationType = {
    id: number;
    requester_id: number;
    validator_id: number;
    start_date: string;
    end_date: string;
    reason: string;
    validater_name: string;
    requester_name: string;
    status: string;
    comments: string;
    created_at?: string;
};