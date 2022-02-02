import { expect } from "chai";
import MessageApp from './app.js'

describe ('app', function () {
    const testStrings = {
        initial: 'Hello World!',
        update: 'Hi, world'
    }
    let testApp = new MessageApp
    
    it ('App has messages', () => {
        expect (testApp.messages).to.be.an('array')
    });

    it ('App creates message (post)', () => {
        testApp.post(testStrings.initial)
        expect (testApp.messages.length).to.equal(1)
    });

    it ('Message has content, date and id', () => {
        expect (testApp.messages[0].id).to.equal(0)
        expect (testApp.messages[0].content).to.equal(testStrings.initial)
        expect (testApp.messages[0].date).not.to.equal(undefined)
    });

    it ('Message content equals right types (id: number, content: string, date: date)', () => {
        expect (testApp.messages[0].id).to.be.a('number')
        expect (testApp.messages[0].content).to.be.a('string')
        expect (testApp.messages[0].date).to.be.a('date')
    });

    it ('App reads (get)',  () => {
        expect (testApp.get(0).content).to.equal(testStrings.initial)
    });

    it ('App updates (update)', () => {
        testApp.update(0, testStrings.update)
        expect (testApp.get(0).content).to.equal(testStrings.update)
    });

    it ('App deletes (delete)', () => {
        testApp.delete(0)
        expect (testApp.messages.length).to.equal(0)
    })
});