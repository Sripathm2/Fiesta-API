let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('event-router', function() {

    describe('/POST postimages ', () => {

        it('it should succeed with correct fields ', done => {

            let postdata = {
                data: 'heifuvhef',
                id: 'ef0f5596-4049-11e9-b210-d663bd873d93'
            };

            chai.request(index)
                .post('event/image_post')
                .send(feedback)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

});