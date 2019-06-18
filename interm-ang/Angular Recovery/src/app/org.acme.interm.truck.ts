import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Container} from './org.acme.interm.container';
// export namespace org.acme.interm.truck{
   export class Truck extends Asset {
      truckId: string;
      ownershipType: Ownership;
      totalNormalWeight: number;
      totalFragileWeight: number;
      containersAlloted: number;
      containersLoaded: Container[];
   }
   export enum Ownership {
      LEASED,
      OWNED,
   }
   export class truckDetails extends Transaction {
      truckId: string;
   }
// }
