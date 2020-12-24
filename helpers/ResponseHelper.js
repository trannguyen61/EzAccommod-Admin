class ResponseHelper {
    constructor (response) {
        this.data = response.data.data
        this.status = response.status
        this.error = response.data.status == 'error'
        this.errorMesssage = response.data.message
        this.success = response.data.status == 'success'
    }

    isSuccess () {
        return this.status === 200 && this.success
    }

    isError () {
        return !this.isSuccess()
    }

    getStatus () {
        return this.status
    }

    getData () {
        return this.data
    }

    getError () {
        return this.error
    }

    getErrorMessage () {
        return this.errorMesssage
    }
}

export default ResponseHelper