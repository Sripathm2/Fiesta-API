let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let should = chai.should();

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
                    res.body.message.should.be.eql('Must include all the fields.');
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
                    res.body.message.should.be.eql('Must include all the fields.');
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
                    res.body.message.should.be.eql('Must include the userName.');
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
                    res.body.message.should.be.eql('Must include the item.');
                    done();
                });
        });
    });

    describe('/GET selectAnswer', () => {

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .get('/event/selectAnswer')
                .query({ answerUsername: 'testUsername', answer: 'ghusade tabood', })
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
                    res.body.message.should.be.eql('Must include the answer.');
                    done();
                });
        });
    });

    describe('/GET selectQuestion', () => {

        it('it should succeed with correct fields ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', answer: 'ghusade tabood', })
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
                    res.body.message.should.be.eql('Must include all the fields.');
                    done();
                });
        });

        it('it should fail with no answer. ', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', questionID: '113924824', answerUsername: 'iamsrk', answer: 'hiyaaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the answer.');
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

        it('it should fail with no questionID.', done => {
            chai.request(index)
                .get('/event/selectQuestion')
                .query({ event_id: '10000221', questionUserName: 'testUsername', question: 'tabood ghusadun?', answerUsername: 'iamsrk', answer: 'hiyaa', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include a questionID.');
                    done();
                });
        });

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
    });
});

