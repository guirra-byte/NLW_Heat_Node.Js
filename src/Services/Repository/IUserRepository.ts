

export interface IUserRepository {

  create(github_id: number, login: string, name: string, email: string, created_at: Date, updated_at: Date): any
  findOne(id: number): any
  findAll(): any
  // remove(id: number): any
}