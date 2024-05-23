	package com.ibmfinalpresentation.Prescription.exception;

	public class PresNotFoundException extends RuntimeException {

		private static final long serialVersionUID = -4373158775284035841L;

		public PresNotFoundException(String message) {
			super(message);
		}

		public PresNotFoundException() {
			super();
		}
	}


