from flask_restplus import Resource, Namespace

from ..utils.ApiResponse import ApiResponse


api = Namespace('CertificateAuthority', description='Certificate-related operations')

@api.route(
    '', 
    doc={"description": "Just to check if everything's up and running"}
)
class CA(Resource):
    def get(self):
        apiResponse = ApiResponse()
        apiResponse.setAll(False, "Everything's up and running", {})
        return apiResponse.getResponse()