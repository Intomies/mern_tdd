import { expect } from "chai";
import MessageApp from './app.js'

describe ('app', function () {
    let testApp;
    const testStrings = {
        initial: 'Hello World!',
        update: 'Hi, world'
    }
    beforeEach(()=>{
        testApp = new MessageApp()
        testApp.post(testStrings.initial)
      })

    it ('App has messages', () => {
        expect (testApp.messages).to.be.an('array')
    });

    it ('App creates message (post)', () => {
        testApp.post(testStrings.initial)
        expect (testApp.messages.length).to.equal(2)
    });

    it ('Message has content, date and id', () => {
        expect (testApp.messages[0].id).to.equal(1)
        expect (testApp.messages[0].content).to.equal(testStrings.initial)
        expect (testApp.messages[0].date).not.to.equal(undefined)
    });

    it ('Message content equals right types (id: number, content: string, date: date)', () => {
        expect (testApp.messages[0].id).to.be.a('number')
        expect (testApp.messages[0].content).to.be.a('string')
        expect (testApp.messages[0].date).to.be.a('date')
    });

    it ('App reads (get)',  () => {
        expect (testApp.get(1).content).to.equal(testStrings.initial)
    });

    it ('App updates (update)', () => {
        testApp.update(1, testStrings.update)
        expect (testApp.get(1).content).to.equal(testStrings.update)
    });

    it ('App deletes (delete)', () => {
        testApp.delete(1)
        expect (testApp.messages.length).to.equal(0)
    })

    it ('Id\'s are always unique', () => {
        testApp.post('1')
        testApp.post('2')
        testApp.delete(1)
        testApp.post('3')
        expect (testApp.messages[1].id).to.equal(3)
    })

    it ('App deletes correctly', () => {
        testApp.post('1')
        testApp.post('2')
        testApp.post('3')
        testApp.delete(0)
        testApp.delete(2)
        expect (testApp.get(1).id).to.equal(1)
    });

    it ('App updates correctly', () => {
        testApp.post('1')
        testApp.post('2')
        testApp.delete(1)
        testApp.update(2, 'update')
        expect (testApp.get(2).content).to.equal('update')
    })
});