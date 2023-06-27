Feature: Update User

    As a user,
    I want to update user details

    Scenario Outline: Update a User successfully
        Given User details name: <name>, userName: <userName>,  and password: <password> to update user details using id:<id>
        When I update user details
        Then It will update user with message: <affectedRowsDetails>
        # And UpdateUser function will call <updateUserFunctionCallCount> time while creating new user

        Examples:
            | id | name       | userName     | password      | affectedRowsDetails   | updateUserFunctionCallCount |
            | 1  | 'Siddhant' | 'siddhantmj' | 'Siddhant123' | '{"affectedRows": 1}' | 1                           |


    Scenario Outline: Update a User with invalid details
        Given User details name: "<name>", userName: "<userName>",  and password: "<password>" to update user details using id:<id>
        When I update user details
        Then It will throw error: "<error>" with message: <message> while updatinging user details
        # And updateUser function will call <updateUserFunctionCallCount> time while creating new user

        Examples:
            | id | name              | userName   | password | updateUserFunctionCallCount | error           | message                  |
            | 1  |                   |            |          | 0                           | ValidationError | '"name" is required'     |
            | 1  | Siddhant Mazumdar |            |          | 0                           | ValidationError | '"userName" is required' |
            | 1  | Siddhant Mazumdar | siddhantmj |          | 0                           | ValidationError | '"password" is required' |
# | 1  | Siddhant Mazumdar | siddhantmj | abc      | 0                           | ValidationError | '"password" length must be at least 8 characters long' |
