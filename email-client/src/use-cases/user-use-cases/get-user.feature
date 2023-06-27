Feature: Get User By id
    As a user,
    I want to get user by id
    Scenario Outline: get user by id successfully
        Given provide id:<id> of user
        When try to get user with particular id
        Then successfully get user with that id with message:<message>

        Examples:
            | id | message                                                                                                                                                                                        |
            | 1  | '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get user by id with invalid id
        Given provide id:"<id>" of user
        When try to get user with particular id
        Then It will throw error: "<error>" with message: <message> while geting user with particular id

        Examples:
            | id | error           | message                 |
            |    | ValidationError | '"id" is required'      |
            | s  | ValidationError | '"id" must be a number' |
