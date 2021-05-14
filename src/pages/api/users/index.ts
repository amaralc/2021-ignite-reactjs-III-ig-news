import {NextApiRequest, NextApiResponse} from 'next'

// Estratégias de autenticação
// JWT (Storage)
// Next Auth (Simple, Social Login)
// Authentication Providers (Cognito, Auth0, ...)

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Diego'},
    {id: 2, name: 'Dani'},
    {id: 3, name: 'Rafa'},
  ]

  return response.json(users)
}