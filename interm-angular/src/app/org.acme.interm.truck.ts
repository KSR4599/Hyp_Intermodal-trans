import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.interm.truck{
   export class Truck extends Asset {
      truckId: string;
      ownershipType: Ownership;
      normalWeight: number;
      fragileWeight: number;
   }
   export enum Ownership {
      LEASED,
      OWNED,
   }
// }
