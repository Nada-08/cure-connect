import { Doctors } from "./doctors"
export interface Response {
  doctors: Array<Doctors>,
  total: number,
  skip: number,
  limit: number
}
