from levels.manager import LevelManager
from levels.model import Level


def get_all():
    return LevelManager().get_all()


def get_one(level_id: str):
    return LevelManager().get(level_id)


def insert(insert_dict: dict):
    level_to_insert = Level(**insert_dict)
    LevelManager().insert_one(level_to_insert)
    return level_to_insert


def edit(level_id: str, update_dict: dict):
    level_to_update = LevelManager().get(level_id)
    level_to_update.update(**update_dict)
    LevelManager().update_one(level_to_update)
    return level_to_update
