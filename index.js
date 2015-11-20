var _ = require('underscore');
_.each([1, 2, 3], function (v) {
    console.log(v);
});


var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/test';
mongodb.MongoClient.connect(uri, function (error, db) {
        if (error) {
        console.log(error);
        process.exit(1);
    }

    db.collection('sample').insert({
        y: 1
    }, function (error, result) {
        if (error) {
            console.log(error);
            process.exit(1);
        }

        db.collection('sample').find().toArray(function (error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            console.log('Found docs:');
            docs.forEach(function (doc) {
                console.log(JSON.stringify(doc));
            });
            process.exit(0);
        });
    });
});

