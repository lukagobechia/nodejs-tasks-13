#!/usr/bin/env node
import { Command } from "commander";
import { fetchData } from "./utils.js";

const program = new Command();

//task 1

program
  .command("weather")
  .description("Get the weather for a specific city")
  .argument("<city>", "City name")
  .action(async (city) => {
    try {
      await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
      );
    } catch (e) {
      console.log(e.message);
    }
  });
  
  program.parse()