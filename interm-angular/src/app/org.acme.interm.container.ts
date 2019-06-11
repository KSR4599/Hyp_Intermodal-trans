import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Truck} from './org.acme.interm.truck';
// export namespace org.acme.interm.container{
   export class Container extends Asset {
      containerId: string;
      containerNumber: string;
      route: Route;
      truck: Truck;
      allShipments: Shipment[];
      totalWeight: number;
   }
   export class Route {
      origin: string;
      destination: string;
      schedule: Date;
   }
   export class Shipment {
      weight: number;
   }
   export class CreateContainer extends Transaction {
      containerNumber: string;
      origin: string;
      destination: string;
      schedule: Date;
   }
   export class ContainerCreated extends Event {
      containerId: string;
   }
   export class AssignTruck extends Transaction {
      containerId: string;
      truckId: string;
   }
   export class TruckAssigned extends Event {
      containerId: string;
      truckId: string;
   }
   export class ClearContainer extends Transaction {
      containerId: string;
   }
   export class ContainerCleared extends Event {
      containerId: string;
   }
   export class LoadContainer extends Transaction {
      containerId: string;
      fragileWeight: number;
      normalWeight: number;
   }
   export class ContainerLoaded extends Event {
      containerId: string;
      fragileWeight: number;
      normalWeight: number;
   }
   export class addTruck extends Transaction {
      truckId: string;
      normalWeight: number;
      fragileWeight: number;
   }
   export class TruckCreated extends Event {
      TruckId: string;
   }
   export class getContainer extends Transaction {
      containerId: string;
   }
// }
