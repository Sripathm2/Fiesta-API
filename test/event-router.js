let chai = require('chai');
let index = require('../index');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('event-router', function() {
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
                location: [ 40.423540, -86.921740 ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                location: [ 40.423540, -86.921740 ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                location: [ 40.423540, -86.921740 ],
                partySupplier: 'Party City',
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                location: [ 40.423540, -86.921740 ],
                caterer: 'Chipotle',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                location: [ 40.423540, -86.921740 ],
                partySupplier: 'Party City',
                guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ],
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
                location: [ 40.423540, -86.921740 ],
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

    describe('/POST update', () => {
        
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