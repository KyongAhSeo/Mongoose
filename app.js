//Connect to mongoose
const mongoose = require('mongoose');

// Connection URL
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

//Insert a Document
//Schema를 먼저 작성한다.
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

//1번째 파라미터에는 컬렉션의 이름이 들어가는데 단수형태로 적어줘야한다.
//하지만 mongoose가 이를 복수형태로 변환시켜서 실제로 데이터베이스를 들여다보면 복수형태로 바뀌어있다.
//2번째 파라미터에는
const Fruit = mongoose.model("Fruit", fruitSchema);

//fruitSchema를 바탕으로 만들어진 Fruit 모델에서 fruit 문서를 생성
const fruit = new Fruit ({
  name : "Apple",
  rating : 10,
  review : "Great fruit"
});

//fruit 문서를 fruitsDB안의 Fruit 컬렉션에 저장
//fruit.save();

const kiwi = new Fruit ({
  name : "Kiwi",
  rating : 10,
  review : "The best fruit"
});

const orange = new Fruit ({
  name : "Orange",
  rating : 9,
  review : "Nice fruit"
});

//1번째 파라미터는 객체의 array가 들어간다.
//2번재 파라미터는 콜백 함수가 들어간다.
// Fruit.insertMany([kiwi, orange], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("succesfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  };
});
