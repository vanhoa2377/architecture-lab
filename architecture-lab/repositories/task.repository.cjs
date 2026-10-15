const tasks = [
    { id: 1, title: "Học Client–Server" },
    { id: 2, title: "Quan sát HTTP request" },
];

let nextTaskId = 3;

function findAll() {
    return tasks.map((task) => ({ ...task }));
}

function findById(id) {
    const task = tasks.find((item) => item.id === id);
    return task ? { ...task } : undefined;
}

function create(title) {
    const task = {
        id: nextTaskId,
        title: title,
    };

    nextTaskId += 1;
    tasks.push(task);

    return { ...task };
}

module.exports = {
    findAll,
    findById,
    create,
};