// * MongoDB 이해하기


// MongoDB란?
// 대표적인 NoSQL, Document DB
// 대용량 데이터를 처리하기 좋게 만들어졌다.


// RDB
// RDB는 Relational DataBase의 약자로 관계형 데이터베이스이다.
// 자료들의 관계를 주요하게 다룬다.
// SQL 질의어를 사용하기 위해 데이터를 구조화해야 한다.


// NoSQL
// Not Only SQL의 약자로 구조화된 질의어를 사용하지 않는 데이터베이스이다.
// 자료 간의 관계에 초점을 두지 않는다.
// 데이터를 구조화하지 않고, 유연하게 저장한다.


// NoSQL을 사용하는 이유
// NoSQL을 사용하면 사전작업 없이 데이터베이스를 사용할 수 있다.
// 즉, 데이터베이스 작업에 크게 관여하지 않고 프로젝트를 빠르게 진행할 수 있다.


//NoSQL과 Document DB
// NoSQL은 다양한 종류가 있지만  대표적으로 자료를 Document(문서)로 저장하는 Document DB가 일반적이다.


// database
// 하나 이상의 collection을 가질 수 있는 저장소
// SQL에서의 database와 유사하다.

// collection
// 하나 이상의 document가 저장되는 공간
// SQL에서의 table과 유사하다.
// 하지만, collection이 document의 구조를 정의하지 않는다.

// document
// MongoDB에 저장되는 자료
// SQL에서 row와 유사하지만 구조제약 없에 유연하게 저장이 가능하다.
// JSON과 유사한, BSON을 사용하여 다양한 자료형을 지원한다.

// document - objectID
// 각 document의 유일한 키 값이며 SQL의 primary key와 유사하다.
// 하나씩 증가하는 값이 아닌 document를 생성할 때 자동으로 생성되는 값이다.


// 이번 강의에서는 MongoDB 클라우드, MongoDB Compass 사용


// * Mongoose ODM


// Mongoose ODM이란?
// MdongDB의 Collection에 집중하여 관리하도록 도와주는 패키지이다.
// Collection을 모델화하여, 관련 기능들을 쉽게 사용할 수 있도록 도와준다.


// Mongoose ODB을 사용하는 이유

// 연결관리
// MongoDB의 기본 Node.js 드라이버는 연결상태를 관리하기 어렵다.
// Mongoose를 사용하면 간단하게 데이터베이스와의 연결상태를 관리 해준다.

// 스키마 관리
// 스키마를 정의하지 않고 데이터를 사용할 수 있는 것은 NoSQL의 장점이지만 데이터 형식을 미리 정의해야 코드 작성과 프로젝트 관리에 유용하다.
// Monggose는 Code-Level에서 스키마를 정의하고 관리할 수 있게 해준다.

// Populate
// MongoDB는 기본적으로 join을 제공하지 않는다.
// join과 유사한 기능을 Mongoose는 populate를 사용하여 간단하게 구현할 수 있다.


// * Mongoose ODM 사용하기


// Mongoose ODM 사용 순서
// 1. 스키마 정의  2. 모델 만들기  3. 데이터베이스 연결  4. 모델 사용


// 스키마 정의하기
{
  const { Schema } = require('mongoose');

  const PostSchema = new Schema({
    title: String,
    content: String,
  }, {
    timestamps: true,
  });

  module.exports = PostSchema;
}
// Collection에 저장될 Document의 스키마를 Code-Level에서 관리할 수 있도록 Schema를 작성할 수 있다.
// 다양한 형식을 미리 지정하여 생성, 수정 작업 시 데이터 형식을 체크해주는 기능을 제공한다.
// timestamps 옵션을 사용하면 생성, 수정 시간을 자동으로 기록해준다.


// 모델 만들기
{
  const mongoose = require('mongoose');

  const PostSchema = rquire('./schemas/board');

  exports.Post = mongoose.model('Post', PostSchema);
}
// 작성된 스키마를 mongoose에서 사용할 수 있는 모델로 만들어야 한다.
// 모델의 이름을 지정하여 populate 등에서 해당 이름으로 모델을 호출할 수 있다.


// 데이터베이스 연결하기
{
  const mongoose = require('mongoose');

  const { Post } = require('./models');

  mongoose.connect('mongodb://localhost:27017/myapp');

  // Post 바로 사용 가능
}
// connect 함수를 이용하여 간단하게 데이터베이스에 연결할 수 있다.
// mongoose는 자동으로 연결을 관리해 주어 직접 연결 상태를 체크하지 않아도 모델 사용 시 연결 상태를 확인하여 사용이 가능할 때 작업을 실행한다.


// 모델 사용하기 - 간단한 CRUD


// Create
{
  const { Post } = require('mongoose');

  async function main() {
    const created = await Post.create({
      title: 'first title',
      content: 'second title'
    })

    const multplaeCreated = await Post.create([
      item1,
      item2
    ]);
  }
}
// create 함수를 사용하여 document 생성
// create 함수에는 document object나 -> 단일 document 생성
// document object의 array 전달 가능 -> 복수 document 생성
// create는 생성된 document를 반환해준다.


// Find(Read)
{
  const { Post } = require('./model');

  async function main() {
    const listPost = await Post.find(query);
    const onePost = await Post.findOne(query);
    const postById = await Post.findById(id);
  }
}
// find 관련 함수를 사용하여 document를 검색한다.
// query를 사용하여 검생하거나 findById를 사용하면 ObjectID로 document를 검색할 수 있다.


// Query
// MongoDB에도 SQL의 where와 유사한 조건절 사용이 가능하다.
// MongoDB의 query는 BSON 형식으로 기본 문법 그래도 mongoose에서도 사용이 가능하다.
{
  Person.find({
    name: 'kyubum',
    age: {
      $lt: 20,
      $gte: 10,
    },
    languages: {
      $ln: ['ko', 'en'],
    },
    $or: [
      { status: 'ACTIVE' },
      { isFresh: true },
    ],
  });
}
// {key: value}로 exact match
// $lt, $lte, $gt, %gte 를 사용하여 range query 작성이 가능하다. (MongoDB 홈페이지에 Query Operator들을 확인 가능하다)
// $ln을 사용하여 다중 값으로 검색
// $or를 사용하여 다중 조건 검색


// Update
{
  async function main() {
    const updateResult = await Post.updateOne(query, {
      // ...
    });
    const updateResults = await Post.updateMany(query, {
      // ...
    });
    const postById = await Post.findByIdAndUpdate(query, {
      // ...
    });
    const onePost = await Post.findOneAndUpdate(query, {
      // ...
    });
  }
}
// update 관련 함수를 사용하여 document를 수정한다.
// find~ 함수들은 검색된 document를 업데이를 반영하여 반환해준다.
// mongoose의 update는 기본적으로 $set operator를 사용하여, document를 통째로 변경하지 않는다.


// Delete
{
  async function main() {
    const deleteResult = await Post.deleteOne(query);

    const deleteResults = await Post.deleteMany(query);

    const onePost = await Post.findOneAndDelete(query);

    const postById = await Post.findByIdAndDelete(query);
  }
}
// delete 관련 함수를 사용하여 document 삭제
// find~ 함수들은 검색된 document를 반환해 준다.

// populate
{
  const Post = new Schema({
    // ...
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  });

  const post = await post
    .find().populate(['user', 'comments']);
}
// document 안에 document를 담지 않고, ObjectId를 가지고 reference하여 사용할 수 있는 방법을 제공한다.
// document에는 reference되는 ObjectId를 담고, 사용할때 populate하여 하위 document처럼 사용할 수 있게 해준다.


// * Express.js와 Mongoose ODM

// Express.js에서 mongoose 사용하기
// Express.js는 프로젝트 구조를 자유롭게 구성할 수 있기 때문에 어느 부분에 Mongoose ODM을 위치시키면 좋을지 적절한 위치를 결정하는것이 중요하다.


// Mongoose ODM 위치 정하기
// 일반적으로 models 디렉터리에 Schema와 Model을 같이 위치시킨다.
// app 객체는 어플리케이션 시작을 의미하는 부분이므로 해당 부분에 데이터베이스 연결을 명시하는 mongoose.connect를 위치시킨다.


// Mongoose ODM 커넥션 이벤트
// Express.js 어플리케이션은 종료되지 않고 동작하기 때문에 계속해서 데이터베이스가 정삭적으로 동작하는지 파악해야 한다.
// 따라서 동작 중에 발생하는 데이터베이스 연결 관련 이벤트에 대한 처리를 하는것이 좋다.


// Mongoose ODM 커넥션 이벤트
{ 
  mongoose.connect('---');

  mongoose.connection.on('connected', () => { // 연결 완료
    // ...
  })
  mongoose.connection.on('disconnected', () => { // 연결 끊김
    // ...
  })
  mongoose.connection.on('reconnected', () => { // 재연결 완료
    // ...
  })
  mongoose.connection.on('reconnectFailed', () => { // 재연결 시도 횟수 초과
    // ...
  })
}
