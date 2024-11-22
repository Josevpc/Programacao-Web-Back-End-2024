module.exports = {
    new(session, name) {
        if (!session.tasks) {
            session.tasks = [];
            session.ids = 0;
        }
        let task = {id: ++session.ids, name: name};
        session.tasks.push(task);
        return task;
    },
    update (session, id, name) {
        let pos = this.getPositionById(session, id)
        if (pos >= 0) {
            session.tasks[pos].name = name;
        }
    },
    list(session) {
        return session.tasks || [];
    },
    getElementById(session, id) {
        let pos = this.getPositionById(session, id)
        if (pos >= 0) {
            return session.tasks[pos];
        }
        return null;
    },
    getPositionById(session, id) {
        let tasks = session.tasks || [];
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(session, id) {
        let i = this.getPositionById(session, id);
        if (i >= 0) {
            session.tasks.splice(i, 1);
            return true;
        }
        return false; 
    }
}