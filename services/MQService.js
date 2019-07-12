import amqp from "amqp/callback_api";
import dotenv from 'dotenv';

dotenv.config();

const CONN_URL = process.env.MQ_CONN;

let ch = null;
amqp.connect(CONN_URL, function(err, con) {
	conn.createChannel(function(err, channel) {
		ch = channel;
	});
});

export const publishToQueue = async (queueName, data) => {
	ch.sendToQueue(queueName, new Buffer(data));
}

//process listener to close the connection when the process is exited
process.on('exit', code => {
	ch.close();
	console.log("Closing the rabbitmq channel");
});