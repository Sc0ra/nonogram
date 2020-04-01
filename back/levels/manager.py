from core.manager import MongoManager
from levels.model import Level


class LevelManager(MongoManager):
    def __init__(self):
        super().__init__("levels")

    def get(self, level_id):
        return Level.from_dict(self.collection.find_one({"_id": level_id}))

    def get_query(self, query):
        return [Level.from_dict(x) for x in super().get_query(query)]

    def get_all(self):
        return [Level.from_dict(x) for x in super().get_all()]

    def insert_one(self, level):
        return self.collection.insert(level.to_insert_dict())

    def update_one(self, level):
        return self.collection.update({"_id": level.level_id}, level.to_insert_dict())
