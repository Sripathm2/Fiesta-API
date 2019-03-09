let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('event-router', function() {
    describe('/POST question', () => {

        let allFields = {
            event_id: '134340',
            questionUserName: 'iamsdhar',
            question: 'taabood ghusa lun?',
            questionID: '108230',
        };

        let noFields = {};

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .post('/event/question')
                .send(allFields)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('Success');
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .post('/event/question')
                .send(noFields)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the event_id.');
                    done();
                });
        });
    });


    describe('/POST answer', () => {

        let allFields = {
            answerUsername: 'iamsdhar',
            answer: 'taabood ghusa lunga',
        };

        let noFields = {};

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .post('/event/answer')
                .send(allFields)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('Success');
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .post('/event/answer')
                .send(noFields)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the answerUsername.');
                    done();
                });
        });
    });

    describe('/PUT createWishlist', () => {

        let allFields = {
            userName: 'iamsdhar',
            item: 'tabood',
        };

        let oneField = {
            userName: 'iamsdhar',
        };

        let secondField = {
            item: 'tabood',
        };

        let noFields = {};

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .put('/event/createWishlist')
                .send(allFields)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('Success');
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .post('/event/createWishlist')
                .send(noFields)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include all the fields.');
                    done();
                });
        });

        it('it should fail with missing items field', done => {
            chai.request(index)
                .post('/event/createWishlist')
                .send(oneField)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the item field.');
                    done();
                });
        });

        it('it should fail with missing username field', done => {
            chai.request(index)
                .post('/event/createWishlist')
                .send(secondField)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the username field.');
                    done();
                });
        });
    });

    describe('/GET selectWishlist', () => {

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .get('/event/selectWishlist')
                .query({ userName: 'testUsername', item: 'tabood', })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .get('/event/selectWishlist')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the owner userName.');
                    done();
                });
        });

        it('it should fail with no item name. ', done => {
            chai.request(index)
                .get('/event/selectWishlist')
                .query({ userName: 'iamsdhar', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an item name for the wishlist.');
                    done();
                });
        });
    });

    describe('/get event', () => {

        it('it should succeed with correct fields', done => {

            let data = {
                location: 'chicago-il',
                budget: '1',
            };

            chai.request(index)
                .get('/event/event')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.data).to.exist;
                    done();
                });
        });

        it('it should fail with missing location and missing latlon', done => {

            let data = {
                budget: '1',
            };

            chai.request(index)
                .get('/event/event')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should succeed without location and with correct latlon', done => {

            let data = {
                latlon: '41.3811617,-84.52272749999997',
                budget: '1',
            };

            chai.request(index)
                .get('/event/event')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.data).to.exist;
                    done();
                });
        });

        it('it should fail with incorrect latlon', done => {

            let data = {
                latlon: '300,-50',
                budget: '1',
            };

            chai.request(index)
                .get('/event/event')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with invalid latlon', done => {

            let data = {
                latlon: '41.3811617',
                budget: '1',
            };

            chai.request(index)
                .get('/event/event')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

    });

    describe('/POST create', () => {

        it('it should succeed with correct fields', done => {

            let postdata = {
                userName: 'johndoe',
                date: '2019-02-09 05:00:00',
                location: [ 40.423540, -86.921740, ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.data).to.exist;
                    done();
                });
        });

        it('it should fail with missing userName', done => {

            let postdata = {
                date: '2019-02-09 05:00:00',
                location: [ 40.423540, -86.921740, ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing date', done => {

            let postdata = {
                userName: 'johndoe',
                location: [ 40.423540, -86.921740, ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing location', done => {

            let postdata = {
                userName: 'johndoe',
                date: '2019-02-09 05:00:00',
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing partySupplier', done => {

            let postdata = {
                userName: 'johndoe',
                date: '2019-02-09 05:00:00',
                location: [ 40.423540, -86.921740, ],
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing caterer', done => {

            let postdata = {
                userName: 'johndoe',
                date: '2019-02-09 05:00:00',
                location: [ 40.423540, -86.921740, ],
                partySupplier: 'Party City',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington', ],
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should succeed with missing guests', done => {

            let postdata = {
                userName: 'johndoe',
                date: '2019-02-09 05:00:00',
                location: [ 40.423540, -86.921740, ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
            };

            chai.request(index)
                .post('/event/create')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.data).to.exist;
                    done();
                });
        });

    });

    describe('/POST answer', () => {

        it('it should succeed with correct fields', done => {

            let postdata = {
                userName: 'owner1',
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
                date: '2019-02-09 05:00:00',
                caterer: 'Jimmy Johns',
                partySupplier: 'Party City',
            };

            chai.request(index)
                .post('/event/update')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .get('/event/selectAnswer')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the answerUsername.');
                    done();
                });
        });

        it('it should fail with no answer. ', done => {
            chai.request(index)
                .get('/event/selectAnswer')
                .query({ answerUsername: 'iamsdhar', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an answer.');
                    done();
                });
        });
    });

    describe('/GET selectQuestion', () => {

        /*it('it should succeed with correct fields ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', answer: 'ghusade tabood', })*/

        it('it should fail with missing userName', done => {

            let postdata = {
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
                date: '2019-02-09 05:00:00',
                caterer: 'Jimmy Johns',
                partySupplier: 'Party City',
            };

            chai.request(index)
                .post('/event/update')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing id', done => {

            let postdata = {
                userName: 'owner1',
                date: '2019-02-09 05:00:00',
                caterer: 'Jimmy Johns',
                partySupplier: 'Party City',
            };

            chai.request(index)
                .post('/event/update')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with invalid id', done => {

            let postdata = {
                userName: 'owner1',
                id: 'not an id',
                date: '2019-02-09 05:00:00',
                caterer: 'Jimmy Johns',
                partySupplier: 'Party City',
            };

            chai.request(index)
                .post('/event/update')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

    });

    describe('/POST rsvp', () => {

        it('it should succeed with correct fields', done => {

            let postdata = {
                userName: 'owner1',
                eventID: 'ef0f5596-4049-11e9-b210-d663bd873d93',
                status: 'yes',
            };

            chai.request(index)
                .post('/event/rsvp')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should fail with no fields ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an event_id.');
                    done();
                });
        });

        it('it should fail with no answer. ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an answer.');
                    done();
                });
        });

        it('it should fail with no event_id. ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', answer: 'hiyaaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an event_id.');
                    done();
                });
        });

        it('it should fail with no questionUserName.', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', answer: 'hiyaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include a questionUserName.');
                    done();
                });
        });

        it('it should fail with missing userName', done => {

            let postdata = {
                eventID: 'ef0f5596-4049-11e9-b210-d663bd873d93',
                status: 'yes',
            };

            chai.request(index)
                .post('/event/rsvp')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing eventID', done => {

            let postdata = {
                userName: 'owner1',
                status: 'yes',
            };

            chai.request(index)
                .post('/event/rsvp')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with missing status', done => {

            let postdata = {
                userName: 'owner1',
                eventID: 'ef0f5596-4049-11e9-b210-d663bd873d93',
            };

            chai.request(index)
                .post('/event/rsvp')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with invalid status', done => {

            let postdata = {
                userName: 'owner1',
                eventID: 'ef0f5596-4049-11e9-b210-d663bd873d93',
                status: 'not a valid status',
            };

            chai.request(index)
                .post('/event/rsvp')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should fail with no question.', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', questionID: '113924824', answerUsername: 'iamsrk', answer: 'hiyaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include a question.');
                    done();
                    });
        });

    });

    describe('/POST postimages', () => {

        it('it should succeed with correct fields', done => {

            let postdata = {
                data: '{heifuvhef}',
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
            };

            chai.request(index)
                .post('/event/image_post')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/get getimages ', () => {

        it('it should succeed with correct fields ', done => {

            let data = {
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
            };

            chai.request(index)
                .get('/event/image_get')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.images[0].should.be.eql('heifuvhef');
                    done();
                });
        });

    });

    describe('/POST posttasks', () => {

        it('it should succeed with correct fields ', done => {

            let postdata = {
                task: '{atask,second}',
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
            };

            chai.request(index)
                .post('/event/tasks_post')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/get gettasks ', () => {

        it('it should succeed with correct fields ', done => {

            let data = {
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93',
            };

            chai.request(index)
                .get('/event/tasks_get')
                .query(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.tasks[1].should.be.eql('second');
                    done();
                });
        });

    });

});


 /* it('it should fail with no questionID.', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', answerUsername: 'iamsrk', answer: 'hiyaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include a questionID.');
                    describe('/GET selectAnswer', () => {

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .get('/event/selectAnswer')
                .query({ answerUsername: 'testUsername', answer: 'ghusade tabood', })
                    it('it should fail with no answerUsername. ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answer: 'hiyaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include an answerUsername.');
                    done();
                });
        });
    });*/
