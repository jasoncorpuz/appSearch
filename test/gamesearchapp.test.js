const { expect } = require('chai');
const supertest = require('supertest')
const app = require('../gamesearchapp')

describe('gamesearchapp', () => {
    it('should return json if successful', () => {
        return supertest(app)
            .get('/games')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                const app = res.body[0]
                expect(app).to.include.any.keys('App','Category','Rating')

            })
    })
    it('should send a 400 error if genre doesn not include specific genres', () => {
        return supertest(app)
         .get('/games')
         .query({ genres: 'demons'})
         .expect(400, 'Genre must be of Action, Puzzle, Strategy, Casual, Arcade, or Card')
    })
    it('should send an error 400 if sort is not rating or app', () => {
        return supertest(app)
         .get('/games')
         .query({ sort: 'angry'})
         .expect(400, 'Sort must be of only one rating or app')
    })
})