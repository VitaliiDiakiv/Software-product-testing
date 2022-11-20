Feature: GetRandomRiddle


Scenario: Random Riddle
	When  send a request to read random riddle
	Then  response status should be OK