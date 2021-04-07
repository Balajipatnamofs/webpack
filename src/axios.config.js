import axios from 'axios';

const instace = axios.create({
  baseUrl :'https://jsonplaceholder.typicode.com',
  authUrl :'https://www.googleapis.com/identitytoolkit/v3/relyingparty/',
  authKey :'AIzaSyCXxEzp4aao2TUFtWFx1qfGL1hZsNB8730'
});
instace.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
instace.defaults.headers.common['Accept'] = 'application/json';


export default instace;