HTTP GET/HEAD

1.1)
$ telnet www.weer.nl 80
Trying 52.49.153.133...
Connected to b2cwebsite-live-lb-960116390.eu-west-1.elb.amazonaws.com.
Escape character is '^]'.
HEAD /regenradar/nederland HTTP/1.1
host:www.weer.nl

HTTP/1.1 200 OK
Age: 0
Cache-Control: max-age=600
Content-Type: text/html; charset=utf-8
Date: Wed, 25 Dec 2019 16:26:22 GMT
Server: nginx/1.16.0
Vary: Accept-Encoding
Via: 1.1 varnish-v4
X-Cache: MISS
X-Powered-By: PHP/5.5.26
X-Varnish: 501706960
Connection: keep-alive

GET /regenradar/nederland HTTP/1.1
host:www.weer.nl

HTTP/1.1 200 OK
Accept-Ranges: bytes
Age: 69
Cache-Control: max-age=600
Content-Type: text/html; charset=utf-8
Date: Wed, 25 Dec 2019 16:26:22 GMT
Server: nginx/1.16.0
Vary: Accept-Encoding
Via: 1.1 varnish-v4
X-Cache: HIT
X-Powered-By: PHP/5.5.26
X-Varnish: 503252567 501706961
transfer-encoding: chunked
Connection: keep-alive

1.2)
$ telnet www.weer.nl 80|tee out.html
Trying 52.19.144.82...
Connected to b2cwebsite-live-lb-960116390.eu-west-1.elb.amazonaws.com.
Escape character is '^]'.
GET /regenradar/nederland HTTP/1.1
host:www.weer.nl

HTTP/1.1 200 OK
Accept-Ranges: bytes
Age: 0
Cache-Control: max-age=600
Content-Type: text/html; charset=utf-8
Date: Wed, 25 Dec 2019 16:33:59 GMT
Server: nginx/1.16.0
Vary: Accept-Encoding
Via: 1.1 varnish-v4
X-Cache: MISS
X-Powered-By: PHP/5.5.26
X-Varnish: 522669306 522669307
transfer-encoding: chunked
Connection: keep-alive

The content does not correspond entirely because there are no ads in the 
downloaded version and the weather animation does not work.

1.3)
The X-Cache tag in the header information tells whether the recource 
was found in cache somewhere (in that case it is a HIT), in case the resource 
was not found in cache somewhere it is a cache MISS and the resource just 
needs to be served by the host.

1.4)
Cache-Control indicates how long a version of the resource can be used (when inside the cache).
If the age is older than the max-age, the resource will be requested from the host itself. 
Cache-Control can also indicate whether the resource can be retrieved from only the cache in the browser
or also from public cache. 