Feature: Get All Users
    As a user,
    I want to get all users
    Scenario Outline: get all user successfully
        Given just call the Function get all users
        When try to get all users
        Then successfully get all users with message:<message>

        Examples:
            | id | message                                                                                                                                                                                        |
            | 1  | '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get users when user doesn't exists
        Given just call the Function get all users
        When try to get all users
        Then It will throw error: "<error>" with message: <message> while geting all user

        Examples:
            | id | error       | message           |
            |    | NoDataFound | "User not found!" |
