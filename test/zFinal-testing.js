let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let jwt = require('jsonwebtoken');
let should = chai.should();

chai.use(chaiHttp);

describe('final testing', function() {

    describe('Final  check', () => {
        it('it should succeed with correct field in users', done => {
            const payload = {
                userName: 'testUsername',
            };
            let token = jwt.sign(payload, process.env.secret, {
                expiresIn: '10h',
            });
            chai.request(index)
                .get('/user/getData')
                .query({ token: token, })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
});