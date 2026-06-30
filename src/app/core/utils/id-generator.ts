export class IdGenerator {

  static generate(prefix: string): string {

    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  }

}