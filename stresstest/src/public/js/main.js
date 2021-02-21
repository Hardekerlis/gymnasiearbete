const urls = {
  micro: "http://micro.gustafdahl.com/ping",
  mono: "http://mono.gustafdahl.com/ping",
}


// Console
class Cnsl {
  constructor(consoleBody) {
    this.consoleBody = consoleBody;
  }

  print = (text) => {
    genHTML({
      elem: "p",
      text: this.getTime() + text,
      insertBefore: true,
      class: ["consoleText"],
      parent: this.consoleBody
    });
  }

  getTime = () => {
    const d = new Date();
    let timeNow = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]: `
    return timeNow;
  }
}

const startBtn = document.getElementById("startButton");

// Initalize console class
const cnsl = new Cnsl(document.getElementById("consoleBody"));

startBtn.addEventListener("click", (e) => {
  startBtn.disabled = true;
  startBtn.classList.toggle("disabled");
  runTests(2400);

  // Timestamps
  // I will collect the timestamp when the request is sent
  // I will get back the timestamp the server recieved the request
  // I will collect the timestamp when I get the response

  // Run micro services x times
  // Log each run to the console

  // Run mono x times
  // Log each run to the console
});

// Times in runTests represents how many times each.
// So if i enter 1000 it will run both micro and mono 1000 times
const runTests = async (times) => {
  const results = {
    micro: {
      get: [],
      post: [],
      put: [],
      delete: []
    },
    mono: {
      get: [],
      post: [],
      put: [],
      delete: []
    }
  };
  for(let i = 0; i < times*2; i++) {
    if(i < times) {
      const res = await runMicro(i);
      results.micro[res.method].push(res.resTime);
      cnsl.print(`[Micro] - Method: ${res.method} - Request ${i + 1} out of ${times}`);

    }else {
      const res = await runMono(i);
      results.mono[res.method].push(res.resTime);
      cnsl.print(`[Mono] - Method: ${res.method} - Request ${i - times + 1} out of ${times}`);
    }
  }
  let avgResult = {};

  for(let i in results) {
    let avgResTime = 0;
    let incr = 0;
    for(let j in results[i]) {
      // console.log(results[i][j])
      for(let m of results[i][j]) {
        // console.log(i, j, m)
        avgResTime += m;
        incr++;
      }
    }
    avgResult[i] = avgResTime/incr;
  }

  cnsl.print(`Finished!`);
  cnsl.print(`Average response time for micro design: ${avgResult.micro}ms`);
  cnsl.print(`Average response time for mono design: ${avgResult.mono}ms`);
  startBtn.classList.toggle("disabled");

  startBtn.disabled = false;
}

const runMicro = async (i) => {
  let url = urls.micro;
  const params = {
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    cache: "no-store",
    mode: "cors"
  };


  if(i % 4 === 0) {
    params.method = "get";
    url = url + "/get";
  }else if(i % 4 === 1) {
    params.method = "post";
    url = url + "/post";

  }else if(i % 4 === 2) {
    params.method = "put";
    url = url + "/put";
  }else if(i % 4 === 3) {
    params.method = "delete";
    url = url + "/delete";
  }

  let sent = + new Date();

  url = url + `/cache-bust=${+ new Date()}`

  const res = await fetch(url, params).then(data => { return data.json() });

  let response = + new Date();

  res.resTime = response - sent;

  return res;
}

const runMono = async (i) => {
  let url = urls.mono;
  const params = {
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    cache: "no-store",
    mode: "cors"
  };


  if(i % 4 === 0) {
    params.method = "get";
  }else if(i % 4 === 1) {
    params.method = "post";
  }else if(i % 4 === 2) {
    params.method = "put";
  }else if(i % 4 === 3) {
    params.method = "delete";
  }

  let sent = + new Date();

  url = url + `/cache-bust=${+ new Date()}`

  const res = await fetch(url, params).then(data => { return data.json() });

  let response = + new Date();

  res.resTime = response - sent;

  return res;

}
