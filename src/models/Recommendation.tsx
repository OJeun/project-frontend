import Item from "./Item";

export default class RecommendationData {
  description: string;
  id: number;
  item: Item;
  constructor(description: string, id: number, item: Item) {
    this.description = description;
    this.id = id;
    this.item = item;
  }
}
