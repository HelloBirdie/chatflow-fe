export interface ICard {
  id: string;
  name: string;
  iconCode: string;
  aiModel: string;
  createTime: string;
  updateTime: string;
}

export interface ICardAdd {
  name: string;
  iconCode: string;
  aiModelId: number;
}
