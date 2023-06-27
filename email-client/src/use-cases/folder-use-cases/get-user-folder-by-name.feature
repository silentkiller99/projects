Feature: Get Folder By userId and name
    As a folder,
    I want to get folders by userId and name
    Scenario Outline: get folder by userId and name successfully
        Given provide userId:"<userId>" and name:"<name>" of folder
        When try to get folder with userId and name
        Then successfully get folder with that userId and name with message:<message>

        Examples:
            | userId | message                                                                                                                                                                                          |
            | 1      | '"id": 1,"name": "siddhant","folderName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get folder by userId with invalid input
        Given provide userId:"<userId>" and name:"<name>" of folder
        When try to get folder with userId and name
        Then It will throw error: "<error>" with message: <message> while geting folder with particular userId and name

        Examples:
            | name  | userId | error           | message                             |
            |       |        | ValidationError | '"name" is not allowed to be empty' |
            | inbox |        | ValidationError | '"userId" is required'              |
            | inbox | s      | ValidationError | '"userId" is required'              |
