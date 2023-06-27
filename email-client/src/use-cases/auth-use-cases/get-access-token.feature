Feature: Get Access Token

    As a user, I want to be able to get a new access token using a refresh token

    Scenario: Get access token successfully
        Given a valid refresh token
        When I request a new access token
        Then the new access token is returned

    Scenario: Invalid input
        Given an invalid refresh token
        When I request a new access token
        Then a validation error is thrown

    Scenario: Error fetching access token
        Given a valid refresh token, but an error occurs when fetching the access token
        When I request a new access token
        Then an error is thrown