Feature: Fetch Folder Emails

    As a user, I want to be able to fetch the emails in a specific folder

    Scenario: Fetch folder emails successfully
        Given a valid folder ID and access token
        When I fetch the emails in the folder
        Then the list of emails is returned

    Scenario: Invalid input
        Given an invalid folder ID or access token
        When I fetch the folder emails
        Then a validation error is thrown

    Scenario: No data found
        Given a valid folder ID and access token, but no emails in the folder
        When I fetch the folder emails
        Then a NoDataFound error is thrown