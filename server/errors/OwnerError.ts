import { WithName } from "./WithName";

export class OwnerError extends WithName {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
