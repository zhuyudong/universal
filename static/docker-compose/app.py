import time
import redis
from flask import Flask
from gevent.pywsgi import WSGIServer
from rich.console import Console

console = Console().print

app = Flask(__name__)
cache = redis.Redis(host='localhost', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)

if __name__ == "__main__":
    # from gevent import pywsgi
    console("Starting server on port 5000")
    server = WSGIServer(('0.0.0.0', 5000), app)
    server.serve_forever()

#     # from waitress import serve
#     # serve(app, host='0.0.0.0', port=5000)

# server = WSGIServer(('0.0.0.0', 5000), app)
# server.serve_forever()
