Feature: DeleteBooking

Scenario: Delete Booking
	When make delete request
	Then verify if the  record is deleted
