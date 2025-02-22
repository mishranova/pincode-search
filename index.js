const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Locality_village_pincode_final_mar-2017.csv');

//Default messages for success and failure
const msg = {
  failed: "Something went wrong, please try again later",
  success: "Pincode search result"
}
// fetch multiple rows from the csv file
async function list(searchString) {
  try{
    // read the contents of the CSV file into a buffer
    const buffer = fs.readFileSync(filePath);

    // convert the buffer to a string and split it into an array of lines
    const lines = buffer.toString().split('\n');
    const matchingRows = [];
    // loop through the lines to find the search string
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf(searchString) !== -1) {
        const row = (lines[i].split(',')).map(obj => obj.replace(/(\r\n|\n|\r)/gm, ""))
        matchingRows.push({
          locality: row[0],
          office: row[1],
          taluk: row[3],
          district: row[4],
          state: row[5],
          pincode: Number(row[2]),
          country: 'India'
        });
      }
    }
    return {
      error: false,
      message: msg.success,
      data: {
        result: matchingRows
      }
    };
  }catch(e){
    console.log(e)
    return {
      error: true,
      message: msg.failed
    }
  }
}

// fetch first march from the csv file
async function get(searchString) {
  try{
    // read the contents of the CSV file into a buffer
    const buffer = fs.readFileSync(filePath);

    // convert the buffer to a string and split it into an array of lines
    const lines = buffer.toString().split('\n');
    // loop through the lines to find the search string
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf(searchString) !== -1) {
        const row = (lines[i].split(',')).map(obj => obj.replace(/(\r\n|\n|\r)/gm, ""))
        return {
          error: false,
          message: msg.success,
          data: {
            result: {
              locality: row[0],
              office: row[1],
              taluk: row[3],
              district: row[4],
              state: row[5],
              pincode: Number(row[2]),
              country: 'India'
            }
          }
        }
      }
    }
    return {
      error: false,
      message: msg.success,
      data: {
        result: []
      }
    };
  }catch(e) {
    console.log(e)
    return {
      error: true,
      message: msg.failed
    }
  }
}

module.exports = { get, list }
