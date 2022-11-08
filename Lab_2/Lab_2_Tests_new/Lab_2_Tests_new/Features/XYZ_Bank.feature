@setup_feature
Feature: XYZ_Bank
	Sort customers last name


Scenario: Perform sort of customers last name
	Given open the site globalsqa
	And click on the Bank Manager Login button
	And click on the Customers button
	When click on the Last Name header
	Then should see customers sorted in descending order