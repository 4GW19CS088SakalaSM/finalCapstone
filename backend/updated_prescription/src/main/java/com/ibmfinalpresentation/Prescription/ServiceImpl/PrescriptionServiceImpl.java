package com.ibmfinalpresentation.Prescription.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;


import com.ibmfinalpresentation.Prescription.exception.PresNotFoundException;
import com.ibmfinalpresentation.Prescription.model.Prescription;
import com.ibmfinalpresentation.Prescription.repository.PrescriptionRepository;

@Service
public class PrescriptionServiceImpl
{	

    @Autowired
    PrescriptionRepository prescriptionRepository;
    
    
	    private final Logger LOG = LoggerFactory.getLogger(this.getClass());



	    public Prescription addPrescription(Prescription prescription) 
	    {
	        LOG.info(prescription.toString());
	        return prescriptionRepository.save(prescription);
	    }
	    
		public Prescription getPrescriptionId(String prescriptionId) {
			
			Optional<Prescription> preOptional = prescriptionRepository.findById(prescriptionId);
			
			if (preOptional.isEmpty()) {
				String errorMessage = prescriptionId + " is not found";
				System.out.println(errorMessage);
				LOG.warn(errorMessage);
				throw new PresNotFoundException(errorMessage);
			} else
				return preOptional.get();
		}
		
		
		public Prescription updatePrescription(String prescriptionId, Prescription updatedPrescription) {
			LOG.info(prescriptionId);
			Optional<Prescription> PrescriptionToUpdate = prescriptionRepository.findById(prescriptionId);
			if (PrescriptionToUpdate != null) {

				Prescription existingPrescription = PrescriptionToUpdate.get();
				existingPrescription.setPatientName(updatedPrescription.getPatientName());
				existingPrescription.setMedicines(updatedPrescription.getMedicines());
				existingPrescription.setMedicineDosage(updatedPrescription.getMedicineDosage());				

				
				return prescriptionRepository.save(existingPrescription);

			} else {
				String errorMessage = prescriptionId + " is not found";
				throw new PresNotFoundException(errorMessage);
			}

		}
		
		
	} 
	  


