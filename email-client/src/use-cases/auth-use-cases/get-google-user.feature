Feature: Get Google User

    As a user
    I want to get my Google User details
    So that I can use my account information

    Scenario: Successfully get Google User details
        Given a valid access token and ID token
        When I get the Google User details
        Then I should see my account information

    Scenario: Invalid input for get Google User details
        Given an invalid access token or ID token
        When I try to get the Google User details
        Then I should see a validation error message

    Scenario: Error while getting Google User details
        Given a valid access token and ID token
        And an error occurs while getting the Google User details
        When I try to get the Google User details
        Then I should see an error message