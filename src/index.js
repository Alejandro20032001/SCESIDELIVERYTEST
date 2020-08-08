import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import {PORT,URLDB} from './env'

import categories from './routes/categories'
import clients from './routes/clients'
import dealers from './routes/dealers'
import stores from './routes/stores'
import items from './routes/items'

import cors from 'cors'
import bluebird from "bluebird";
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// getting-started.js MongoDb
import mongoose from 'mongoose'
mongoose.Promise = bluebird
mongoose.connect(URLDB, { useNewUrlParser: true });

const app = express()
app.use(cors({
    origin:['http://localhost:9090',
            'https://editor.swagger.io',
    ],
    methods: ['GET', 'POST','PATCH','PUT']

}))
const handler = () => {
    console.log('http://localhost:9090')
}
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//docs
app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
app.use('/categories', categories);
app.use('/clients', clients);
app.use('/dealers', dealers);
app.use('/stores', stores);
app.use('/items', items);
// app.use(function (req, res, next) {
//     res.status(404).send('Sorry cant find that!');
// });

//app.use(exampleRoute)

app.listen(PORT, handler)
