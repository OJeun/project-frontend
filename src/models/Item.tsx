// src/models/Item.js
export default class Item {
  id: number;
  name: string;
  brand: string;
  colour: string;
  typeId: number;
  description: string;
  imagePath: string;
  constructor(
    id: number,
    name: string,
    brand: string,
    colour: string,
    typeId: number,
    description: string,
    imagePath: string
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.colour = colour;
    this.typeId = typeId;
    this.description = description;
    this.imagePath = imagePath;
  }
}
