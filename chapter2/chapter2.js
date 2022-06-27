// * 게시판 CRUD 만들기


// CRUD란?
// Create, Read, Update, Delete
// 데이터를 다루는 네가지 기본적인 기능


// * Async Request Handler


// request handler
// async의 비동기 처리는 매우 편리하지만 매번 try-catch 구문을 자성하는 것은 귀찮고 실수하기 쉽다.
// request handler를 async function 으로 작성하면서 try ~ catch, next를 자동으로 할 수 있도록 구성한 아이디어이다.


// * Pagination


// Pagination이란?
// 데이터가 많아지면 한 페이지의 목록에 모든 데이터를 표현하기 어렵다.
// pagenation은 데이터를 균일한 수로 나누어 페이지로 분리하는 것이다.


//Express.js + Mongoose의 Pagination
{
  ReadableStreamDefaultController.length((   )=>{
    const page = 
      Number(req.query.page || 1)
    const perPage = 
      Number(req.query.perPage || 10)
    // ... 
  })
}
// page - 현재 페이지
// perPage - 페이지당 게시글 수

// /post?page=1&perPage=10
// 일반적으로 url query를 사용해 전달한다.

// query는 문자열로 전달되기 때문에 Number로 형변환이 필요하다.

{
  ReadableStreamDefaultController.length((   ) => {
    // ...
    const total = await postMessage
      .countDocument({});
    const posts = await postMessage.find({})
      .sort({ createdAt: -1})
      .skip(perPage * (page - 1))
      .limit(perPage);
    const totalPage = 
      Math.ceil(total  / perPage);
      // ...
  })
}
// MongoDB의 limit과 skip을 사용하여 pagination 구현이 가능하다.

// limit - 검색 결과 수 제한
// skip - 검색 시 포함하지 않을 데이터 수

// pagination 시에는 데이터의 순서가 유지될 수 있도록 sort를 사용할 수 있도록 한다.
// totalPage는 총 페이지 수로 게시글 수 / 페이지 당 게시글 수 로 나타낼 수 있다.

