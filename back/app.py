import os
import json
import traceback

from flask import Flask, jsonify

# from flask.logging import create_logger
from flask_login import LoginManager, current_user
from flask_pymongo import PyMongo

from routes.users import users
from routes.levels import levels

from users.manager import UserManager
from core.exceptions import ApiException


def create_app(testing=False):
    # create and configure the app
    app = Flask(__name__)

    # Load conf depending on the mode
    if testing:
        app.config.from_pyfile("./instance/test.conf.py")
    elif app.env == "development":
        app.config.from_pyfile("./instance/back.conf.py")
    elif app.env == "production":
        app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
        app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    else:
        raise ValueError("App mode unknow: not in dev|prod|test")

    app.mongo = PyMongo(app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    # app.logger = create_logger(app)

    @login_manager.user_loader
    def load_user(user_id):
        return UserManager().get(user_id)

    # @app.errorhandler(ApiException)
    # def handle_api_exception(e):
    #     app.logger.error(traceback.format_exc())
    #     app.logger.error(e.internal_message)
    #     response = jsonify(
    #         {"error_code": e.error_code, "error_message": e.external_message,}
    #     )
    #     return response, e.status_code

    # @app.errorhandler(Exception)
    # def handle_exception(e):
    #     app.logger.error(traceback.format_exc())
    #     response = jsonify({"error_code": -1, "error_message": "Unknown Error",})
    #     return response, 500

    app.register_blueprint(users)
    app.register_blueprint(levels)

    @app.route("/config")
    def config():
        res = {
            "version": "0.0.1",
            "env": app.env,
        }
        return jsonify(res)

    return app
