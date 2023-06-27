Feature: Create Default Folders
    As a user
    I want to have default folders in my email account

    Scenario Outline: User creates default folders with invalid input
        Given provide userId: "<userId>"
        When i try to create default folders
        Then an error:<error> message:<message> is returned
        Examples:
            | userId | error             | message                |
            |        | "ValidationError" | '"userId" is required' |
            | a      | "ValidationError" | '"userId" is required' |

    Scenario Outline: User creates default folders successfully
        Given provide userId: "<userId>"
        When i try to create default folders
        Then the default folders are created successfully with message:<message>
        Examples:
            | userId | message |
            | 1      | 'done'  |