class ApiResponse{
    constructor(statusCode,message="success"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.succes=statusCode<400
        
    }
}