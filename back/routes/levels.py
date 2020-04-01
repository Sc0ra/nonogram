from flask import Blueprint, jsonify, current_app, request
from flask_login import login_required

import levels.controller as ctrl

levels = Blueprint("levels", "levels")


@levels.route("/levels", methods=["GET"])
def get_levels():
    levels = ctrl.get_all()
    return jsonify([l.to_dict() for l in levels])


@levels.route("/levels/<level_id>", methods=["GET"])
def get_level(level_id: str):
    level = ctrl.get_one(level_id)
    return jsonify(level.to_dict())


@levels.route("/levels/<level_id>", methods=["POST"])
def edit_level(level_id: str):
    update_dict = request.json
    updated = ctrl.edit(level_id, update_dict)
    return jsonify(updated.to_dict())


@levels.route("/levels", methods=["POST"])
def put_level():
    insert_dict = request.json
    inserted = ctrl.insert(insert_dict)
    return jsonify(inserted.to_dict())
