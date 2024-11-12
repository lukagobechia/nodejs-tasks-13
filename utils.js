import fetch from "node-fetch";
import fs from "fs/promises";
const fetchData = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
};

const writeFile = async (filePath, car) => {
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  const lastId = cars[cars.length - 1]?.id || 0;
  const newCar = {
    id: lastId + 1,
    name: car.name,
    price: car.price,
    color: car.color,
  };
  cars.push(newCar);
  await fs.writeFile(filePath, JSON.stringify(cars, null, 2));
  console.log(`added ${car.name} in the file`);
};

const remove = async (id, filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  const index = cars.findIndex((i) => i.id === Number(id));
  if (index === -1) {
    console.log("Car with the given name is not found");
    return;
  }
  cars.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(cars, null, 2));
  console.log(`car wiht ID  ${id} has been deleted from file`);
};
const show = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  console.log(cars);
};

const update = async (filePath, id, newName, newPrice, newColor) => {
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  const index = cars.findIndex((i) => i.id === Number(id));
  if (index === -1) {
    console.log("Car with the given ID has not been found");
    return;
  }
  const updatedCar = {
    ...cars[index],
    name: newName || cars[index].name,
    price: newPrice || cars[index].price,
    color: newColor || cars[index].color,
  };
  cars[index] = updatedCar;
  await fs.writeFile(filePath, JSON.stringify(cars, null, 2));
  console.log(`The car with ID ${id} has been updated`);
};

const getById = async (filePath,id) => {
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  const car = cars.find((i) => i.id === Number(id));
  if (!car) {
    console.log("Car with the given ID has not been found");
    return;
  }
  console.log(car);
};
export { fetchData, writeFile, remove, show, update, getById };
