export class IdGenerator {

  private static nextId = 1;

  static generate(prefix: string): string {
    return `${prefix}-${this.nextId++}`;
  }

}