const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: '35.240.249.113:9092' });
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const producer = new Producer(client);
const client1 = new kafka.Client();

consumer = new Consumer(client1, [{ topic: 'topic1', partition: 0 }], {
  autoCommit: false,
});

const payloads = [
  { topic: 'topic1', messages: 'hi', partition: 0 },
  { topic: 'topic2', messages: 'hello' },
];

producer.on('ready', function() {
  console.log('Connect ... ');
  producer.send(payloads, function(err, data) {
    console.log(err, data);
  });
});

consumer.on('message', function(message) {
  console.log('consumer: ', message);
});
