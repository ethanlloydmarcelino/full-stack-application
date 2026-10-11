from http.server import (BaseHTTPRequestHandler, HTTPServer)


class MyserverExample(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)

        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )

        self.send_header(
            "Content-Type",
            "Text/html"
        )

        self.end_headers()
        self.wfile.write(b"Hello from the python backend")


server = HTTPServer(
    ("localhost", 8000),
    MyserverExample
)

print("Server running")

server.serve_forever()