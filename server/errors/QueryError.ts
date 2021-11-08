import { WithName } from "./WithName";

export class QueryError extends WithName {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(`Значение поиска: ${message},  является обязательным`);
    this.statusCode = statusCode;
  }
}
