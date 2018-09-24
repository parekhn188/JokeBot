
let url = "https://icanhazdadjoke.com/";
let giphy = 'http://api.giphy.com/v1/gifs/search';
let gif_key = 'pCd3XOBWik6bVoGzL41zEEby0iUtvN14'
let gifQuery;
let gifArr = [];

let response;
let jsonData;
let index = 0;
let client;

let buttonPressed = false;
let jBPress = false;
let pBPress = false;
let dBPress = false;


function setup() {
  createCanvas(480, 600);
  background(0);

  clearButton = select('#clear');
  clearButton.mousePressed(() => {
    background(0);
    
  });

  jokeButton = select('#jokeB');
  jokeButton.mousePressed(() => {
    loadJSON('oneliners.json', (data) => {
      jsonData = data;
      buttonPressed = true;
      jBPress = true;
    });
  });

  punButton = select('#punB');
  punButton.mousePressed(() => {
    loadJSON('puns.json', (data) => {
      jsonData = data;
      buttonPressed = true;
      pBPress = true;
    });

  });

  dadJokeButton = select('#dadjB');
  dadJokeButton.mousePressed(() => {
    loadJSON('data.json', (data) => {
      jsonData = data;
      buttonPressed = true;
      dBPress = true;
    });
  });
}


function loadJoke() {
  if (jBPress) {
      text(jsonData[index].body, width/5, 160, 300, 300);
      fill(255);
      textSize(20);
      index++;
      gifQuery = jsonData[index].body
      gifArr.push(getGif(gifQuery));
  } else if (pBPress) {
      text(jsonData[index].Pun, width/5, 160, 300, 300);
      fill(255);
      textSize(20);
      index++;
      gifQuery = jsonData[index].Pun
      gifArr.push(getGif(gifQuery));
    } else if (dBPress) {
      text(jsonData.joke, width/5, 160, 300, 300);
      fill(255);
      textSize(20);
      gifQuery = jsonData.joke
      gifArr.push(getGif(gifQuery));
    }
  }

function draw() {
  loadJoke();
  // buttonPressed = false;
  jBPress = false;
  pBPress = false;
  dBPress = false;
}



async function getGif(text) {
  let splitText = text.split(' ');
  let query = random(splitText)
  console.log(query);

  let apiCall =  'http://api.giphy.com/v1/gifs/search?q=' + query +'&api_key=pCd3XOBWik6bVoGzL41zEEby0iUtvN14';
  console.log(apiCall);
  loadJSON(apiCall, data => {
    let indexNum = floor(random(25));
    console.log(data);
    console.log(indexNum);
    createImg(data.data[indexNum].images['original'].url);
  });
}
