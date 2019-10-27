from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO


HTMLtemplate =  """
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>
"""
client = None

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        response.write(b'This is POST request. ')
        response.write(b'Received: ')
        response.write(body)
        print(client)
        self.wfile.write(response.getvalue())
        print(client)
        #client.write(b'We can still talk')


httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
httpd.serve_forever()