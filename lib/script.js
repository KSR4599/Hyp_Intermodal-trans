/**
 * Create Container Transaction
 * @param {org.acme.interm.container.CreateContainer} containerData
 * @transaction
 * 
 * 1. Check for the validity of the schedule - throw error 
 * 2. Create the Container asset
 *    2.1 Set the containerId, containerNumber
 *    2.2 Create an instance of the 'route' Concept
 *    2.3 Set the data on 'route' Concept
 *    2.4 Set the container asset route = 'route' concept
 * 3. Emit ContainerCreated Event
 * 4. Add the container asset to the registry
 */

function createContainer(containerData) {
  console.log("CREATE CONTAINER CALLED!");

  /**
   * 1. Validate the schedule data
   * If the date is a past date then throw an error
   */
  var timeNow = new Date().getTime();
  var schedTime = new Date(containerData.schedule).getTime();
  

  // Get the Asset Registry

  return getAssetRegistry('org.acme.interm.container.Container')
  
      .then(function(containerRegistry){
          // Now add the Flight - global function getFactory() called
          var  factory = getFactory();

          var  NS =  'org.acme.interm.container';

          // Solution to exercise - Removed hardcoded value & invoked
          // generate the flight ID
          // 2.1 Set the flightNumber, flightId ... 
          var  containerId = generateContainerId(containerData.containerNumber,containerData.schedule);
          var  container = factory.newResource(NS,'Container',containerId);
          container.containerNumber = containerData.containerNumber;
          //container.aliasContainerNumber = [];

          // Flight asset has an instance of the concept
          // 2.2 Use the factory to create an instance of concept
          var route = factory.newConcept(NS,"Route");

          // 2.3 Set the data in the concept 'route'
          route.origin = containerData.origin;
          route.destination = containerData.destination;
          route.schedule = containerData.schedule;

          // 2.4 Set the route attribute on the asset
          container.route = route;
          container.allShipments = [];
          container.readyToLoad = false;
          container.normalWeight = 0;
          container.fragileWeight = 0;
          container.status = "Intransit";

          // 3 Emit the event FlightCreated
          var event = factory.newEvent(NS, 'ContainerCreated');
          event.containerId = containerId;
          emit(event);

          // 4. Add to registry
          return containerRegistry.add(container);
      });
}
/**

 * Create Truck Transaction

 * @param {org.acme.interm.truck.addTruck} truckData

 * @transaction

 * 

 * **/
function addTruck(truckData) {

    
    return getAssetRegistry('org.acme.interm.truck.Truck')
    
        .then(function(truckRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'org.acme.interm.truck';


            var  truck = factory.newResource(NS,'Truck',truckData.truckId);
      
            truck.truckId = truckData.truckId;
            truck.totalNormalWeight = truckData.normalWeight;
            truck.totalFragileWeight = truckData.fragileWeight;
            truck.containersLoaded = [];
            truck.containersAlloted = 0;
            truck.schedule = truckData.schedule;
            
            var event = factory.newEvent('org.acme.interm.truck', 'TruckCreated');
            event.TruckId = truckData.truckId;
            emit(event);

            // 4. Add to registry
            return truckRegistry.add(truck);
        });
}



/****
 * Creates the flight number from Flight number and the schedule
 * Solution to Exercise.
 */
function generateContainerId(containerNum, schedule){
    var dt = new Date(schedule)

    // Date & Month needs to be in the format 01 02 
    // so add a '0' if they are single digits
    var month = dt.getMonth()+1;
    if((month+'').length == 1)  month = '0'+month;
    var dayNum = dt.getDate();
    if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

    // console.log(dayNum,month,dt.getFullYear())

    return containerNum+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);
}

/**
 * Create Container Transaction
 * @param {org.acme.interm.truck.AssignTruck} containerTruckData
 * @transaction
 * 
 * **/
function    AssignTruck(containerTruckData){  
    console.log("ASSIGN TRUCK CALLED!");
    var containerRegistry={}
    var container1 = {}
    var truckRegistry={}
   var totFragileWeight;
   var totNormalWeight;
    return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
        containerRegistry = registry
        return containerRegistry.get(containerTruckData.containerId);
    }).then(function(container){
      
      container1 = container;
if(!container) throw new Error("Container : "+containerTruckData.containerId," Not Found!!!");
      
  if(!container.readyToLoad) throw new Error("Container : "+ containerTruckData.containerId +"Is Not Yet Ready to Load into the Truck!");
      
      console.log("Got Container",container);
  
       
        totFragileWeight = container.fragileWeight;
        totNormalWeight = container.normalWeight;
      
        var   factory = getFactory();

        var   relationship = factory.newRelationship('org.acme.interm.truck','Truck',containerTruckData.truckId);
        container.truck = relationship;
      
        return containerRegistry.update(container);
    })
  .then(function() {
   return getAssetRegistry('org.acme.interm.truck.Truck').then(function(registry){
          truckRegistry = registry
          return truckRegistry.get(containerTruckData.truckId);
      }).then(function(truck){
        
        console.log("Truck Details:",truck);
     
     truck.totalNormalWeight = truck.totalNormalWeight + totNormalWeight;
     truck.totalFragileWeight = truck.totalFragileWeight + totFragileWeight;
     truck.containersAlloted = truck.containersAlloted + 1;
     truck.containersLoaded.push(container1);
     
     return truckRegistry.update(truck);
    })
      
    })         
      .then(function(){
        // Successful update
        var event = getFactory().newEvent('org.acme.interm.truck', 'TruckAssigned');
        event.containerId = containerTruckData.containerId;
        event.truckId = containerTruckData.truckId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}



/**
 * Create Container Transaction
 * @param {org.acme.interm.container.ClearContainer} containerData
 * @transaction
 * 
 * **/
function    ClearContainer(containerData){  
    console.log("Container Clearing Now!");
    var containerRegistry={}
    var truckRegistry ={}
    var truckId = {}
    var fragWeight = {}
    var normWeight = {}
    var i = {}
    return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
        containerRegistry = registry
        return containerRegistry.get(containerData.containerId);
    }).then(function(container){
      console.log("Got container :",container);
        if(!container) throw new Error("Container : "+containerData.containerId," Not Found!!!");
        var   factory = getFactory();
      
      container.status = "Delivered";
    truckId = container.truck.$identifier;
      fragWeight = container.fragileWeight;
      normWeight = container.normalWeight;

        return containerRegistry.update(container);
    })
      .then(function() {
   return getAssetRegistry('org.acme.interm.truck.Truck').then(function(registry){
          truckRegistry = registry
          return truckRegistry.get(truckId);
      }).then(function(truck){
        
        console.log("Truck Details:",truck);
     
     truck.totalFragileWeight =  truck.totalFragileWeight - fragWeight;
     truck.totalNormalWeight =  truck.totalNormalWeight - normWeight;
     truck.containersAlloted = truck.containersAlloted - 1;
     
     console.log("Container IDD:",truck.containersLoaded[0].$identifier);
     

     for(i=0;i<truck.containersLoaded.length;i++){
      if(truck.containersLoaded[i].$identifier == containerData.containerId);
         truck.containersLoaded.splice(i,1);
     }
     
     return truckRegistry.update(truck);
   })
    })
      .then(function(){
        // Successful update
        var event = getFactory().newEvent('org.acme.interm.container', 'ContainerCleared');
        event.containerId = containerData.containerId;

        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}





/**
 * Create Container Transaction
 * @param {org.acme.interm.container.LoadContainer} containerData
 * @transaction
 * 
 * **/
function    LoadContainer(containerTruckData){  
    console.log("Adding the weights to container!");
 

    var containerRegistry={}
    var truckRegistry={}
     return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
        containerRegistry = registry
        return containerRegistry.get(containerTruckData.containerId);
    }).then(function(container){

        if(!container) throw new Error("Container : "+containerTruckData.containerId," Not Found!!!");
       if(container.readyToLoad) throw new Error("Container : "+containerTruckData.containerId + "Is already loaded into truck You cant add shipments to it now!");
        var   factory = getFactory();
       
      if(containerTruckData.type== "Normal") {
        
        container.normalWeight =  container.normalWeight + containerTruckData.weight;
        
      } else {
        container.fragileWeight =  container.fragileWeight + containerTruckData.weight;
      }
       
          var  NS =  'org.acme.interm.container';
  
       var shipment = factory.newConcept(NS,"Shipment");
       
       shipment.weight = containerTruckData.weight;
       shipment.type = containerTruckData.type;
        
       container.allShipments.push(shipment);
      
        return containerRegistry.update(container);
    })
   .then(function(){
        // Successful update
        
    }).catch(function(error){
        throw new Error(error);
    });
}



/**
 * Create Container Transaction
 * @param {org.acme.interm.container.getContainer} containerData
 * @transaction
 * 
 * **/
function getContainer(containerData){
    console.log("In get Container");
      var containerRegistry={}
      return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
          containerRegistry = registry
          return containerRegistry.get(containerData.containerId);
      }).then(function(container){
        
        console.log("Container from container Registry :",container);
        
  
      })
}


/**
 * Create Container Transaction
 * @param {org.acme.interm.container.readyContainer} containerData
 * @transaction
 * 
 * **/
function readyContainer(containerData){
    console.log("In get Container");
      var containerRegistry={}
      return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
          containerRegistry = registry
          return containerRegistry.get(containerData.containerId);
      }).then(function(container){
        
        console.log("Container from container Registry :",container);
        container.readyToLoad = true;
                console.log("Now container is ready to load into the Truck :",container);
  return containerRegistry.update(container);
    })
      }


/**
 * Create Container Transaction
 * @param {org.acme.interm.truck.truckDetails} truckData
 * @transaction
 * 
 * **/
function truckDetails(truckData){
   console.log("In get Truck");
      var truckRegistry={}
      return getAssetRegistry('org.acme.interm.truck.Truck').then(function(registry){
          truckRegistry = registry
          return truckRegistry.get(truckData.truckId);
      }).then(function(truck){
        
        console.log("Truck Details:",truck);
    })
}
