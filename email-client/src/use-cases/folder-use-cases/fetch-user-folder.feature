Feature: Fetch User Folders

    As a user of the application,
    I want to be able to fetch my list of folders
    so that I can see my saved content.

    Scenario: Fetch user folders
        Given an access token "accessToken"
        When I fetch the user folders
        Then I should receive a list of user folders

    Scenario: Invalid access token
        Given an invalid access token
        When I fetch the user folders
        Then an error should be thrown with the message "Invalid access token"

    Scenario: Access token is missing
        Given an empty access token
        When I fetch the user folders
        Then an error should be thrown with the message "Access token is required"