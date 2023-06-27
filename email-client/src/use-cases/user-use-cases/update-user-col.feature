Feature: Update User Colnum Use Case

    As a user of the application,
    I want to be able to update a user colnum in a specific database
    so that I can keep my user data up to date.

    Scenario: Update user colnum
        Given an access token "accessToken"
        And a database name "databaseName"
        And an ID "id"
        When I update the user colnum
        Then the user colnum should be updated in the specified database
        And I should receive a success message with the number of affected rows

    Scenario Outline: Invalid input values
        Given an access token "<accessToken>"
        And a database name "<databaseName>"
        And an ID "<id>"
        When I update the user colnum
        Then an error should be thrown with the message "<errorMessage>"

        Examples:
            | accessToken | databaseName | id | errorMessage                           |
            | null        | "database"   | 1  | "accessToken is required"              |
            | "token123"  | ""           | 1  | "databaseName is required"             |
            | "token123"  | "database"   |    | "id is required"                       |
            | "token123"  | "database"   | 1a | "id must be a number"                  |
            | "token123"  | "database"   | -1 | "id must be larger than or equal to 0" |
