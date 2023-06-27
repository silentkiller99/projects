Feature: Get User By Email
    As a user,
    I want to get user by email
    Scenario Outline: get user by email successfully
        Given provide email:"<email>"
        When try to get user with particular email
        Then successfully get user with that email with message:<message>

        Examples:
            | email                      | message                                                                                                                                                                                        |
            | siddhantmazumdar@gmail.com | '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get user by email with invalid email id
        Given provide email:"<email>"
        When try to get user with particular email
        Then It will throw error: "<error>" with message: <message> while geting user with particular email

        Examples:
            | email                    | error           | message                         |
            |                          | ValidationError | '"email" is required'           |
            | siddhantmazumdar@gmail.c | ValidationError | '"email" must be a valid email' |
