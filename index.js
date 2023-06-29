const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json());

let arr = [];
function createobject(t, d) {
  let obj = {
    id: Math.floor(Math.random() * 1000000),
    title: t,
    description: d
  };
  return obj;
}

function createnewtodo(req, res) {
  let t = req.body.title;
  let d = req.body.description;
  let objct = createobject(t, d);
  arr.push(objct);
  let resobj =
  {
    id: objct.id
  };
  res.status(201).send(resobj);
}
function retrievetodobyid(req, res) {
  let b = false;
  let n = req.params.id;
  n = parseInt(n);
  let obj;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === n) {
      obj = arr[i];
      b = true;
    }
  }
  if (b) {
    res.status(200).json(obj); // Send the todo object in the response
  } else {
    res.status(404).send('Object not found');
  }
}
function updateid(t, index) {
  arr[index].title = t;
}
function updatetodobyid(req, res) {
  let b = false;
  let n = req.params.id;
  n = parseInt(n);
  let t = req.body.title;
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == n) {
      b = true;
      index = i;
    }
  }
  if (b) {
    updateid(t, index);
    res.status(200).send('Updated');
  }
  else {
    res.status(404).send('Not found');
  }

}
function deletetodobyid(req, res) {
  let b = false;
  let n = req.params.id;
  n = parseInt(n);
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === n) {
      index = i;
      b = true;
    }

  }
  if (b) {
    arr.splice(index, 1);
    res.status(200).send('Successfully Deleted');
  }
  else {
    res.status(404).send('Not found');
  }
}

app.use(bodyParser.json());
app.get('/todos', (req, res) => res.status(200).json(arr));
app.get('/todos/:id', retrievetodobyid);
app.post('/todos', createnewtodo);
app.put('/todos/:id', updatetodobyid);
app.delete('/todos/:id', deletetodobyid);

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})