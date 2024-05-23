package com.ibmfinalpresentation.Prescription.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import com.ibm.springboot.demo.model.Employee;
//import com.ibmfinalpresentation.Prescription.Model.Prescription;
import com.ibmfinalpresentation.Prescription.ServiceImpl.PrescriptionServiceImpl;
import com.ibmfinalpresentation.Prescription.model.Prescription;


@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionServiceImpl prescriptionService;

    @PostMapping("/add")
    public ResponseEntity<Prescription> addPrescription(@RequestBody Prescription prescription) {
        Prescription addedPrescription = prescriptionService.addPrescription(prescription);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPrescription);
    }
    @GetMapping("/get-pre-by-id/{eid}")
    public ResponseEntity<Prescription> getpreById(@PathVariable(name = "eid") String Id) {
		System.out.println(Id);
		Prescription prescription = prescriptionService.getPrescriptionId(Id);
		System.out.println(prescription.toString());
		HttpStatus status = HttpStatus.OK;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Prescription fetched successfully!");
		ResponseEntity<Prescription> response = new ResponseEntity<Prescription>(prescription, headers, status);
		return response;
	}
    @PutMapping(path = "update-pre/{preId}", produces = "application/json", consumes = "application/json")
	public ResponseEntity<Prescription> updateEmp(@PathVariable(name = "preId") String preId, @RequestBody Prescription updatedPrescription) {
    	Prescription preToBeUpdated = prescriptionService.updatePrescription(preId, updatedPrescription);
		HttpStatus status = HttpStatus.CREATED;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Prescription updated successfully!");
		ResponseEntity<Prescription> response = new ResponseEntity<Prescription>(preToBeUpdated, headers, status);
		return response;
	}
    
    
}
