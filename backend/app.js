class MessageApp {
    constructor() {
        this.messages = []
    }

    post = (content) => {
        const item = {
            id: this.messages.length,
            content: content,
            date: new Date()
        }
        this.messages.push(item)
        return this.messages
    }

    get = (id) => {
        return this.messages[id]
    }

    update = (id, updatedContent) => {
        this.messages[id].content = updatedContent
        return this.messages[id]
    }

    delete = (id) => {
        return this.messages.splice(id, 1)
    }
}
export default MessageApp;