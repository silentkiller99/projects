Feature: Create folder

    As a folder,
    I want to create new folder

    Scenario Outline: Create a folder successfully
        Given folder details name: "<name>", userId: "<userId>", and providerId: "<providerId>" to create new folder
        When I create a new folder
        Then It will create new folder with message: "<message>"
        And createfolder function will call <createfolderFunctionCallCount> time while creating new folder

        Examples:
            | name  | userId | providerId | message | createfolderFunctionCallCount |
            | index | 1      | 123        | done    | 1                             |

    Scenario Outline: Create a folder with invalid details
        Given folder details name: "<name>", userId: "<userId>", and providerId: "<providerId>" to create new folder
        When I create a new folder
        Then It will throw error: "<error>" with message: <message> while creating new folder
        And createfolder function will call <createfolderFunctionCallCount> time while creating new folder

        Examples:
            | name  | userId | providerId | createfolderFunctionCallCount | error           | message                    |
            |       |        |            | 0                             | ValidationError | '"name" is required'       |
            | index |        |            | 0                             | ValidationError | '"userId" is required'     |
            | index | 1      |            | 0                             | ValidationError | '"providerId" is required' |
