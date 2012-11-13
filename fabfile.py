from fabric.api import cd, local, run

import config
import stationary


def clean():
    stationary.clean()


def build():
    stationary.build()


def serve():
    stationary.serve()


def deploy():
    #local('git add . && git commit && git push')
    with cd(config.DEPLOY_PATH):
        run('git pull')
