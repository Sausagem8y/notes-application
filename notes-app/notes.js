const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.cyanBright.bold("New note added"));
  } else {
    console.log(chalk.redBright.inverse("Note title already exists!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesRemovalTool = notes.filter((note) => note.title !== title);

  if (notes.length > notesRemovalTool.length) {
    console.log(chalk.hex("#deaded")("...Successfully Deleted 1 Note"));
  } else {
    console.log(chalk.redBright.inverse("NO NOTES WITH THAT TITLE!!"));
  }
  saveNotes(notesRemovalTool);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(chalk.blueBright(note.title));
  });
};

const listAllNotes = () => {
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(chalk.blueBright(note.title));
    console.log(chalk.hex("#deaded")(note.body));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const check = notes.find((note) => note.title === title);

  if (check) {
    console.log(chalk.blueBright(check.title));
    console.log(chalk.hex("#deaded")(check.body));
  } else {
    console.log(chalk.red.inverse("Note Not Found!"));
  }
};

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  listAllNotes: listAllNotes,
  readNote: readNote,
};

// console.log("utils.js");
// const name = "Name";
// const add = function (a, b) {
//   return a + b;
// };
// module.exports = add;
