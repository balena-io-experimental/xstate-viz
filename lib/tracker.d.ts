declare type Listener = (data: TrackerData) => void;
export interface TrackerData {
    listeners: Set<Listener>;
    element: Element | undefined;
    rect: ClientRect | undefined;
    hidden: boolean;
}
declare class Tracker {
    elements: Map<string, TrackerData>;
    constructor();
    updateAll(): void;
    update(id: string, element: Element | null | undefined): void;
    listen(id: string, listener: Listener): void;
    get(id: string): TrackerData | undefined;
    notify(data: TrackerData): void;
}
declare const tracker: Tracker;
export { tracker };
