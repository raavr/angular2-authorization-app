export enum MessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Message {
  type: MessageType
  text: string;
}