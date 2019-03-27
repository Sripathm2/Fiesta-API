let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let jwt = require('jsonwebtoken');
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('event-router', function() {
    describe('/POST create', () => {

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
});