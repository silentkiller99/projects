Feature: Delete User
    As a user,
    I want to delete a user
    Scenario Outline: delete user successfully when valid details are provided
        Given provide user id : <id> to delete user
        When try to delete user
        Then user successfully deleted with message:<message>

        Examples:
            | id | message                     |
            | 1  | 'User Deleted Successfully' |

    Scenario Outline: try to delete user when user doesn't exists
        Given provide user id : <id> to delete user
        When try to delete user
        Then It will throw error: "<error>" with message: <message> while deleting new user

        Examples:
            | id | error       | message           |
            | 2  | NoDataFound | "User not found!" |

    Scenario Outline: try to delete user with invalid details
        Given provide invalid user id : "<id>" to delete user
        When try to delete user
        Then It will throw error: "<error>" with message: <message> while deleting new user

        Examples:
            | id | error           | message                 |
            | a  | ValidationError | '"id" must be a number' |
