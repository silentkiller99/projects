Feature: Get Folder By id
    As a folder,
    I want to get folder by id
    Scenario Outline: get folder by id successfully
        Given provide id:"<id>" of folder
        When try to get folder with particular id
        Then successfully get folder with that id with message:<message>

        Examples:
            | id | message                                                                                                                                                                                          |
            | 1  | '"id": 1,"name": "siddhant","folderName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"' |

    Scenario Outline: try to get folder by id with invalid id
        Given provide id:"<id>" of folder
        When try to get folder with particular id
        Then It will throw error: "<error>" with message: <message> while geting folder with particular id

        Examples:
            | id | error           | message            |
            |    | ValidationError | '"id" is required' |
            | s  | ValidationError | '"id" is required' |
