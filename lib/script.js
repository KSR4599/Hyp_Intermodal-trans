
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
    if(schedTime < timeNow){
        throw new Error("Scheduled time cannot be in the past!!!");
    }

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
            

            // 3 Emit the event FlightCreated
            var event = factory.newEvent(NS, 'ContainerCreated');
            event.containerId = containerId;
            emit(event);

            // 4. Add to registry
            return containerRegistry.add(container);
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
 * @param {org.acme.interm.container.AssignTruck} containerTruckData
 * @transaction
 * 
 * **/
function    AssignTruck(containerTruckData){  
    console.log("ASSIGN TRUCK CALLED!");
    var containerRegistry={}
    return getAssetRegistry('org.acme.interm.container.Container').then(function(registry){
        containerRegistry = registry
        return containerRegistry.get(containerTruckData.containerId);
    }).then(function(container){
        if(!container) throw new Error("Container : "+containerTruckData.containerId," Not Found!!!");
        var   factory = getFactory();
        var   relationship = factory.newRelationship('org.acme.interm.truck','Truck',containerTruckData.truckId);
        container.truck = relationship;
        return containerRegistry.update(container);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.acme.interm.container', 'TruckAssigned');
        event.containerId = containerTruckData.containerId;
        event.truckId = containerTruckData.truckId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}