const getData = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((result) => {
      if(!result.ok){
        throw new Error();
      }
      return result.json();
    });

const sendData = (body) => fetch('https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method : 'POST',
    body
  }
)
  .then((result) => {
    if(!result.ok){
      throw new Error();
    }
    return result.json();
  });

export {getData, sendData};
