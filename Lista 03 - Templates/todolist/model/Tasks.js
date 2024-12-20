let ids = 0;
let tasks = [];

module.exports = {
    new(name, priority = 'Média') {
        //caso prioridade invalida é setado como média a prioridade
        if (!['Baixa', 'Média', 'Alta'].includes(priority)) {
            priority = 'Média';
        }
        let task = {id: ++ids, name: name, priority: priority};
        tasks.push(task);
        return task;
    },
    update (id, name) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            tasks[pos].name = name;
        }
    },
    list() {
        return tasks;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return tasks[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            tasks.splice(i, 1);
            return true;
        }
        return false; 
    }
}