#coding=utf8

from fabric.api import run, env, cd
from fabric.operations import local
from fabric.context_managers import prefix
from fabric.context_managers import path

env.hosts = ['root@likangwei.com']

workDir = "/var/www/code_builder"

commitMsg = ""

def build():
    local("source ../active.sh && pwd && cd ../web && npm run build ")


def gitCommit():
    global commitMsg
    local("cd ..; git add *; git commit -m '%s'; git push" % commitMsg)

def deploy():
    global commitMsg
    commitMsg = raw_input("请输入此次commit: ")
    buildFe = raw_input("是否Bulid fe: y/N")
    if buildFe == "Y":
        build()
    gitCommit()

    with cd(workDir):
        run("git reset --hard")
        run("git pull")
        run("supervisorctl restart code")
