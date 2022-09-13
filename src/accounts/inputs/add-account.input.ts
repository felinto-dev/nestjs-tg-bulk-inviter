export class App {
  apiId: number;
  apiHash: string;
}

export class AddAccountByStringSession extends App {
  stringSession: string;
}

export class AddAccountByBotToken extends App {
  botToken: string;
}
