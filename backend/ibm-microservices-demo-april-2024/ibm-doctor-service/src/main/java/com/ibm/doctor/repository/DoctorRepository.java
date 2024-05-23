package com.ibm.doctor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.doctor.model.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, String> {

	//public abstract Optional<Doctor> findByEmail(String email);
	//public abstract Optional<Doctor> findAll(String specialization);
	public abstract List<Doctor> findAllBySpecialization(String specialization);
	
	public abstract List<Doctor> findByName(String name);;







}
