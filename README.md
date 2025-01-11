2 Projects done in order to learn Docker

THe first is located in the hw1 directory. It is a simple web app that can be set up in a Docker Container.

The second is located in the hw2_1 directory. It features:
- A frontend
- A backend
- Kafka
- MongoDB

The frontend has an input box, words inputted will then be sent to the kafka sender which will then send it to the kafka receiver through Kafka. The kafka receiver will then store the words into a MongoDB database. \
The frontend will then display the database on the webapp below the input box.

All components have corresponding docker files, and the Docker compose file is set up to run all of them at once.

There is also a Kubernetes and Helm set up in order to run multiple containers in different environments (dev or prod)
