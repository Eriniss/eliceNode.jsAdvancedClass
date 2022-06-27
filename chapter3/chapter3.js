// * 회원가입 구현하기


// 회원가입 설명
// 이메일, 이름, 패스워드의 간단한 정보만 사용
// - 이메일의 형식이 올바른지 확인
// - 비밀번호 최소 길이 확인
// - 패스워드와 패스워드 확인 문자가 일치하는지 확인


// 비밀번호 저장 방법 - Hash
// 단방향 암호 방식


// SHA1 - 사용 방법(보안이슈로 MD5와 SH1은 이제 사용되지 않음)
{
  const hash = crypto.createHash('sha1');
  hash.update(password);
  hash.digest("hex");
}
// Node.js의 기본 제공 모듈인 crypto 모듈을 사용하여 hash값을 얻을 수 있다.
// 최근 들어서 보다 강력한 sha256, sha512 등이 사용된다.


// 회원가입 구현하기
// 1. 회원가입 페이지 구현
// 2. script를 이용해 이메일 형식, 비밀번호 확인 문자 확인
// 3. form을 이용해 post 요청 전송
// 4. 회원가입 처리 및 redirect


// 회원가입 페이지 만들기
{
  
}

// 가입 요청 처리
{
  router.post((content) => { // content는 async 함수를 포함하고 있다.
    const  { email, name, password} = req.body;
    const pwHash = getHash(password); 
    const axists = await User.findOne({
      email,
    });

    if (exists) { // 일치하는 email이 있을 시 에러를 출력한다.
      throw new Error('이미 가입된 메일입니다.');
    }

    await User.create({
      email,
      name,
      password: pwHash,
    });

    resizeBy.redirect('/');
  })
}


// * Passport.js와 로그인

// Passport.js란?
// Express.js 어플리케이션에 간단하게 사용자 인증 기능을 구현하게 도와주는 패키지이다.
// 유저 세션 관리 및 다양한 로그인 방식이 추가 가능하다.


// passport-local
// passport는 다양한 로그인 방식을 구현하기 위해 strategy라는 인터페이스를 제공한다.
// strategy 인터페이스에 맞게 설계된 다양한 구현체들이 있다.
// passport-local은 username, password를 사용하는 로그인의 구현체이다.


// 로그인 기능 구현하기
// 1. 로그인 화면 구성하기
// 2. passport-local strategy로 로그인 구현하기
// 3. passport.js 설정하기
// 4. passport로 요청 처리하기


// 로그인 기능 구현하기 - 로그인 화면 구성하기
{

}