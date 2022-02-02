
const getNewId = (arr) => {
    return arr.length > 0 
        ? arr[arr.length - 1].id + 1 
        : 1
}

class MessageApp {
    constructor() {
        this.messages = []
    }

    post = (content) => {
        const item = {
            id: getNewId(this.messages),
            content: content,
            date: new Date()
        }
        this.messages.push(item)
        return this.messages
    }

    get = (id) => {
        return this.messages.filter(message => message.id === id)[0]
    }

    update = (id, updatedContent) => {
        const index = this.messages.findIndex(message => message.id === id)
        this.messages[index].content = updatedContent
        return this.messages[index]
    }

    delete = (id) => {
        console.log('Deleting Id: ' + id)
        this.messages = this.messages.filter(message => message.id != id)
        return this.messages
    }
}
export default MessageApp;