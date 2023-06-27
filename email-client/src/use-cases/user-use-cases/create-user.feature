Feature: Create User

    As a user,
    I want to create new user

    Scenario Outline: Create a User successfully
        Given User details name: <name>, userName: <userName>, email: <email>, and password: <password> to create new user
        When I create a new user
        Then It will create new user with details: "<newUserDetails>"
        And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
            | name       | userName     | email                            | password      | newUserDetails    | createUserFunctionCallCount |
            | 'Siddhant' | 'siddhantmj' | 'siddhant.mazumdar@rapidops.com' | 'Siddhant123' | '{"insertId": 1}' | 1                           |

    Scenario Outline: Create a User with invalid details
        Given User details name: "<name>", userName: "<userName>", email: "<email>", and password: "<password>" to create new user
        When I create a new user
        Then It will throw error: "<error>" with message: <message> while creating new user
        And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
            | name              | userName   | email                          | password | createUserFunctionCallCount | error           | message                                                |
            |                   |            |                                |          | 0                           | ValidationError | '"name" is required'                                   |
            | Siddhant Mazumdar |            |                                |          | 0                           | ValidationError | '"userName" is required'                               |
            | Siddhant Mazumdar | siddhantmj |                                |          | 0                           | ValidationError | '"email" is required'                                  |
            | Siddhant Mazumdar | siddhantmj | siddhant                       |          | 0                           | ValidationError | '"email" must be a valid email'                        |
            | Siddhant Mazumdar | siddhantmj | siddhant.mazumdar@rapidops.com |          | 0                           | ValidationError | '"password" is required'                               |
            | Siddhant Mazumdar | siddhantmj | siddhant.mazumdar@rapidops.com | 1234     | 0                           | ValidationError | '"password" length must be at least 8 characters long' |
