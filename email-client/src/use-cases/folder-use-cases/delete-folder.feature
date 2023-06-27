Feature: Delete folder
    As a folder,
    I want to delete a folder
    Scenario Outline: delete folder successfully when valid details are provided
        Given provide folder id : <id> to delete folder
        When try to delete folder
        Then folder successfully deleted with message:<message>

        Examples:
            | id | message                       |
            | 1  | 'Folder Deleted Successfully' |

    Scenario Outline: try to delete folder when folder doesn't exists
        Given provide folder id : <id> to delete folder
        When try to delete folder
        Then It will throw error: "<error>" with message: <message> while deleting folder

        Examples:
            | id | error       | message             |
            | 2  | NoDataFound | "Folder not found!" |

    Scenario Outline: try to delete folder with invalid details
        Given provide invalid folder id : "<id>" to delete folder
        When try to delete folder
        Then It will throw error: "<error>" with message: <message> while deleting folder

        Examples:
            | id | error           | message                 |
            | a  | ValidationError | '"id" must be a number' |
