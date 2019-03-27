let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let jwt = require('jsonwebtoken');
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('event-router', function() {
    describe('/POST create_event', () => {

        it('it should succeed with correct fields', done => {

            let postdata = {
                name: 'eventname',
                description: 'descrip',
                date: '2019-03-27T12:01:02+00:00',
                imageLink: 'https://test.com',
                location: 'location-1',
                partySupplier: 'walmart',
                caterer: 'subway',
                task: 'task1-user1//**//task2-user2',
                guest: '//**//guest1--guest1email--yes//**//guest2--guest2email--no//**//guest4-guest4email--',
                wishlist: 'item1//**//item2',
            };
            const payload = {
                userName: 'owner1',
            };

            let token;
            token = jwt.sign(payload, process.env.secret, {
                expiresIn: '10h',
            });

            chai.request(index)
                .post('/event/create_event')
                .query({ token: token, })
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('success');
                    done();
                });
        });

        it('it should fail with missing token', done => {

            let postdata = {
                name: 'eventname',
                description: 'descrip',
                date: '2019-03-27T12:01:02+00:00',
                imageLink: 'https://test.com',
                location: 'location-1',
                partySupplier: 'walmart',
                caterer: 'subway',
                task: 'task1-user1//**//task2-user2',
                guest: '//**//guest1--guest1email--yes//**//guest2--guest2email--no//**//guest4-guest4email--',
                wishlist: 'item1//**//item2',
            };

            chai.request(index)
                .post('/event/create_event')
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the token.');
                    done();
                });
        });

        it('it should fail with invalid token', done => {

            let postdata = {
                name: 'eventname',
                description: 'descrip',
                date: '2019-03-27T12:01:02+00:00',
                imageLink: 'https://test.com',
                location: 'location-1',
                partySupplier: 'walmart',
                caterer: 'subway',
                task: 'task1-user1//**//task2-user2',
                guest: '//**//guest1--guest1email--yes//**//guest2--guest2email--no//**//guest4-guest4email--',
                wishlist: 'item1//**//item2',
            };

            chai.request(index)
                .post('/event/create_event')
                .query({ token: 'invalidtoken', })
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('InvalidTokenError');
                    res.body.message.should.be.eql('invalid or expired token.');
                    done();
                });
        });

        it('it should fail with missing date', done => {

            let postdata = {
                name: 'eventname',
                description: 'descrip',
                imageLink: 'https://test.com',
                location: 'location-1',
                partySupplier: 'walmart',
                caterer: 'subway',
                task: 'task1-user1//**//task2-user2',
                guest: '//**//guest1--guest1email--yes//**//guest2--guest2email--no//**//guest4-guest4email--',
                wishlist: 'item1//**//item2',
            };
            const payload = {
                userName: 'owner1',
            };

            let token;
            token = jwt.sign(payload, process.env.secret, {
                expiresIn: '10h',
            });

            chai.request(index)
                .post('/event/create_event')
                .query({ token: token, })
                .send(postdata)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the date.');
                    done();
                });
        });

    });
    describe('/GET get_event', () => {

        it('it should succeed with correct fields and owner.', done => {

            const payload = {
                userName: 'owner1',
            };

            let token;
            token = jwt.sign(payload, process.env.secret, {
                expiresIn: '10h',
            });

            chai.request(index)
                .get('/event/get_event')
                .query({ token: token, })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('success');
                    res.body.data[1].name.should.be.eql('eventname');
                    res.body.data[1].owner.should.be.eql('owner1');
                    res.body.data[1].description.should.be.eql('descrip');
                    res.body.data[1].date.should.be.eql('2019-03-27T12:01:02.000Z');
                    res.body.data[1].imageLink.should.be.eql('https://test.com');
                    res.body.data[1].location.should.be.eql('location-1');
                    res.body.data[1].partySupplier.should.be.eql('walmart');
                    res.body.data[1].caterer.should.be.eql('subway');
                    res.body.data[1].task.should.be.eql('task1-user1//**//task2-user2');
                    res.body.data[1].guest.should.be.eql('//**//guest1--guest1email--yes//**//guest2--guest2email--no//**//guest4-guest4email--');
                    res.body.data[1].wishlist.should.be.eql('item1//**//item2');
                    done();
                });
        });


        it('it should fail with missing token', done => {

            chai.request(index)
                .get('/event/get_event')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('RequestFormatError');
                    res.body.message.should.be.eql('Must include the token.');
                    done();
                });
        });

        it('it should fail with invalid token', done => {

            chai.request(index)
                .get('/event/get_event')
                .query({ token: 'invalidtoken', })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.errorType.should.be.eql('InvalidTokenError');
                    res.body.message.should.be.eql('invalid or expired token.');
                    done();
                });
        });

    });
});