import os
import firebase_admin
from firebase_admin import credentials, db
import subprocess
import time
import requests

# Firebase configuration
firebase_config = {
    "apiKey": "AIzaSyDwI2UUaxnfXBGbYXc7gQhJ8iEWRc93_5c",
    "authDomain": "tweets-zero-theorem.firebaseapp.com",
    "databaseURL": "https://tweets-zero-theorem-default-rtdb.firebaseio.com",
    "projectId": "tweets-zero-theorem",
    "storageBucket": "tweets-zero-theorem.appspot.com",
    "messagingSenderId": "676722815795",
    "appId": "1:676722815795:web:e86d97cb7fe84e7e968446",
    "measurementId": "G-6HBMBVTB61"
}

current_dir = os.getcwd()
# Firebase credentials
json_path = os.path.join(current_dir, "tweets_key.json")
cred = credentials.Certificate(json_path)

# Initialize Firebase app
firebase_admin.initialize_app(cred, firebase_config)

# Get a reference to the Firebase Realtime Database
ref = db.reference('backend-api-link')


# Start MySQL server (replace 'mysql-server-command' with the actual command to start your MySQL server)
mysql_server_command = 'sudo service mysql start'
mysql_server_process = subprocess.Popen(mysql_server_command, shell=True)

# Give some time for MySQL server to start (adjust the sleep duration as needed)
time.sleep(10)

# Define the port your Node.js app is running on
node_app_port = 4000

# Start your Node.js app
node_app_directory = '/home/mahmood-yousaf/Desktop/zero_theorem/NodeJS-Rest-API/accessing-memorystore-from-cloud-run/'
node_app_process = subprocess.Popen(['node', 'cloud-run-app-static.js'], cwd=node_app_directory)

# Give some time for your Node.js app to start
time.sleep(10)

# Start Ngrok to expose the Node.js app to the public
ngrok_process = subprocess.Popen(['ngrok', 'http', str(node_app_port)])

ngrok_url = None

try:
    # Keep checking for Ngrok tunnel until available
    while not ngrok_url:
        try:
            ngrok_info = requests.get('http://localhost:4040/api/tunnels').json()
            tunnels = ngrok_info['tunnels']

            if tunnels:
                ngrok_url = tunnels[0]['public_url']
                ref.set({"link": ngrok_url})
                print(f'Ngrok URL: {ngrok_url}')
            else:
                time.sleep(1)
        except requests.exceptions.ConnectionError:
            # Handle the ConnectionError, e.g., wait and retry
            time.sleep(1)

    # Keep the script running
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    # If the user interrupts the script (e.g., by pressing Ctrl+C), terminate Ngrok, the Node.js app, and MySQL server
    ngrok_process.terminate()
    node_app_process.terminate()
    mysql_server_process.terminate()
    os.killpg(os.getpgid(ngrok_process.pid), signal.SIGTERM)  # Terminate the Ngrok process group
    print("Ngrok, Node.js app, and MySQL server terminated.")
