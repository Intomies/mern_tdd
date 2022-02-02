import fs from 'fs'

const getNewId = (arr) => {
    return arr.length > 0 ? arr[arr.length - 1].id + 1 : 1
}

class MessageApp {
    constructor(filePath) {
        this.filePath = filePath
        this.messages =  filePath ? this.readFromJson() : []
    }

    post = (content) => {
        const item = {
            id: getNewId(this.messages),
            content: content,
            date: new Date()
        }
        this.messages.push(item)
        this.writeToJson()
        return this.messages
    }

    get = (id) => {
        return this.messages.filter(message => message.id === id)[0]
    }

    update = (id, updatedContent) => {
        const index = this.messages.findIndex(message => message.id === id)
        this.messages[index].content = updatedContent
        this.writeToJson()
        return this.messages[index]
    }

    delete = (id) => {
        console.log('Deleting Id: ' + id)
        this.messages = this.messages.filter(message => message.id != id)
        this.writeToJson()
        return this.messages
    }

    readFromJson = () => {
        return JSON.parse(fs.readFileSync(
            this.filePath, 'utf8', (err, data) => {
                if (err) throw err
            })
        )
    }

    writeToJson = () => {
        if (this.filePath) {
            const jsonItem = JSON.stringify(this.messages)
            fs.writeFileSync(this.filePath, jsonItem, (err) => {
                if (err) throw err
            })
        }
    }
}
export default MessageApp;