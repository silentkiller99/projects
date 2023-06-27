Feature: Get Folders By userId
    As a folder,
    I want to get folders by userId
    Scenario Outline: get folders by userId successfully
        Given provide userId:"<userId>" of folders
        When try to get folders with userId
        Then successfully get folders with that userId with message:<message>

        Examples:
            | userId | message                                                                                                                                                                                          |
            | 1      | '"id": 1,"name": "siddhant","folderName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get folder by id with invalid id
        Given provide userId:"<userId>" of folders
        When try to get folders with userId
        Then It will throw error: "<error>" with message: <message> while geting folders with particular userId

        Examples:
            | userId | error           | message                |
            |        | ValidationError | '"userId" is required' |
            | s      | ValidationError | '"userId" is required' |
