#!/usr/bin/env node

import { Command } from "commander";
import fetch from "node-fetch";

const program = new Command();

//task 1
program
  .command("weather")
  .description("Get the weather for a specific city")
  .argument("<city>", "City name")
  .action(async (city) => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
      );
      const data = await resp.json();
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  });

  //task 2

program.parse();
