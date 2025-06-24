export interface AllTableQueue {
    table: string,
    queue: number
}
export interface IQueue {
    id: number;
    order: number;
    table: number;
}
export type Discipline = {
    id: string;
    name: string;
    createdAt: string; // or Date if you're parsing it
    updatedAt: string; // or Date if you're parsing it
};
export type QueueStatus = "WAITING" | "CALLED" | "COMPLETED" | "SKIPPED"; // add more if needed

export type QueueInfo = {
    queueId: string;
    discipline: string;
    table: string;
    status: QueueStatus;
    position: number;
    peopleAhead: number;
};
interface CurrentQueue {
    id: string;
    discipline: string;
    status: QueueStatus;
}

export interface AdminQueueStatus {
    current: CurrentQueue | null;
    waitingCount: number;
}
