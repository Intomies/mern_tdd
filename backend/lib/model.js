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
        if (content) {
            this.messages.push (
                {
                    id: getNewId(this.messages),
                    content: content,
                    date: new Date()
                }
            )
            this.writeToJson()
            return this.messages
        } else { return [] }
        
    }

    get = (id) => {
        return this.messages.filter(message => message.id === id)[0]
    }

    getAll = () => {
        return this.messages
    }

    update = (id, updatedContent) => {
        const index = this.messages.findIndex(message => message.id === id);
        if (index >= 0) {
            this.messages[index].content = updatedContent
            this.writeToJson()
            return this.messages[index]
        } else { return [] }
    }

    delete = (id) => {
        const index = this.messages.findIndex(message => message.id === id)
        console.log(index)
        if (index >= 0) {
            this.messages.splice(index, 1)
            this.writeToJson()
            return this.messages
        } else { return 'Message not found in database'}
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