import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const baseUrl = 'https://reqres.in/api';

const userSchema = {
  "title": "User",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string" },
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "avatar": { "type": "string" }
  },
  "required": ["id", "email", "first_name", "last_name", "avatar"]
};

describe('Tes API ReqRes', function() {
  
  // Contoh permintaan GET
  it('harus GET daftar pengguna', function(done) {
    chai.request(baseUrl)
      .get('/users?page=1')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array').that.is.not.empty;
        expect(res.body.data[0]).to.be.jsonSchema(userSchema);
        done();
      });
  });

  // Contoh permintaan POST
  it('harus POST pengguna baru', function(done) {
    chai.request(baseUrl)
      .post('/users')
      .send({
        name: 'John Doe',
        job: 'Software Engineer'
      })
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name').eql('John Doe');
        expect(res.body).to.have.property('job').eql('Software Engineer');
        done();
      });
  });

  // Contoh permintaan DELETE
  it('harus DELETE pengguna', function(done) {
    chai.request(baseUrl)
      .delete('/users/2')
      .end(function(err, res) {
        expect(res).to.have.status(204);
        done();
      });
  });

  // Contoh permintaan PUT
  it('harus PUT memperbarui pengguna', function(done) {
    chai.request(baseUrl)
      .put('/users/2')
      .send({
        name: 'Jane Doe',
        job: 'Manager'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').eql('Jane Doe');
        expect(res.body).to.have.property('job').eql('Manager');
        done();
      });
  });

});
