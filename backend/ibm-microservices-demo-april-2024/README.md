# Microservices 

Microservices are an architectural style that breaks down a large application into smaller, independent services that communicate with each other using APIs. Each service is designed to support a specific task or business goal. 

## Clinic management application using microservices: 

### Doctor Service: 
This microservice handles functionalities related to doctors.

### Patient Service: 
This microservice handles functionalities related to patients.

### Appointment Service: 
This microservice manages appointments.

### Clinic API Gateway: 
Acts as the single entry point for external clients to interact with your microservices. It routes incoming API requests to the appropriate microservice based on the path and handles any security or authentication concerns.

### Eureka Server: 
This dedicated application is responsible for service registration and discovery. Microservices will register themselves with the Eureka server, allowing them to find each other for communication.

## Advantages of this approach:

Separation of Concerns: Each application focuses on a specific functionality, making the code more maintainable and easier to understand.

Scalability: You can independently scale individual services based on their specific load without affecting others.

Resilience: If one service fails, it won't bring down the entire system. Other services can continue operating.

This approach might seem complex initially, but it offers a robust and scalable architecture for your microservices in the long run.

### Spring boot apps for each microservices - 

- Eureka server - default port 8761 
- Clinic API Gateway - port 9001 
- Appointment Service - port 9002 
- Doctor service - port 9003 
- Patient service - port 9004 

### Steps to run the microservices 

- 1. Clone the repository 
- 2. Open the folder on CMD 
- 3. Run these commands one by one - 

## On windows CMD 
- start java -jar 00-eureka-server.jar 
- start java -jar 01-api-gateway.jar 
- start java -jar 02-doctor-service.jar 
- start java -jar 03-patient-service.jar 
- start java -jar 04-appointment-service.jar 

## On Mac terminal  
- java -jar 00-eureka-server.jar & 
- java -jar 01-api-gateway.jar & 
- java -jar 02-doctor-service.jar & 
- java -jar 03-patient-service.jar & 
- java -jar 04-appointment-service.jar & 

After all the services start, open the following on browser 

### Eureka Server API  
- http://localhost:8761 

### API Gatyway API: 
- http://localhost:9001 

### Test endpoints APIs:  
- http://localhost:9001/testing-purpose
- http://localhost:9001/ibm-appointment-service/testing-purpose
- http://localhost:9001/ibm-doctor-service/testing-purpose
- http://localhost:9001/ibm-patient-service/testing-purpose

### APIs for testing with CRUD operations: 
- http://localhost:9002/swagger-ui/index.html
- http://localhost:9003/swagger-ui/index.html
- http://localhost:9004/swagger-ui/index.html

Add data using POST methods in Swagger UI. 

Do not add id field data for the object.

Check the added data on Swagger UI and also on - 

## APIs for consumption by presentation layer apps: 
- http://localhost:9001/ibm-appointment-service/ibm-appointment/appointments
- http://localhost:9001/ibm-appointment-service/ibm-appointment/<other endpoints>
- http://localhost:9001/ibm-patient-service/ibm-patient/patients
- http://localhost:9001/ibm-patient-service/ibm-patient/<other endpoints>
- http://localhost:9001/ibm-doctor-service/ibm-doctor/doctors
- http://localhost:9001/ibm-doctor-service/ibm-doctor/<other endpoints>

