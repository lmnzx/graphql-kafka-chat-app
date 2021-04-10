import {
  Resolver,
  Query,
  ObjectType,
  Field,
  InputType,
  Mutation,
  Arg,
} from "type-graphql";

@ObjectType()
class Message {
  @Field()
  user: string;

  @Field()
  message: string;

  @Field()
  time: string;

  constructor(user: string, message: string) {
    this.user = user;
    this.message = message;
    this.time = Date();
  }
}

@InputType()
class AddMessageInput implements Partial<Message> {
  @Field()
  user: string;

  @Field()
  message: string;
}

@Resolver()
export class MessageResolver {
  private messageCollection: Message[] = [];

  @Query(() => [Message])
  async messages() {
    return this.messageCollection;
  }

  @Mutation()
  addMessage(@Arg("data") newMessageData: AddMessageInput): Message {
    const message = new Message(newMessageData.user, newMessageData.message);
    this.messageCollection.push(message);
    return message;
  }
}
