export class CustomErrors extends Error {
  code = 400;
  message = this.message || "There was an error";
}
