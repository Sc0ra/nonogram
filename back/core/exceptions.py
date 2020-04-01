class ApiException(Exception):
    error_code = 0
    external_message = "Unknown Error"
    internal_message = "Something went wrong here"
    status_code = 500


class DateException(ApiException):
    error_code = 1
    external_message = "Unknown Error"
    internal_message = "Inconsistent dates: creation date is after update date"
    status_code = 500


class EmptyFieldException(ApiException):
    def __init__(self, error_code: int, blank_field: str):
        self.external_message = "Unknown Error"
        self.internal_message = (
            "EmptyFieldException: The following field was blank : " + blank_field
        )
        self.status_code = 400
        self.error_code = error_code

    def __str__(self):
        return self.internal_message


class TypeException(Exception):
    def __init__(self, error_code: int, incorrect_input: str):
        self.error_code = error_code
        self.internal_message = (
            "TypeException: the following input did not respect the right type : "
            + incorrect_input
        )
        self.external_message = "Unknown Error"
        self.status_code = 400

    def __str__(self):
        return self.internal_message
