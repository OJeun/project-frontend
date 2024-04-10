
export default class Item {
  id: number;
  name: string;
  brand: string;
  colour: string;
  type: string;
  description: string;
  imagePath: string;
  isFavorite: boolean = false;
  constructor(
    id: number,
    name: string,
    brand: string,
    colour: string,
    type: string,
    description: string,
    imagePath: string,
    isFavorite: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.colour = colour;
    this.type = type;
    this.description = description;
    const apiUrl = import.meta.env.VITE_API_URL;
    this.imagePath = apiUrl + "/" + imagePath;
    this.isFavorite = isFavorite;
  }
}
