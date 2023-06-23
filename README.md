# paperlive

## Deploy

1.  Update NGINX Configuration:

- Open the file `client/nginx.conf` in your preffered text editor.
- Replace all occurences of `example.com` with the actual domain name or IP address of your server.
- Save the file.

2.  Update Docker Configuration:

- Open the file `client/Dockerfile.prod` in your preffered text editor.
- Replace exemple.com with the URI of your server, where the backend API is hosted.
- Save the file.

3.  Deploy the Application:

- Open your terminal or command prompt.
- Navigate to the root directory of the project where the Makefile is located.
- Execute the command `make deploy`.
- This command will initiate the deployment process, which may take some time.
- Once the deployment is complete, the PaperLive application should be accessible on your server.

Please make sure you have the necessary permissions and dependencies installed on your server before executing the deployment command.

If you encounter any issues during the deployment process, refer to the documentation or contact the application's support team for assistance.
