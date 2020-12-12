import Vue from 'vue'

class ApiHandler {
    constructor() {
        this.data = null
        this.onStart = () => { }
        this.onRequest = () => { }
        this.onResponse = () => { }
        this.onError = () => { }
        this.onFinally = () => { }
        this.turnOffWarning = false
        this.turnOffSuccess = false
    }

    setData(data) {
        this.data = data
        return this
    }

    setOnStart(onStart) {
        this.onStart = onStart
        return this
    }

    setOnRequest(onRequest) {
        this.onRequest = onRequest
        return this
    }

    setOnResponse(onResponse) {
        this.onResponse = onResponse
        return this
    }

    setOnError(onError) {
        this.onError = onError
        return this
    }

    setOnFinally(onFinally) {
        this.onFinally = onFinally
        return this
    }

    setTurnOffWarning() {
        this.turnOffWarning = true
        return this
    }

    setTurnOffSuccess() {
        this.turnOffSuccess = true
        return this
    }

    notifyError(err) {
        Vue.notify({
            type: 'error',
            title: err.name,
            text: err.message
        })
    }

    async execute() {
        try {
            this.onStart()
            const data = await this.onRequest()
            this.onResponse(data)
        } catch (err) {
            if (!this.turnOffWarning) this.notifyError(err)
            this.onError(err)
        } finally {
            this.onFinally()
        }
    }
}

export default ApiHandler