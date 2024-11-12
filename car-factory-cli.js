#!/usr/bin/env node

import { Command } from "commander";
import { writeFile, remove, show, update, getById } from "./utils.js";

//task 2
const program = new Command();

program
  .command("add")
  .description("adds a car")
  .argument("<name>", "car name")
  .argument("<price>", "car price")
  .argument("<color>", "car color")
  .action(async (name, price, color) => {
    try {
      const car = {
        name: name,
        price: price,
        color: color,
      };
      await writeFile("cars.json", car);
    } catch (e) {
      console.log(e.message);
    }
  });

program
  .command("delete")
  .description("deletes a car")
  .argument("<id>", "car id")
  .action(async (id) => {
    try {
      await remove(id, "cars.json");
    } catch (e) {
      console.log(e.message);
    }
  });

program
  .command("show-all")
  .description("Shows all the cars")
  .action(async () => {
    try {
      await show("cars.json");
    } catch (e) {
      console.log(e.message);
    }
  });

program
  .command("update")
  .description("Shows all the cars")
  .argument("<id>,", "the car ID")
  .option("-n, --newName <newName>,", "New car name")
  .option("-p, --newPrice <newPrice>,", "New car price")
  .option("-c, --newColor <newColor>,", "New car color")
  .action(async (id, options) => {
    const { newName, newPrice, newColor } = options;
    try {
      await update("cars.json", id, newName, newPrice, newColor);
    } catch (e) {
      console.log(e.message);
    }
  });

program
  .command("get")
  .description("Gets car by id")
  .argument("<id>", "Car ID")
  .action(async (id) => {
    try {
      await getById("cars.json", id);
    } catch (e) {
      console.log(e.message);
    }
  });

program.parse();
