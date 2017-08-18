var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mustacheExpress = require('mustache-express');

//create app
const app = express();
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());


// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
//telling it to use the mustache engine
app.set('view engine', 'mustache')
//where to pull mustache files
app.set('views', __dirname + '/views');
app.use(session)({
  resave: false,
  secret: 'keyboard cat',
  saveUninitalized: false
});
//two ways of doing the same thing
// app.set('views', __dirname + '/views');
// app.set('views', path.join(__dirname, 'views'));


let test = {
  "name": "Sarah",
  "value": 10000,
  "taxed_value": 10000 - (10000 * 0.4),
  "in_ca": true
};

const tests = {
  testy: test
};

app.get("/test", function (req, res) {
  res.render('index', tests);

});

let food = 1;


  let list = [
    {
      todo: 'wash the car',
      yetTodo: false
    },
    {
      todo: 'Fold Laundry',
      yetTodo: false
    },
    {
      todo: 'Clean Room',
      yetTodo: true
    },
    {
      todo: 'Get My Life Together',
      yetTodo: true
    },
  ];

  const data = {
    todos: list
  };


  app.get("/", function (req, res) {
    res.render('index', data);
  });

// app.post('/complete',)

app.post("/add", function (req, res) {
  let task = req.body.task;
  list.unshift({todo:task, yetTodo:false});
  // list.push({todo:task, yetTodo:false});
  console.log(req.body.task);
  res.redirect('/');
})

app.post("/complete", function (req, res) {
  let theOneWeWant = req.body.complete;
function findTodo(item) {
   return item.todo === theOneWeWant;}
console.log(list.find(findTodo));
list.find(findTodo).yetTodo = true;

res.redirect('/');
  //
  // let task = list.indexOf(req.body.complete);
  // list.splice(task, 1);
  // res.redirect('/');
})


  // app.post("/", function (req, res) {
  //   todos.push(req.body.todo);
  //   res.redirect('/');
  // })

  // app.get('/', function(req, res){
  //   res.send("hello");
  // });


app.listen(3000,function () {
  console.log('Successfully started express application!');
})
