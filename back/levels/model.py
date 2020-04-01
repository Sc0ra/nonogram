from core.model import Document
from core.exceptions import DateException, EmptyFieldException, TypeException


class Level(Document):
    fields = Document.fields + [
        "name",
        "model",
        "max_health",
    ]

    export_fields = Document.export_fields + [
        "level_id",
        "name",
        "model",
        "max_health",
    ]

    editable_fields = Document.export_fields + [
        "name",
        "model",
        "max_health",
    ]

    def __init__(
        self, name: str = "", max_health: int = 3, model: list = None, **kwargs,
    ):
        super().__init__(**kwargs)

        self.level_id = self._id
        self.name = name
        self.model = model if model else []
        self.max_health = max_health
        self.verify()

    def verify(self):
        if not isinstance(self.name, str):
            raise TypeException(error_code=25, incorrect_input="name")
        if not isinstance(self.max_health, int):
            raise TypeException(error_code=26, incorrect_input="max_health")
        if not isinstance(self.model, list):
            raise TypeException(error_code=27, incorrect_input="model")
        if self.name == "":
            raise EmptyFieldException(error_code=28, blank_field="name")
        if self.model == [] or self.model is None:
            raise EmptyFieldException(error_code=29, blank_field="model")

    @staticmethod
    def from_dict(dict_object: dict):
        return Document.from_dict_class(dict_object, Level)
