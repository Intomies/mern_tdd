import { expect } from "chai";
import MessageApp from '../lib/model.js'

describe ('app', () => {
    
    let testApp;
    const testStrings = {
        initial: 'Hello World!',
        update: 'Updated Hello World!'
    }

    const testFilePaths = {
        jsonMessagesFile: './lib/json/testMessages.json'
    }

    beforeEach(()=>{
        testApp = new MessageApp()
        testApp.post(testStrings.initial)
    });

    it ('App has messages', () => {
        expect (testApp.messages).to.be.an('array')
    });

    it ('App creates message (post)', () => {
        testApp.post(testStrings.initial)
        expect (testApp.messages.length).to.equal(2)
    });

    it ('Message has id, content and date', () => {
        expect (testApp.messages[0].id).to.equal(1)
        expect (testApp.messages[0].content).to.equal(testStrings.initial)
        expect (testApp.messages[0].date).not.to.equal(undefined)
    });

    it ('App reads (get)',  () => {
        expect (testApp.get(1).content).to.equal(testStrings.initial)
    });

    it ('App getAll returns all messages (getAll)', () => {
        expect (testApp.getAll()).to.be.an('array')
        expect (testApp.getAll().length).to.equal(1)
    }); 

    it ('App updates (update)', () => {
        testApp.update(1, testStrings.update)
        expect (testApp.get(1).content).to.equal(testStrings.update)
    });

    it ('App deletes (delete)', () => {
        testApp.delete(1)
        expect (testApp.messages.length).to.equal(0)
    });

    it ('Id\'s are always unique', () => {
        testApp.post(testStrings.initial)
        testApp.post(testStrings.initial)
        testApp.delete(1)
        testApp.post(testStrings.initial)
        expect (testApp.messages[1].id).to.equal(3)
    });

    it ('App deletes correctly', () => {
        testApp.post(testStrings.initial)
        testApp.post(testStrings.initial)
        testApp.post(testStrings.initial)
        testApp.delete(0)
        testApp.delete(2)
        expect (testApp.get(1).id).to.equal(1)
    });

    it ('App updates correctly', () => {
        testApp.post(testStrings.initial)
        testApp.post(testStrings.initial)
        testApp.delete(1)
        testApp.update(2, testStrings.update)
        expect (testApp.get(2).content).to.equal(testStrings.update)
    });
    
    it ('App writes to given filepath', () => {
        const testFileWriteApp = new MessageApp(testFilePaths.jsonMessagesFile)
        expect (testFileWriteApp.messages.length).to.equal(0)

        testFileWriteApp.post(testStrings.initial)
        expect (testFileWriteApp.messages.length).to.equal(1)

        const testFileReadApp = new MessageApp(testFilePaths.jsonMessagesFile)
        expect (testFileReadApp.messages.length).to.equal(1)

        testFileReadApp.delete(1)
        const testFileClearedApp = new MessageApp(testFilePaths.jsonMessagesFile)
        expect (testFileClearedApp.messages.length).to.equal(0)
    });

    it ('App rejects empty messages', () => {
        const rejectingTestApp = new MessageApp()
        expect (rejectingTestApp.post('')).to.deep.equal([])
    });

    it ('App doesn\'t return messages if no messages are sent', () => {
        const emptyTestApp = new MessageApp()
        expect (emptyTestApp.getAll()).to.deep.equal([])
    });

    it ('App rejects updates with no content', () => {
        const falseUpdateTestApp = new MessageApp()
        expect (falseUpdateTestApp.update(0, '')).to.deep.equal([])
    });

    it ('App delete message gives error if given message id doesn\'t exist', () => {
        const deleteErrorTestApp = new MessageApp()
        expect (deleteErrorTestApp.delete(0)).to.deep.equal('Message not found in database')
    });
});