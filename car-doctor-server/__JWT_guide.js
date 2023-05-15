/**
 * 
 * --------------------------------------------------------------------
 *              Jason Web Token Using Guide (Secure Your API)
 * --------------------------------------------------------------------
 * 
 * ### CLIENT SIDE-----------------------------------------------------
 * step 1: After login send user info(email..) to the server
 * 
 * ### SERVER SIDE-----------------------------------------------------
 * step 1: npm i jasonwebtoken
 * step 2: import => const jwt = require('jsonwebtoken');
 * 
 * ***CREATE TOKEN (server side)****
 * a): open terminal > node > require('crypto').randomBytes(64).toString('HEX') > copy
 * b): open .env > ACCESS_TOKEN_SECRET = paste
 * 
 * step 3: create API => app.post('/jwt', (req, res) => {})
 *      3.1: jwt.sign(payload/data, process.env.ACCESS_TOKEN_SECRET, {expires})
 *      3.2: res.send() => return token the Client-Side 
 * 
 * ### CLIENT SIDE------------------------------------------------------
 * step 4: After receiving the token store it either localstorage(second best) or HTTP Only cookies(best)
 * *** use a general space => AuthProvider > onAuthStateChange
 * 
 * step 5: (Send token for sensitive API from Client-Side to server)
 *      5.1 send Authorization headers => headers : {
 *          authorization: {`Bearer ${localstorage.getItem(token)}`}
 *      } 
 * 
 * ### SERVER SIDE-------------------------------------------------------
 * {Verify Token}
 * step 6: create a function called verifyToken(it is also known middleware) = (req, res, next) => {}
 * step 7: receive authorization headers => const authorization = req.headers.authorization;
 * step 8: check (authorization) => if not exists retun a error message
 * step 9: get the token from authorization header by split(' ')[1]
 * step 10: call jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoder) => {})
 * step 11: if error => return an error message
 * step 12: Add decoded in the req object => req.decoded = decoded
 * step 13: call the next() to go the next function
 * 
 * 
 * step 14: Now check wether token has the email matches the req.query.email
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */