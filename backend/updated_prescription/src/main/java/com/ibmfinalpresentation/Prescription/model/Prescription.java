package com.ibmfinalpresentation.Prescription.model;

import org.springframework.data.annotation.Id;

public class Prescription
{ 
	@Id
	private String prescriptionId;
	private String doctorId;
	private String patientName;
	private String patientId;
	private String medicines;
	private String medicineDosage;
	

	public String getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(String prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	
	public String getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getMedicines() {
		return medicines;
	}
	public void setMedicines(String medicines) {
		this.medicines = medicines;
	}
	public String getMedicineDosage() {
		return medicineDosage;
	}
	public void setMedicineDosage(String medicineDosage) {
		this.medicineDosage = medicineDosage;
	}
	
	public Prescription(String prescriptionId, String doctorId, String patientName, String patientId, String medicines,
			String medicineDosage) {
		super();
		this.prescriptionId = prescriptionId;
		this.doctorId = doctorId;
		this.patientName = patientName;
		this.patientId = patientId;
		this.medicines = medicines;
		this.medicineDosage = medicineDosage;
	}
	@Override
	public String toString() {
		return "Prescription [prescriptionId=" + prescriptionId + ", doctorId=" + doctorId + ", patientName="
				+ patientName + ", patientId=" + patientId + ", medicines=" + medicines + ", medicineDosage="
				+ medicineDosage + "]";
	}
	
	

	
	
	
	

	
}