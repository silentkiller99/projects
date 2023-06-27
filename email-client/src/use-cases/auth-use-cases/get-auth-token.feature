Feature: Get Auth Token

    As a user, I want to be able to get an authentication token using a code

    Scenario: Get auth token successfully
        Given a valid code
        When I request an authentication token
        Then the authentication token is returned

    Scenario: Invalid input
        Given an invalid code
        When I request an authentication token
        Then a validation error is thrown

    Scenario: Error fetching authentication token
        Given a valid code, but an error occurs when fetching the authentication token
        When I request an authentication token
        Then an error is thrown