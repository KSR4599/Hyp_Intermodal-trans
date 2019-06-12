export interface Container {
    shipments: number;
    containerId: string;
    fragileWeight: number;
    normalWeight: number;
    readyToLoad: boolean;
    status: 'Intransit' | 'Delivered';
    origin: string;
    destination: string;
}