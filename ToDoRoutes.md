
# routes i should build in the api

- /api/users/sign-in method:POST
  - should return the Authorization header with the cookie
- /api/users/me method:GET
  - should return this

  ``` json  
      Id: string;
      FirstName: string;
      LastName: string;
      Email: string;
  ```

- /api/users/sign-out Method:POST
- /api/users/sign-up MEthod:GET
- /api/todos method:get
  - ```json

  todos: {
      completed: boolean;
      description: string;
      title: string;
      id: number;
    }[];
  ```

- /api/todos method:POST
- /api/todos/:id/complete Method:PUT
- /api/todos/:id/ Method:DELETE



- setup typescript 
- setup prisma 
-   
- DEV : typescript ts-node nodemon @types/bcrypt @types/cors @types/node @types/express prisma
