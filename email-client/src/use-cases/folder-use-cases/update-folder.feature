Feature: Update folder

    As a folder,
    I want to update folder

    Scenario Outline: Update a folder successfully
        Given folder details name: "<name>", id: "<id>" to update folder
        When I update a folder
        Then It will update folder with message: <message>
        And updatefolder function will call <updatefolderFunctionCallCount> time while updating folder

        Examples:
            | name  | id | message               | updatefolderFunctionCallCount |
            | index | 1  | '{"affectedRows": 1}' | 1                             |

    Scenario Outline: update a folder with invalid details
        Given folder details name: "<name>", id: "<id>" to update folder
        When I update a folder
        Then It will throw error: "<error>" with message: <message> while updating folder
        And updatefolder function will call <updatefolderFunctionCallCount> time while updating folder

        Examples:
            | name  | id | updatefolderFunctionCallCount | error           | message              |
            |       |    | 0                             | ValidationError | '"name" is required' |
            | index |    | 0                             | ValidationError | '"id" is required'   |
            | index | a  | 0                             | ValidationError | '"id" is required'   |
