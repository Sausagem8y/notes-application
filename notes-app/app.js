const chalk = require("chalk");
const { demandOption, string } = require("yargs");
const yargs = require("yargs");
const notes = require("./notes.js");
let list = ["Notes from input will be here later."];

const command = process.argv[2];

// customize yargs version
yargs.version("1.1.0");

// add, remove, read, list notes

// create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

// create remove command
yargs.command({
  command: "remove",
  description: "Removes a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: string,
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
    console.log(chalk.redBright("Removed 1 note!!", argv.title));
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "Prints out the current notes.",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "listAll",
  describe: "Prints out all current notes.",
  handler() {
    notes.listAllNotes();
  },
});

// create read command
yargs.command({
  command: "read",
  describe: "Text to Speach the current notes.",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: string,
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

console.log(yargs.argv);

// if (command === "add") {
//   console.log(chalk.green("Adding new note!"));
// } else if (command === "remove") {
//   console.log(chalk.red.inverse("Removing last note!"));
// }
