from flask import Flask, request, abort
import hmac
import hashlib
import subprocess
import os

WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET").encode()
app = Flask(__name__)

def verify_signature(payload, signature):
    if not signature:
        return False
    sha_name, signature = signature.split('=')
    if sha_name != 'sha256':
        return False
    mac = hmac.new(WEBHOOK_SECRET, msg=payload, digestmod=hashlib.sha256)
    return hmac.compare_digest(mac.hexdigest(), signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method != 'POST':
        abort(405)
    payload = request.data
    signature = request.headers.get('X-Hub-Signature-256')
    if not verify_signature(payload, signature):
        abort(403, "Invalid signature")

    event = request.headers.get('X-GitHub-Event')
    if event == 'push':
        subprocess.Popen(['./deploy.sh'])
        return 'Deployment triggered', 200
    return 'Event ignore', 200
