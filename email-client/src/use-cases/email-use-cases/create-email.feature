Feature: Creating an Email

    As a user
    I want to be able to create an email
    So that I can send messages to other users

    Scenario: Successfully create an email
        Given I have provided all the required email details
        When I create the email
        Then the email should be successfully created in the database

    Scenario: Invalid input parameters
        Given I have not provided all the required email details
        When I create the email
        Then an error should be returned stating that some parameters are missing

    Scenario: Invalid email format
        Given I have provided an invalid email address
        When I create the email
        Then an error should be returned stating that the email address is invalid

    Scenario: Unable to create email
        Given there is an error in creating the email
        When I attempt to create the email
        Then an error should be returned stating that the email could not be created