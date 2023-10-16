const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle, Star } = require("./lib/shapes");

async function generateSvg() {
  const shapeChoice = ["Triangle", "Circle", "Square", "Star"];

  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Enter 2 characters for the text:",
      validate: text => text.length <= 2,
    },
    {
      type: "input",
      name: "textColor",
      message: "What color for the text color :",
    },
    {
      type: "list",
      name: "shape",
      message: "Pick a shape:",
      choices: shapeChoice,
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Pick a color for the shape color:",
    },
  ]);

  let shape;

  switch (userInput.shape) {
    case "Triangle":
      shape = new Triangle();
      break;
    case "Circle":
      shape = new Circle();
      break;
    case "Square":
      shape = new Square();
      break;
    case "Star":
      shape = new Star();
      break;
    default:
      console.error("Invalid shape selected.");
      return;
  }

  shape.setColor(userInput.shapeColor);

  const svgLogo = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shape.render()}
  <text x="150" y="120" font-family="Arial" font-size="40" text-anchor="middle" fill="${
    userInput.textColor
  }">${userInput.text}</text>
</svg>
`;

  newLogo(svgLogo);
}

function newLogo(svgLogo) {
  fs.writeFile("logo.svg", svgLogo, err => {
    console.log("Generated logo.svg");
  });
}

generateSvg();
