Basic authentication 

3.1)
When reloading the page you do not need to fill in the login details again.
This is because in every GET request the browser sends the username and password
with it.

3.2)
Without the authorization header you will get a 401 unauthorized status code.
With the authorization we got a 200 status code. If you then close the connection 
and request the same page without the authorization header, you will get the 401 
code again. In the browser you don't need to authentcate again because the browser
automatically sends the authorization header with all requests.