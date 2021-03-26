const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
	 //name을 적지 않았을 경우 에러 메시지 출력
   required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
		//1-10까지만 입력가능
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name : "Apple",
  rating : 10,
  review : "Great fruit"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "pineapple",
  score: 9,
  review: "The Best!"
});

const banana = new Fruit({
  name: "banana",
  score: 5,
  review: "So So!"
});

// pineapple.save();
// banana.save();
//
// Person.updateOne({name:"John"}, {favoriteFruit: banana}, function(err){
//   if(err){
//       console.log(err);
//     }else{
//       console.log("Succesfully updated the document.");
//     }
//   });

const person = new Person({
  name: "John",
  age: 37,
  favoriteFruit: banana
});

// //person.save();

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
		//document를 다 찾으면 db 연결을 자동으로 닫는다.
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  };
});

// Fruit.deleteOne({_id:"605ddee72b800e20f85980bf"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Succesfully deleted the document.");
//   }
// });
