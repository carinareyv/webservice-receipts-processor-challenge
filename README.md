This is a webservice implemented as a REST API with Node.JS and Express. Please see <a href="https://github.com/carinareyv/webservice-receipts-processor-challenge/blob/main/api.yml"> API specs </a> for the specifications and some examples.
Nodemon was installed to help with development speed to automaticall restart the server in case changes are detected.
Also, the <a href="https://www.npmjs.com/package/uuid">uuid package</a> was installed to handle the id string creation, and <a href="https://www.npmjs.com/package/moment">Moment.js</a> 
to handle dates and times, for the purpose of avoiding timezone discrepancies, since the point calculations demanded accuracy in date and time handling.

# Running the project

```
npm start
```
