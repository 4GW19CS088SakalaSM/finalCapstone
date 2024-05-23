
package com.ibmfinalpresentation.Prescription.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ibmfinalpresentation.Prescription.model.Prescription;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(PresNotFoundException.class)
	public ResponseEntity<Prescription> handlePresNotFoundException(PresNotFoundException e) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", e.getMessage());
		HttpStatus status = HttpStatus.NOT_FOUND;
		ResponseEntity<Prescription> response = new ResponseEntity<Prescription>(null, headers, status);
		return response;
	}

}
