Feature: ReadBooking



Scenario: Read Bookings
	When send read the bookings request
	Then expected OK response code
