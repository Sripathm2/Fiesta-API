let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('event-router', function() {

    describe('/POST postimages ', () => {

        it('it should succeed with correct fields ', done => {

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
                    res.body.data.should.be.eql(['heifuvhef']);
                    done();
                });
        });

    });

});