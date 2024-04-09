export default class RecommendationData {
  description: string;
  recommended_item_image: string;
  constructor(description: string, recommended_item_image: string) {
    this.description = description;
    this.recommended_item_image = recommended_item_image;
  }
}
